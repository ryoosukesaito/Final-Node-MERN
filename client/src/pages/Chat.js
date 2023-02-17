import React from "react";
import ChatBar from "../components/ChatBar";
import ChatBody from "../components/ChatBody";
import ChatFooter from "../components/ChatFooter";

function Chat() {
  return (
    <div className="w-screen h-screen flex items-center">
      <div className="h-full w-2/12">
      <ChatBar />
      </div>
      <div className="h-full w-screen">
        <ChatBody />
        <ChatFooter />
      </div>
    </div>
  );
}

export default Chat;
