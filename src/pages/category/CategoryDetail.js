import { Button, Container, Form, InputGroup, Row } from '@themesberg/react-bootstrap';
import React from 'react';
import { Controller, useForm } from "react-hook-form";
import { useHistory, useLocation } from 'react-router-dom';
import { Routes } from '../../routes';

export default () => {
  const { control, formState: { errors } } = useForm();
  const location = useLocation();
  let category = location.state;
  let history = useHistory()
  
  return (
    <Container>
      <Row>
        <h3 className="mb-3">Chi tiết danh mục</h3>
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
                    value={value}
                    disabled
                  />
                </InputGroup>
              )}
              rules={{
                required: true
              }}
              defaultValue={category.title}
            />
          </Form.Group>
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