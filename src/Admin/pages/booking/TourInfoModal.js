import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Row, Col } from "reactstrap";

const TourInfoModal = ({ open, handleClose, selectedTour }) => {
  return (
    <Modal isOpen={open} toggle={handleClose}>
      <ModalHeader toggle={handleClose}>Toàn Bộ Thông Tin Tour</ModalHeader>
      <ModalBody>
        {selectedTour && (
          <React.Fragment>
            <Row>
              <Col>
                <strong>Số hiệu tour:</strong> {selectedTour.id}
              </Col>
            </Row>

            <Row>
              <Col>
                <strong>Tên Chuyến Đi:</strong> {selectedTour.title}
              </Col>
            </Row>


            <Row>
              <Col>
                <strong>Địa Chỉ Tour:</strong> {selectedTour.address}
              </Col>
            </Row>
            <Row>
              <Col>
                <strong>Thành Phố:</strong> {selectedTour.city}
              </Col>
            </Row>
            <Row>
              <Col>
                <strong>Khoảng Cách:</strong> {selectedTour.distance}
              </Col>
            </Row>
            <Row>
              <Col>
                <strong>Số lượng Người trong tour:</strong> {selectedTour.maxGroupSize}
              </Col>
            </Row>
            <Row>
              <Col>
                <strong>Ảnh Tour:</strong>
              </Col>
            </Row>
            <Row>
              <Col>
                <img
                  src={selectedTour.photo}
                  alt={selectedTour.tourId}
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              </Col>
            </Row>
          </React.Fragment>
        )}
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleClose}>
          Đóng
        </Button>{" "}
      </ModalFooter>
    </Modal>
  );
};

export default TourInfoModal;
