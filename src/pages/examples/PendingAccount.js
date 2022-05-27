
import { Button, Card, Col, Container, Image, Row } from '@themesberg/react-bootstrap';
import React from "react";
import { Link } from 'react-router-dom';
import NotFoundImage from "../../assets/img/illustrations/404.svg";
import { Routes } from "../../routes";




export default () => {
    return (
        <main>
            <section className="vh-100 d-flex align-items-center justify-content-center">
                <Container>
                    <Row>
                        <Col xs={12} className="text-center d-flex align-items-center justify-content-center">
                            <div>
                                <Card.Link as={Link} to={Routes.DashboardOverview.path}>
                                    <Image src={NotFoundImage} className="img-fluid w-75" />
                                </Card.Link>
                                <h1 className="text-primary mt-5">
                                    {/* Page not <span className="fw-bolder">found</span> */}
                                    <span className="fw-bolder">Kiểm tra email để kích hoạt tài khoản</span>
                                </h1>
                                <p className="lead my-4">
                                    Chúng tôi đã gửi cho Bạn email kích hoạt tài khoản. Bạn vui lòng kiểm tra email và
                                    thực hiện theo hướng dẫn.
                                </p>
                                <Button variant="primary" className="animate-hover" >
                                    <a href="https://mail.google.com/mail/u/0/#inbox" target="_blank" rel="noopener noreferrer" >
                                        <span style={{ color: '#fff' }} >Open Mail</span>
                                    </a>
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </main>
    );
};
