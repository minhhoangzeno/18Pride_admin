import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Container, Form, InputGroup, Row } from '@themesberg/react-bootstrap';
import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { apiUrl } from '../../enviroment';
import { Routes } from '../../routes';
import Loading from '../layout/Loading';

export default () => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [file, setFile] = useState();
  let { addToast } = useToasts();
  let history = useHistory();
  const [tags, setTags] = useState();
  const [tagId, setTagId] = useState();
  const [loading, setLoading] = useState(false);
  let addVideoYoutube = (form) => {
    setLoading(true);
    let data = new FormData();
    data.append("title", form.title);
    data.append("videoID", form.videoID);
    data.append("tag", tagId);
    data.append("time", form.time);
    data.append("people", form.people);
    data.append("metaDescription", form.metaDescription);
    data.append("description", form.description);
    data.append("file", file);
    axios({
      method: 'POST',
      url: `${apiUrl}/video-youtube`,
      data: data,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }).then(() => {
      setLoading(false);
      history.push(Routes.VideoYoutube.path);
      addToast("Add Video Youtube Success", { appearance: 'success', autoDismiss: 1000 });
    }).catch(error => {
      setLoading(false);
      if (error.response) {
        addToast(error.response.data.message, { appearance: 'error', autoDismiss: 2000 });
      } else {
        addToast("Error", { appearance: 'error', autoDismiss: 2000 });
      }
    })
  }
  useEffect(() => {
    searchTag()
  }, [])
  const searchTag = () => {
    setLoading(true);
    axios({
      method: 'GET',
      url: `${apiUrl}/tag`
    }).then((result) => {
      setLoading(false);
      setTags(result.data.data);
      setTagId(result.data.data[0]?._id);
    }).catch(err => {
      setLoading(false);
    })
  }
  return (
    <Container>
      <Row>
        <h3 className="mb-3">Add Video Youtube</h3>
        <Loading loading={loading} />
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
                  />
                </InputGroup>
              )}
              rules={{
                required: true
              }}
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
                  />
                </InputGroup>
              )}
              rules={{
                required: true
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Tag</Form.Label>
            <select value={tagId} onChange={e => setTagId(e.target.value)} >
              {tags && tags?.map((tag, index) => {
                return (
                  <option key={index} value={tag?._id} >{tag?.name}</option>
                )
              })}
            </select>
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
                  />
                </InputGroup>
              )}
              rules={{
                required: true
              }}
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
                />
              )}
              name="metaDescription"
              defaultValue=""
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
                />
              )}
              name="description"
              defaultValue=""
              rules={{ required: true }}
            />
          </Form.Group>

          <Form.Group className="mt-4" >
            <Form.Label>Image</Form.Label>
            <div className="d-xl-flex align-items-center">
              <div className="user-avatar xl-avatar">
                {file && <img id="target" src={URL.createObjectURL(file)} alt="" />}
              </div>
              <div className="file-field">
                <div className="d-flex justify-content-xl-center ms-xl-3">
                  <div className="d-flex">
                    <span className="icon icon-md">
                      <FontAwesomeIcon icon={faPaperclip} className="me-3" />
                    </span>
                    <input type="file"
                      onChange={e => setFile(e.target.files[0])}
                    />
                    <div className="d-md-block text-start">
                      <div className="fw-normal text-dark mb-1">Choose Image</div>
                      <div className="text-gray small">JPG, GIF or PNG</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Form.Group>
          <Button variant="secondary" type="button" className="m-3"
            onClick={() => history.push(Routes.VideoYoutube.path)}>
            Cancel
          </Button>
          <Button variant="primary" type="button" onClick={handleSubmit(addVideoYoutube)} >
            Submit
          </Button>
        </Form>
      </Row>
    </Container>
  )
}