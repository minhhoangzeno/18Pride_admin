import { faEye } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Col, Dropdown, Row, Table } from '@themesberg/react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Routes } from '../../routes';
import { getPayment, paymentUserStatisticByAdmin } from '../../services/payment.service';


export default () => {
  const [payments, setPayments] = useState([]);
  const [payment, setPayment] = useState();
  const [paymentSelect, setPaymentSelect] = useState();
  let history = useHistory();
  let search = async () => {
    let res = await (getPayment());
    if (res.length > 0) {
      setPayments(res)
      let data = await (paymentUserStatisticByAdmin(`${res[0]?._id}`));
      setPaymentSelect(res[0]);
      if (data) {
        setPayment(data);
      }
    }
  }
  let searchDetail = async () => {
    if (paymentSelect?._id) {
      let data = await (paymentUserStatisticByAdmin(paymentSelect?._id.toString()));
      if (data) {
        setPayment(data)
      }
    }
  }

  useEffect(() => {
    searchDetail() // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentSelect])
  useEffect(() => {
    search() // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Card border="light" className="shadow-sm">
      <Card.Header>
        <Row className="align-items-center">
          <Col>
            <h5>Học phí</h5>
          </Col>
          <Col className="text-end">
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {paymentSelect?.title}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {payments.map((item, index) => {
                  return (
                    <Dropdown.Item key={index} onClick={() => setPaymentSelect(item)} >{item?.title}</Dropdown.Item>
                  )
                })}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </Card.Header>
      <Table responsive className="align-items-center table-flush">
        <thead className="thead-light">
          <tr>
            <th scope="col">Đã nộp</th>
            <th scope="col">Chưa nộp</th>
            <th scope="col">Tổng</th>
            <th scope="col">Đã thu</th>
            <th scope="col">Chưa thu</th>
            <th scope="col">Tổng số học phí</th>
            <th scope="col">Cài đặt</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{payment?.quality?.paymentUserPaids}</td>
            <td>{payment?.quality?.paymentUserNotPaids}</td>
            <td>{payment?.quality?.paymentUserTotal}</td>
            <td>{payment?.amount?.paymentUserPaids}</td>
            <td>{payment?.amount?.paymentUserNotPaids}</td>
            <td>{payment?.amount?.paymentUserTotal}</td>
            <td>
              <FontAwesomeIcon onClick={() => history.push(Routes.Payment.path)} icon={faEye} style={{ cursor: 'pointer' }} />
            </td>
          </tr>
        </tbody>
      </Table>
    </Card>
  );
}