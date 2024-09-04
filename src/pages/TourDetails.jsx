import React, { useEffect, useRef, useState, useContext } from "react";
import "../styles/tour-Details.css";
import { Container, Row, Col, ListGroup, Form } from "reactstrap";
import { useParams } from "react-router-dom";
import calculateAvgRating from "./../utils/avgRating";
import avatar from "../assets/images/avatar.jpg";
import Booking from "../components/Booking/Booking";
import Newsletter from "../shared/Newsletter";
import useFetch from "../components/hooks/useFetch";
import { BASE_URL } from "../utils/config";
import { AuthContext } from "./../context/AuthContext";
import { useNavigate } from "react-router-dom";





const TourDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
 
  const reviewMsgRef = useRef("");

  const [tourRating, setTourRating] = useState(null);
  const { username,token } = useContext(AuthContext);
  const {
    data: tour,
    loading,
    error,
  } = useFetch(`${BASE_URL}/tours/getbyid?id=${id}`);

  const {
    photo,
    title,
    desc,
    price,
    reviews,
    city,
    address,
    distance,
    maxGroupSize,
  } = tour;

  const formatVND = (amount) => {
    if (amount === undefined || isNaN(amount)) {
      return '0';
    }
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };
  const formattedPrice = formatVND(price);



  const { totalRating, avgRating } = calculateAvgRating(reviews);

  const options = { day: "numeric", month: "long", year: "numeric" };

  const submitHandler = async (e) => {
   
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;
    try {
      if (!username || username === undefined || username === null) {
        alert("bạn phải đăng nhập");
       const cofirrmet = window.confirm(" bạn muốn đăng nhập không ")
       if (cofirrmet){
         navigate('/login');
       }
      }

      const reviewOject = {
        username: username,
        reviewText,
        rating: tourRating,
        tour : tour.id
      };

      const res = fetch(`${BASE_URL}/review/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
       body:JSON.stringify(reviewOject)
      });
      
      if ((await res).status === 200) {
        alert('bạn đã để lại bình luận thành công ')
        window.location.reload();
         
      }

      
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [tour]);

  return (
    <>
      <section>
        <Container>
          {loading && (
            <h4 className="text-center pt-5">Loading.............</h4>
          )}
          {error && <h4 className="text-center pt-5">{error}</h4>}
          {!loading && !error && (
            <Row>
              <Col lg="8">
                <div className="tour__content">
                  <img src={photo} alt="" />

                  <div className="tour__info">
                    <h2>{title}</h2>

                    <div className="d-flex align-items-center gap-5">
                      <span className="tour__rating d-flex align-item-center gap-1">
                        <i
                          class="ri-star-fill "
                          style={{ color: "var(--secondary-color)" }}
                        ></i>
                        {avgRating === 0 ? null : avgRating}
                        {totalRating === 0 ? (
                          "không đánh giá"
                        ) : (
                          <span>({reviews?.length})</span>
                        )}
                      </span>

                      <span>
                        <i className="ri-map-pin-user-fill"></i>
                        {address}
                      </span>
                    </div>
                    <div className="tour__extra-details">
                      <span>
                        <i className="ri-map-pin-2-line"></i>
                        {city}
                      </span>
                      <span>
                        <i className="ri-money-dollar-circle-line"></i>{formattedPrice} VND
                        /Người
                      </span>
                      <span>
                        <i className="ri-map-pin-time-line"></i>
                        {distance}k/m
                      </span>
                      <span>
                        <i className="ri-group-line"></i>
                        {maxGroupSize} người
                      </span>
                    </div>
                    <h5>Giới Thiêu Về Tour</h5>
                    <div dangerouslySetInnerHTML={{ __html: tour.desc }} />
                  </div>
                  {/* ============= tour review section================ */}
                  <div className="tour__reviews mt-4">
                    <h4>Reviews ({reviews?.length} review)</h4>
                    <Form onSubmit={submitHandler}>
                      <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                        <span onClick={() => setTourRating(1)}>
                          1<i className="ri-star-s-fill"></i>
                        </span>
                        <span onClick={() => setTourRating(2)}>
                          2<i className="ri-star-s-fill"></i>
                        </span>
                        <span onClick={() => setTourRating(3)}>
                          3<i className="ri-star-s-fill"></i>
                        </span>
                        <span onClick={() => setTourRating(4)}>
                          4<i className="ri-star-s-fill"></i>
                        </span>
                        <span onClick={() => setTourRating(5)}>
                          5<i className="ri-star-s-fill"></i>
                        </span>
                      </div>

                      <div className="review__input">
                        <input
                          type="text"
                          ref={reviewMsgRef}
                          placeholder="share your thoughts"
                          required
                        />
                        <button
                          className="btn primary__btn text-white"
                          type="submit"
                        >
                          Submit
                        </button>
                      </div>
                    </Form>
                    <ListGroup className="user__reviews">
                      {reviews?.map((review) => (
                        <div className="review__item">
                          <img src={avatar} alt="" />

                          <div className="w-100">
                            <div
                              className="d-flex align-items-center 
                          justify-content-between"
                            >
                              <div>
                                <h5>{review.username}</h5>
                                <p>
                                  {new Date().toLocaleDateString(
                                    "en-US",
                                    options
                                  )}
                                </p>
                              </div>
                              <span className="d-flex align-items-center">
                                {review.rating}
                                <i className="ri-star-s-fill"></i>
                              </span>
                            </div>
                            <h6>{review.reviewText} </h6>
                          </div>
                        </div>
                      ))}
                    </ListGroup>
                  </div>

                  {/* ============= tour review section end================ */}
                </div>
              </Col>
              <Col lg="4">
                <Booking tour={tour} avgRating={avgRating} />
              </Col>
            </Row>
          )}
        </Container>
      </section>
      <Newsletter />
    </>
  );
};

export default TourDetails;
