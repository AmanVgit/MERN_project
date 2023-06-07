import React, { useState, useEffect, useContext } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import { useNavigate } from "react-router-dom"
import Spiner from '../../components/spiner/Spiner'
import { ToastContainer, toast } from "react-toastify"
import "./home.css"
import Alert from 'react-bootstrap/Alert';
import Tables from '../../components/tables/Tables'
import { addData, dltdata, updateData } from '../../context/ContextProvider'
import { usergetfunc, deletefunc, exporttocsvfunc } from '../../services/Apis'


const Home = () => {

  const [userdata, setUserData] = useState([]);
  const [showspin, setShowSpin] = useState(true);
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("All");
  const [status, setStatus] = useState("All");
  const [sort, setSort] = useState("new");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const { update, setUpdate } = useContext(updateData)
  const { deletedata, setDLtdata } = useContext(dltdata)

  const navigate = useNavigate();

  const { useradd, setUseradd } = useContext(addData)

  const addUser = () => {
    navigate("/register")
  }

  //getting the user from database
  const userGet = async () => {
    const response = await usergetfunc(search, gender, status, sort, page);
    if (response.status === 200) {
      setUserData(response.data.usersdata);
      setPageCount(response.data.Pagination.pageCount)
    } else {
      console.log("error for get user data")
    }
  }

  //user delete
  const deleteuser = async (id) => {
    const response = await deletefunc(id);
    if (response.status == 200) {
      userGet();
      setDLtdata(response.data)
    } else {
      toast.error("Error in deleting")
    }
  }

  // export user
  const exportuser = async () => {
    const response = await exporttocsvfunc();
    if (response.status === 200) {
      window.open(response.data.downloadUrl, "blank")
    } else {
      toast.error("Something went wrong!")
    }
  }

  // pagination
  // handle prev btn
  const handlePrevious = () => {
    setPage(() => {
      if (page === 1) return page;
      return page - 1
    })
  }

  // handle next btn
  const handleNext = () => {
    setPage(() => {
      if (page === pageCount) return page;
      return page + 1
    })
  }

  useEffect(() => {
    userGet();
    setTimeout(() => {
      setShowSpin(false)
    }, 1200)
  }, [search, gender, status, sort,page])
  return (
    <>
      {/* this useradd part of code will show msg "successfully added" on home page if user has successfully registered */}
      {
        useradd ? <Alert variant="success" onClose={() => setUseradd("")} dismissible>{useradd.fname.toUpperCase()} Successfully Added</Alert> : ""
      }
      {
        update ? <Alert variant="primary" onClose={() => setUpdate("")} dismissible>{update.fname.toUpperCase()} Successfully Updated</Alert> : ""
      }
      {
        deletedata ? <Alert variant="danger" onClose={() => setDLtdata("")} dismissible>{deletedata.fname.toUpperCase()} Successfully Deleted</Alert> : ""
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
                  onChange={(e) => setSearch(e.target.value)}
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
              <Button className='export_btn' onClick={exportuser}>Export To csv</Button>
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
                    onChange={(e) => setGender(e.target.value)}
                    defaultChecked
                  />
                  <Form.Check
                    type={"radio"}
                    label={"Male"}
                    name="gender"
                    value={"Male"}
                    onChange={(e) => setGender(e.target.value)}

                  />
                  <Form.Check
                    type={"radio"}
                    label={"Female"}
                    name="gender"
                    value={"Female"}
                    onChange={(e) => setGender(e.target.value)}
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
                  <Dropdown.Item onClick={() => setSort("new")}>New</Dropdown.Item>
                  <Dropdown.Item onClick={() => setSort("old")}>Old</Dropdown.Item>
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
                    onChange={(e) => setStatus(e.target.value)}
                    defaultChecked
                  />
                  <Form.Check
                    type={"radio"}
                    label={"Active"}
                    name="status"
                    value={"Active"}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                  <Form.Check
                    type={"radio"}
                    label={"InActive"}
                    name="status"
                    value={"InActive"}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {
          showspin ? <Spiner /> : <Tables
            userdata={userdata}
            deleteUser={deleteuser}
            userGet={userGet}
            handlePrevious={handlePrevious}
            handleNext={handleNext}
            page={page}
            pageCount={pageCount}
            setPage={setPage}
          />
        }
      </div>
    </>
  )
}

export default Home