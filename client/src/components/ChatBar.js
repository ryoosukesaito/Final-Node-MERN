import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from "../context/appContext";
import { addNotifications, resetNotifications } from "../features/userSlice";
import { SERVER_URL, getInitial } from "../constants";

function ChatBar() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const {
    socket,
    members,
    setMembers,
    currentRoom,
    setCurrentRoom,
    privateMemberMsg,
    setPrivateMemberMsg,
    setNewMessages,
    rooms,
    setRooms,
  } = useContext(AppContext);

  function getBooleanToString (obj1, obj2){
    return obj1 === obj2 ? "true" : "false" 
  }


  function joinRoom(room, isPublic = true) {
    if (!user) {
      return alert("Please Login");
    }
    socket.emit("join-room", room, currentRoom);
    setCurrentRoom(room);

    if (isPublic) {
      setPrivateMemberMsg(null);
    }
    //dispatch for notification
    dispatch(resetNotifications(room));
  }

  socket.off("notifications").on("notifications", (room) => {
    if (currentRoom !== room)dispatch(addNotifications(room));
  });

  useEffect(() => {
    if (user) {
      setCurrentRoom("General");
      getRooms();
      socket.emit("join-room", "General");
      socket.emit("new-user");
    }
  }, [ ]);

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
    setPrivateMemberMsg(member);
    const roomId = orderIds(user._id, member._id);
    joinRoom(roomId, false);
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
          <button
            key={index}
            className="truncate w-full flex justify-start hover:bg-white px-5 py-3 text-base cursor-pointer focus:bg-lime-300 active:bg-lime-400"
            active={getBooleanToString(room, currentRoom)}
            onClick={() => joinRoom(room)}
          >
            {room}
            {currentRoom !== room && (
              <span className="rounded-full bg-lime-400 ml-5 text-sm w-5 h-full text-gray-500">
                {user.newMessages[room]}
              </span>
            )}
          </button>
        ))}
      </div>

      <h2 className="text-lg py-2 shadow pl-2">Direct messages</h2>
      <div className=" h-auto overflow-y-scroll mb-2">
        <div>
          {members.map((member) => (
            <button
              key={member._id}
              className="truncate w-full flex justify-start hover:bg-white px-5 py-3 text-base cursor-pointer disabled:bg-gray-300 active:bg-lime-400 focus:bg-lime-300"
              active={getBooleanToString(privateMemberMsg?._id,member._id )}
              onClick={() => handlePrivateMemberMsg(member)}
              disabled={member._id === user._id}
            >
              <div className="flex flex-row">
                <div className="flex flex-row">
                  {" "}
                  <span className="h-8 w-8 rounded-full text-gray-200 flex items-center bg-neutral-500 justify-center text-base">
                    {getInitial(member)}
                  </span>
                  {member.status === "online" ? <span className="rounded-full bg-green-600 border h-3 w-3 -ml-2 mt-5"></span> : <span className="rounded-full bg-orange-400 border h-3 w-3 -ml-2 mt-5"></span>}
                </div>
                <div className="ml-3 pt-1">
                  {member.name}
                  {member._id === user?._id && "(you)"}
                </div>
                <div className="ml-5 pt-2  text-xs">
                  {member.status === "offline" && "--Offline--"}
                </div>
                <span className="rounded-full bg-lime-400 ml-5 text-sm w-5 h-full text-gray-500">
                  {user.newMessages[orderIds(member._id, user._id)]}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChatBar;
