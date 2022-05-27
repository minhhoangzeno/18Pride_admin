import { Button, Container, Form, InputGroup, Row } from '@themesberg/react-bootstrap';
import React from 'react';
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { editPaymentThunk } from '../../redux/paymentSlice';
import { Routes } from '../../routes';
export default () => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  let { addToast } = useToasts();
  const location = useLocation();
  const payment = location.state;
  let history = useHistory()
  let dispatch = useDispatch();
 

  let addData = async (form) => {
    let data = {
      title: form?.title,
      fee: form?.fee
    }
    let response = await dispatch(editPaymentThunk(payment?._id, data));
    if (response) {
      addToast("Success", { appearance: 'success', autoDismiss: 1000 });
      history.push(Routes.Payment.path)
    }

  }

  return (
    <Container>
      <Row>
        <h3 className="mb-3">Sửa học phí</h3>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Tiêu đề</Form.Label>
            <Controller
              control={control}
              name="title"
              render={({
                field: { onChange, onBlur, value }
              }) => (
                <InputGroup style={{ border: errors.title?.type === "required" && '1px solid red' }}>
                  <Form.Control autoFocus required type="text" onChange={e => onChange(e.target.value)}
                    onBlur={onBlur}
                    value={value}
                  />
                </InputGroup>
              )}
              rules={{
                required: true
              }}
              defaultValue={payment?.title}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Học phí</Form.Label>
            <Controller
              control={control}
              name="fee"
              render={({
                field: { onChange, onBlur, value }
              }) => (
                <InputGroup style={{ border: errors.title?.type === "required" && '1px solid red' }}>
                  <Form.Control autoFocus required type="text" onChange={e => onChange(e.target.value)}
                    onBlur={onBlur}
                    value={value}
                  />
                </InputGroup>
              )}
              rules={{
                required: true
              }}
              defaultValue={payment?.fee}
            />
          </Form.Group>

          <Button variant="primary" type="button" onClick={handleSubmit(addData)} >
            Submit
          </Button>
          <Button variant="secondary" type="button" className="m-3"
            onClick={() => history.push(Routes.Payment.path)}
          >
            Cancel
          </Button>
        </Form>
      </Row>
    </Container>
  )
}