import { faEdit, faEye, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, ButtonGroup, Card, Col, Container, Dropdown, Row, Table } from '@themesberg/react-bootstrap';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { deleteCategoryThunk, getCategoryThunk } from '../../redux/categorySlice';
import { Routes } from "../../routes";

export default () => {
    let history = useHistory();
    let category = useSelector(state => state.category.data); // lấy dữ liệu category đã lưu trữ
    let { addToast } = useToasts()
    let dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategoryThunk()) // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);  // vừa vào trang web thì thực thi hàm này.

    let deleteCategory = async (categoryId) => {
        await dispatch(deleteCategoryThunk(categoryId));
        dispatch(getCategoryThunk())
        addToast("Delete Success", { appearance: 'success', autoDismiss: 1000 })
    }

    let routerDetailCategory = (data) => {
        history.push({
            pathname: Routes.CategoryDetail.path,
            state: data
        })
    }
    let routerEditCategory = (data) => {
        history.push({
            pathname: Routes.CategoryEdit.path,
            state: data
        })
    }
    return (
        <Container>
            <Row className="mb-4" >
                <Col>
                    <Button variant="warning" onClick={() => history.push(Routes.CategoryAdd.path)} >
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
                                    <th className="border-bottom">Cài đặt</th>
                                </tr>
                            </thead>
                            <tbody>
                                {category && category.map((categoryItem, index) => {
                                    return (
                                        <TableItem index={index + 1} category={categoryItem} routerDetailCategory={routerDetailCategory} key={index} routerEditCategory={routerEditCategory} deleteCategory={deleteCategory} />
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

function TableItem({ index, category, routerEditCategory, deleteCategory, routerDetailCategory }) {
    return (
        <tr>
            <td>
                <Card.Link href="#" className="text-primary fw-bold">{index}</Card.Link>
            </td>
            <td>{category.title}</td>
            <td>
                <Dropdown as={ButtonGroup}>
                    <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
                        <span className="icon icon-sm">
                            <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
                        </span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => routerDetailCategory(category)}  >
                            <FontAwesomeIcon icon={faEye} className="me-2" /> View Details
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => routerEditCategory(category)} >
                            <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
                        </Dropdown.Item>
                        <Dropdown.Item className="text-danger" onClick={() => deleteCategory(category._id)}  >
                            <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Remove
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </td>
        </tr>
    );
}   
