export const navigation = [
  { name: "Dashboard", href: "/home", current: true },
  { name: "Tasks", href: "#", current: false },
  { name: "Chat", href: "/chat", current: false },
  { name: "Calendar", href: "#", current: false },
]

export const beforeLoginMenu = [
  {name: "Login", href: "/login", priority: false},
  {name: "Sign Up", href: "/signup", priority: true}
]

export const dropdownMenuItems = [
  { key: "home", name: "Home", href: "/home" },
  { key: "profile", name: "Your Profile", href: "#" },
  { key: "settings", name: "Settings", href: "#" },
  { key: "logout", name: "Sign out", href: "#" },
];