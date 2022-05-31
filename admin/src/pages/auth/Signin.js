
import { faFacebookF, faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faAngleLeft, faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Col, Container, Form, InputGroup, Row } from '@themesberg/react-bootstrap';
import axios from "axios";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useHistory } from 'react-router-dom';
import { useToasts } from "react-toast-notifications";
import BgImage from "../../assets/img/illustrations/signin.svg";
import { apiUrl } from "../../enviroment";
import { Routes } from "../../routes";


export default () => {
  let history = useHistory();
  const { control, handleSubmit, formState: { errors } } = useForm();
  let { addToast } = useToasts();
  let signin = async (form) => {
    axios.post(`${apiUrl}/auth/login`, form)
      .then((result) => {
        localStorage.setItem("token", result.data.access_token);
        localStorage.setItem("user", JSON.stringify(result.data.user));
        addToast("Success", { appearance: 'success', autoDismiss: 1000 });
        history.push(Routes.DashboardOverview.path)
      })
      .catch(function (error) {
        if (error.response) {
          addToast(error.response.data.message, { appearance: 'error', autoDismiss: 2000 });
        } else {
          addToast("Error", { appearance: 'error', autoDismiss: 2000 });
        }
      })
  }
  return (
    <main>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <p className="text-center">
            <Card.Link as={Link} to={Routes.DashboardOverview.path} className="text-gray-700">
              <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Back to homepage
            </Card.Link>
          </p>
          <Row className="justify-content-center form-bg-image" style={{ backgroundImage: `url(${BgImage})` }}>
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Sign in to our platform</h3>
                </div>
                <Form className="mt-4">
                  <Form.Group id="email" className="mb-4">
                    <Form.Label>Your Email</Form.Label>
                    <Controller
                      control={control}
                      name="username"
                      render={({
                        field: { onChange, onBlur, value }
                      }) => (
                        <InputGroup>
                          <InputGroup.Text style={{ borderColor: errors.username?.type === "required" && 'red' }}>
                            <FontAwesomeIcon icon={faEnvelope} />
                          </InputGroup.Text>
                          <Form.Control autoFocus required onChange={e => onChange(e.target.value)}
                            onBlur={onBlur}
                            style={{ borderColor: errors.username?.type === "required" && 'red' }}
                          />
                        </InputGroup>
                      )}
                      rules={{ required: true }}
                    />

                  </Form.Group>
                  <Form.Group>
                    <Form.Group id="password" className="mb-4">
                      <Form.Label>Your Password</Form.Label>
                      <Controller
                        control={control}
                        name="password"
                        render={({
                          field: { onChange, onBlur, value }
                        }) => (
                          <InputGroup>
                            <InputGroup.Text style={{ borderColor: errors.password?.type === "required" && 'red' }}>
                              <FontAwesomeIcon icon={faUnlockAlt} />
                            </InputGroup.Text>
                            <Form.Control required type="password"
                              onChange={e => onChange(e.target.value)} onBlur={onBlur}
                              style={{ borderColor: errors.password?.type === "required" && 'red' }}
                            />
                          </InputGroup>
                        )}
                        rules={{ required: true }}
                      />
                    </Form.Group>
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100" onClick={handleSubmit(signin)} >
                    Sign in
                  </Button>
                </Form>

                <div className="mt-3 mb-4 text-center">
                  <span className="fw-normal">or login with</span>
                </div>
                <div className="d-flex justify-content-center my-4">
                  <Button variant="outline-light" className="btn-icon-only btn-pill text-facebook me-2">
                    <FontAwesomeIcon icon={faFacebookF} />
                  </Button>
                  <Button variant="outline-light" className="btn-icon-only btn-pill text-twitter me-2">
                    <FontAwesomeIcon icon={faTwitter} />
                  </Button>
                  <Button variant="outline-light" className="btn-icon-only btn-pil text-dark">
                    <FontAwesomeIcon icon={faGithub} />
                  </Button>
                </div>
                <div className="d-flex justify-content-center align-items-center mt-4">
                  <span className="fw-normal">
                    Not registered?
                    <Card.Link as={Link} to={Routes.Signup.path} className="fw-bold">
                      {` Create account `}
                    </Card.Link>
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};
