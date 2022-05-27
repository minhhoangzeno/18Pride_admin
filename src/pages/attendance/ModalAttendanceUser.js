import { Form, InputGroup } from '@themesberg/react-bootstrap';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import { statusByUserAttendanceThunk } from '../../redux/attendanceSlice';

export default ({ show, handleClose, attendanceUser, search }) => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [message, setMessage] = useState();
  let { addToast } = useToasts();
  let dispatch = useDispatch();
  const submitStatus = async (form) => {
    const data = {
      attendance: attendanceUser?.attendance?._id,
      code: form?.code
    }
    let resp = await dispatch(statusByUserAttendanceThunk(data));
    if (resp) {
      if (resp?.message) {
        setMessage(resp?.message)
      } else {
        addToast("Success", { appearance: 'success', autoDismiss: 1000 })
        search()
        handleClose()
      }
    }
  }
  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Nhập mã code</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Mã code (gồm 3 ký tự) </Form.Label>
            <Controller
              control={control}
              name="code"
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
            <small className="text-muted" style={{ color: 'red' }} >{message}</small>
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