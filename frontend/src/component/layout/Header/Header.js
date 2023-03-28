import React from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../../images/logo.png";
import {AiOutlineShoppingCart,AiOutlineSearch} from "react-icons/ai";
import {MdAccountCircle} from "react-icons/md";

const options = {
  burgerColorHover: "grey",
  logo,
  bgcolor:"white",
  logoWidth: "20vmax",
  navColor1: "white",
  logoHoverSize: "10px",
  logoHoverColor: "grey",
  link1Text: "Home",
  link2Text: "Cars",
  link3Text: "Car Parts ",
  link4Text: "Test Drive Registration",
  link1Url: "/",
  link2Url: "/products",
  link3Url: "/parts",
  link4Url: "/contact",
  link1Size: "1.3vmax",
  link1Color: "rgba(35, 35, 35,0.8)",
  nav1justifyContent: "flex-end",
  nav2justifyContent: "flex-end",
  nav3justifyContent: "flex-start",
  nav4justifyContent: "flex-start",
  link1ColorHover: "#eb4034",
  link1Margin: "1vmax",
  ShoppingBagTwoToneIcon: "/login",
  profileIconColor: "rgba(35, 35, 35,0.8)",
  searchIconColor: "rgba(35, 35, 35,0.8)",
  cartIconColor: "rgba(35, 35, 35,0.8)",
  profileIconColorHover: "#eb4034",
  searchIconColorHover: "#eb4034",
  cartIconColorHover: "#eb4034",
  cartIconMargin: "1vmax",
  cartIcon:"true",
  CartIconElement:AiOutlineShoppingCart,
  profileIcon:"true",
  ProfileIconElement:MdAccountCircle,
  searchIcon:"true",
  SearchIconElement:AiOutlineSearch
};

const Header = () => {
  return <ReactNavbar {...options} />;
};

export default Header;
