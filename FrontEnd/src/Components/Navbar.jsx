import { GiHamburgerMenu } from "react-icons/gi";
import { useContext } from "react";
import { UserContext } from "../store/UserContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { FaBox } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";
import { useGlobalState } from "@hmk_codeweb88/useglobalstate";

const Navbar = () => {
  const { UserData } = useContext(UserContext);
  const [IsUserLogin, setIsUserLogin] = useGlobalState("IsUserLogin", false);
  const [IsMobileMenuShow, setIsMobileMenuShow] = useState(false);
  const UserMenu = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    console.log(UserData);
    if (!UserData || !UserData.email) {
      setIsUserLogin(false);
    } else {
      setIsUserLogin(true);
    }
  }, [UserData, window.location.pathname]);
  return (
    <nav class="h-[70px] sticky top-0 w-full px-6 md:px-16 lg:px-24 xl:px-32 flex items-center justify-between z-20 bg-white text-gray-700 shadow-[0px_4px_25px_0px_#0000000D] transition-all">
      DevTarce
      <ul class="md:flex hidden items-center gap-10">
        <li>
          <Link to={"/"} class="hover:text-gray-500/80 transition">
            Home
          </Link>
        </li>
        <li>
          <Link to={"/dashboard"} class="hover:text-gray-500/80 transition">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to={"/about"} class="hover:text-gray-500/80 transition">
            About Us
          </Link>
        </li>
        <li>
          <Link to={"/blog"} class="hover:text-gray-500/80 transition">
            Blogs
          </Link>
        </li>
      </ul>
      {IsUserLogin ? (
        <button
          title="Dashboard"
          onClick={() => navigate("/dashboard")}
          className="Userbutton bg-black md:inline hidden w-16 h-16 rounded-full overflow-hidden oject-cover"
        >
          <img
            className="w-full h-full object-cover"
            src="https://i.pinimg.com/originals/d2/25/07/d2250772dc3221bfe9ed14d1d4cf0ec7.jpg"
            alt=""
          />
        </button>
      ) : (
        <button
          onClick={() => navigate("/login")}
          type="button"
          class="bg-white text-gray-600 border border-gray-300 md:inline hidden text-sm hover:bg-gray-50 active:scale-95 transition-all w-40 h-11 rounded-full"
        >
          Login
        </button>
      )}
      <button
        onClick={() => {
          setIsMobileMenuShow(!IsMobileMenuShow);
          UserMenu.current.classList.toggle("hidden");
        }}
        aria-label="menu-btn"
        type="button"
        class="menu-btn inline-block md:hidden active:scale-90 transition"
      >
        {IsMobileMenuShow ? (
          <RxCross2 size={28} />
        ) : (
          <RxHamburgerMenu size={28} />
        )}
      </button>
      <div
        ref={UserMenu}
        class="mobile-menu absolute top-[70px] left-0 w-full bg-[#ffffffc9] p-6 hidden md:hidden"
      >
        <ul class="flex flex-col items-center gap-10">
          <li>
            <Link to={"/"} class="hover:text-gray-500/80 transition">
              Home
            </Link>
          </li>
          <li>
            <Link to={"/dashboard"} class="hover:text-gray-500/80 transition">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to={"/about"} class="hover:text-gray-500/80 transition">
              About Us
            </Link>
          </li>
          <li>
            <Link to={"/blog"} class="hover:text-gray-500/80 transition">
              Blogs
            </Link>
          </li>
        </ul>
        {IsUserLogin ? (
          <button
            onClick={() => navigate("/dashboard")}
            className="Userbutton w-12 h-12 rounded-full overflow-hidden oject-cover"
          >
            <img
              title="Dashboard"
              className="w-full h-full object-cover"
              src="https://i.pinimg.com/originals/d2/25/07/d2250772dc3221bfe9ed14d1d4cf0ec7.jpg"
              alt=""
            />
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            type="button"
            class="bg-white text-gray-600 border border-gray-300 md:inline hidden text-sm hover:bg-gray-50 active:scale-95 transition-all w-40 h-11 rounded-full"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

