import React from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";
import ImageLogo from "../assets/images-css/logo-website.svg";
import Image from "next/image";

import { Cart } from "./";
import { useStateContext } from "../context/StateContext";

const Navbar = () => {
  const { showCart, setShowCart, totalQuantity } = useStateContext();
  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">
          <Image src={ImageLogo} />
        </Link>
      </p>
      <div className="navbar-menu">
        <div className="navbar-menu-link">
          <Link href="/">Home</Link>
          <Link href="/product">Shop</Link>
        </div>
        <button
          type="button"
          className="cart-icon"
          onClick={() => setShowCart(true)}
        >
          <AiOutlineShopping />
          <span className="cart-item-qty">{totalQuantity}</span>
        </button>

        {showCart && <Cart />}
      </div>
    </div>
  );
};

export default Navbar;
