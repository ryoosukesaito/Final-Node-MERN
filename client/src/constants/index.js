export const navigation = [
  { name: "Dashboard", href: "/home", current: true },
  { name: "Tasks", href: "#", current: false },
  { name: "Chat", href: "/chat", current: false },
  { name: "Calendar", href: "#", current: false },
];

export const beforeLoginMenu = [
  { name: "Login", href: "/login", priority: false },
  { name: "Sign Up", href: "/signup", priority: true },
];

export const pageHeight = { height: "calc(100vh - 66px)" };

export const SERVER_URL = process.env.REACT_APP_SOCKET_URL;

export function getInitial(obj) {
  return obj.name.charAt(0);
  // return console.log(obj);
}
export function getNewMsg(obj) {
  // return obj.name.charAt(0);
  return console.log(obj)
}
