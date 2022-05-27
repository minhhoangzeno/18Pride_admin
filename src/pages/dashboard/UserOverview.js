import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Col, Row } from '@themesberg/react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getDashboardUserThunk } from '../../redux/dashboardSlice';

export default () => {
    const [data, setData] = useState([]);
    let dispatch = useDispatch();
    let search = async () => {
        let res = await dispatch(getDashboardUserThunk());
        if(res){
            setData(res)
        }
    }
    useEffect(() => {
        search() // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <Col xs={12} sm={6} xl={4} className="mb-4">
            <CounterWidget
                category="Users"
                title={data?.length}
                period="Feb 1 - Apr 1"
                percentage={18.2}
                icon={faChartLine}
                iconColor="shape-secondary"
            />
        </Col>

    )
}

const CounterWidget = (props) => {
    const { icon, iconColor, category, title } = props;
   
    return (
      <Card border="light" className="shadow-sm">
        <Card.Body>
          <Row className="d-block d-xl-flex align-items-center">
            <Col xl={5} className="text-xl-center d-flex align-items-center justify-content-xl-center mb-3 mb-xl-0">
              <div className={`icon icon-shape icon-md icon-${iconColor} rounded me-4 me-sm-0`}>
                <FontAwesomeIcon icon={icon} />
              </div>
              <div className="d-sm-none">
                <h5>{category}</h5>
                <h3 className="mb-1">{title}</h3>
              </div>
            </Col>
            <Col xs={12} xl={7} className="px-xl-0">
              <div className="d-none d-sm-block">
                <h5>{category}</h5>
                <h3 className="mb-1">{title}</h3>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  };