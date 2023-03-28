import React, { Fragment, useEffect,Component } from "react";
import "./Home.css";
import ProductCard from "./ProductCard";
import MetaData from "../layout/MetaData";
import { getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import {AiTwotoneCar} from "react-icons/ai"
import Button from "@mui/material/Button";
import {BiDownArrowCircle} from "react-icons/bi"
import {AiOutlineSearch} from "react-icons/ai"
import {AiOutlineCar} from "react-icons/ai"
import {AiOutlineSetting,AiOutlineShoppingCart} from "react-icons/ai"
import {IoMdContact} from "react-icons/io"
import Slider from "react-slick";


const settings = {
  dots: true,
  fade: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);
  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          
          <MetaData title="CARSELLER" />
          <div className="banner">
            <div className="mydiv">
          <Button className="button_home" href="/search"><AiOutlineSearch fontSize="2em" color="white"/></Button>
          <Button className="button_home" href="/products"><AiOutlineCar fontSize="2em" color="white"/></Button>
          <Button className="button_home" href="/inventory"><AiOutlineSetting fontSize="2em" color="white"/></Button>
          <Button className="button_home" href="/login"><IoMdContact fontSize="2em" color="white"/></Button>
          <Button className="button_home" href="/cart"><AiOutlineShoppingCart fontSize="2em" color="white"/></Button>
          </div>
            <p>WELCOME TO CARSELLER</p>
            <h1 >YOUR SEARCH ENDS HERE</h1>
            <a href="#container">
              <button>
                <BiDownArrowCircle fontSize="5em"/>
              </button>
            </a>
          </div>
          <h2 className="homeHeading">Featured Cars</h2>
          <div className="container" id="container">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
           <div>
          </div>
          </div> 
          <div className="myButton">
          <Button style={{ padding: "11px 10px" }} variant="contained" color="secondary" href="/products" >All Cars &nbsp;<AiTwotoneCar fontSize="1.5em"/></Button>
          </div>
          {/* <h2 className="homeHeading">Featured Parts</h2> */}
          {/* <div>   
          </div> */}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
