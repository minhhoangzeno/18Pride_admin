import { faEye } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Col, Dropdown, Row, Table } from '@themesberg/react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Routes } from '../../routes';
import { attendanceUserStatisticByAdmin, getAttendance } from '../../services/attendance.service';


export default () => {
  const [attendances, setAttendances] = useState([]);
  const [attendance, setAttendance] = useState();
  const [attendanceSelect, setAttendanceSelect] = useState();
  let history = useHistory();
  let search = async () => {
    let res = await (getAttendance());
    if (res.length > 0) {
      setAttendances(res)
      let data = await (attendanceUserStatisticByAdmin(`${res[0]?._id}`));
      setAttendanceSelect(res[0]);
      if (data) {
        setAttendance(data);
      }
    }
  }
  let searchDetail = async () => {
    if (attendanceSelect?._id) {
      let data = await (attendanceUserStatisticByAdmin(attendanceSelect?._id.toString()));
      if (data) {
        setAttendance(data)
      }
    }
  }

  useEffect(() => {
    searchDetail() // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attendanceSelect])
  useEffect(() => {
    search() // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Card border="light" className="shadow-sm">
      <Card.Header>
        <Row className="align-items-center">
          <Col>
            <h5>Điểm danh</h5>
          </Col>
          <Col className="text-end">
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {attendanceSelect?.title}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {attendances.map((item, index) => {
                  return (
                    <Dropdown.Item key={index} onClick={() => setAttendanceSelect(item)} >{item?.title}</Dropdown.Item>
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
            <th scope="col">Đã điểm danh</th>
            <th scope="col">Chưa điểm danh</th>
            <th scope="col">Tổng</th>
            <th scope="col">Cài đặt</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{attendance?.attendanceUserPaids}</td>
            <td>{attendance?.attendanceUserNotPaids}</td>
            <td>{attendance?.attendanceUserTotal}</td>
            <td>
              <FontAwesomeIcon onClick={() => history.push(Routes.Attendance.path)} icon={faEye} style={{ cursor: 'pointer' }} />
            </td>
          </tr>
        </tbody>
      </Table>
    </Card>
  );
}