import { faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Col, Container, Form, InputGroup, Row } from '@themesberg/react-bootstrap';
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useHistory } from 'react-router-dom';
import { useToasts } from "react-toast-notifications";
import BgImage from "../../assets/img/illustrations/signin.svg";
import { loginThunk } from "../../redux/authSlice";
import { Routes } from "../../routes";
export default () => {
  let dispatch = useDispatch();
  let history = useHistory();
  const { control, handleSubmit, formState: { errors } } = useForm();
  let { addToast } = useToasts()

  let signin = async (form) => {
    let data = await dispatch(loginThunk(form.username, form.password));
    if (data.statusCode === 201) {
      addToast(data.message, { appearance: 'error', autoDismiss: 2000 });

    } else {
      localStorage.setItem("token", JSON.stringify(data.access_token))
      localStorage.setItem("user", JSON.stringify(data.user))
      addToast("Success", { appearance: 'success', autoDismiss: 2000 })
      history.push(Routes.DashboardOverview.path)
    }

  }

  return (
    <>
      <main>
        <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
          <Container>
            <Row className="justify-content-center form-bg-image" style={{ backgroundImage: `url(${BgImage})` }}>
              <Col xs={12} className="d-flex align-items-center justify-content-center">
                <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                  <div className="text-center text-md-center mb-4 mt-md-0">
                    <h3 className="mb-0">Sign in</h3>
                  </div>
                  <Form className="mt-4">
                    <Form.Group id="email" className="mb-4">
                      <Form.Label>Your Username</Form.Label>
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
                              <Form.Control required type="password" placeholder="Password"
                                onChange={e => onChange(e.target.value)} onBlur={onBlur}
                                style={{ borderColor: errors.password?.type === "required" && 'red' }}
                              />
                            </InputGroup>
                          )}
                          rules={{ required: true }}
                        />
                      </Form.Group>
                    </Form.Group>
                    <div className="d-flex align-items-center mt-2 mb-4" style={{ justifyContent: 'flex-end' }} >
                      <span className="fw-normal">
                        <Card.Link as={Link} to={Routes.ForgotPassword.path} className="fw-bold text-blue">
                          {` Forgot Password `}
                        </Card.Link>
                      </span>
                    </div>
                    <Button variant="primary" type="submit" className="w-100" onClick={handleSubmit(signin)} >
                      Sign in
                    </Button>
                  </Form>
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
    </>
  );
};
