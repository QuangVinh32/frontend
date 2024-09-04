import React from 'react'
import {
    Row,
    Col,
  } from "reactstrap";
  import BookingChart from "../statistical/BookingChart";
 import BookingByStatustD from "../statistical/BookingByStatusD";

function Staticcal() {
  return (
    <Row>
      <h1>--------------------------------------------------------------------------------------------------</h1>
          <Col xs={12} md={3}>
            
            <h1>Số tiền booking trong năm </h1>
            <BookingChart /> 
           
          </Col>
        <h1>--------------------------------------------------------------------------------------------------</h1>
        <Col xs={12} md={3}>
            
            <h1>Báo Cáo Theo Status </h1>
            <BookingByStatustD /> 
           
          </Col>
        <h1>--------------------------------------------------------------------------------------------------</h1>


    </Row>
    
  )
}

export default Staticcal