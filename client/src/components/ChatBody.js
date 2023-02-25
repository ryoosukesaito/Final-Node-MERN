import React, { useContext, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { AppContext } from "../context/appContext";
import { getInitial } from "../constants";

function ChatBody() {
  const user = useSelector((state) => state.user);
  const { messages, privateMemberMsg, currentRoom } = useContext(AppContext);
  const messageEndRef = useRef(null);
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  function scrollToBottom() {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      {user && !privateMemberMsg?._id && (
        <h2 className=" text-xl py-3 shadow pl-5 font-bold">{currentRoom}</h2>
      )}
      {user && privateMemberMsg?._id && (
        <h2 className="text-xl py-3 shadow pl-5 font-bold">
          {privateMemberMsg.name}
        </h2>
      )}
      {!user && (
        <div className="flex items-center justify-center text-red-500">
          ANY CHAT ROOM IS NOT AVAILABLE
        </div>
      )}
      <div className="h-full w-full text-gray-600 flex flex-col shadow overflow-y-scroll">
        {user &&
          messages.map(({ _id: date, messagesByDate }, idx) => (
            <div key={idx}>
              <p className="flex items-center justify-center">
                <span className="rounded-full bg-gray-300 text-white py-1 px-2 text-xs ">
                  {date}
                </span>
              </p>
              {messagesByDate?.map(
                ({ content, time, from: sender }, msgIdx) => (
                  <div
                    className="  p-4 hover:drop-shadow-lg hover:shadow "
                    key={msgIdx}
                  >
                    <div className="message-inner">
                      <div className="flex items-center mb-3 justify-between">
                        <div className=" flex flex-row  ">
                          <span className="h-8 w-8 mr-2 rounded-full text-gray-200 flex items-center bg-neutral-500 justify-center text-base">
                            {sender._id === user?._id
                              ? "Y"
                              : getInitial(sender)}
                          </span>
                          <span className=" text-indigo-700 font-bold">
                            {sender._id === user?._id ? "You" : sender.name}
                          </span>
                        </div>
                        <p className="message-timestamp-left">{time}</p>
                      </div>

                      <p className="px-6 font-light">{content}</p>
                    </div>
                  </div>
                )
              )}
            </div>
          ))}
        <div ref={messageEndRef} />
      </div>
    </>
  );
}

export default ChatBody;
