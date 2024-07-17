import React, { useRef, useState, useContext } from "react";
import "./Navbar.css";
import { RiSofaLine } from "react-icons/ri";
import { IoCartOutline } from "react-icons/io5";
import { IoIosArrowDropdown } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CartContext } from "../../../Context/CartContext";
import { UserContext } from "../../../Context/UserContext";

const Navbar = () => {
  const { TotalNumberOfCartedItems } = useContext(CartContext);
  const { CurrentUser, handleLogout } = useContext(UserContext);
  const [menu, setMenu] = useState("shop");
  const menuRef = useRef();
  const profileRef = useRef();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle("nav-menu-visible");
    e.target.classList.toggle("open");
  };

  const toggleProfileMenu = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <div className="navbar-container">
      <div className="navbar">
        <Link
          to="/"
          onClick={() => {
            setMenu("shop");
          }}
          className="nav-logo"
        >
          <div className="nav-logo-img">
            <RiSofaLine />
          </div>
          <p style={{ letterSpacing: "1px" }}>FURNIX</p>
        </Link>
        <div>
          <IoIosArrowDropdown
            onClick={dropdown_toggle}
            className="nav-dropdown nav-dorpdown-icon"
          />
        </div>

        <ul ref={menuRef} className="nav-menu">
          <li
            onClick={() => {
              setMenu("shop");
            }}
          >
            <Link to="/">Shop</Link>
            {menu === "shop" ? <hr /> : <></>}
          </li>
          <li
            onClick={() => {
              setMenu("livingroom");
            }}
          >
            <Link to="/livingroom">Living Room</Link>
            {menu === "livingroom" ? <hr /> : <></>}
          </li>
          <li
            onClick={() => {
              setMenu("bedroom");
            }}
          >
            <Link to="bedroom">Bedroom</Link>
            {menu === "bedroom" ? <hr /> : <></>}
          </li>
          <li
            onClick={() => {
              setMenu("dining");
            }}
          >
            <Link to="dining">Dining</Link>
            {menu === "dining" ? <hr /> : <></>}
          </li>
          <li
            onClick={() => {
              setMenu("decor");
            }}
          >
            <Link to="decor">Decoration</Link>
            {menu === "decor" ? <hr /> : <></>}
          </li>
        </ul>
        <div className="nav-login-cart">
          {CurrentUser ? (
            <>
              <div className="nav-profile">
                <FaUserCircle
                  className="profile-icon"
                  onClick={toggleProfileMenu}
                />
                {isProfileOpen && (
                  <div ref={profileRef} className="profile-menu">
                    <p>{CurrentUser.name}</p>
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </div>
              <Link className="cart-icon" to="/cart">
                <IoCartOutline />
              </Link>
              <div className="nav-cart-count">{TotalNumberOfCartedItems()}</div>
            </>
          ) : (
            <Link to="/login">
              <button>Login</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
