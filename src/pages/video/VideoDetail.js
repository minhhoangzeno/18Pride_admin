import { faTags } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Container, Form, Row } from '@themesberg/react-bootstrap';
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { SERVER } from '../../apis/API';
import { Routes } from '../../routes';

export default () => {
    let history = useHistory()
    let location = useLocation();
    let video = location.state;
    return (
        <Container>
            <Row>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <h4>{video?.title}</h4>
                        <div
                            className="d-flex mt-4" style={{ width: '100%', justifyContent: 'flex-start' }}
                        ><FontAwesomeIcon icon={faTags} /> <small className="text-muted" style={{ marginLeft: 10 }} > {video?.category?.title}</small></div>
                    </Form.Group>
                    <div className="video-responsive">
                        <iframe
                            width="500"
                            height="480"
                            src={`https://www.youtube.com/embed/${video?.videoUrl}`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="Embedded youtube"
                        />
                    </div>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <p dangerouslySetInnerHTML={{ __html: video?.metaDescription }} ></p>

                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <p dangerouslySetInnerHTML={{ __html: video?.content }} ></p>

                    </Form.Group>

                    <Form.Group className="mt-4" >
                        <Form.Label>Ảnh</Form.Label>
                        <div className="d-xl-flex align-items-center">
                            <div className="user-avatar xl-avatar">
                                <img src={`${SERVER.URL_IMAGE}${video.photoURL}`} alt=""
                                    width={300} height={200} style={{ objectFit: 'contain' }}
                                />
                            </div>
                        </div>
                    </Form.Group>
                    <Button variant="secondary" type="button" className="m-3"
                        onClick={() => history.push(Routes.Video.path)}
                    >
                        Cancel
                    </Button>
                </Form>
            </Row>
        </Container>
    )
}