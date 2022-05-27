
import { faAngleLeft, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Col, Container, Form, InputGroup, Row } from '@themesberg/react-bootstrap';
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import { Routes } from "../../routes";



export default (props) => {
    const { control, handleSubmit, reset } = useForm();
    // let { confirmationCode } = props.match.params;
    // let dispatch = useDispatch();
    let verifyPassword = async (form) => {
        // dispatch(verifyPasswordThunk(confirmationCode, form.newPassword))
        reset()
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
                                <h3>Verify password?</h3>
                                <p className="mb-4">Don't fret! Just type in your email and we will send you a code to reset your password!</p>
                                <Form>
                                    <div className="mb-4">
                                        <Form.Group id="email" className="mb-4">
                                            <Form.Label>Your Password</Form.Label>
                                            <Controller
                                                control={control}
                                                name="newPassword"
                                                render={({
                                                    field: { onChange, onBlur, value }
                                                }) => (
                                                    <InputGroup>
                                                        <InputGroup.Text>
                                                            <FontAwesomeIcon icon={faEnvelope} />
                                                        </InputGroup.Text>
                                                        <Form.Control autoFocus required type="email" placeholder="example@company.com" onChange={e => onChange(e.target.value)}
                                                            onBlur={onBlur}
                                                        />
                                                    </InputGroup>
                                                )}
                                            />
                                        </Form.Group>
                                    </div>
                                    <Button variant="primary" type="submit" className="w-100" onClick={handleSubmit(verifyPassword)} >
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
