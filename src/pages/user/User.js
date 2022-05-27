import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, ButtonGroup, Card, Container, Dropdown, Row, Table } from '@themesberg/react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserThunk } from '../../redux/userSlice';
import UserEditRole from './UserEditRole';

export default () => {
    let user = useSelector(state => state.user.data);
    let dispatch = useDispatch();
    useEffect(() => {
       search() // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const search = () => {
        dispatch(getUserThunk())
    }

    return (
        <Container>

            <Row>

                <Card border="light" className="table-wrapper table-responsive shadow-sm">
                    <Card.Body className="pt-0">
                        <Table hover className="user-table align-items-center">
                            <thead>
                                <tr>
                                    <th className="border-bottom">#</th>
                                    <th className="border-bottom">Email</th>
                                    <th className="border-bottom">FullName</th>
                                    <th className="border-bottom">Role</th>
                                    <th className="border-bottom">Settings</th>
                                </tr>
                            </thead>
                            <tbody>
                                {user && user.map((userItem, index) => {
                                    return (
                                        <TableItem index={index + 1} user={userItem} key={index} search={search} />
                                    )
                                })}
                            </tbody>
                        </Table>
                        {/* <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
                        <Nav>
                            <Pagination className="mb-2 mb-lg-0">
                                <Pagination.Prev>
                                    Previous
                                </Pagination.Prev>
                                <Pagination.Item active>1</Pagination.Item>
                                <Pagination.Item>2</Pagination.Item>
                                <Pagination.Item>3</Pagination.Item>
                                <Pagination.Item>4</Pagination.Item>
                                <Pagination.Item>5</Pagination.Item>
                                <Pagination.Next>
                                    Next
                                </Pagination.Next>
                            </Pagination>
                        </Nav>
                        <small className="fw-bold">
                            Showing <b>{totalTransactions}</b> out of <b>25</b> entries
                        </small>
                    </Card.Footer> */}
                    </Card.Body>
                </Card>
            </Row>
        </Container>
    )
}

function TableItem({ index, user,search}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    return (
        <tr>
            <UserEditRole show={show} handleClose={handleClose} search={search} user={user}  />
            <td>
                <Card.Link href="#" className="text-primary fw-bold">{index}</Card.Link>
            </td>
            <td>{user.email}</td>
            <td>{user.fullName}</td>
            <td>{user.roles}</td>
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
                        {/* <Dropdown.Item className="text-danger" onClick={() => deleteCountdown(countdown._id)}  >
                            <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Remove
                        </Dropdown.Item> */}
                    </Dropdown.Menu>
                </Dropdown>
            </td>
        </tr>
    );
}   
