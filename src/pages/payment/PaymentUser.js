import { faCheckCircle, faEdit } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Container, Row, Table } from '@themesberg/react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getPaymentUserThunk } from '../../redux/paymentSlice';
import ModalPaymentUser from './ModalPaymentUser';

export default () => {
  const [payment, setPayment] = useState();
  let dispatch = useDispatch();
  let search = async () => {
    const resp = await dispatch(getPaymentUserThunk());
    if (resp) {
      setPayment(resp)
    }
  }
  useEffect(() => {
    search() // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <Container>
      <Row>
        <Card border="light" className="table-wrapper table-responsive shadow-sm">
          <Card.Body className="pt-0">
            <Table hover className="user-table align-items-center">
              <thead>
                <tr>
                  <th className="border-bottom">#</th>
                  <th className="border-bottom">Tiêu đề</th>
                  <th className="border-bottom">Học phí</th>
                  <th className="border-bottom">Trạng thái</th>
                  <th className="border-bottom">Nộp học phí</th>
                </tr>
              </thead>
              <tbody>
                {payment && payment.map((paymentItem, index) => {
                  return (
                    <TableItem index={index + 1} payment={paymentItem} key={index}
                      search={search}
                    />
                  )
                })}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  )
}

function TableItem({ index, payment, search }) {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false)
  }
  return (
    <tr>
      <ModalPaymentUser show={show} handleClose={handleClose} search={search} payment={payment} />
      <td>
        <Card.Link href="#" className="text-primary fw-bold">{index}</Card.Link>
      </td>
      <td>{payment?.payment?.title}</td>
      <td>{payment?.payment?.fee}</td>
      <td>{payment?.status}</td>
      <td>{payment?.status === "Đã nộp" ? <FontAwesomeIcon icon={faCheckCircle} /> : <FontAwesomeIcon icon={faEdit} className="me-2"
        style={{ cursor: 'pointer' }}
        onClick={() => setShow(true)}
      />}</td>
    </tr>
  );
}   
