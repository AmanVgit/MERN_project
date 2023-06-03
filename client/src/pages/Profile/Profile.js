import React from 'react'
import Card from "react-bootstrap/Card"
import Row from 'react-bootstrap/Row';
import "./profile.css"

const profile = () => {
  return (
    <>
      <div className="container">
        <Card className='card-profile shadow col-lg-6 mx-auto mt-5'>
          <Card.Body>
            <Row>
              <div className="col">
                <div className="card-profile-stats d-flex justify-content-center">
                  <img src="/man.png" alt="" />
                </div>
              </div>
            </Row>
            <div className="text-center">
              <h3>Aman Verma</h3>
              <h4><i class="fa-solid fa-envelope"></i>&nbsp; : <span>aman@gmail.com</span></h4> 
              <h5><i class="fa-solid fa-mobile"></i>&nbsp; : <span>0123456789</span></h5> 
              <h4><i class="fa-solid fa-person"></i>&nbsp; : <span>Male</span></h4> 
              <h4><i class="fa-solid fa-location-dot"></i>&nbsp; : <span>Lucknow</span></h4> 
              <h4>Status &nbsp; : <span>Active</span></h4> 
              <h5><i class="fa-solid fa-calendar-days"> </i>&nbsp;Date Created : <span>Active</span></h5> 
              <h5><i class="fa-solid fa-calendar-days"> </i>&nbsp;Date Updated : <span>Active</span></h5> 
            </div>
          </Card.Body>   
        </Card>
      </div>  
    </>
  )
}

export default profile