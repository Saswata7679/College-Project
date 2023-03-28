import React, { Fragment, useRef, useState, useEffect } from "react";
import "./Contact.css";
// import Loader from "../Loader/Loader";
// import { Link } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import DirectionsCarOutlinedIcon from '@mui/icons-material/DirectionsCarOutlined';
import AddCardIcon from '@mui/icons-material/AddCard';
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import {clearErrors,newTest} from "../../../actions/testAction";
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import { useAlert } from "react-alert";
import testform from "../../../images/testform.png"

const Contact = ({ history}) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const {  error, success } = useSelector((state) => state.newtest);
  const [name, setName] = useState("");
  const [email, setEmail] = useState(0);
  const [phoneno, setPhoneno] = useState(0);
  const [andharno, setAndharno] = useState("");
  const [carname, setCarname] = useState("");

  useEffect(() => {
    if (success) {
      alert.success("You Hava Registered For The Test Drive Successfully");
    }
    if(error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    
  }, [dispatch, alert, error, history, success]);



  const testSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("phoneno", phoneno);
    myForm.set("andharno",andharno );
    myForm.set("carname", carname);
    dispatch(newTest(myForm));
  };


  return (
        <Fragment>
          <div className="LoginSignUpContainer">
          <img className="testimg" src={testform}/>
            <div className="LoginSignUpBox">
              <h1 className="testreg">Book Your Dream Drive</h1>
              <form className="loginForm" onSubmit={testSubmit}>
              <div className="loginEmail">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="loginEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="loginEmail">
                  <LocalPhoneOutlinedIcon />
                  <input
                    type="Phone number"
                    placeholder="Phone Number"
                    required
                    onChange={(e) => setPhoneno(e.target.value)}
                  />
                </div>
                <div className="loginEmail">
                  <AddCardIcon />
                  <input
                    type="text"
                    placeholder="Andhar card no"
                    required
                    onChange={(e) => setAndharno(e.target.value)}
                  />
                </div>
                <div className="loginEmail">
                  <DirectionsCarOutlinedIcon />
                  <input
                    type="text"
                    placeholder="Car Name"
                    required
                    onChange={(e) => setCarname(e.target.value)}
                  />
                </div>
                
                <input type="submit" value="Book Tsst Drive" className="loginBtn" />
              </form> 
            </div>
            
          </div>
          
          
        </Fragment>
      
  );
}

export default Contact;
