import React, { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { stateToHTML } from "draft-js-export-html";
import Compressor from "compressorjs";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const AddTourModal = ({ isOpen, toggleModal, handleAddTour }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [formData, setFormData] = useState({
    title: "",
    city: "",
    address: "",
    distance: "",
    photo: "", // URL dữ liệu hình ảnh
    desc: "",
    price: "",
    maxGroupSize: "",
    featured: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Sử dụng Compressor để nén hình ảnh trước khi chuyển nó thành URL dữ liệu
      new Compressor(file, {
        quality: 0.6, // Chất lượng sau khi nén (tùy chỉnh)
        success(result) {
          const reader = new FileReader();

          reader.onload = (event) => {
            const imageDataUrl = event.target.result;

            setFormData((prevData) => ({
              ...prevData,
              photo: imageDataUrl,
            }));
          };

          reader.readAsDataURL(result);
        },
        error(err) {
          console.error(err.message);
        },
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const contentState = editorState.getCurrentContent();
    const rawContent = convertToRaw(contentState);
    const plainText = rawContent.blocks.map((block) => block.text).join("\n");
    const htmlContent = stateToHTML(ContentState.createFromText(plainText));
    handleAddTour({ ...formData, desc: htmlContent });
  };

  return (
    <Modal isOpen={isOpen} toggle={toggleModal} size="lg">
      <ModalHeader toggle={toggleModal}>Thêm Tour</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="title">Tiêu đề</Label>
            <Input
              type="text"
              name="title"
              id="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="city">Thành phố</Label>
            <Input
              type="text"
              name="city"
              id="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="address">Địa chỉ</Label>
            <Input
              type="text"
              name="address"
              id="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="distance">Khoảng cách</Label>
            <Input
              type="number"
              name="distance"
              id="distance"
              value={formData.distance}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="photo">Hình ảnh</Label>
            <Input
              type="file"
              name="photo"
              id="photo"
              onChange={handleImageUpload}
              accept="image/*"
              required
            />
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
            <Input
              type="number"
              name="price"
              id="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="maxGroupSize">Số Người</Label>
            <Input
              type="number"
              name="maxGroupSize"
              id="maxGroupSize"
              value={formData.maxGroupSize}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="featured">Nổi bật</Label>
            <Input
              type="select"
              name="featured"
              id="featured"
              value={formData.featured}
              onChange={handleChange}
              required
            >
              <option value="">Chọn</option>
              <option value="true">Có</option>
              <option value="false">Không</option>
            </Input>
          </FormGroup>
          <Button type="submit" color="primary">
            Thêm
          </Button>
          <Button color="secondary" onClick={toggleModal}>
            Hủy
          </Button>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default AddTourModal;
