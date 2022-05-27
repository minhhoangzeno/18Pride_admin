import { Button, Container, Form, InputGroup, Row } from '@themesberg/react-bootstrap';
import React, { useState } from 'react';
import Datetime from 'react-datetime';
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { addAttendanceThunk } from '../../redux/attendanceSlice';
import { Routes } from '../../routes';
import ModalSuccess from './ModalSuccess';
export default () => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  let { addToast } = useToasts();
  let history = useHistory()
  let dispatch = useDispatch();
  let [startDate, setStartDate] = useState(new Date());
  let [endDate, setEndDate] = useState(new Date());
  const [code, setCode] = useState();
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false)
  }
  function makeid(length) {
    var text = "";
    var possible = "0123456789";

    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }
  let addData = async (form) => {
    let data = {
      title: form.title,
      code: makeid(3),
      startDate: startDate,
      endDate: endDate
    }
    let response = await dispatch(addAttendanceThunk(data));
    if (response) {
      addToast("Success", { appearance: 'success', autoDismiss: 1000 });
      setCode(response?.code);
      setShow(true)
    }

  }

  return (
    <Container>
      <ModalSuccess show={show} handleClose={handleClose} code={code} />
      <Row>
        <h3 className="mb-3">Thêm điểm danh</h3>
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
                  />
                </InputGroup>
              )}
              rules={{
                required: true
              }}
            />
          </Form.Group>

          <br />
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Time start</Form.Label>
            <Datetime
              value={startDate}
              onChange={e => setStartDate(e)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Time end</Form.Label>
            <Datetime
              value={endDate}
              onChange={e => setEndDate(e)}
            />
          </Form.Group>

          <Button variant="primary" type="button" onClick={handleSubmit(addData)} >
            Submit
          </Button>
          <Button variant="secondary" type="button" className="m-3"
            onClick={() => history.push(Routes.Attendance.path)}
          >
            Cancel
          </Button>
        </Form>
      </Row>
    </Container>
  )
}