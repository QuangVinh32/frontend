import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Label, Input, Form } from "reactstrap";

const EditUserModal = ({ open, onClose, userToEdit, onUpdateUser, baseUrlAuth }) => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
    fullName: "",
    phone: "",
  });

  useEffect(() => {
    if (userToEdit) {
      setUser(userToEdit);
    }
  }, [userToEdit]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleUpdateUser = () => {

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
    onUpdateUser(user);
    onClose();
  };

  return (
    <Modal isOpen={open} toggle={onClose}>
      <ModalHeader toggle={onClose}>Chỉnh Sửa</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input
              type="text"
              name="username"
              value={user.username}
              onChange={handleChange}
              style={{ borderRadius: "0.25rem" }}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              style={{ borderRadius: "0.25rem" }}
            />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              style={{ borderRadius: "0.25rem" }}
            />
          </FormGroup>
          <FormGroup>
            <Label for="fullName">Full Name</Label>
            <Input
              type="text"
              name="fullName"
              value={user.fullName}
              onChange={handleChange}
              style={{ borderRadius: "0.25rem" }}
            />
          </FormGroup>
          <FormGroup>
            <Label for="phone">Phone</Label>
            <Input
              type="text"
              name="phone"
              value={user.phone}
              onChange={handleChange}
              style={{ borderRadius: "0.25rem" }}
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={onClose} style={{ borderRadius: "0.25rem" }}>
          Cancel
        </Button>
        <Button color="primary" onClick={handleUpdateUser} style={{ borderRadius: "0.25rem" }}>
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default EditUserModal;
