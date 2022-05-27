import { faEdit, faEye, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faEllipsisH, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, ButtonGroup, Card, Col, Container, Dropdown, Row, Table } from '@themesberg/react-bootstrap';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { deleteAttendanceThunk, getAttendanceThunk } from '../../redux/attendanceSlice';
import { Routes } from "../../routes";

export default () => {
  let history = useHistory();
  let attendance = useSelector(state => state.attendance.data);

  let dispatch = useDispatch();


  let { addToast } = useToasts()
  let search = async () => {
    dispatch(getAttendanceThunk())
  }
  useEffect(() => {
    search() // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 



  let deleteAttendance = async (attendanceId) => {
    await dispatch(deleteAttendanceThunk(attendanceId));
    search()
    addToast("Delete Success", { appearance: 'success', autoDismiss: 1000 })
  }

  let routerDetailAttendance = (data) => {
    history.push({
      pathname: Routes.AttendanceDetail.path,
      state: data
    })
  }
  let routerEditAttendance = (data) => {
    history.push({
      pathname: Routes.AttendanceEdit.path,
      state: data
    })
  }
  return (
    <Container>
      <Row className="mb-4" >
        <Col>
          <Button variant="warning" onClick={() => history.push(Routes.AttendanceAdd.path)} >
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
                  <th className="border-bottom">Mã code</th>
                  <th className="border-bottom">Thời gian</th>
                  <th className="border-bottom">Cài đặt</th>
                </tr>
              </thead>
              <tbody>
                {attendance && attendance.map((attendanceItem, index) => {
                  return (
                    <TableItem index={index + 1} attendance={attendanceItem} key={index} routerEditAttendance={routerEditAttendance}
                      deleteAttendance={deleteAttendance}
                      routerDetailAttendance={routerDetailAttendance}
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

function TableItem({ index, attendance, routerDetailAttendance, deleteAttendance, routerEditAttendance }) {
  return (
    <tr>
      <td>
        <Card.Link href="#" className="text-primary fw-bold">{index}</Card.Link>
      </td>
      <td>{attendance?.title}</td>
      <td>{attendance?.code}</td>
      <td>{`${moment(attendance?.startDate).format("HH:mm DD/MM/YYYY")} - ${moment(attendance?.endDate).format("HH:mm DD/MM/YYYY")}`}</td>
      <td>
        <Dropdown as={ButtonGroup}>
          <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
            <span className="icon icon-sm">
              <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
            </span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => routerDetailAttendance(attendance)} >
              <FontAwesomeIcon icon={faEye} className="me-2" /> Xem
            </Dropdown.Item>
            <Dropdown.Item onClick={() => routerEditAttendance(attendance)} >
              <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
            </Dropdown.Item>
            <Dropdown.Item className="text-danger" onClick={() => deleteAttendance(attendance._id)}  >
              <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Remove
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </td>
    </tr>
  );
}   
