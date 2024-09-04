import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import BookingTable from "./BookingTable";
import TourInfoModal from "./TourInfoModal";
import { AuthContext } from "../../../context/AuthContext";
import { PaymentStatus } from "../../utils/PaymentStatus";
import BookingChart from "../statistical/BookingChart";

const baseUrl = "http://localhost:8888/bookings";

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [bookingToEdit, setBookingToEdit] = useState(null);
  const { token } = useContext(AuthContext);
  const [selectedTour, setSelectedTour] = useState(null);
  const [openTourModal, setOpenTourModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);


  const fetchBookings = () => {
    setLoading(true);
    fetch(`${baseUrl}/get-all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setBookings(data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleEditBooking = () => {
    fetch(`${baseUrl}/update/${bookingToEdit.bookingId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        fullName: bookingToEdit.fullName,
        email: bookingToEdit.email,
        phoneNumber: bookingToEdit.phoneNumber,
        address: bookingToEdit.address,
        note: bookingToEdit.note,
        guestSize: bookingToEdit.guestSize,
        tour: bookingToEdit.tour.id,
        totalAmount: bookingToEdit.totalAmount,
        status: bookingToEdit.status,
      }),
    })
      .then((response) => {
        if (response.ok) {
          alert("Đã Sửa Thành công");
          fetchBookings();
        } else {
          throw new Error("Không thể cập nhật booking.");
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setOpenEditModal(false);
      });
  };

  const handleDeleteBooking = (bookingId) => {
    fetch(`${baseUrl}/delete/${bookingId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("Xóa thành công ");
          fetchBookings();
        } else {
          throw new Error("Không thể xóa booking.");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleEditModalOpen = (booking) => {
    setBookingToEdit(booking);
    setOpenEditModal(true);
  };

  const handleShowTourInfo = (tour) => {
    console.log(tour);
    setSelectedTour(tour);
    setOpenTourModal(true);
  };

  const handleCloseModal = () => {
    setOpenEditModal(false);
  };

  const handleSearch = () => {
    const filteredBookings = bookings.filter((booking) =>
      booking.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredBookings);
  };

  return (
    <section>
      <Container>
        <Row>
          <Col>
            <h4 className="text-center">Danh sách booking</h4>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={3}>
            <div style={{marginBottom:"20px"}} className="d-flex align-items-center">
              <input style={{padding:"5px",borderRadius:"5  px"}}
                type="text"
                placeholder="Tìm kiếm theo tên khách hàng"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button style={{marginLeft:"10px"}} color="primary" onClick={handleSearch}>
                Tìm kiếm
              </Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <BookingTable
              bookings={searchTerm ? searchResults : bookings}
              loading={loading}
              handleEditModalOpen={handleEditModalOpen}
              handleDeleteBooking={handleDeleteBooking}
              handleShowTourInfo={handleShowTourInfo}
            />
          </Col>
        </Row>
      </Container>

      {/* Modal Sửa */}
      <Modal isOpen={openEditModal} toggle={handleCloseModal}>
        <ModalHeader toggle={handleCloseModal}>Chỉnh sửa booking</ModalHeader>
        <ModalBody>
          <Form>
            {/* Các trường nhập liệu tương tự như trước */}
            <FormGroup>
              <Label for="fullName">Họ tên</Label>
              <Input
                type="text"
                name="fullName"
                id="fullName"
                value={bookingToEdit?.fullName || ""}
                onChange={(e) =>
                  setBookingToEdit((prevBooking) => ({
                    ...prevBooking,
                    fullName: e.target.value,
                  }))
                }
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                value={bookingToEdit?.email || ""}
                onChange={(e) =>
                  setBookingToEdit((prevBooking) => ({
                    ...prevBooking,
                    email: e.target.value,
                  }))
                }
              />
            </FormGroup>
            <FormGroup>
              <Label for="phoneNumber">Số điện thoại</Label>
              <Input
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                value={bookingToEdit?.phoneNumber || ""}
                onChange={(e) =>
                  setBookingToEdit((prevBooking) => ({
                    ...prevBooking,
                    phoneNumber: e.target.value,
                  }))
                }
              />
            </FormGroup>
            <FormGroup>
              <Label for="address">Địa chỉ</Label>
              <Input
                type="text"
                name="address"
                id="address"
                value={bookingToEdit?.address || ""}
                onChange={(e) =>
                  setBookingToEdit((prevBooking) => ({
                    ...prevBooking,
                    address: e.target.value,
                  }))
                }
              />
            </FormGroup>
            <FormGroup>
              <Label for="note">Ghi chú</Label>
              <Input
                type="textarea"
                name="note"
                id="note"
                value={bookingToEdit?.note || ""}
                onChange={(e) =>
                  setBookingToEdit((prevBooking) => ({
                    ...prevBooking,
                    note: e.target.value,
                  }))
                }
              />
            </FormGroup>
            <FormGroup>
              <Label for="guestSize">Số lượng khách</Label>
              <Input
                type="number"
                name="guestSize"
                id="guestSize"
                value={bookingToEdit?.guestSize || ""}
                onChange={(e) =>
                  setBookingToEdit((prevBooking) => ({
                    ...prevBooking,
                    guestSize: e.target.value,
                  }))
                }
              />
            </FormGroup>
          
            <FormGroup>
              <Label for="tour">Mã Tour</Label>
              <Input
                type="text"
                name="tour"
                id="tour"
                value={bookingToEdit?.tour.id || ""}
                onChange={(e) =>
                  setBookingToEdit((prevBooking) => ({
                    ...prevBooking,
                    tour: { id: e.target.value },
                  }))
                }
              />
            </FormGroup>
            <FormGroup>
              <Label for="guestSize">Số tiền </Label>
              <Input
                type="text"
                name="totalAmount"
                id="guestSize"
                value={bookingToEdit?.totalAmount || ""}
                onChange={(e) =>
                  setBookingToEdit((prevBooking) => ({
                    ...prevBooking,
                    totalAmount: e.target.value,
                  }))
                }
              />
            </FormGroup>
            <FormGroup>
        <Label for="status">Trạng thái thanh toán</Label>
        <Input
          type="select"
          id="status"
          name="status"
          value={bookingToEdit?.status || ""}
          onChange={(e) =>
            setBookingToEdit((prevBooking) => ({
              ...prevBooking,
              status: e.target.value,
            }))
          }
        >
          <option value={PaymentStatus.PENDING}>PENDING</option>
          <option value={PaymentStatus.SUCCESSFUL}>SUCCESSFUL</option>
          <option value={PaymentStatus.FAILED}>FAILED</option>
        </Input>
      </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleEditBooking}>
            Lưu thay đổi
          </Button>{" "}
          <Button color="secondary" onClick={handleCloseModal}>
            Hủy
          </Button>
        </ModalFooter>
      </Modal>

      <TourInfoModal
        open={openTourModal}
        handleClose={() => setOpenTourModal(false)}
        selectedTour={selectedTour}
      />
    </section>
  );
};

export default BookingList;
