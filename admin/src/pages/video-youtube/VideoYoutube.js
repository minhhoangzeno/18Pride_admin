import { faEdit, faEye, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, ButtonGroup, Card, Col, Container, Dropdown, Image, Nav, Row, Table } from '@themesberg/react-bootstrap';
import axios from "axios";
import React, { useEffect, useState } from 'react';
import Pagination from 'react-js-pagination';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { apiUrl, token } from '../../enviroment';
import { Routes } from '../../routes';
import Loading from '../layout/Loading';
import Profile3 from "../../assets/img/team/profile-picture-3.jpg";

export default () => {
  const [videos, setVideos] = useState({
    total: 0,
    data: []
  });
  let history = useHistory();
  const [activePage, setActivePage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [tags, setTags] = useState();
  const [tagId, setTagId] = useState("Tất cả");
  const [loading, setLoading] = useState(false);
  const search = () => {
    setLoading(true);
    axios({
      method: 'GET',
      url: `${apiUrl}/video-youtube/list?activePage=${activePage}&limit=${limit}&tag=${tagId}`
    }).then((result) => {
      setLoading(false);
      setVideos(result.data);
    }).catch(err => {
      setLoading(false);
    })
  }
  const searchTag = () => {
    setLoading(true);
    axios({
      method: 'GET',
      url: `${apiUrl}/tag`
    }).then((result) => {
      setLoading(false);
      setTags(result.data.data);
    }).catch(err => {
      setLoading(false);
    })
  }
  useEffect(() => {
    searchTag();
    search() // eslint-disable-next-line
  }, [activePage, limit, tagId])

  return (
    <Container>
      <Loading loading={loading} />
      {!loading && <Row>
        <Row className="mb-4 mt-4" >
          <Col>
            <Button style={{ background: '#262b3f' }} onClick={() => history.push(Routes.VideoYoutubeAdd.path)} >
              Thêm mới
            </Button>
          </Col>
        </Row>
        <Row className="mb-4 mt-4" >
          <Col>
            <select value={tagId} onChange={e => setTagId(e.target.value)} >
              <option value="Tất cả" >Tất cả</option>
              {tags && tags?.map((tag, index) => {
                return (
                  <option key={index} value={tag?._id} >{tag?.name}</option>
                )
              })}
            </select>
          </Col>
        </Row>
        <Card border="light" className="table-wrapper table-responsive shadow-sm">
          <Card.Body className="pt-0">
            <Table hover className="user-table align-items-center">
              <thead>
                <tr>
                  <th className="border-bottom">#</th>
                  <th className="border-bottom">Title</th>
                  <th className="border-bottom">Image</th>
                  <th className="border-bottom">People</th>
                  <th className="border-bottom">Settings</th>
                </tr>
              </thead>
              <tbody>
                {videos && videos.data.map((videoItem, index) => {
                  return (
                    <TableItem index={limit * (activePage - 1) + index + 1} video={videoItem} key={index} search={search} />
                  )
                })}
              </tbody>
            </Table>
            <Card.Footer className="border-0 d-lg-flex align-items-center justify-content-between">
              <Nav>
                <div className='wrapper-paginate'>
                  {videos && <Pagination
                    className="mb-2 mb-lg-0"
                    activePage={activePage}
                    itemsCountPerPage={limit | 5}
                    totalItemsCount={videos.total}
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
                </select> out of <b>{videos.total}</b> entries
              </small>
            </Card.Footer>
          </Card.Body>
        </Card>
      </Row>}
    </Container>

  )
}

function TableItem({ index, video, search }) {

  let { addToast } = useToasts();

  let deleteVideo = () => {
    axios({
      method: 'DELETE',
      url: `${apiUrl}/video-youtube/${video._id}`,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(() => {
      search();
      addToast('Delete Video Success', { appearance: 'success', autoDismiss: 1000 })
    }).catch(error => {
      if (error.response) {
        addToast(error.response.data.message, { appearance: 'error', autoDismiss: 2000 });
      } else {
        addToast("Error", { appearance: 'error', autoDismiss: 2000 });
      }
    })
  }
  let history = useHistory();
  let editVideo = () => {
    history.push({
      pathname: Routes.VideoYoutubeEdit.path,
      state: video
    })
  }
  let detailVideo = () => {
    history.push({
      pathname: Routes.VideoYoutubeDetail.path,
      state: video
    })
  }
  return (
    <tr>
      <td>
        <Card.Link href="#" className="text-primary fw-bold">{index}</Card.Link>
      </td>
      <td>{video?.title}</td>
      <td>{video?.photoURL ? <Image src={video?.photoURL} alt="photoURL" className="user-avatar xl-avatar" /> : <Image src={Profile3} className="user-avatar xl-avatar" />}</td>
      <td>{video?.people}</td>

      <td>
        <Dropdown as={ButtonGroup}>
          <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
            <span className="icon icon-sm">
              <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
            </span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={detailVideo}  >
              <FontAwesomeIcon icon={faEye} className="me-2" /> Detail Video
            </Dropdown.Item>
            <Dropdown.Item onClick={editVideo} >
              <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit Video
            </Dropdown.Item>
            <Dropdown.Item className="text-danger" onClick={deleteVideo}  >
              <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Remove
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </td>
    </tr>
  );
}   
