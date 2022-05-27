import { Button, Container, Form, InputGroup, Row } from '@themesberg/react-bootstrap';
import React from 'react';
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { addCategoryThunk } from '../../redux/categorySlice';
import { Routes } from '../../routes';

export default () => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  let { addToast } = useToasts();
  let history = useHistory()
  let dispatch = useDispatch();
  let addData = async (form) => {
    dispatch(addCategoryThunk({
      title: form.title
    }))
    addToast("Success", { appearance: 'success', autoDismiss: 1000 });
    history.push(Routes.Category.path)
  }
  return (
    <Container>
      <Row>
        <h3 className="mb-3">Thêm danh mục</h3>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Title</Form.Label>
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
          <Button variant="primary" type="button" onClick={handleSubmit(addData)} >
            Submit
          </Button>
          <Button variant="secondary" type="button" className="m-3"
            onClick={() => history.push(Routes.Category.path)}
          >
            Cancel
          </Button>
        </Form>
      </Row>
    </Container>
  )
}