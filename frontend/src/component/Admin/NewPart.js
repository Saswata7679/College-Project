import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createPart } from "../../actions/partAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./Sidebar";
import { NEW_PART_RESET } from "../../constants/partConstants";
// import BoltIcon from '@mui/icons-material/Bolt';
// import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
// import SpeedIcon from '@mui/icons-material/Speed';
// import PropaneTankIcon from '@mui/icons-material/PropaneTank';
// import AirlineSeatReclineExtraIcon from '@mui/icons-material/AirlineSeatReclineExtra';
// import ShoppingBagTwoToneIcon from '@mui/icons-material/ShoppingBagTwoTone';
// import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';


const NewPart = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, success } = useSelector((state) => state.newPart);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
//   const [torque, setTorque] = useState("");
//   const [engine, setEngine] = useState(0);
//   const [fuel, setFuel] = useState("");
//   const [mileage, setMileage] = useState("");
//   const [tank, setTank] = useState(0);
//   const [seat, setSeat] = useState(0);
//   const [boot, setBoot] = useState(0);
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);


  const categories = [
    "Window",
  "seat",
  "Break",
  "Tyre",
  "Wheel"
  ];

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Part added Successfully");
      history.push("/admin/dashboard");
      dispatch({ type: NEW_PART_RESET });
    }
  }, [dispatch, alert, error, history, success]);

  const createPartSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", Stock);
    // myForm.set("torque",torque)
    // myForm.set("engine",engine)
    // myForm.set("fuel",fuel)
    // myForm.set("mileage",mileage)
    // myForm.set("tank",tank)
    // myForm.set("seat",seat)
    // myForm.set("boot",boot)




    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(createPart(myForm));
  };

  const createPartImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <MetaData title="Add Parts" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createPartSubmitHandler}
          >
            <h1>Add Parts</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Part Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div>
              <DescriptionIcon />
              <textarea
                placeholder="Part Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div>
              <AccountTreeIcon />
              <select onChange={(e) => setCategory(e.target.value)}>
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Stock"
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            {/* <div>
              <BoltIcon/>
              <input
                type="text"
                placeholder="torque (nm@rpm)"
                onChange={(e) => setTorque(e.target.value)}
                // disabled={category==="Laptop"?true:false}
              />
            </div>
            <div>
              <SettingsSuggestIcon />
              <input
                type="number"
                placeholder="engine Displacement (cc)"
                onChange={(e) => setEngine(e.target.value)}
                // disabled={category==="Laptop"?true:false}
              />
            </div>
            <div>
              <LocalGasStationIcon />
              <input
                type="text"
                placeholder="Fuel Type"
                onChange={(e) => setFuel(e.target.value)}
                // disabled={category==="Laptop"?true:false}
              />
            </div>
            <div>
              < SpeedIcon />
              <input
                type="number"
                placeholder="City Mileage(kmpl)"
                onChange={(e) => setMileage(e.target.value)}
                // disabled={category==="Laptop"?true:false}
              />
            </div>
            <div>
              <PropaneTankIcon />
              <input
                type="number"
                placeholder="Fuel Tank Capacity (Litres)"
                onChange={(e) => setTank(e.target.value)}
                // disabled={category==="Laptop"?true:false}
              />
            </div>
            <div>
              <AirlineSeatReclineExtraIcon />
              <input
                type="number"
                placeholder="Seating Capacity"
                onChange={(e) => setSeat(e.target.value)}
                // disabled={category==="Laptop"?true:false}
              />
            </div>
            <div>
              <ShoppingBagTwoToneIcon />
              <input
                type="number"
                placeholder="Boot Space (Litres)"
                onChange={(e) => setBoot(e.target.value)}
                // disabled={category==="Laptop"?true:false}
              />
            </div> */}
            

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createPartImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewPart;
