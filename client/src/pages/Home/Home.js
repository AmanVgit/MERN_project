import React, { useState,useEffect,useContext } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import {useNavigate} from "react-router-dom"
import Spiner from '../../components/spiner/Spiner'
import "./home.css"
import Alert from 'react-bootstrap/Alert';
import Tables from '../../components/tables/Tables'
import { addData } from '../../context/ContextProvider'


const Home = () => {

  const [showspin,setShowSpin] = useState(true);

  const navigate = useNavigate();

  const {useradd, setUseradd} = useContext(addData)

  const addUser = ()=>{
    navigate("/register")
  }

  useEffect(()=>{
    setTimeout(()=>{
      setShowSpin(false)
    },500)
  })
  return (
    <>
    {/* this useradd part of code will show msg "successfully added" on home page if user has successfully registered */}
   {
     useradd ? <Alert variant="success" onClose={() => setUseradd("")} dismissible>{useradd.fname.toUpperCase()} Successfully Added</Alert>:""
   } 
      <div className="container">
        <div className="main_div">
          {/* search add btn*/}
          <div className="search_add mt-4 d-flex justify-content-between">
            <div className="search col-lg-4">
              <Form className='d-flex'>
                <Form.Control
                  type="search"
                  placeholder='Search'
                  className='me-2'
                  aria-label="Search"
                />
                <Button variant="success" className='search_btn'>Search</Button>
              </Form>
            </div>
            <div className="add_btn">
              <Button variant="primary" onClick={addUser}><i class="fa-solid fa-plus"></i>&nbsp; Add User</Button>
            </div>
          </div>
          {/*export,gender,status*/}

          <div className="filter_div mt-5 d-flex justify-content-between flex-wrap">
            <div className="export_csv">
              <Button className='export_btn'>Export To csv</Button>
            </div>
            <div className="filter_gender">
              <div className="filter">
                <h3>Filter By Gender</h3>
                <div className="gender d-flex justify-content-around">
                  <Form.Check
                    type={"radio"}
                    label={"All"}
                    name="gender"
                    value={"All"}
                    defaultChecked
                  />
                  <Form.Check
                    type={"radio"}
                    label={"Male"}
                    name="gender"
                    value={"Male"}
                    
                  />
                  <Form.Check
                    type={"radio"}
                    label={"Female"}
                    name="gender"
                    value={"Female"}
                    
                  />
                </div>
              </div>
            </div>

            {/*Filter by value*/}
            <div className="filter_newold">
              <h3>Filter By Value</h3>
              <Dropdown className='text-center'>
                <Dropdown.Toggle className='dropdown_btn' id="dropdown-basic">
                  <i class="fa-solid fa-sort"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>New</Dropdown.Item>
                  <Dropdown.Item>Old</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>

            {/*filter by status*/}
            <div className="filter_status">
              <div className="status">
                <h3>Filter By Status</h3>
                <div className="status_radio d-flex justify-content-around flex-wrap">
                  <Form.Check
                    type={"radio"}
                    label={"All"}
                    name="status"
                    value={"All"}
                    defaultChecked
                  />
                  <Form.Check
                    type={"radio"}
                    label={"Active"}
                    name="status"
                    value={"Active"}  
                  />
                  <Form.Check
                    type={"radio"}
                    label={"InActive"}
                    name="status"
                    value={"InActive"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {
          showspin ? <Spiner/> : <Tables />
        }
      </div>
    </>
  )
}

export default Home