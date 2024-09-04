import React, { useState, useEffect, useContext } from "react";
import { Table, Button, Modal, ModalHeader, ModalBody, Container, Pagination, Input } from "reactstrap";
import "./../../styles/tour-List.css";
import AddTourModal from "./AddTourModal";
import EditTourModal from "./EditTourModal";
import { AuthContext } from "../../../context/AuthContext";
import { EditorState, convertFromRaw, convertFromHTML, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const baseUrl = "http://localhost:8888/tours";

const TourList = () => {
  const [tours, setTours] = useState([]);
  const [selectedTour, setSelectedTour] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const { token } = useContext(AuthContext);

  const [searchTerm, setSearchTerm] = useState('');
  const [searchedTours, setSearchedTours] = useState([]);

  useEffect(() => {
    fetchAllTours();
  }, []);

  const fetchAllTours = () => {
    setLoading(true);
    fetch(`${baseUrl}/get-all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("không có tour nào được hiển thị ");
        }
        return response.json();
      })
      .then((data) => {
        setTours(data);
        setSearchedTours(data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleTourClick = (tour) => {
    setSelectedTour(tour);
    toggleModal();
  };

  const toggleAddModal = () => {
    setAddModalOpen(!addModalOpen);
  };

  const toggleEditModal = () => {
    setEditModalOpen(!editModalOpen);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const toursPerPage = 4;

  const indexOfLastTour = currentPage * toursPerPage;
  const indexOfFirstTour = indexOfLastTour - toursPerPage;
  const currentTours = searchedTours.slice(indexOfFirstTour, indexOfLastTour);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleAddTour = (newTour) => {
    fetch(`${baseUrl}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newTour),
    })
      .then((response) => {
        if (response.ok) {
          alert("Tour đã được thêm thành công");
          fetchAllTours();
        } else {
          throw new Error("Không thể thêm tour.");
        }
      })
      .catch((error) => {
        console.error(error);
        setError("Có lỗi xảy ra khi thêm tour.");
      })
      .finally(() => {
        setAddModalOpen(false);
      });
  };

  const handleUpdateTour = (updatedTour) => {
    fetch(`${baseUrl}/update/${selectedTour.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedTour),
    })
      .then((response) => {
        if (response.ok) {
          alert("Tour đã được cập nhật thành công");
          fetchAllTours();
        } else {
          throw new Error("Không thể cập nhật tour.");
        }
      })
      .catch((error) => {
        console.error(error);
        setError("Có lỗi xảy ra khi cập nhật tour.");
      })
      .finally(() => {
        setSelectedTour(null);
        setEditModalOpen(false);
      });
  };

  const handleDeleteTour = () => {
    fetch(`${baseUrl}/${selectedTour.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("Tour đã được xóa thành công");
          fetchAllTours();
        } else {
          throw new Error("Không thể xóa tour.");
        }
      })
      .catch((error) => {
        console.error(error);
        setError("Có lỗi xảy ra khi xóa tour.");
      })
      .finally(() => {
        setSelectedTour(null);
      });
  };

  const handleSearch = () => {
    const filteredTours = tours.filter((tour) =>
      tour.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchedTours(filteredTours);
  };

  return (
    <Container>
      <section>
        <h4 className="text-center">Danh sách tours</h4>
        <div className="input-container">
          <Input
            type="text"
            placeholder="Nhập tên tour..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button style={{marginTop:"10px"}} color="primary" onClick={handleSearch}>Tìm kiếm</Button>
        </div>
        <Button style={{marginTop:"10px"}} color="primary" onClick={toggleAddModal}>Thêm Tour</Button>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Đã xảy ra lỗi: {error.message}</p>
        ) : (
          <Table style={{marginTop:"10px"}} className="tour-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tiêu đề</th>
                <th>Thành phố</th>
                <th>Địa chỉ</th>
                <th>Khoảng cách</th>
                <th>Hình ảnh</th>
                <th>Mô tả</th>
                <th>Giá</th>
                <th>Số Người</th>
                <th>Nổi bật</th>
                <th>Đánh giá</th>
                <th>Chức năng</th>
              </tr>
            </thead>
            <tbody>
              {currentTours.map((tour) => (
                <tr key={tour.id}>
                  <td>{tour.id}</td>
                  <td>{tour.title}</td>
                  <td>{tour.city}</td>
                  <td>{tour.address}</td>
                  <td>{tour.distance}</td>
                  <td>
                    <img
                      src={tour.photo}
                      alt={tour.title}
                      style={{ maxWidth: "100px", borderRadius: "5px" }}
                    />
                  </td>
                  <td>
                    {tour.desc && tour.desc.length > 150 ? (
                      <div>
                        <p>{tour.desc.substring(0, 150)}...</p>
                        <Button color="link">Xem thêm</Button>
                      </div>
                    ) : (
                      <div dangerouslySetInnerHTML={{ __html: tour.desc }} />
                    )}
                  </td>
                  <td>{tour.price}</td>
                  <td>{tour.maxGroupSize}</td>
                  <td>{tour.featured ? "Có" : "Không"}</td>
                  <td>
                    {tour.reviews.map((review) => (
                      <div key={review.id}>
                        <p>Tên người dùng: {review.username}</p>
                        <p>Đánh giá: {review.rating}*</p>
                        <p>Đánh giá văn bản: {review.reviewText}</p>
                      </div>
                    ))}
                  </td>
                  <td>
                    <Button color="primary" onClick={() => handleTourClick(tour)}>Xem</Button>{" "}
                    <Button color="warning" onClick={() => { setSelectedTour(tour); toggleEditModal(); }}>Sửa</Button>{" "}
                    <Button style={{marginTop:"4px"}} color="danger" onClick={() => { setSelectedTour(tour); handleDeleteTour(); }}>Xóa</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        <Pagination className="pagination">
          <div className="pagination">
            {Array.from({ length: Math.ceil(searchedTours.length / toursPerPage) }, (_, index) => (
              <Button
               style={{backgroundColor:" #0d6efd",color:"white"}} 
                key={index}
                className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </Button>
            ))}
          </div>
        </Pagination>
      </section>
      <Modal isOpen={modalOpen} toggle={toggleModal} size="lg">
        <ModalHeader toggle={toggleModal}>{selectedTour?.title}</ModalHeader>
        <ModalBody>
          <td>
            {selectedTour && selectedTour.desc && (
              <div>
                <Editor
                  editorState={EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(selectedTour.desc)))}
                  readOnly={true}
                />
              </div>
            )}
          </td>
        </ModalBody>
      </Modal>

      <AddTourModal isOpen={addModalOpen} toggleModal={toggleAddModal} handleAddTour={handleAddTour} />
      <EditTourModal isOpen={editModalOpen} toggleModal={toggleEditModal} selectedTour={selectedTour} handleUpdateTour={handleUpdateTour} />
    </Container>
  );
};

export default TourList;
