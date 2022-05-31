import { Button, Container, Form, InputGroup, Row } from '@themesberg/react-bootstrap';
import axios from 'axios';
import React from 'react';
import { Controller, useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { apiUrl } from '../../enviroment';
import { Routes } from '../../routes';

export default () => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  let { addToast } = useToasts();
  let history = useHistory();
  let addTag = (form) => {
    axios({
      method: 'POST',
      url: `${apiUrl}/tag`,
      data: form
    }).then(() => {
      history.push(Routes.Tag.path);
      addToast("Add Tag Success", { appearance: 'success', autoDismiss: 1000 });
    }).catch(error => {
      if (error.response) {
        addToast(error.response.data.message, { appearance: 'error', autoDismiss: 2000 });
      } else {
        addToast("Error", { appearance: 'error', autoDismiss: 2000 });
      }
    })
  }
  return (
    <Container>
      <Row>
        <h3 className="mb-3">Add Tag</h3>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Controller
              control={control}
              name="name"
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

          <Button variant="secondary" type="button" className="m-3"
            onClick={() => history.push(Routes.Tag.path)}>
            Cancel
          </Button>
          <Button variant="primary" type="button" onClick={handleSubmit(addTag)} >
            Submit
          </Button>
        </Form>
      </Row>
    </Container>
  )
}