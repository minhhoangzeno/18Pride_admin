
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Container, Image, Row } from '@themesberg/react-bootstrap';
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import ErrorImage from "../../assets/img/illustrations/bs5-illustrations.svg";
import { verifyEmailThunk } from "../../redux/authSlice";
import { Routes } from "../../routes";
import NotFound from "./NotFound";



export default (props) => {
  let { confirmationCode } = props.match.params;
  let dispatch = useDispatch();
  const [checkVerify, setCheckVerify] = useState(false);

  let searchVerifyEmail = async () => {
    let data = await dispatch(verifyEmailThunk(confirmationCode));
    if (data) {
      setCheckVerify(true)
    }
  }
  useEffect(() => {
    searchVerifyEmail() 
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <>
      {checkVerify ? <main>
        < section className="vh-100 d-flex align-items-center justify-content-center" >
          <Container>
            <Row className="align-items-center">
              <Col xs={12} lg={5} className="order-2 order-lg-1 text-center text-lg-left">
                <h1 className="text-primary mt-5">
                  Thank you <span className="fw-bolder">seriously</span> wrong
                </h1>
                <p className="lead my-4">
                  It's always time for a coffee break. We should be back by the time you finish your coffee.
                </p>
                <Button as={Link} variant="primary" className="animate-hover" to={Routes.Signin.path}>
                  <FontAwesomeIcon icon={faChevronLeft} className="animate-left-3 me-3 ms-2" />
                  Go back to Sign in
                </Button>
              </Col>
              <Col xs={12} lg={7} className="order-1 order-lg-2 text-center d-flex align-items-center justify-content-center">
                <Image src={ErrorImage} className="img-fluid w-75" />
              </Col>
            </Row>
          </Container>
        </section >
      </main >
        : <NotFound />
      }
    </>

  );
};
