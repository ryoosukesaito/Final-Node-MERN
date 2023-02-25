import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppContext } from "../context/appContext";

function ChatFooter() {
  const [message, setMessage] = useState("");
  const [typingStatus, setTypingStatus] = useState("");
  const [isSubmitted, setIsSubmitted] =useState(false);
  const user = useSelector((state) => state.user);
  const {socket, currentRoom, setMessages } = useContext(AppContext);

  useEffect(() => {

    let delayDebounceFn 

    if(isSubmitted) {
      delayDebounceFn = setTimeout(() => {
        socket.emit("typing", "")
      },2000)
    }
    
    return () => clearTimeout(delayDebounceFn);
  }, [message] )

  const handleTyping = () => {
    // socket.emit("typing", `${user.name} is typing ...`)
    setIsSubmitted(false);
    setTypingStatus(user.name);
  }


  function getFormattedDate(){
    const date = new Date();
    const year = date.getFullYear();

    let month = (1+ date.getMonth()).toString();
    month = month.length > 1 ? month : "0" + month;

    let day = date.getDate().toString();
    day= day.length > 1 ? day : "0" + day;
    
    return month +"/"+ day +"/"+ year;

  }

  const todayDate = getFormattedDate();

  socket.off('room-messages').on('room-messages', (roomMessages)=> {
    // console.log('room messages',roomMessages);
    setMessages(roomMessages);
  })

  function handleSendMsg(e) {
    e.preventDefault();
    if(!message)return;

    const today = new Date();
    const minutes = today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
    const time = today.getHours() + ":" + minutes;
    const roomId = currentRoom;
    socket.emit('message-room', roomId, message, user, time, todayDate);
    setMessage("");
    setIsSubmitted(true);
  }

  return (
    <div className="mx-8 p-3 border-t">
      <form onSubmit={handleSendMsg} disabled={!user}>
        <div className="flex flex-row-reverse mr-4 justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:shadow-outline disabled:bg-gray-500"
            disabled={!user}
          >
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        <p className=" text-gray-400">{typingStatus}</p>

        </div>
        <input
          type="text"
          rows={3}
          className="min-h-[100px] h-full mt-2 shadow appearance-none border rounded-md w-full pb-12 pl-5 text-gray-700 leading-tight"
          placeholder="Write message ..."
          disabled={!user}
          value={message}
          onChange={(e)=> setMessage(e.target.value)}
          onKeyDown={handleTyping}
        />
      </form>
    </div>
  );
}

export default ChatFooter;
