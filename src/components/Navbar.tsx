import { useState } from "react";
import { FaCartPlus, FaRegUserCircle, FaSearch } from "react-icons/fa";
import { Modal } from "./Modal";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 bg-white shadow-lg">
      <h3
        className="text-2xl font-bold flex items-center cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src="../images/favicon.PNG" alt="favicon" className="h-8 mr-2" />
        Groco
      </h3>
      {/* nav-bar */}
      <nav className="hidden md:flex space-x-4">
        <Link
          to="/"
          className="text-lg text-gray-800 hover:bg-green-500 hover:text-white px-2 py-1 rounded-lg"
        >
          Home
        </Link>
        <Link
          to="#features"
          className="text-lg text-gray-800 hover:bg-green-500 hover:text-white px-2 py-1 rounded-lg"
        >
          Features
        </Link>
        <Link
          to="/products"
          className="text-lg text-gray-800 hover:bg-green-500 hover:text-white px-2 py-1 rounded-lg"
        >
          Product
        </Link>
        <Link
          to="#categories"
          className="text-lg text-gray-800 hover:bg-green-500 hover:text-white px-2 py-1 rounded-lg"
        >
          Categories
        </Link>
        <Link
          to="#review"
          className="text-lg text-gray-800 hover:bg-green-500 hover:text-white px-2 py-1 rounded-lg"
        >
          Reviews
        </Link>
        <Link
          to="#blogs"
          className="text-lg text-gray-800 hover:bg-green-500 hover:text-white px-2 py-1 rounded-lg"
        >
          Blogs
        </Link>
      </nav>
      {/* All Google Icons  */}
      <div className="flex space-x-4">
        <span className="material-symbols-outlined h-12 w-12 bg-gray-200 text-gray-800 text-2xl font-bold flex items-center justify-center rounded-lg cursor-pointer hover:bg-green-500 hover:text-white">
          <FaSearch />
        </span>
        <span
          className="material-symbols-outlined h-12 w-12 bg-gray-200 text-gray-800 text-2xl font-bold flex items-center justify-center rounded-lg cursor-pointer hover:bg-green-500 hover:text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FaCartPlus />
        </span>
        <span className="material-symbols-outlined h-12 w-12 bg-gray-200 text-gray-800 text-2xl font-bold flex items-center justify-center rounded-lg cursor-pointer hover:bg-green-500 hover:text-white">
          <FaRegUserCircle />
        </span>
      </div>
      {isOpen && <Modal />}
    </header>
  );
};

export default Navbar;
