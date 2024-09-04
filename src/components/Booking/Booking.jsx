import React, { useState, useEffect } from "react";
import "./booking.css";
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/config";
import axios from "axios"; 



const formatVND = (amount) => {
  if (amount === undefined || isNaN(amount)) {
    return '0'; // Hoặc giá trị mặc định khác tùy ý
  }
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};


const Booking = ({ tour, avgRating }) => {
  // Lấy ra giá và đánh giá trung bình từ prop tour
  const { price, reviews } = tour;

  const [isExceedMaxGroupSize, setIsExceedMaxGroupSize] = useState(false);


  // Sử dụng hook useNavigate của React Router để điều hướng khi đặt tour thành công
  const navigate = useNavigate();

  // Khởi tạo state booking chứa thông tin đặt tour của người dùng
  const [booking, setBooking] = useState({
    email: "",
    fullName: "",
    phoneNumber: "",
    address: "",
    note: "",
    guestSize: 1,
    tour: tour.title,
    tour: tour.id,
    totalAmount :0,
  });

  
  // Khởi tạo state isFormValid để kiểm tra tính hợp lệ của biểu mẫu
  const [isFormValid, setIsFormValid] = useState(false);

  const formattedPrice = formatVND(price);

  // Khởi tạo state formError để lưu trữ thông báo lỗi cho từng trường
  const [formError, setFormError] = useState({
    email: "",
    fullName: "",
    phoneNumber: "",
    address: "",
    note: "",
    guestSize: "",
  });

  // useEffect sẽ được gọi lại mỗi khi dữ liệu biểu mẫu thay đổi
  

  // Hàm handleChange để cập nhật state booking khi người dùng thay đổi thông tin
  const handleChange = (e) => {
    const { id, value } = e.target;
    setBooking((prev) => ({ ...prev, [id]: value }));
    // Tính toán lại và cập nhật totalAmount khi có thay đổi trong biểu mẫu
  const newTotalAmount =
  Number(price) * Number(value) + Number(serviceFee);
  setBooking((prev) => ({ ...prev, totalAmount: newTotalAmount }));

  };

  // Tính phí dịch vụ và tổng số tiền cần thanh toán
  const serviceFee = 20000;
  const totalAmount = Number(price) * Number(booking.guestSize) + Number(serviceFee);
  const formatteTotalAmount = formatVND(totalAmount);
  const formatteserviceFee = formatVND(serviceFee);
  useEffect(() => {
    // Kiểm tra thông báo lỗi cho từng trường
    const { email, fullName, phoneNumber, address, guestSize } = booking;
    const errors = {};

    if (email.trim() === "") {
      errors.email = "Vui lòng nhập email";
    }
    if (fullName.trim() === "") {
      errors.fullName = "Vui lòng nhập tên đầy đủ";
    }
    if (phoneNumber.trim() === "") {
      errors.phoneNumber = "Vui lòng nhập số điện thoại";
    }
    if (address.trim() === "") {
      errors.address = "Vui lòng nhập địa chỉ";
    }
  
    if (Number(guestSize) <= 0) {
      errors.guestSize = "Số người phải lớn hơn 0";
    }

    // Cập nhật giá trị cho biến isFormValid dựa trên kết quả kiểm tra
    setIsFormValid(Object.values(errors).every((val) => val === ""));

    // Cập nhật state formError với thông báo lỗi cho từng trường
    setFormError(errors);
  }, [booking]);
  // Hàm xử lý khi người dùng nhấn nút "Đặt Ngay"
  const handleClick = async (e) => {
    e.preventDefault();

     // Kiểm tra nếu guestSize vượt quá maxGroupSize
  if (booking.guestSize > tour.maxGroupSize) {
    setIsExceedMaxGroupSize(true);
    return alert("số lượng người vượt quá số lượng người trong tour"); // Dừng tiến trình nếu vượt quá
  }
  
    const totalAmountAsNumber = parseFloat(formatteTotalAmount.replace(/\./g, ''));
    const updatedBooking = { ...booking, totalAmount: totalAmountAsNumber };
    try {
      // Gửi dữ liệu đặt tour lên máy chủ thông qua API
      const res = await axios.post(`${BASE_URL}/bookings/create`, updatedBooking, {
        headers: {
          "content-type": "application/json",
        },
      });

      // Nếu đặt tour thành công, điều hướng tới trang "thank-you"
      if (res.status >= 200 && res.status < 300) {
        navigate("/thank-you");
      }
    } catch (err) {
   
      alert(err.message);
    }
  };

  return (
    <div className="booking">
      {/* Hiển thị giá và đánh giá */}
      <div className="booking__top d-flex align-items-center justify-content-between">
        <h3>
          {formattedPrice} VND
          <span>/Người</span>
        </h3>
        <span className="tour__rating d-flex align-item-center">
          <i className="ri-star-s-fill"></i>
          {avgRating === 0 ? null : avgRating} ({reviews?.length})
        </span>
      </div>

      {/* Biểu mẫu đặt tour */}
      <div className="booking__form">
        <h5>Thông Tin Cá Nhân</h5>
        <Form className="booking__info-form" onSubmit={handleClick}>
          <FormGroup>
          <p style={{ color: "red", textAlign: "right" }}>*</p>
            <input
              type="text"
              placeholder="email"
              id="email"
              value={booking.email}
              required
              onChange={handleChange}
            />
            <div className="error-message">{formError.email}</div>
          </FormGroup>
          <FormGroup>
        <p style={{ color: "red", textAlign: "right" }}>*</p>
            <input
              type="text"
              placeholder="Tên Đầy Đủ"
              id="fullName"
              value={booking.fullName}
              required
              onChange={handleChange}
            />
            <div className="error-message">{formError.fullName}</div>
          </FormGroup>
          <FormGroup>
        <p style={{ color: "red", textAlign: "right" }}>*</p>
            <input
              type="text"
              placeholder="Địa Chỉ"
              id="address"
              value={booking.address}
              required
              onChange={handleChange}
            />
            <div className="error-message">{formError.address}</div>
          </FormGroup>
          <p style={{ color: "red" }}>Thông Tin Thêm Nếu Có </p>
          <FormGroup>
            <input
              type="text"
              placeholder="Thông Tin Thêm"
              id="note"
              value={booking.note}
              required
              onChange={handleChange}
            />
           
          </FormGroup>
          <FormGroup>
          <p style={{ color: "red", textAlign: "right" }}>*</p>
            <input
              type="text"
              placeholder="Số Điện Thoại"
              id="phoneNumber"
              value={booking.phoneNumber}
              required
              onChange={handleChange}
            />
            <div className="error-message" >{formError.phoneNumber}</div>
          </FormGroup>
          <p style={{ color: "red", textAlign: "right" }}>*</p>
          <FormGroup className="d-flex align-items-center gap-3">
         
            <input
              type="number"
              placeholder="Số người"
              id="guestSize"
              value={booking.guestSize}
              required
              onChange={handleChange}
            />
            <div className="error-message">{formError.guestSize}</div>
          </FormGroup>
        </Form>

        
      </div>

      {/* Thông tin đơn hàng */}
      <div className="booking__bottom">
        <ListGroup>
          <ListGroupItem className="border-0 px-0">
            <h5 className="d-flex align-items-center gap-1">
            {formattedPrice}<i className="ri-close-line"> Người</i>{" "}
            </h5>
            <span> {formattedPrice} VND</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0">
            <h5>Thuế</h5>
            <span>{formatteserviceFee} VND</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0 total">
            <h5>Tổng</h5>
            <span>{formatteTotalAmount} VND</span>
          </ListGroupItem>
        </ListGroup>
        {/* Nút Đặt Ngay */}
        <Button
          className="btn primary__btn w-100 mt-4"
          onClick={handleClick}
          disabled={!isFormValid}
        >
          Đặt Ngay
        </Button>
      </div>
    </div>
  );
};

// Xuất thành phần Booking để sử dụng trong các thành phần khác
export default Booking;
