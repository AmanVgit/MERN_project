import React from 'react'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'
import Dropdown from 'react-bootstrap/Dropdown'
import Badge from 'react-bootstrap/Badge'
import { BASE_URL } from '../../services/helper'
import { NavLink } from 'react-router-dom'
import "./table.css"

const Tables = ({ userdata }) => {
  return (
    <>
      <div className="container">
        <Row>
          <div className="col mt-0">
            <Card className="shadow">
              <Table className="align-align-items-center" responsic="sm">
                <thead className='thead-dark'>
                  <tr className='table-dark'>
                    <th>ID</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>&nbsp;&nbsp;&nbsp;Status</th>
                    <th>Profile</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    userdata.length > 0 ? userdata.map((element, index) => {
                      return (
                        <>
                          <tr>
                            <td>{index + 1}</td>
                            <td>{element.fname + " " + element.lname}</td>
                            <td>{element.email}</td>
                            <td>{element.gender == "Male" ? "Male" : "Female"}</td>
                            <td className='d-flex align-items-center'>
                              <Dropdown className='text-center'>
                                <Dropdown.Toggle className='dropdown_btn' id="dropdown-basic">
                                  <Badge bg={element.status == "Active" ? "success" : "danger"}>
                                    {element.status} <i class="fa-solid fa-angle-down"></i>
                                  </Badge>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item>Active</Dropdown.Item>
                                  <Dropdown.Item>Inactive</Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>

                            <td className='img_parent'>
                              <img src={`${BASE_URL}/uploads/${element.profile}`} alt="img" />
                            </td>
                            <td>
                              <Dropdown>
                                <Dropdown.Toggle variant='light' className='action' id="dropdown-basic">
                                  <i class="fa-solid fa-ellipsis-vertical"></i>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item>
                                    <NavLink to={`/userprofile/${element._id}`} className="text-decoration-none">
                                      <i class="fa-solid fa-eye" style={{ color: "green" }}></i> <span>View</span>
                                    </NavLink>
                                  </Dropdown.Item>
                                  <Dropdown.Item>
                                    <NavLink to={`/edit/${element._id}`} className="text-decoration-none">
                                      <i class="fa-solid fa-pen-to-square" style={{ color: "blue" }}></i><span>Edit</span>
                                    </NavLink>
                                  </Dropdown.Item>
                                  <Dropdown.Item><i class="fa-sharp fa-solid fa-trash" style={{ color: "red" }}></i><span>Delete</span>
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>
                          </tr>
                        </>
                      )
                    }) : <div className="no_data text-center">No data found</div>
                  }
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </div>
    </>
  )
}

export default Tables