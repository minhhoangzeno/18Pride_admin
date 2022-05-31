import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, ButtonGroup, Card, Col, Container, Dropdown, Nav, Row, Table } from '@themesberg/react-bootstrap';
import axios from "axios";
import React, { useEffect, useState } from 'react';
import Pagination from 'react-js-pagination';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { apiUrl, token } from '../../enviroment';
import { Routes } from '../../routes';
import Loading from '../layout/Loading';

export default () => {
  const [tags, setTags] = useState({
    total: 0,
    data: []
  });
  let history = useHistory();
  const [activePage, setActivePage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [loading, setLoading] = useState(false);
  const search = () => {
    setLoading(true);
    axios({
      method: 'GET',
      url: `${apiUrl}/tag?activePage=${activePage}&limit=${limit}`
    }).then((result) => {
      setLoading(false);
      setTags(result.data);
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
        <Row className="mb-4 mt-4" >
          <Col>
            <Button style={{ background: '#262b3f' }} onClick={() => history.push(Routes.TagAdd.path)} >
              Thêm mới
            </Button>
          </Col>
        </Row>
        <Card border="light" className="table-wrapper table-responsive shadow-sm">
          <Card.Body className="pt-0">
            <Table hover className="user-table align-items-center">
              <thead>
                <tr>
                  <th className="border-bottom">#</th>
                  <th className="border-bottom">Name</th>
                  <th className="border-bottom">Settings</th>
                </tr>
              </thead>
              <tbody>
                {tags && tags.data.map((tagItem, index) => {
                  return (
                    <TableItem index={limit * (activePage - 1) + index + 1} tag={tagItem} key={index} search={search} />
                  )
                })}
              </tbody>
            </Table>
            <Card.Footer className="border-0 d-lg-flex align-items-center justify-content-between">
              <Nav>
                <div className='wrapper-paginate'>
                  {tags && <Pagination
                    className="mb-2 mb-lg-0"
                    activePage={activePage}
                    itemsCountPerPage={limit | 5}
                    totalItemsCount={tags.total}
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
                </select> out of <b>{tags.total}</b> entries
              </small>
            </Card.Footer>
          </Card.Body>
        </Card>
      </Row>}
    </Container>

  )
}

function TableItem({ index, tag, search }) {

  let { addToast } = useToasts();

  let deleteTag = () => {
    axios({
      method: 'DELETE',
      url: `${apiUrl}/tag/${tag._id}`,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(() => {
      search();
      addToast('Delete Tag Success', { appearance: 'success', autoDismiss: 1000 })
    }).catch(error => {
      if (error.response) {
        addToast(error.response.data.message, { appearance: 'error', autoDismiss: 2000 });
      } else {
        addToast("Error", { appearance: 'error', autoDismiss: 2000 });
      }
    })
  }
  let history = useHistory();
  let editTag = () => {
    history.push({
      pathname: Routes.TagEdit.path,
      state: tag
    })
  }
  return (
    <tr>
      <td>
        <Card.Link href="#" className="text-primary fw-bold">{index}</Card.Link>
      </td>
      <td>{tag?.name}</td>
      <td>
        <Dropdown as={ButtonGroup}>
          <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
            <span className="icon icon-sm">
              <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
            </span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={editTag} >
              <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit Tag
            </Dropdown.Item>
            <Dropdown.Item className="text-danger" onClick={deleteTag}  >
              <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Remove
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </td>
    </tr>
  );
}   
