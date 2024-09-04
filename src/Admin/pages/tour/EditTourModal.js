import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { EditorState, ContentState, convertFromHTML, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { stateToHTML } from "draft-js-export-html";

const EditTourModal = ({ isOpen, toggleModal, selectedTour, handleUpdateTour }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [formData, setFormData] = useState({
    title: "",
    city: "",
    address: "",
    distance: "",
    photo: "",
    desc: "",
    price: "",
    maxGroupSize: "",
    featured: "",
  });

  useEffect(() => {
    if (selectedTour) {
      setFormData({
        title: selectedTour.title,
        city: selectedTour.city,
        address: selectedTour.address,
        distance: selectedTour.distance,
        photo: selectedTour.photo,
        desc: selectedTour.desc,
        price: selectedTour.price,
        maxGroupSize: selectedTour.maxGroupSize,
        featured: selectedTour.featured,
      });

      const contentState = convertFromHTML(selectedTour.desc);
      const editorStateFromHtml = EditorState.createWithContent(ContentState.createFromBlockArray(contentState));
      setEditorState(editorStateFromHtml);
    }
  }, [selectedTour]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const contentState = editorState.getCurrentContent();
    const rawContent = convertToRaw(contentState);
    const plainText = rawContent.blocks.map(block => block.text).join('\n');
    const htmlContent = stateToHTML(ContentState.createFromText(plainText));
    handleUpdateTour({ ...formData, desc: htmlContent });
  };

  return (
    <Modal isOpen={isOpen} toggle={toggleModal} size="lg">
      <ModalHeader toggle={toggleModal}>Sửa Tour</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="title">Tiêu đề</Label>
            <Input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required />
          </FormGroup>
          <FormGroup>
            <Label for="city">Thành phố</Label>
            <Input type="text" name="city" id="city" value={formData.city} onChange={handleChange} required />
          </FormGroup>
          <FormGroup>
            <Label for="address">Địa chỉ</Label>
            <Input type="text" name="address" id="address" value={formData.address} onChange={handleChange} required />
          </FormGroup>
          <FormGroup>
            <Label for="distance">Khoảng cách</Label>
            <Input type="number" name="distance" id="distance" value={formData.distance} onChange={handleChange} required />
          </FormGroup>
          <FormGroup>
            <Label for="photo">Hình ảnh</Label>
            <Input type="text" name="photo" id="photo" value={formData.photo} onChange={handleChange} required />
          </FormGroup>
          <FormGroup>
            <Label for="desc">Mô tả</Label>
            <Editor
              editorState={editorState}
              wrapperClassName="demo-wrapper"
              editorClassName="demo-editor"
              onEditorStateChange={(editorState) => setEditorState(editorState)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="price">Giá</Label>
            <Input type="number" name="price" id="price" value={formData.price} onChange={handleChange} required />
          </FormGroup>
          <FormGroup>
            <Label for="maxGroupSize">Số Người</Label>
            <Input type="number" name="maxGroupSize" id="maxGroupSize" value={formData.maxGroupSize} onChange={handleChange} required />
          </FormGroup>
          <FormGroup>
            <Label for="featured">Nổi bật</Label>
            <Input type="select" name="featured" id="featured" value={formData.featured} onChange={handleChange} required>
              <option value="">Chọn</option>
              <option value="true">Có</option>
              <option value="false">Không</option>
            </Input>
          </FormGroup>
          <Button type="submit" color="primary">Lưu</Button>
          <Button style={{marginLeft:"10px"}} color="secondary" onClick={toggleModal}>Hủy</Button>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default EditTourModal;
