import { faEdit, faEye, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faEllipsisH, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, ButtonGroup, Card, Col, Container, Dropdown, Row, Table } from '@themesberg/react-bootstrap';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { deletePaymentThunk, getPaymentThunk } from '../../redux/paymentSlice';
import { Routes } from "../../routes";

export default () => {
  let history = useHistory();
  let payment = useSelector(state => state.payment.data);

  let dispatch = useDispatch();


  let { addToast } = useToasts()
  let search = async () => {
    dispatch(getPaymentThunk())
  }
  useEffect(() => {
    search() // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 



  let deletePayment = async (paymentId) => {
    await dispatch(deletePaymentThunk(paymentId));
    search()
    addToast("Delete Success", { appearance: 'success', autoDismiss: 1000 })
  }

  let routerDetailPayment = (data) => {
    history.push({
      pathname: Routes.PaymentDetail.path,
      state: data
    })
  }
  let routerEditPayment = (data) => {
    history.push({
      pathname: Routes.PaymentEdit.path,
      state: data
    })
  }
  return (
    <Container>
      <Row className="mb-4" >
        <Col>
          <Button variant="warning" onClick={() => history.push(Routes.PaymentAdd.path)} >
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </Col>
      </Row>
      <Row>
        <Card border="light" className="table-wrapper table-responsive shadow-sm">
          <Card.Body className="pt-0">
            <Table hover className="user-table align-items-center">
              <thead>
                <tr>
                  <th className="border-bottom">#</th>
                  <th className="border-bottom">Tiêu đề</th>
                  <th className="border-bottom">Học phí</th>
                  <th className="border-bottom">Cài đặt</th>
                </tr>
              </thead>
              <tbody>
                {payment && payment.map((paymentItem, index) => {
                  return (
                    <TableItem index={index + 1} payment={paymentItem} key={index} routerEditPayment={routerEditPayment}
                      deletePayment={deletePayment}
                      routerDetailPayment={routerDetailPayment}
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

function TableItem({ index, payment, routerDetailPayment, deletePayment, routerEditPayment }) {
  return (
    <tr>
      <td>
        <Card.Link href="#" className="text-primary fw-bold">{index}</Card.Link>
      </td>
      <td>{payment?.title}</td>
      <td>{payment?.fee}</td>
      <td>
        <Dropdown as={ButtonGroup}>
          <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
            <span className="icon icon-sm">
              <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
            </span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => routerDetailPayment(payment)} >
              <FontAwesomeIcon icon={faEye} className="me-2" /> Xem
            </Dropdown.Item>
            <Dropdown.Item onClick={() => routerEditPayment(payment)} >
              <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
            </Dropdown.Item>
            <Dropdown.Item className="text-danger" onClick={() => deletePayment(payment._id)}  >
              <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Remove
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </td>
    </tr>
  );
}   
