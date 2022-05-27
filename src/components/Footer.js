
import { Card, Col, Row } from '@themesberg/react-bootstrap';
import moment from "moment-timezone";
import React from "react";

export default (props) => {
  const currentYear = moment().get("year");


  return (
    <div>

      <footer className="footer section py-5">
        <Row>
          <Col xs={12} lg={6} className="mb-4 mb-lg-0">
            <p className="mb-0 text-center text-xl-left">
              Copyright © 2021-{`${currentYear} `}
              <Card.Link href="https://www.facebook.com/CLBTaekwondoNEU" target="_blank" className="text-blue text-decoration-none fw-normal">
                Taekwondo Neu
              </Card.Link>
            </p>
          </Col>
        </Row>
      </footer>
    </div>
  );
};
