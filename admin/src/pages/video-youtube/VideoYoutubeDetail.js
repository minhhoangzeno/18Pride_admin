import { Button, Container, Form, Image, InputGroup, Row } from '@themesberg/react-bootstrap';
import React from 'react';
import { Controller, useForm } from "react-hook-form";
import { useHistory, useLocation } from 'react-router-dom';
import { Routes } from '../../routes';

export default () => {
  const { control, formState: { errors } } = useForm();
  const location = useLocation();
  const video = location.state;

  let history = useHistory();

  return (
    <Container>
      <Row>
        <h3 className="mb-3">Detail Video Youtube</h3>
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
              defaultValue={video.title}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Time</Form.Label>
            <Controller
              control={control}
              name="time"
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
              defaultValue={video.time}

            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>People</Form.Label>
            <Controller
              control={control}
              name="people"
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
              defaultValue={video.people}

            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Video Youtube Url</Form.Label>
            <Controller
              control={control}
              name="videoID"
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
              defaultValue={`https://www.youtube.com/watch?v=${video.videoID}`}

            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Meta description</Form.Label>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <textarea
                  className="form-control "
                  value={value}
                  onChange={e => onChange(e.target.value)}
                  onBlur={onBlur}
                  style={{ height: 200 }}
                  disabled
                />
              )}
              name="metaDescription"
              defaultValue={video.metaDescription}
              rules={{ required: true }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Nội dung</Form.Label>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <textarea
                  className="form-control "
                  value={value}
                  onChange={e => onChange(e.target.value)}
                  onBlur={onBlur}
                  style={{ height: 200 }}
                  disabled
                />
              )}
              name="description"
              defaultValue={video.description}
              rules={{ required: true }}
            />
          </Form.Group>

          <Form.Group className="mt-4" >
            <Form.Label>Image</Form.Label>
            <div className="d-xl-flex align-items-center">
              <div className="user-avatar xl-avatar">
                <Image src={video?.photoURL} alt="photoURL" className="user-avatar xl-avatar" />

              </div>

            </div>
          </Form.Group>
          <Button variant="secondary" type="button" className="m-3"
            onClick={() => history.push(Routes.VideoYoutube.path)}>
            Cancel
          </Button>

        </Form>
      </Row>
    </Container>
  )
}