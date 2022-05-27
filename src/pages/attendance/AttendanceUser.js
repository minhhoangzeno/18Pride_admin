import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Container, Row, Table } from '@themesberg/react-bootstrap';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAttendanceUserThunk } from '../../redux/attendanceSlice';
import ModalAttendanceUser from './ModalAttendanceUser';

export default () => {
  const [attendance, setAttendance] = useState();
  let dispatch = useDispatch();
  let search = async () => {
    const resp = await dispatch(getAttendanceUserThunk());
    if (resp) {
      setAttendance(resp)
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
                  <th className="border-bottom">Trạng thái</th>
                  <th className="border-bottom">Thời gian</th>
                  <th className="border-bottom">Điểm danh</th>
                </tr>
              </thead>
              <tbody>
                {attendance && attendance.map((attendanceItem, index) => {
                  return (
                    <TableItem index={index + 1} attendance={attendanceItem} key={index}
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

function TableItem({ index, attendance, search }) {
  let date = new Date();
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false)
  }
  return (
    <tr>
      <ModalAttendanceUser show={show} handleClose={handleClose} search={search} attendanceUser={attendance} />
      <td>
        <Card.Link href="#" className="text-primary fw-bold">{index}</Card.Link>
      </td>
      <td>{attendance?.attendance?.title}</td>
      <td>{attendance?.status}</td>
      <td>{`${moment(attendance?.attendance?.startDate).format("HH:mm DD/MM/YYYY")} - ${moment(attendance?.attendance?.endDate).format("HH:mm DD/MM/YYYY")}`}</td>
      <td>{attendance?.status === "Đã điểm danh" ? <FontAwesomeIcon icon={faCheckCircle} /> : (moment(date) > moment(attendance?.attendance?.endDate) ? <FontAwesomeIcon icon={faInfoCircle} className="me-2" color='red' /> : <FontAwesomeIcon icon={faEdit} className="me-2"
        style={{ cursor: 'pointer' }}
        onClick={() => setShow(true)}
      />)}</td>
    </tr>
  );
}   
