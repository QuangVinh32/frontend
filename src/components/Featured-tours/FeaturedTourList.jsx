import React from "react";
import { Col } from "reactstrap";
import TourCard from "../../shared/TourCard";
import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../../utils/config";

const FeaturedTourList = () => {
  const { data, loading, error } = useFetch(`${BASE_URL}/tours/get-all`);

  // Kiểm tra nếu dữ liệu trả về không phải là một mảng, chuyển đổi nó thành mảng
  const featuredTours = Array.isArray(data) ? data : [];

  if (loading) {
    return <h4>Loading...........</h4>;
  }

  if (error) {
    return <h4>{error}</h4>;
  }
 // Lọc những tour có thuộc tính featured bằng true
 const featuredToursToShow = featuredTours.filter(
  (tour) => tour.featured && tour.maxGroupSize > 0
);

  if (!featuredTours.length) {
    return <h4>Không Có Chuyến Du Lịch Nào .</h4>;
  }

  return (
    <>
      {featuredToursToShow.map((tour) => {
        return (
          <Col lg="3" className="mb-4" key={tour.id}>
           
              <TourCard tour={tour} />

          </Col>
        );
      })}
    </>
  );
};

export default FeaturedTourList;
