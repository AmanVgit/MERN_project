import React, { useEffect, useState } from 'react'
import Card from "react-bootstrap/Card"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Select from 'react-select';
import { ToastContainer, toast } from "react-toastify"
import "./register.css"

const Register = () => {

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
  }, [image])

  //submit userdata
  const submitUserData = (e) => {
    e.preventDefault();

    //on submitting form lets just validate out entry
    const { fname, lname, email, mobile, gender, location } = inputdata;

  }

  return (
    <>
      <div className="container">
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
                <Form.Control type="text" placeholder="Enter First Name" name="fname" onChange={setInputValue} />
              </Form.Group>

              {/* last name */}
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Enter last Name" name="lname" onChange={setInputValue} />
              </Form.Group>

              {/* email */}
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" name="email" onChange={setInputValue} />
              </Form.Group>

              {/* mobile */}
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Mobile</Form.Label>
                <Form.Control type="email" placeholder="Enter Mobile number" name="mobile" onChange={setInputValue} />
              </Form.Group>

              {/* gender */}
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Select your Gender</Form.Label>
                <Form.Check // prettier-ignore
                  type={"radio"}
                  label={"Male"}
                  name="gender"
                  value={"Male"}
                  onChange={setInputValue}
                />
                <Form.Check // prettier-ignore
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
              <Button variant="primary" type="submit" onClick={submitUserData}>
                Submit
              </Button>
            </Row>
          </Form>
        </Card>
        <ToastContainer position="top-center" />
      </div>
    </>
  )
}

export default Register