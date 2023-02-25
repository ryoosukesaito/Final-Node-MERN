import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { pageHeight } from "../constants";
import { AppContext } from "../context/appContext";
import { useLoginUserMutation } from "../services/appAPI";

function Login() {
  //test .env variable


  //Icon trigger js
  const [pwStyle, setPwStyle] = useState({
    type: "password",
    icon: "fa-regular fa-eye-slash",
  });
  function showTypeHandler() {
    pwStyle.type === "password"
      ? setPwStyle({ type: "text", icon: "fa-regular fa-eye" })
      : setPwStyle({ type: "password", icon: "fa-regular fa-eye-slash" });
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { socket } = useContext(AppContext);
  const [loginUser, { error }] = useLoginUserMutation();
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();

    // login logic
    loginUser({ email, password }).then(({ data }) => {
      if (data) {
        //socket
        socket.emit("new-user");
        //navigate to home page
        navigate("/chat");
      }
    });
  }

  return (
    <>
      <div className="flex justify-center items-center" style={pageHeight}>
        <div className="w-full max-w-xs">
          <form
            onSubmit={handleLogin}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            id="form"
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="email"
                placeholder="Email"
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <div className="flex flex-row items-center">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  type={pwStyle.type}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                />
                <div
                  className="pb-3 -ml-8 opacity-25 cursor-pointer"
                  onClick={showTypeHandler}
                >
                  <i className={pwStyle.icon} id="togglePassword"></i>
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 p-2 mb-4 rounded relative">
                {error.data}
              </div>
            )}

            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                type="submit"
              >
                Login
              </button>

              <a
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                href="/signup"
              >
                Create Account
              </a>
            </div>
            <p className="text-center text-gray-500 text-xs mt-6">
              &copy;2023. All rights reserved.
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
