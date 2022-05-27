
import { faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Container, Form, InputGroup, Row } from '@themesberg/react-bootstrap';
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { changePasswordThunk } from "../../redux/authSlice";



export default () => {
    const { control, handleSubmit, formState: { errors },reset } = useForm();

    let dispatch = useDispatch()

    let { addToast } = useToasts();

    let changePassord = async (form) => {
        try {
            if (form.newPassword !== form.confirmPassword) {
                addToast("Mật khẩu nhập lại chưa đúng", { appearance: 'error', autoDismiss: 2000 })
            } else {
                let data = await dispatch(changePasswordThunk({
                    oldPassword: form.oldPassword,
                    newPassword: form.newPassword
                }))
                if (data.statusCode === 201) {
                    addToast(data.message, { appearance: 'error', autoDismiss: 2000 })
                } else {
                    addToast(data.message, { appearance: 'success', autoDismiss: 2000 })
                    reset()
                }
            }
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <main>
            <section className="bg-soft d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
                <Container>
                    <Row className="justify-content-center">
                        <Col xs={12} className="d-flex align-items-center justify-content-center">
                            <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                                <h3 className="mb-4">Change password</h3>
                                <Form>
                                    <Form.Group id="newPassword" className="mb-4">
                                        <Form.Label>Your Old Password</Form.Label>
                                        <Controller
                                            control={control}
                                            name="oldPassword"
                                            render={({
                                                field: { onChange, onBlur, value }
                                            }) => (
                                                <InputGroup>
                                                    <InputGroup.Text style={{ borderColor: errors.newPassword?.type === "required" && 'red' }} >
                                                        <FontAwesomeIcon icon={faUnlockAlt} />
                                                    </InputGroup.Text>
                                                    <Form.Control autoFocus required type="password" onChange={e => onChange(e.target.value)}
                                                        onBlur={onBlur}
                                                        style={{ borderColor: errors.newPassword?.type === "required" && 'red' }}
                                                    />
                                                </InputGroup>
                                            )}
                                            rules={{ required: true, minLength: 8 }}
                                        />
                                        <span style={{ color: 'red', fontSize: 12 }} >{errors.oldPassword?.type === 'minLength' && "* Mật khẩu cần ít nhất là 8 ký tự"}</span>
                                    </Form.Group>
                                    <Form.Group id="newPassword" className="mb-4">
                                        <Form.Label>Your New Password</Form.Label>
                                        <Controller
                                            control={control}
                                            name="newPassword"
                                            render={({
                                                field: { onChange, onBlur, value }
                                            }) => (
                                                <InputGroup>
                                                    <InputGroup.Text style={{ borderColor: errors.newPassword?.type === "required" && 'red' }} >
                                                        <FontAwesomeIcon icon={faUnlockAlt} />
                                                    </InputGroup.Text>
                                                    <Form.Control autoFocus required type="password" onChange={e => onChange(e.target.value)}
                                                        onBlur={onBlur}
                                                        style={{ borderColor: errors.newPassword?.type === "required" && 'red' }}
                                                    />
                                                </InputGroup>
                                            )}
                                            rules={{ required: true, minLength: 8 }}
                                        />
                                        <span style={{ color: 'red', fontSize: 12 }} >{errors.newPassword?.type === 'minLength' && "* Mật khẩu cần ít nhất là 8 ký tự"}</span>
                                    </Form.Group>
                                    <Form.Group id="confirmPassword" className="mb-4">
                                        <Form.Label>Confirm Password</Form.Label>
                                        <Controller
                                            control={control}
                                            name="confirmPassword"
                                            render={({
                                                field: { onChange, onBlur, value }
                                            }) => (
                                                <InputGroup>
                                                    <InputGroup.Text style={{ borderColor: errors.confirmPassword?.type === "required" && 'red' }}>
                                                        <FontAwesomeIcon icon={faUnlockAlt} />
                                                    </InputGroup.Text>
                                                    <Form.Control autoFocus required type="password" onChange={e => onChange(e.target.value)}
                                                        onBlur={onBlur}
                                                        style={{ borderColor: errors.confirmPassword?.type === "required" && 'red' }}
                                                       
                                                    />
                                                </InputGroup>
                                            )}
                                            rules={{ required: true, minLength: 8 }}
                                        />
                                        <span style={{ color: 'red', fontSize: 12 }} >{errors.confirmPassword?.type === 'minLength' && "* Mật khẩu cần ít nhất là 8 ký tự"}</span>
                                    </Form.Group>
                                    <Button variant="primary" type="button" className="w-100" onClick={handleSubmit(changePassord)} >
                                        Reset password
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
