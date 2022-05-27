import { Form, InputGroup } from '@themesberg/react-bootstrap';
import React from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addPaymentByUserThunk } from '../../redux/paymentSlice';

export default ({ show, handleClose, payment }) => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  let dispatch = useDispatch();
  const submitStatus = async (form) => {
    const data = {
      orderType: "billpayment",
      amount: payment?.payment?.fee,
      orderDescription: form?.orderDescription,
      bankCode: "NCB",
      language: "vn",
      paymentUser: payment?._id
    }
    let resp = await dispatch(addPaymentByUserThunk(data));
    if (resp) {
      window.open(resp, "_blank")
    }
  }
  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Nhập nội dung chuyển khoản</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Nội dung (ghi rõ Họ tên, Mã sinh viên, Khóa)</Form.Label>
            <Controller
              control={control}
              name="orderDescription"
              render={({
                field: { onChange, onBlur, value }
              }) => (
                <InputGroup style={{ border: errors.title?.type === "required" && '1px solid red' }}>
                  <Form.Control autoFocus required type="text" onChange={e => onChange(e.target.value)}
                    onBlur={onBlur}
                  />
                </InputGroup>
              )}
              rules={{
                required: true
              }}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {
            handleClose();
          }}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleSubmit(submitStatus)} style={{ marginLeft: 10 }} >
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}