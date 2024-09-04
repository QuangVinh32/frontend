import React, { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Button,
  FormGroup,
  Label,
  Form,
} from "reactstrap";

const AddUserModal = ({ open, onClose, onAddUser }) => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
    fullName: "",
    phone: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleAddUser = () => {
    // Kiểm tra điều kiện trước khi thêm người dùng
    if (!user.username || !user.password || !user.email || !user.fullName || !user.phone) {
      alert("Vui lòng điền đầy đủ thông tin người dùng.");
      return;
    }

    // Kiểm tra email hợp lệ sử dụng Regular Expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
      alert("Vui lòng nhập đúng định dạng email.");
      return;
    }

    // Kiểm tra họ và tên không chứa số sử dụng Regular Expression
    const nameRegex = /^[^\d]+$/;
    if (!nameRegex.test(user.fullName)) {
      alert("Họ và tên không được chứa số.");
      return;
    }

    // Kiểm tra số điện thoại hợp lệ sử dụng Regular Expression
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(user.phone)) {
      alert("Vui lòng nhập số điện thoại hợp lệ (10 chữ số).");
      return;
    }

    // Thêm người dùng mới
    onAddUser(user);

    // Reset form và đóng modal
    setUser({
      username: "",
      password: "",
      email: "",
      fullName: "",
      phone: "",
    });
    onClose();
  };

  return (
    <Modal isOpen={open} toggle={onClose}>
      <ModalHeader toggle={onClose}>Thêm Mới </ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input
              type="text"
              name="username"
              value={user.username}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="fullName">Full Name</Label>
            <Input
              type="text"
              name="fullName"
              value={user.fullName}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="phone">Phone</Label>
            <Input
              type="text"
              name="phone"
              value={user.phone}
              onChange={handleChange}
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={onClose}>
          thoát
        </Button>
        <Button color="primary" onClick={handleAddUser}>
          Thêm mới
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddUserModal;
  