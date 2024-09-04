import React, { useState } from "react";
import { Table, Button, Spinner, Pagination, PaginationItem, PaginationLink  } from "reactstrap";
import "animate.css"; 
import { formatVND } from "../../utils/formatVND";

const itemsPerPage = 4; // Số mục hiển thị trên mỗi trang
const BookingTable = ({
  bookings,
  loading,
  handleEditModalOpen,
  handleDeleteBooking,
  handleShowTourInfo,
}) => {


  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBookings = bookings.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner color="primary" />
      </div>
    );
  }

  if (!Array.isArray(bookings) || bookings.length === 0) {
    return <p>Không có đơn đặt hàng nào.</p>;
  }

  return (
    <div className="text-content">
      <Table striped bordered responsive className="booking-table"  >
        <thead>
          <tr className="border-orange">
            <th className="animate__animated animate__slideInUp">ID</th>
            <th className="animate__animated animate__slideInUp">Tên khách hàng</th>
            <th className="animate__animated animate__slideInUp">Email</th>
            <th className="animate__animated animate__slideInUp">Số điện thoại</th>
            <th className="animate__animated animate__slideInUp">Địa chỉ</th>
            <th className="animate__animated animate__slideInUp">Ghi chú</th>
            <th className="animate__animated animate__slideInUp">Số lượng khách</th>
            <th className="animate__animated animate__slideInUp">ngày đặt tour</th>
            <th className="animate__animated animate__slideInUp">số tiền thanh toán </th>
            <th className="animate__animated animate__slideInUp">Tên Tour Đã booking</th>
            <th className="animate__animated animate__slideInUp">Vé Tour</th>
            <th className="animate__animated animate__slideInUp">trạng thái thanh toán</th>
            <th className="animate__animated animate__slideInUp">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {currentBookings.map((booking) => (
            <tr key={booking.bookingId} className="border-orange animate__animated animate__slideInUp">
              <td>{booking.bookingId}</td>
              <td>{booking.fullName}</td>
              <td>{booking.email}</td>
              <td>{booking.phoneNumber}</td>
              <td>{booking.address}</td>
              <td>{booking.note}</td>
              <td>{booking.guestSize}</td>
              <td>{booking.bookingAt}</td>
              <td>{formatVND(booking.totalAmount)}</td>
              <td>{booking.titleTour}</td>
              
              <td>
                <Button color="primary" onClick={() => handleShowTourInfo(booking.tour)}>
                  Xem thông tin
                </Button>
              </td>
              <td>{booking.status}</td>
              
              <td>
              <div style={{display:"flex"}}>
                <Button color="primary" onClick={() => handleEditModalOpen(booking)}>
                  Sửa
                </Button>
                <Button style={{marginLeft:"10px"}} color="danger" onClick={() => handleDeleteBooking(booking.bookingId)}>
                  Xóa
                </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination className="pagination1">
        {Array.from({ length: Math.ceil(bookings.length / itemsPerPage) }).map((_, index) => (
            <PaginationLink style={{backgroundColor:" #0d6efd",color:"white"}}  onClick={() => paginate(index + 1)}>{index + 1}</PaginationLink>
        ))}
      </Pagination>
    </div>
  );
};

export default BookingTable;
