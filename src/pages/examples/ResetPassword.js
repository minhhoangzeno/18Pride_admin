
import { faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Container, Form, InputGroup, Row } from '@themesberg/react-bootstrap';
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { checkBeforePasswordThunk, resetPasswordThunk } from "../../redux/authSlice";
import { Routes } from "../../routes";
import NotFound from "./NotFound";



export default (props) => {
  let { confirmationCode } = props.match.params;
  const { control, handleSubmit,  formState: { errors } } = useForm();

  let dispatch = useDispatch()
  const [checkVerify, setCheckVerify] = useState(false);

  let searchCheckBeforeResetPassword = async () => {
    let data = await dispatch(checkBeforePasswordThunk(confirmationCode));
    if (data) {
      setCheckVerify(true)
    }
  }
  useEffect(() => {
    searchCheckBeforeResetPassword() // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  let history = useHistory()
  let { addToast } = useToasts()
  let resetPassword = async (form) => {
    if (form.newPassword !== form.confirmPassword) {
      addToast("Mật khẩu nhập lại chưa đúng", { appearance: 'error', autoDismiss: 2000 })
    } else {
      let data = await dispatch(resetPasswordThunk(confirmationCode, form.newPassword));
      if (data) {
        addToast("Thay đổi mật khẩu thành công", { appearance: 'success', autoDismiss: 2000 })
        history.push(Routes.Signin.path)
      }

      console.log(data)
    }


  }
  return (
    <>
      {checkVerify ? <main>
        <section className="bg-soft d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
          <Container>
            <Row className="justify-content-center">
              <Col xs={12} className="d-flex align-items-center justify-content-center">
                <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                  <h3 className="mb-4">Reset password</h3>
                  <Form>
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
                      <span style={{ color: 'red', fontSize: 12 }} >{errors.password?.type === 'minLength' && "* Mật khẩu cần ít nhất là 8 ký tự"}</span>
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
                      <span style={{ color: 'red', fontSize: 12 }} >{errors.password?.type === 'minLength' && "* Mật khẩu cần ít nhất là 8 ký tự"}</span>
                    </Form.Group>
                    <Button variant="primary" type="submit" className="w-100" onClick={handleSubmit(resetPassword)} >
                      Reset password
                    </Button>
                  </Form>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </main> : <NotFound />}
    </>
  );
};
