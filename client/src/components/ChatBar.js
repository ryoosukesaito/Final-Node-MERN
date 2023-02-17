import React from "react";

function ChatBar() {
  const rooms = [
    "Group1",
    "Group2",
    "Group3",
    "Group4",
    "Group5",
    "Group6",
    "Group7",
    "Group8",
    "Group9",
  ];

  return (
    <div className="h-full w-full bg-gray-200 text-gray-600 flex flex-col shadow overflow-y-scroll">
      <h2 className="text-xl py-3 shadow pl-2">Chat Rooms</h2>
      <div className=" h-1/4 overflow-y-scroll mb-2">
        {rooms.map((room, index) => (
          <div
            key={index}
            className="truncate hover:bg-white px-5 py-3 text-lg"
          >
            {room}
          </div>
        ))}
      </div>

      <h2 className="text-xl py-2 shadow pl-2">Private Chat</h2>
      <div className=" h-auto overflow-y-scroll mb-2">
        <div>
          <div className="truncate hover:bg-white px-5 py-3 text-lg">hoge</div>
          <div className="truncate hover:bg-white px-5 py-3 text-lg">hoge</div>
          <div className="truncate hover:bg-white px-5 py-3 text-lg">
            hogehogehogehogehogehoge
          </div>
          <div className="truncate hover:bg-white px-5 py-3 text-lg">hoge</div>
          <div className="truncate hover:bg-white px-5 py-3 text-lg">hoge</div>
          <div className="truncate hover:bg-white px-5 py-3 text-lg">
            hogehogehogehogehogehoge
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatBar;
