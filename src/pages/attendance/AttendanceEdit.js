import { Button, Container, Form, InputGroup, Row } from '@themesberg/react-bootstrap';
import React, { useState } from 'react';
import Datetime from 'react-datetime';
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { editAttendanceThunk } from '../../redux/attendanceSlice';
import { Routes } from '../../routes';
export default () => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  let { addToast } = useToasts();
  const location = useLocation();
  const attendance = location.state;
  let history = useHistory()
  let dispatch = useDispatch();
  const [startDate, setStartDate] = useState(new Date(attendance.startDate))
  const [endDate, setEndDate] = useState(new Date(attendance.endDate))

  let addData = async (form) => {
    let data = {
      title: form.title,
      code: attendance?.code,
      startDate: startDate,
      endDate: endDate
    }
    let response = await dispatch(editAttendanceThunk(attendance?._id, data));
    if (response) {
      addToast("Success", { appearance: 'success', autoDismiss: 1000 });
      history.push(Routes.Attendance.path)
    }

  }

  return (
    <Container>
      <Row>
        <h3 className="mb-3">Sửa điểm danh</h3>
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
              defaultValue={attendance?.title}
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