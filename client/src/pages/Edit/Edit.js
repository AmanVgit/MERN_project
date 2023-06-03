import React, { useEffect, useState } from 'react'
import Card from "react-bootstrap/Card"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Select from 'react-select';
import Spiner from '../../components/spiner/Spiner'
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import "./edit.css"

const Edit = () => {

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
  const submitUserData = (e) => {
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
      toast.success("Registration succesfully done!")
    }
  }
  return (
    <>
      {
        showspin ? <Spiner /> : <div className="container">
          <h2 className='text-center mt-1'>Update Your Details</h2>
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
                    value={status}
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

export default Edit