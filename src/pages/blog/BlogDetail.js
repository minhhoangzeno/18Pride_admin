import { Button, Container, Form, Row } from '@themesberg/react-bootstrap';
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { SERVER } from '../../apis/API';
import { Routes } from '../../routes';

export default () => {
    let history = useHistory()
    let location = useLocation();
    let blog = location.state;
    return (
        <Container>
            <Row>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <h2>{blog?.title}</h2>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <p dangerouslySetInnerHTML={{ __html: blog?.metaDescription }} ></p>

                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <p dangerouslySetInnerHTML={{ __html: blog?.content }} ></p>

                    </Form.Group>

                    <Form.Group className="mt-4" >
                        <Form.Label>Ảnh</Form.Label>
                        <div className="d-xl-flex align-items-center">
                            <div className="user-avatar xl-avatar">
                                <img src={`${SERVER.URL_IMAGE}${blog.photoURL}`} alt=""
                                    width={300} height={200} style={{objectFit:'contain'}}
                                />
                            </div>
                        </div>
                    </Form.Group>
                    <Button variant="secondary" type="button" className="m-3"
                        onClick={() => history.push(Routes.Blog.path)}
                    >
                        Cancel
                    </Button>
                </Form>
            </Row>
        </Container>
    )
}