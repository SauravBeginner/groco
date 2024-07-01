import { useEffect, useRef, useState } from "react";
import { FaCartPlus, FaRegUserCircle, FaSearch } from "react-icons/fa";
import { CartModal } from "./CartModal";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import { SamllButton } from "./SmallButton";
import { logout } from "../redux/authSlice";
import { Modal } from "./Modal";
import { RootState } from "../redux/rootReducer";
import { useFetchCartQuery } from "../redux/apiSlice";
import DeleteModal from "./DeleteModal";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogOutModalOpen, setIsLogOutModalOpen] = useState(false);

  const { data: item } = useFetchCartQuery();
  const { totalQuantity } = item || {};

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth?.isAuthenticated
  );

  const btnRef = useRef<HTMLDivElement>(null);
  const dropDownRef = useRef<HTMLUListElement>(null);

  const btn2Ref = useRef<HTMLDivElement>(null);
  const dropDown2Ref = useRef<HTMLDivElement>(null);

  const handleProfileClick = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleProfileClick2 = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    setIsMenuOpen(false);
    setIsOpen(false);
    const handleClickOutSide = (event: any) => {
      if (
        dropDownRef.current &&
        btnRef.current &&
        !dropDownRef.current.contains(event?.target) &&
        !btnRef.current.contains(event?.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    const handleClick2OutSide = (event: any) => {
      if (
        dropDown2Ref.current &&
        btn2Ref.current &&
        !dropDown2Ref.current.contains(event?.target) &&
        !btn2Ref.current.contains(event?.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutSide);
    document.addEventListener("mousedown", handleClick2OutSide);

    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
      document.removeEventListener("mousedown", handleClick2OutSide);
    };
  }, [pathname]);

  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = async () => {
    setIsLogOutModalOpen(true);
  };
  const confirmLogout = async () => {
    const result = await dispatch(logout());

    if (logout.fulfilled.match(result)) {
      navigate("/login");
      setIsLogOutModalOpen(false);
    }
  };

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
          className="text-lg text-gray-800 hover:bg-green-500 hover:text-white px-4 py-2 rounded-lg"
        >
          Home
        </Link>

        <Link
          to="/products"
          className="text-lg text-gray-800 hover:bg-green-500 hover:text-white px-4 py-2 rounded-lg"
        >
          Product
        </Link>

        <Link
          to="/"
          className="text-lg text-gray-800 hover:bg-green-500 hover:text-white px-4 py-2 rounded-lg"
        >
          Blogs
        </Link>
      </nav>
      {/* All Google Icons  */}
      <div className="flex space-x-4">
        <span className="material-symbols-outlined h-12 w-12 bg-gray-200 text-gray-800 text-2xl font-bold flex items-center justify-center rounded-lg cursor-pointer hover:bg-green-500 hover:text-white">
          <FaSearch />
        </span>
        {isAuthenticated ? (
          <>
            <div className="relative">
              <span
                className="material-symbols-outlined h-12 w-12 bg-gray-200 text-gray-800 text-2xl font-bold flex items-center justify-center rounded-lg cursor-pointer hover:bg-green-500 hover:text-white"
                onClick={handleProfileClick2}
                ref={btn2Ref}
              >
                <FaCartPlus />

                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                  {totalQuantity}
                </span>
              </span>
            </div>
            <span
              className="material-symbols-outlined h-12 w-12 bg-gray-200 text-gray-800 text-2xl font-bold flex items-center justify-center rounded-lg cursor-pointer hover:bg-green-500 hover:text-white"
              onClick={handleProfileClick}
              ref={btnRef}
            >
              <FaRegUserCircle />
            </span>
          </>
        ) : (
          <SamllButton onClick={() => navigate("/login")}>Login</SamllButton>
        )}
        <div className="relative">
          {isMenuOpen && isAuthenticated && (
            <Modal ref={dropDownRef} onClick={handleLogout} />
          )}
        </div>
      </div>
      {isOpen && isAuthenticated && <CartModal ref={dropDown2Ref} />}

      {isLogOutModalOpen && (
        <DeleteModal
          message={"Are you sure you want to logout?"}
          onConfirm={confirmLogout}
          onClose={() => setIsLogOutModalOpen(false)}
        />
      )}
    </header>
  );
};
