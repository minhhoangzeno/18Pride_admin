import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Col, Form, Image, Row } from '@themesberg/react-bootstrap';
import React, { useState } from "react";
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import { SERVER } from '../apis/API';
import Profile3 from "../assets/img/team/profile-picture-3.jpg";
import { updateProfileThunk } from '../redux/authSlice';


export default () => {
  let user = JSON.parse(localStorage.getItem("user"));
  const { control, handleSubmit, formState: { errors } } = useForm({
    firstName: user.firstName,
    lastName: user.lastName
  });
  let dispatch = useDispatch();
  let { addToast } = useToasts();
  const [file, setFile] = useState();
  let updateProfile = async (form) => {

    let data = new FormData();

    data.append("lastName", form.lastName);
    data.append("firstName", form.firstName);
    if (file) {
      data.append("file", file)
    }

    let res = await dispatch(updateProfileThunk(data))
    if (res) {
      addToast("Success Profile", { appearance: 'success', autoDismiss: 1000 })
      localStorage.setItem("user", JSON.stringify(res))
    }
    // let data = await dispatch(updateProfileThunk(formData));
    // console.log(data)
  }
  return (
    <>
      <Row>
        <Col xs={12} xl={8}>
          <Card border="light" className="bg-white shadow-sm mb-4">
            <Card.Body>
              <h5 className="mb-4">General information</h5>
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Group id="firstName">
                    <Form.Label>First Name</Form.Label>
                    <Controller
                      control={control}
                      name="firstName"
                      render={({
                        field: { onChange, onBlur, value }
                      }) => (
                        <Form.Control required type="text" placeholder="Enter your first name"
                          onChange={e => onChange(e.target.value)}
                          onBlur={onBlur}
                          value={value}
                          style={{ borderColor: errors.firstName?.type === "required" && 'red' }}
                        />

                      )}
                      rules={{ required: true, }}
                      defaultValue={user.firstName}
                    />

                  </Form.Group>
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Group id="firstName">
                    <Form.Label>Last Name</Form.Label>
                    <Controller
                      control={control}
                      name="lastName"
                      render={({
                        field: { onChange, onBlur, value }
                      }) => (
                        <Form.Control required type="text" placeholder="Enter your first name"
                          onChange={e => onChange(e.target.value)}
                          onBlur={onBlur}
                          value={value}
                          style={{ borderColor: errors.lastName?.type === "required" && 'red' }}
                        />
                      )}
                      rules={{ required: true }}
                      defaultValue={user.lastName}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>


              </Row>
              <div className="mt-3">
                <Button variant="primary" type="button" onClick={handleSubmit(updateProfile)} >Save All</Button>
              </div>
            </Card.Body>
          </Card>

        </Col>

        <Col xs={12} xl={4}>
          <Row>
            {/* <Col xs={12}>
              <ProfileCardWidget />
            </Col> */}
            <Col xs={12}>
              <Card border="light" className="bg-white shadow-sm mb-4">
                <Card.Body>
                  <h5 className="mb-4">Select profile photo</h5>
                  <div className="d-xl-flex align-items-center">
                    <div className="user-avatar xl-avatar">

                      {file ? <img id="target" src={URL.createObjectURL(file)} alt="" className="sizeImage" />
                        : (user?.photoURL ? <Image fluid rounded src={`${SERVER.URL_IMAGE}${user.photoURL}`} /> : <Image fluid rounded src={Profile3} />)
                      }

                    </div>
                    <div className="file-field">
                      <div className="d-flex justify-content-xl-center ms-xl-3">
                        <div className="d-flex">
                          <span className="icon icon-md">
                            <FontAwesomeIcon icon={faPaperclip} className="me-3" />
                          </span>
                          <input type="file"
                            onChange={e => setFile(e.target.files[0])}
                          />
                          <div className="d-md-block text-start">
                            <div className="fw-normal text-dark mb-1">Choose Image</div>
                            <div className="text-gray small">JPG, GIF or PNG. Max size of 800K</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};
