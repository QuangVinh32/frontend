import React from "react";
import ServiceCard from "./ServiceCard";
import { Col } from "reactstrap";
import weatherImg from "../assets/images/weather.png";
import guideImg from "../assets/images/guide.png";
import customizationImg from "../assets/images/customization.png";

const servicesData = [
  {
    imgUrl: weatherImg,
    title: "Thông tin thời tiết ",
    desc: "Dự Báo Thời Tiết Ngày ",
  },
  {
    imgUrl: guideImg,
    title: "Hướng dẫn du lịch tốt nhất",
    desc: "Hỗ Trợ Tốt Những Cách Thức Du Lịch Tốt ",
  },
  {
    imgUrl: customizationImg,
    title: "tùy chỉnh ",
    desc: "Tùy Chọn Của Khách Hàng ",
  },
];

const ServiceList = () => {
  return (
    <>
      {servicesData.map((item, index) => (
        <Col lg="3" key={index}>
          <ServiceCard item={item} />
        </Col>
      ))}
    </>
  );
};

export default ServiceList;
