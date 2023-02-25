require("dotenv").config();
const express = require("express");
const app = express();

const rooms = ["General", "Work", "Drink🍻", "School", "Final Pj Group"];
const cors = require("cors");
const User = require("./models/User");
const Message = require("./models/Message");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

require("./utils/mongodb");

const server = require("http").createServer(app);
const PORT = process.env.PORT;
const io = require("socket.io")(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    method: ["GET", "POST"],
  },
});

app.use("/check", (_, res) =>
  res.json({ response: "Health Check" }).status(200)
);
app.use("/api", require("./routes/userRoutes"));

app.get("/rooms", (req, res) => {
  res.json(rooms);
});

async function getLastMessageFromRoom(room) {
  let roomMessages = await Message.aggregate([
    { $match: { to: room } },
    { $group: { _id: "$date", messagesByDate: { $push: "$$ROOT" } } },
  ]);
  return roomMessages;
}

// date order
// 02/20/2023
// 20230220
function sortRoomMessagesByDate(messages) {
  return messages.sort((a, b) => {
    let date1 = a._id.split("/");
    let date2 = b._id.split("/");

    date1 = date1[2] + date1[0] + date1[1];
    date2 = date2[2] + date2[0] + date2[1];

    return date1 < date2 ? -1 : 1;
  });
}

//socket Connection
io.on("connection", (socket) => {
  //new user
  socket.on("new-user", async () => {
    const members = await User.find();
    io.emit("new-user", members);
    // console.log("members:  " + members);
  });

  //join room event from client
  socket.on("join-room", async (newRoom, previousRoom) => {
    socket.join(newRoom);
    socket.leave(previousRoom);
    let roomMessages = await getLastMessageFromRoom(newRoom);
    roomMessages = sortRoomMessagesByDate(roomMessages);
    socket.emit("room-messages", roomMessages);
  });

  socket.on("message-room", async (room, content, sender, time, date) => {
    const newMessage = await Message.create({
      content,
      from: sender,
      time,
      date,
      to: room,
    });
    let roomMessages = await getLastMessageFromRoom(room);
    roomMessages = sortRoomMessagesByDate(roomMessages);

    //sending message to room
    io.to(room).emit("room-messages", roomMessages);

    socket.broadcast.emit("notification", room);
  });

  app.delete("/logout", async (req, res) => {
    try {
      const { _id, newMessages } = req.body;
      const user = await User.findById(_id);
      user.status = "offline";
      user.newMessages = newMessages;
      await user.save();
      const members = await User.find();
      socket.broadcast.emit("new-user", members);
      res.status(200).send();
    } catch (error) {
      console.log(error);
      res.status(400).send();
    }
  });


});


app.use((error, req, res, next) => {
  res.status(error.status || 500).json({ error: error.message });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
