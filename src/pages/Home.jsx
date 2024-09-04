import React from "react";
import "../styles/home.css";
import { Container, Row, Col } from "reactstrap";
import heroImg from "../assets/images/hero-img01.jpg";
import heroImg2 from "../assets/images/hero-img02.jpg";
import heroVideo from "../assets/images/hero-video.mp4";
import worldImg from "../assets/images/world.png";
import experienceImg from "../assets/images/experience.png";
import Subtitle from "../shared/Subtitle";
import SearchBar from "../shared/SearchBar";
import ServiceList from "../services/ServiceList";
import FeaturedTourList from "../components/Featured-tours/FeaturedTourList";
import MasonryImagesGallery from "../components/image-gallery/MasonryImagesGallery";
import Testimonials from "../components/Testimonial/Testimonials";
import Newsletter from "../shared/Newsletter";

const Home = () => {
  return (
    <>
      {/* =============== hero section start ===============*/}
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <div className="hero__content">
                <div className="hero__subtitle d-flex align-items-center ">
                  <Subtitle subtitle={"Bạn Muốn Đi Đâu"} />
                  <img src={worldImg} alt="" />
                </div>
                <h1>
                  {" "}
                  Du lịch mở ra cánh cửa để sáng tạo{" "}
                  <span className="highlight">ký ức</span>
                </h1>
                <p>
                  "Chào mừng bạn đến với Việt Nam - một điểm đến tuyệt vời đầy
                  mê hoặc với vẻ đẹp tự nhiên và văn hóa đa dạng. Với 1000 năm
                  lịch sử văn hóa, đất nước này tự hào sở hữu những cảnh quan
                  thiên nhiên kỳ vĩ từ núi non, biển cả đến sa mạc hùng vĩ. Du
                  khách sẽ bị cuốn hút bởi những cánh đồng lúa bát ngát, vườn
                  quốc gia hoang sơ và những bãi biển cát trắng tuyệt đẹp. Đặc
                  biệt, văn hóa ẩm thực phong phú và các lễ hội truyền thống sẽ
                  khiến hành trình của bạn thêm phần đáng nhớ. Hãy đến và khám
                  phá Việt Nam ngay hôm nay!"
                </p>
              </div>
            </Col>
            <Col lg="2">
              <div className="hero__img-box">
                <img src={heroImg} alt="" />
              </div>
            </Col>
            <Col lg="2">
              <div className="hero__img-box mt-4">
                <video src={heroVideo} alt="" controls />
              </div>
            </Col>
            <Col lg="2">
              <div className="hero__img-box mt-5">
                <img src={heroImg2} alt="" />
              </div>
            </Col>
            <SearchBar />
          </Row>
        </Container>
      </section>
      {/* =============== hero section start ===============*/}
      <section>
        <Container>
          <Row>
            <Col lg="3">
              <h5 className="services__subtitle">những gì chúng tôi phục vụ</h5>
              <h2 className="services__title">
                chúng tôi cung cấp dịch vụ tốt nhất của chúng tôi
              </h2>
            </Col>
            <ServiceList />
          </Row>
        </Container>
      </section>
      {/* ========= featured tour section start =============== */}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5">
              <Subtitle subtitle={"Quan Tâm "} />
              <h2 className="featured__tour-title">
                Những Chuyến Du Lịch Nổi Bật
              </h2>
            </Col>
            <FeaturedTourList />
          </Row>
        </Container>
        {/* ========= featured tour section end =============== */}
        {/* ========= experience section start =============== */}

        <Container>
          <Row>
            <Col lg="6">
              <div className="experience__content">
                <Subtitle subtitle={"Kinh Nghiệm"} />
                <h2>
                  Với tất cả kinh nghiệm của chúng tôi chúng tôi sẽ phục vụ bạn
                </h2>
                <p>
                 Chúng tôi quan liệm mỗi tour diễn ra đều là một trải nghiệm mới. <br />
                 Chúng tôi sẽ mang đến cho bạn một trải nghiệm tuyệt vời.
                </p>
              </div>
              <div className="counter__wrapper d-flex align-items-center gap-5">
                <div className="counter__box">
                  <span>12k+</span>
                  <h6>chuyến đi thành công</h6>
                </div>
                <div className="counter__box">
                  <span>2k+</span>
                  <h6>khách hàng thường xuyên</h6>
                </div>
                <div className="counter__box">
                  <span>15</span>
                  <h6>Năm Kinh Nghiệm</h6>
                </div>
              </div>
            </Col>
            <Col lg="6">
              <div className="experience__img">
                <img src={experienceImg} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* ========= experience section end =============== */}

      {/* ========= gallery section start =============== */}
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <Subtitle subtitle={"Ảnh Những Chuyến Đi"} />
              <h2 className="gallery__title">
              Ghé thăm phòng trưng bày du lịch khách hàng của chúng tôi
              </h2>
            </Col>
            <Col lg="12">
              <MasonryImagesGallery />
            </Col>
          </Row>
        </Container>
      </section>
      {/* ========= gallery section end =============== */}

      {/* ========= testimonial section start =============== */}

      <section>
        <Container>
          <Row>
            <Col lg="12">
              <Subtitle subtitle={"Tâm Thư"} />
              <h2 className="testimonial__title">
              Người Hâm Mộ Nói Về Chúng Tôi
              </h2>
            </Col>
            <Col lg="12">
              <Testimonials />
            </Col>
          </Row>
        </Container>
      </section>

      {/* ========= testimonial section end =============== */}

      <Newsletter />
    </>
  );
};

export default Home;
