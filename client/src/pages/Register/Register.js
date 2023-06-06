import React, { useContext, useEffect, useState } from 'react'
import Card from "react-bootstrap/Card"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Select from 'react-select';
import Spiner from '../../components/spiner/Spiner'
import { ToastContainer, toast } from "react-toastify"
import { registerfunc } from "../../services/Apis"
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import "./register.css"
import { addData } from '../../context/ContextProvider';

const Register = () => {

  const [showspin, setShowSpin] = useState(true);
  const [inputdata, setInputData] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    gender: "",
    location: "",
  });

  console.log(inputdata);

  //*******hooks*******//
  const [status, setStatus] = useState("Active");
  const [image, setImage] = useState("");
  //to change the image on selecting new image
  const [preview, setPreview] = useState("");

  const navigate = useNavigate();

  const {useradd, setUseradd} = useContext(addData)

  //status options
  const options = [
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
  ];

  // setInput Value
  const setInputValue = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputdata, [name]: value })
  }

  //  status set
  const setStatusValue = (e) => {
    setStatus(e.value)
  }

  //set profile
  const setProfile = (e) => {
    setImage(e.target.files[0])
  }

  useEffect(() => {
    if (image) {
      setPreview(URL.createObjectURL(image))
      console.log(image);
    }
    setTimeout(() => {
      setShowSpin(false)
    }, 500)
  }, [image])

  //submit userdata
  const submitUserData = async (e) => {
    e.preventDefault();

    //on submitting form lets just validate out entry
    const { fname, lname, email, mobile, gender, location } = inputdata;

    if (fname === "") {
      toast.error("First name is required!");
    } else if (lname === "") {
      toast.error("Last name is required!")
    } else if (email === "") {
      toast.error("email is required!")
    } else if (!email.includes("@")) {
      toast.error("Enter valid Email!")
    } else if (mobile === "") {
      toast.error("Mobile is required!")
    } else if (mobile.length > 10) {
      toast.error("Enter valid Mobile number!")
    } else if (gender === "") {
      toast.error("Select Gender")
    } else if (status === "") {
      toast.error("Select Status")
    } else if (image === "") {
      toast.error("Profile is Required")
    } else if (location === "") {
      toast.error("Location is Required")
    } else {
      console.log(image);

      const data = new FormData();
      data.append("fname", fname)
      data.append("lname", lname)
      data.append("email", email)
      data.append("mobile", mobile)
      data.append("gender", gender)
      data.append("status", status)
      data.append("user_profile", image)
      data.append("location", location)

      const config = {
        "Content-Type": "multipart/form-data"
      }
                                         
      //this is actually getting all the data
      const response = await registerfunc(data, config);
      console.log(response);
      
      ///This portion of code is emptying the register page and will navigate
      //you to homepage
      if (response.status === 200) {
        setInputData({
          ...inputdata,
          fname: "",
          lname: "",
          email: "",
          mobile: "",
          gender: "",
          location: ""
        });
        setStatus("")
        setImage("")
        setUseradd(response.data)
        navigate("/");
      }else{
        toast.error("Something went wrong!")
      }
    }
  }

  return (
    <>
      {
        showspin ? <Spiner /> : <div className="container">
          <h2 className='text-center mt-1'>Register Your details</h2>
          <Card className='shadow mt-3 p-3'>
            <div className="profile_div text-center">
              <img src={preview ? preview : "/man.png"} alt="img" />
            </div>
            <Form>
              <Row>

                {/* first name */}
                <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter First Name" name="fname" value={inputdata.fname} onChange={setInputValue} />
                </Form.Group>

                {/* last name */}
                <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter last Name" name="lname" value={inputdata.lname} onChange={setInputValue} />
                </Form.Group>

                {/* email */}
                <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" name="email" value={inputdata.email} onChange={setInputValue} />
                </Form.Group>

                {/* mobile */}
                <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                  <Form.Label>Mobile</Form.Label>
                  <Form.Control type="email" placeholder="Enter Mobile number" name="mobile" value={inputdata.mobile} onChange={setInputValue} />
                </Form.Group>

                {/* gender */}
                <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                  <Form.Label>Select your Gender</Form.Label>
                  <Form.Check
                    type={"radio"}
                    label={"Male"}
                    name="gender"
                    value={"Male"}
                    onChange={setInputValue}
                  />
                  <Form.Check
                    type={"radio"}
                    label={"Female"}
                    name="gender"
                    value={"Female"}
                    onChange={setInputValue}
                  />
                </Form.Group>

                {/* Status */}
                <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                  <Form.Label>Select your Status</Form.Label>
                  <Select
                    options={options}
                    // value={status}
                    onChange={setStatusValue}
                  />
                </Form.Group>

                {/* Profile */}
                <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                  <Form.Label>Select your Profile</Form.Label>
                  <Form.Control type="file" name="user_profile" onChange={setProfile} />
                </Form.Group>

                {/* location   */}
                <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                  <Form.Label>Select your Location</Form.Label>
                  <Form.Control type="Tetx" placeholder="Enter your Location" name="location" onChange={setInputValue} />
                </Form.Group>
                <Button variant="primary" type="submit" value={inputdata.location} onClick={submitUserData}>
                  Submit
                </Button>
              </Row>
            </Form>
          </Card>
          <ToastContainer position="top-center" />
        </div>
      }

    </>
  )
}

export default Register