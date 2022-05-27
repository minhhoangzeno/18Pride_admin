import { faUserClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Col, Row } from '@themesberg/react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Routes } from '../../routes';
import { attendanceUserStatistic } from '../../services/attendance.service';

export default () => {
  const [data, setData] = useState([]);
  let search = async () => {
    let res = await (attendanceUserStatistic());
    if (res) {
      setData(res)
    }
  }
  useEffect(() => {
    search() // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Col xs={12} sm={6} xl={4} className="mb-4">
      <CounterWidget
        category="Bạn đã điểm danh"
        title={`${data?.attendanceUserNotPaids} / ${data?.attendanceUserPaids} lần`}
        period="Feb 1 - Apr 1"
        percentage={18.2}
        icon={faUserClock}
        iconColor="shape-secondary"
      />
    </Col>

  )
}

const CounterWidget = (props) => {
  const { icon, iconColor, category, title } = props;
  let history = useHistory();
  return (
    <Card border="light" className="shadow-sm"
      onClick={() => {
        history.push(Routes.AttendanceUser.path)
      }}
      style={{ cursor: 'pointer' }}
    >
      <Card.Body>
        <Row className="d-block d-xl-flex align-items-center">
          <Col xl={5} className="text-xl-center d-flex align-items-center justify-content-xl-center mb-3 mb-xl-0">
            <div className={`icon icon-shape icon-md icon-${iconColor} rounded me-4 me-sm-0`}>
              <FontAwesomeIcon icon={icon} />
            </div>
            <div className="d-sm-none">
              <h5>{category}</h5>
              <p className="mb-1">{title}</p>
            </div>
          </Col>
          <Col xs={12} xl={7} className="px-xl-0">
            <div className="d-none d-sm-block">
              <h5>{category}</h5>
              <p className="mb-1">{title}</p>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};