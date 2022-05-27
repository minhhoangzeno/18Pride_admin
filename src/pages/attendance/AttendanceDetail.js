import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Col, Container, Row, Table } from '@themesberg/react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { detailAttendanceThunk } from '../../redux/attendanceSlice';
import ModalStatusByAdmin from './ModalStatusByAdmin';

export default () => {
  let history = useHistory();
  const location = useLocation();
  const attendance = location.state;
  const [attendanceUsers, setAttendanceUsers] = useState([]);
  const [status, setStatus] = useState("Tất cả")
  let dispatch = useDispatch();


  let search = async () => {
    let resp = await dispatch(detailAttendanceThunk({
      attendanceId: attendance?._id,
      status: status
    }))
    if (resp) {
      console.log(resp)
      setAttendanceUsers(resp)
    }
  }
  useEffect(() => {
    search() // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attendance?._id]);

  return (
    <Container>
      <Row className="mb-4" >
        <Col>
          <select value={status}
            onChange={e => setStatus(e.target.value)}
          >
            <option value={"Tất cả"} >Tất cả</option>
            <option value={"Chưa điểm danh"}>Chưa điểm danh</option>
            <option value={"Đã điểm danh"}>Đã điểm danh</option>
          </select>
          <Button variant="primary" onClick={() => search()} style={{ marginLeft: 15 }} >
            <FontAwesomeIcon icon={faSearch} />
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
                  <th className="border-bottom">Họ tên</th>
                  <th className="border-bottom">Email</th>
                  <th className="border-bottom">Số điện thoại</th>
                  <th className="border-bottom">Trạng thái</th>
                  <th className="border-bottom">Cài đặt</th>
                </tr>
              </thead>
              <tbody>
                {attendanceUsers && attendanceUsers.map((attendanceUserItem, index) => {
                  return (
                    <TableItem index={index + 1} search={search} attendanceUser={attendanceUserItem} key={index}
                    />
                  )
                })}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Row>
      <Button variant="primary" className='mt-4' onClick={() => history.goBack()} style={{ marginLeft: 15 }} >
        Cancel
      </Button>
    </Container>
  )
}

function TableItem({ index, attendanceUser, search }) {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false)
  }
  return (
    <tr>
      <ModalStatusByAdmin show={show} handleClose={handleClose} search={search} attendanceUser={attendanceUser} />
      <td>
        <Card.Link href="#" className="text-primary fw-bold">{index}</Card.Link>
      </td>
      <td>{attendanceUser?.user?.fullName}</td>
      <td>{attendanceUser?.user?.email}</td>
      <td>{attendanceUser?.user?.phoneNumber}</td>
      <td>{attendanceUser?.status}</td>
      <td><FontAwesomeIcon icon={faEdit} className="me-2"
        style={{ cursor: 'pointer' }}
        onClick={() => setShow(true)}
      /></td>
    </tr>
  );
}   
