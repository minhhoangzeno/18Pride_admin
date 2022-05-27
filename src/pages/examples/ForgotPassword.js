
import { faAngleLeft, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Col, Container, Form, InputGroup, Row } from '@themesberg/react-bootstrap';
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { useToasts } from "react-toast-notifications";
import { forgotPasswordThunk } from "../../redux/authSlice";
import { Routes } from "../../routes";



export default () => {
  const { control, handleSubmit, reset, formState: { errors } } = useForm();
  let { addToast } = useToasts()
  let dispatch = useDispatch();
  let forgotPassword = async (form) => {
    let data = await dispatch(forgotPasswordThunk(form.email))
  
    if (data) {
      addToast("Vui lòng check mail", { appearance: 'success', autoDismiss: 2000 })
      reset()
    } else {
      addToast("Email không tồn tại", { appearance: 'error', autoDismiss: 2000 })
    }
  }
  return (
    <main>
      <section className="vh-lg-100 mt-4 mt-lg-0 bg-soft d-flex align-items-center">
        <Container>
          <Row className="justify-content-center">
            <p className="text-center">
              <Card.Link as={Link} to={Routes.Signin.path} className="text-gray-700">
                <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Back to sign in
              </Card.Link>
            </p>
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="signin-inner my-3 my-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <h3>Forgot your password?</h3>
                <p className="mb-4">Don't fret! Just type in your email and we will send you a code to reset your password!</p>
                <Form>
                  <div className="mb-4">
                    <Form.Group id="email" className="mb-4">
                      <Form.Label>Email</Form.Label>
                      <Controller
                        control={control}
                        name="email"
                        render={({
                          field: { onChange, onBlur, value }
                        }) => (
                          <InputGroup>
                            <InputGroup.Text style={{ borderColor: errors.email?.type === "required" && 'red' }} >
                              <FontAwesomeIcon icon={faEnvelope} />
                            </InputGroup.Text>
                            <Form.Control autoFocus required type="email" placeholder="example@company.com" onChange={e => onChange(e.target.value)}
                              onBlur={onBlur}
                              style={{ borderColor: errors.email?.type === "required" && 'red' }}
                            />
                          </InputGroup>
                        )}
                        rules={{
                          required: true,
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                          }
                        }}
                      />
                      <span style={{ color: 'red', fontSize: 12 }} >{errors.email?.type === 'pattern' && "* Chưa đúng định dạng email"}</span>
                    </Form.Group>
                  </div>
                  <Button variant="primary" type="submit" className="w-100" onClick={handleSubmit(forgotPassword)} >
                    Recover password
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};
