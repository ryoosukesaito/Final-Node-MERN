import React from "react";
import ChatBar from "../components/ChatBar";
import ChatBody from "../components/ChatBody";
import ChatFooter from "../components/ChatFooter";

import { pageHeight } from "../constants";

function Chat() {
  return (
    <div className="w-screen flex items-center flex-row" style={pageHeight}>
      <div className="h-full ">
      <ChatBar />
      </div>
      <div className="h-full w-screen flex flex-col justify-between">
        <ChatBody />
        <ChatFooter />
      </div>
    </div>
  );
}

export default Chat;
