import React, { useRef } from "react";
import "./search-bar.css";
import { Col, Form, FormGroup } from "reactstrap";
import { BASE_URL } from "./../utils/config";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const SearchBar = () => {
  const locationRef = useRef("");
  const distanceRef = useRef(0);
  const maxGroupSizeRef = useRef(0);
  const navigate = useNavigate();

  const searchHandler = async () => {
    const location = locationRef.current.value;
    const distance = distanceRef.current.value;
    const maxGroupSize = maxGroupSizeRef.current.value;
    if (location === "" || distance === "" || maxGroupSize === "")
      return alert("tất cả các lĩnh vực được yêu cầu");

      const makeRequest = async (location, distance, maxGroupSize) => {
        try {
          const response = await axios.get(`${BASE_URL}/tours/search`, {
            params: {
              city: location,
              distance: distance,
              maxGroupSize: maxGroupSize,
            },
          });
      
          
          if (response.status >= 200 && response.status < 300) {
            const result = response.data;
            console.log(result);
           
            navigate(`/tours/search?city=${location}&distance=${distance}&maxGroupSize=${maxGroupSize}`, { state: result });
          } else {
            alert('Đã Xảy Ra Sự Cố');
          }
        } catch (error) {
          alert('Đã Xảy Ra Lỗi Khi Gửi Yêu Cầu');
        }
      };
      
     
      makeRequest(location, distance, maxGroupSize);}

  return (
    <Col lg="12">
      <div className="search__bar">
        <Form className="d-flex align-items-center gap-4">
          <FormGroup className="d-flex gap-3 from__group from__group-fast">
            <span>
              <i className="ri-map-pin-line"></i>
            </span>
            <div>
              <h6>Địa Chỉ</h6>
              <input
                type="text"
                placeholder="Bạn Muốn Đi Đâu?"
                ref={locationRef}
              />
            </div>
          </FormGroup>
          <FormGroup className="d-flex gap-3 from__group from__group-last">
            <span>
              <i className="ri-map-pin-time-line"></i>
            </span>
            <div>
              <h6>khoảng cách</h6>
              <input
                type="number"
                placeholder="khoảng cách k/m"
                ref={distanceRef}
              />
            </div>
          </FormGroup>
          <FormGroup className="d-flex gap-3 from__group from__group-fast">
            <span>
              <i className="ri-group-line"></i>
            </span>
            <div>
              <h6>Số Người</h6>
              <input type="number" placeholder="0" ref={maxGroupSizeRef} />
            </div>
          </FormGroup>
          <span className="search__icon" type="submit" onClick={searchHandler}>
            <i className="ri-search-line"></i>
          </span>
        </Form>
      </div>
    </Col>
  );
};

export default SearchBar;
