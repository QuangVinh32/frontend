import React from "react";
import Slider from "react-slick";
import ava01 from "../../assets/images/ava-1.jpg";
import ava02 from "../../assets/images/ava-2.jpg";
import ava03 from "../../assets/images/ava-3.jpg";

const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    swipeToSlide: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,

    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      <div className="testimonial py-4 px-3">
        <p>
          Đội ngũ chuyên nghiệp: Công ty có đội ngũ nhân viên nhiệt tình, giàu
          kinh nghiệm và am hiểu sâu sắc về các điểm đến và tour du lịch. Họ
          luôn sẵn lòng hỗ trợ khách hàng, từ việc tư vấn chọn lựa tour phù hợp
          cho đến việc giải đáp mọi thắc mắc.
        </p>

        <div className="d-flex align-items-center gap-4 mt-3">
          <img src={ava01} className="w-25 h-25 rounded-2" alt="" />
          <div>
            <h6 className="mb-0 mt-3">Thạch Anh</h6>
            <p>Nhân Viên Văn Phòng</p>
          </div>
        </div>
      </div>

      <div className="testimonial py-4 px-3">
        <p>
          Sự đa dạng và chất lượng các tour du lịch: Công ty cung cấp một loạt
          các tour du lịch đa dạng, từ tham quan các địa điểm nổi tiếng cho đến
          khám phá những vùng đất hoang sơ và độc đáo. Chất lượng của các tour
          luôn được đảm bảo, mang lại cho du khách những trải nghiệm tuyệt vời
          và đáng nhớ.
        </p>

        <div className="d-flex align-items-center gap-4 mt-3">
          <img src={ava02} className="w-25 h-25 rounded-2" alt="" />
          <div>
            <h6 className="mb-0 mt-3">Đức</h6>
            <p>Bán Vé Số</p>
          </div>
        </div>
      </div>

      <div className="testimonial py-4 px-3">
        <p>
          Giá trị hợp lý: Dịch vụ du lịch của Công ty có giá trị tốt cho những
          gì khách hàng nhận được. Sự kết hợp giữa chất lượng và giá cả hợp lý
          khiến du khách cảm thấy hài lòng và không hề thất vọng về quyết định
          lựa chọn tour của Công ty.
        </p>

        <div className="d-flex align-items-center gap-4 mt-3">
          <img src={ava03} className="w-25 h-25 rounded-2" alt="" />
          <div>
            <h6 className="mb-0 mt-3">Vinh</h6>
            <p>Hacker</p>
          </div>
        </div>
      </div>
      <div className="testimonial py-4 px-3">
        <p>
          Sự đa dạng và chất lượng các tour du lịch: Công ty cung cấp một loạt
          các tour du lịch đa dạng, từ tham quan các địa điểm nổi tiếng cho đến
          khám phá những vùng đất hoang sơ và độc đáo. Chất lượng của các tour
          luôn được đảm bảo, mang lại cho du khách những trải nghiệm tuyệt vời
          và đáng nhớ.
        </p>

        <div className="d-flex align-items-center gap-4 mt-3">
          <img src={ava02} className="w-25 h-25 rounded-2" alt="" />
          <div>
            <h6 className="mb-0 mt-3">Thanh</h6>
            <p>Nội Trợ</p>
          </div>
        </div>
      </div>
    </Slider>
  );
};

export default Testimonials;
