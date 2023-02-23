import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from "../context/appContext";
import { addNotifications, resetNotifications } from "../features/userSlice";
import { SERVER_URL } from '../constants';

function ChatBar() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const {
    socket,
    members,
    setMembers,
    currentRoom,
    setCurrentRoom,
    setPrivateMemberMsg,
    rooms,
    setRooms,
  } = useContext(AppContext);

  function joinRoom(room, isPublic = true) {
    if (!user) {
      return alert("Please Login");
    }
    socket.emit("join-room", room);
    setCurrentRoom(room);

    if (isPublic) {
      setPrivateMemberMsg(null);
    }
    //dispatch for notification
    dispatch(resetNotifications(room));

  }
  
  socket.off("notifications").on("notifications", (room) => {
    if(currentRoom !== room)dispatch(addNotifications(room));
  });


  useEffect(() => {
    if (user) {
      setCurrentRoom("General");
      getRooms();
      socket.emit("join-room", "General");
      socket.emit("new-user");
    }
  },[]);

  socket.off("new-user").on("new-user", (payload) => {
    setMembers(payload);
  });

  function getRooms() {
    fetch(`${SERVER_URL}/rooms`)
      .then((res) => res.json())
      .then((data) => setRooms(data));
  }

  function orderIds(id1, id2) {
    if (id1 > id2) {
      return id1 + "-" + id2;
    } else {
      return id2 + "-" + id1;
    }
  }

  function handlePrivateMemberMsg(member) {
    const roomId = orderIds(user._id, member._id);
    joinRoom(roomId, false);
    setPrivateMemberMsg(member);
  }

  if (!user)
    return (
      <>
        <div className="h-full w-full bg-gray-200 text-gray-600 flex flex-col shadow overflow-y-scroll"></div>
      </>
    );

  return (
    <div className="h-full w-full bg-gray-200 text-gray-600 flex flex-col shadow overflow-y-scroll">
      <h2 className="text-lg py-3 shadow pl-2">Chat Rooms</h2>
      <div className=" h-1/4 overflow-y-scroll mb-2">
        {rooms.map((room, index) => (
          <div
            key={index}
            className="truncate hover:bg-white px-5 py-3 text-base cursor-pointer"
            onClick={() => joinRoom(room)}
          >
            {room}
            {currentRoom !== room && (
              <span className=" rounded-full bg-yellow-300">
                {/* {user.newMessages[room]} */}
              </span>
            )}
          </div>
        ))}
      </div>

      <h2 className="text-lg py-2 shadow pl-2">Direct messages</h2>
      <div className=" h-auto overflow-y-scroll mb-2">
        <div>
          {members.map((member) => (
            <div
              key={member._id}
              className="truncate hover:bg-white px-5 py-3 text-base cursor-pointer disabled:bg-red-700"
              onClick={() => handlePrivateMemberMsg(member)}
              disabled={member._id === user._id}
            >
              <div className="flex flex-row">
                <div className="">
                  {" "}
                  <span className="h-8 w-8 rounded-full text-gray-200 flex items-center bg-neutral-500 justify-center text-base">
                    {member.name[0]}
                  </span>
                </div>
                <div className="ml-3 pt-1">
                  {member.name}
                  {member._id === user?._id && "(you)"}
                </div>
                <div className="ml-5 pt-2  text-xs">
                  {member.status === "offline" && "--Offline--"}
                </div>
                <span className=" rounded-full bg-black-500">
                  {/* {user.newMessages[orderIds(member._id)]} */}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChatBar;
