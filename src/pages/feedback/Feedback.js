import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, ButtonGroup, Card, Container, Dropdown, Row, Table } from '@themesberg/react-bootstrap';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import { deleteFeedbackThunk, getFeedbackThunk } from '../../redux/feedbackSlice';

export default () => {
    let feedback = useSelector(state => state.feedback.data);
    let { addToast } = useToasts()
    let dispatch = useDispatch();
    let search = () => {
        dispatch(getFeedbackThunk())
    }
    useEffect(() => {
        search() // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    let deleteFeedback = async (feedbackId) => {
        await dispatch(deleteFeedbackThunk(feedbackId));
        dispatch(getFeedbackThunk());
        addToast("Delete Success", { appearance: 'success', autoDismiss: 1000 })
    }



 

    return (
        <>
            <Container>
                <Row>
                    <Card border="light" className="table-wrapper table-responsive shadow-sm">
                        <Card.Body className="pt-0">
                            <Table hover className="user-table align-items-center">
                                <thead>
                                    <tr>
                                        <th className="border-bottom">#</th>
                                        <th className="border-bottom">Nội dung phản hồi</th>
                                        <th className="border-bottom">Họ tên</th>
                                        <th className="border-bottom">Email</th>
                                        <th className="border-bottom">Số điện thoại</th>
                                        <th className="border-bottom">Ngày</th>
                                        <th className="border-bottom">Cài đặt</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {feedback && feedback.map((feedbackItem, index) => {
                                        return (
                                            <TableItem index={index + 1} feedback={feedbackItem} key={index}
                                                deleteFeedback={deleteFeedback}
                                            />
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
        </>
    )
}


function TableItem({ index, feedback, deleteFeedback }) {

    return (
        <>
            <tr>
                <td>
                    <Card.Link href="#" className="text-primary fw-bold">{index}</Card.Link>
                </td>
                <td>{feedback.content}</td>
                <td>{feedback.createdBy.fullName}</td>
                <td>{feedback.createdBy.email}</td>
                <td>{feedback.createdBy?.phoneNumber}</td>
                <td>{moment(feedback?.createdAt).format("HH:mm DD-MM-YYYY")}</td>
                <td>
                    <Dropdown as={ButtonGroup}>
                        <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
                            <span className="icon icon-sm">
                                <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
                            </span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item className="text-danger" onClick={() => deleteFeedback(feedback._id)}  >
                                <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Xóa
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </td>

            </tr>
        </>
    );
}   
