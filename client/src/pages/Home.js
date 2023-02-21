import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import  {pageHeight}  from "../constants";

function Home() {
  const user = useSelector((state) => state.user)
  const [style, setStyle] = useState({ float: "right", display: "block" });

  useEffect(() => {
    setTimeout(() => {
      setStyle({ display: "none" });
    }, 5000);
  }, []);

  function closeHandler() {
    setStyle({ display: "none" });
  }

  return (
    <>
      <div id="log-alert" style={style} onClick={closeHandler}>
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative w-80"
          role="alert"
        >
          <strong className="font-bold">Success message</strong>
          <br />
          <span className="block sm:inline">Hello  {user.name}</span>
          <span
            id="close"
            className="absolute flex items-center top-0 bottom-0 right-0 pr-2 py-3"
            onClick={closeHandler}
          >
            <svg
              className="fill-current h-6 w-6 text-green-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </span>
        </div>
      </div>

      <header className="bg-white shadow " style={{pageHeight}}>
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Dashboard
          </h1>
        </div>
      </header>
    </>
  );
}

export default Home;
