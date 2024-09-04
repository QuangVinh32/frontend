import React, { useState } from "react";
import CommonSection from "./../shared/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { useLocation } from "react-router-dom";
import TourCard from "./../shared/TourCard";

const SeachResultList = () => {
  const location = useLocation();
  const [data] = useState(location.state);

  
  const featuredTours = Array.isArray(data) ? data : [];


  return (
    <>
      <CommonSection title={"kết quả tìm kiếm "} />
      <section>
        <Container>
          <Row>
            {(featuredTours.length === 0) ? (
              
              <h4 className="text-center">không Tìm Thấy Chuyến Đi Mong Muốn  </h4>
            ) : (
              featuredTours.map((tour) => {
                return(
                <Col lg="3" className="mb-4" key={tour.id}>
                <TourCard tour={tour} />
              </Col>)
              }
                
              )
            )}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default SeachResultList;
