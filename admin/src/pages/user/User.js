import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, ButtonGroup, Card, Container, Dropdown, Image, Nav, Row, Table } from '@themesberg/react-bootstrap';
import axios from "axios";
import React, { useEffect, useState } from 'react';
import Pagination from 'react-js-pagination';
import { useToasts } from 'react-toast-notifications';
// import Profile3 from "../assets/img/team/profile-picture-3.jpg";
import Profile3 from "../../assets/img/team/profile-picture-3.jpg";
import { apiUrl, token } from '../../enviroment';
import Loading from '../layout/Loading';
import UserEditRole from './UserEditRole';

export default () => {
  const [users, setUsers] = useState({
    total: 0,
    data: []
  });
  const [activePage, setActivePage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [loading, setLoading] = useState(false);
  const search = () => {
    setLoading(true);
    axios({
      method: 'GET',
      url: `${apiUrl}/user?activePage=${activePage}&limit=${limit}`,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((result) => {
      setLoading(false);
      setUsers(result.data);
    }).catch(err => {
      setLoading(false);
    })
  }
  useEffect(() => {
    search() // eslint-disable-next-line
  }, [activePage, limit])

  return (
    <Container>
      <Loading loading={loading} />
      {!loading && <Row>
        <Card border="light" className="table-wrapper table-responsive shadow-sm">
          <Card.Body className="pt-0">
            <Table hover className="user-table align-items-center">
              <thead>
                <tr>
                  <th className="border-bottom">#</th>
                  <th className="border-bottom">Email</th>
                  <th className="border-bottom">Name</th>
                  <th className="border-bottom">Status</th>
                  <th className="border-bottom">PhotoURL</th>
                  <th className="border-bottom">Role</th>
                  <th className="border-bottom">Settings</th>
                </tr>
              </thead>
              <tbody>
                {users && users.data.map((userItem, index) => {
                  return (
                    <TableItem index={limit * (activePage - 1) + index + 1} user={userItem} key={index} search={search} />
                  )
                })}
              </tbody>
            </Table>
            <Card.Footer className="border-0 d-lg-flex align-items-center justify-content-between">
              <Nav>
                <div className='wrapper-paginate'>
                  {users && <Pagination
                    className="mb-2 mb-lg-0"
                    activePage={activePage}
                    itemsCountPerPage={limit | 5}
                    totalItemsCount={users.total}
                    pageRangeDisplayed={3}
                    onChange={value => setActivePage(value)}
                  />}
                </div>

              </Nav>
              <small className="fw-bold">
                Showing <select value={limit} onChange={e => setLimit(e.target.value)} >
                  <option value={5} >5</option>
                  <option value={10} >10</option>
                  <option value={15} >15</option>
                </select> out of <b>{users.total}</b> entries
              </small>
            </Card.Footer>
          </Card.Body>
        </Card>
      </Row>}

    </Container>

  )
}

function TableItem({ index, user, search }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  let { addToast } = useToasts();

  let deleteUser = () => {
    axios({
      method: 'DELETE',
      url: `${apiUrl}/user/${user._id}`,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(() => {
      search();
      addToast('Delete User Success', { appearance: 'success', autoDismiss: 1000 })
    }).catch(error => {
      if (error.response) {
        addToast(error.response.data.message, { appearance: 'error', autoDismiss: 2000 });
      } else {
        addToast("Error", { appearance: 'error', autoDismiss: 2000 });
      }
    })
  }
  return (
    <tr>
      <UserEditRole show={show} handleClose={handleClose} search={search} user={user} />
      <td>
        <Card.Link href="#" className="text-primary fw-bold">{index}</Card.Link>
      </td>
      <td>{user?.email}</td>
      <td>{user?.firstName} {user?.lastName}</td>
      <td>{user?.status}</td>
      <td>{user?.photoURL ? <img src={user?.photoURL} alt="photoURL" /> : <Image src={Profile3} className="user-avatar md-avatar rounded-circle" />}</td>
      <td>{user.role}</td>
      <td>
        <Dropdown as={ButtonGroup}>
          <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
            <span className="icon icon-sm">
              <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
            </span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {/* <Dropdown.Item onClick={() => routerDetailCountdown(countdown)}  >
                            <FontAwesomeIcon icon={faEye} className="me-2" /> View Details
                        </Dropdown.Item> */}
            <Dropdown.Item onClick={() => setShow(true)} >
              <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit Roles
            </Dropdown.Item>
            <Dropdown.Item className="text-danger" onClick={deleteUser}  >
              <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Remove
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </td>
    </tr>
  );
}   
