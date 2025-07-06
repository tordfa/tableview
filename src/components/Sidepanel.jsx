import { useState } from "react";
import { NavLink} from "react-router";
import { Home, Calendar, Users, Settings, Menu } from "lucide-react";

const navItems = [
  { name: "Home", icon: <Home size={20} />, path: "/" },
  { name: "Calendar", icon: <Calendar size={20} />, path: "/calendar" },
  { name: "Tableview", icon: <Users size={20} />, path: "/tableview" },
  { name: "Settings", icon: <Settings size={20} />, path: "/settings" },
];

export default function SidePanel() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {/* Mobile toggle button */}
      <div className="fixed top-0 left-0 z-40 md:hidden p-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-800 bg-white p-2 rounded-md shadow"
        >
          <Menu />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-md w-96 transform transition-transform duration-200 ease-in-out z-30 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:block`}
      >
        <div className="flex items-center justify-between p-4 md:hidden">
          <h1 className="text-xl font-bold">Menu</h1>
          <button onClick={() => setIsOpen(false)} className="text-gray-600">
            ✕
          </button>
        </div>
        <div className="p-4 border-b hidden md:block">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        </div>
        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)} // Close menu on mobile
              className={({isActive}) => `flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-200 ${isActive ? "text-black font-bold" : ""}`}
            >
              {item.icon}
              <span className="ml-3">{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
}