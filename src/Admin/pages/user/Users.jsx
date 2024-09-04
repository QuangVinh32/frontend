import React, { useState, useEffect, useContext } from "react";
import {
  Table,
  Button,
  Input,
  FormGroup,
  Container,
  Row,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import "./../../styles/user-List.css"
import AddUserModal from "./AddUserModal";
import EditUserModal from "./EditUserModal";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "animate.css";

const ITEMS_PER_PAGE = 8;
const BASE_URL_AUTH = "http://localhost:8888/api/users";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(ITEMS_PER_PAGE);
  const [totalPages, setTotalPages] = useState();
  const [searchText, setSearchText] = useState("");
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page, pageSize]);

  const { token } = useContext(AuthContext);

  const fetchUsers = () => {
    setLoading(true);

    fetch(`${BASE_URL_AUTH}/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        pageNumber: page,
        pageSize: pageSize,
        username: searchText,
        role: null,
        sortBy: "userId",
        sortType: "ASC",
        email: null,
        fullName: null,
        phone: null,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Không thể lấy danh sách người dùng.");
        }
      })
      .then((data) => {
        setUsers(data.content);
        setTotalPages(data.totalPages);
      })
      .catch((error) => {
        console.error(error);
        setError("Có lỗi xảy ra khi lấy danh sách người dùng.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearch = () => {
    setPage(1);
    fetchUsers();
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleDeleteUser = (userId) => {
    setConfirmModalOpen(true);
    setUserToEdit(userId);
  };

  const handleConfirmDelete = () => {
    fetch(`${BASE_URL_AUTH}/${userToEdit}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("Đã xóa thành công");
          fetchUsers();
        } else {
          throw new Error("Không thể xóa người dùng.");
        }
      })
      .catch((error) => {
        console.error(error);
        setError("Có lỗi xảy ra khi xóa người dùng.");
      })
      .finally(() => {
        setConfirmModalOpen(false);
        setUserToEdit(null);
      });
  };

  const handleCancelDelete = () => {
    setConfirmModalOpen(false);
    setUserToEdit(null);
  };

  const handleAddUser = (newUser) => {
    fetch(`${BASE_URL_AUTH}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => {
        if (response.ok) {
          fetchUsers();
          alert("Thêm mới thành công");
        } else {
          throw new Error("Không thể thêm mới người dùng.");
        }
      })
      .catch((error) => {
        console.error(error);
        setError("Có lỗi xảy ra khi thêm mới người dùng.");
        navigate("/admin");
      })
      .finally(() => {
        setOpenAddModal(false);
      });
  };

  const handleEditUser = (updatedUser) => {
    fetch(`${BASE_URL_AUTH}/edit/${updatedUser.userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedUser),
    })
      .then((response) => {
        if (response.ok) {
          alert("Đã chỉnh sửa thành công");
          fetchUsers();
        } else {
          fetchUsers();
          throw new Error("Không thể cập nhật người dùng.");
        }
      })
      .catch((error) => {
        navigate("/admin");
        setError("Có lỗi xảy ra khi cập nhật người dùng.");
      })
      .finally(() => {
        setOpenEditModal(false);
        fetchUsers();
      });
  };

  const handleEditModalOpen = (user) => {
    setUserToEdit(user);
    setOpenEditModal(true);
  };

  return (
    <div className="content">
      <Container>
        <h1 className="text-center">Danh sách người dùng</h1>
        <Row>
          <Col xs={12} md={4}>
            <FormGroup>
              <Input
                type="text"
                placeholder="Tìm kiếm theo tên"
                value={searchText}
                onChange={handleSearchTextChange}
              />
            </FormGroup>
          </Col>
          <Col xs={12} md={4}>
            <Button color="primary" onClick={handleSearch} block>
              Tìm kiếm
            </Button>
          </Col>
          <Col xs={12} md={4}>
            <Button
              color="primary"
              onClick={() => setOpenAddModal(true)}
              block
              style={{ marginBottom: "20px" }}
            >
              Thêm mới
            </Button>
          </Col>
        </Row>
      </Container>

      {loading ? (
        <div className="text-center">
          <h5>Loading...</h5>
        </div>
      ) : error ? (
        <div className="text-center">
          <h5 className="text-danger">{error}</h5>
        </div>
      ) : (
        <Container className="content-wrapper animate__animated animate__slideInUp">
          <Table striped bordered responsive>
            <thead>
              <tr className="border-orange animate__animated animate__slideInUp">
                <th>ID</th>
                <th>Tên đăng nhập</th>
                <th>Email</th>
                <th>Họ và tên</th>
                <th>Điện thoại</th>
                <th>Vai trò</th>
                <th style={{width:"130px"}} >Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.userId} className="border-orange animate__animated animate__slideInUp">
                  <td>{user.userId}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.fullName}</td>
                  <td>{user.phone}</td>
                  <td>{user.role}</td>
                  <td>
                    <div style={{display:"flex" ,flexDirection:"row"}}>
                    <Button
                      color="danger"
                      onClick={() => handleDeleteUser(user.userId)}
                    >
                      Xóa
                    </Button>
                    <Button
                    style={{marginLeft:"10px"}}
                      color="primary"
                      onClick={() => handleEditModalOpen(user)}
                    >
                      Sửa
                    </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div>
      <Pagination className="pagination1">
        {[...Array(totalPages).keys()].map((pageIndex) => (
          <div key={pageIndex} active={pageIndex + 1 === page}>
            <PaginationLink style={{backgroundColor:" #0d6efd",color:"white"}}  onClick={() => handlePageChange(null, pageIndex + 1)}>
              {pageIndex + 1}
            </PaginationLink>
          </div>
        ))}
      </Pagination>
    </div>
        </Container>
      )}

      <AddUserModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        onAddUser={handleAddUser}
      />

      {userToEdit && (
        <EditUserModal
          open={openEditModal}
          onClose={() => setOpenEditModal(false)}
          userToEdit={userToEdit}
          onUpdateUser={handleEditUser}
        />
      )}

      {/* Confirm delete modal */}
      <Modal isOpen={confirmModalOpen} toggle={handleCancelDelete}>
        <ModalHeader toggle={handleCancelDelete}>Xác nhận xóa</ModalHeader>
        <ModalBody>Bạn có chắc chắn muốn xóa người dùng này?</ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={handleCancelDelete}>
            Thoát
          </Button>
          <Button color="danger" onClick={handleConfirmDelete}>
            Xóa
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default UserList;
