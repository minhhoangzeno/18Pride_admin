import { faEdit, faEye, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faPlus, faTags } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Col, Container, Row } from '@themesberg/react-bootstrap';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { SERVER } from '../../apis/API';
import { deleteVideoThunk, getVideoThunk } from '../../redux/videoSlice';
import { Routes } from "../../routes";
import '../../scss/pagination.scss';
export default () => {
    let history = useHistory();
    let video = useSelector(state => state.video.data); // lây dữ liệu video từ store
    let { addToast } = useToasts()
    let dispatch = useDispatch();
    const [activePage, setActivePage] = useState(1);

    useEffect(() => {
        dispatch(getVideoThunk(6 * (activePage - 1))) // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activePage]);   // vừa vào trang web sẽ thực thi hàm lấy video đầu tiên



    let deleteVideo = async (videoId) => {
        await dispatch(deleteVideoThunk(videoId));
        dispatch(getVideoThunk(0));
        addToast("Delete Success", { appearance: 'success', autoDismiss: 1000 })
    }

    let routerDetailVideo = (data) => {
        history.push({
            pathname: Routes.VideoDetail.path,
            state: data
        })
    }
    let routerEditVideo = (data) => {
        history.push({
            pathname: Routes.VideoEdit.path,
            state: data
        })
    }
    return (
        <Container>
            <Row className="mb-4" >
                <Col>
                    <Button variant="warning" onClick={() => history.push(Routes.VideoAdd.path)} >
                        <FontAwesomeIcon icon={faPlus} />
                    </Button>
                </Col>
            </Row>

            <Row>
                {video && video.data.map((videoItem, index) => {
                    return (
                        <VideoItem video={videoItem} key={index} deleteVideo={deleteVideo}
                            routerDetailVideo={routerDetailVideo} routerEditVideo={routerEditVideo} />
                    )
                })}
            </Row>
            <div className='wrapper-paginate' >
                {video && <Pagination
                    activePage={activePage}
                    itemsCountPerPage={6}
                    totalItemsCount={video?.totalPage}
                    pageRangeDisplayed={3}
                    onChange={value => setActivePage(value)}
                />}
            </div>
        </Container>
    )
}

function VideoItem({ video, deleteVideo, routerDetailVideo, routerEditVideo }) {
    const user = JSON.parse(localStorage.getItem("user"));
    let checkUser = () => {
        if (user?.roles === "superadmin" || user?.roles === "admin") {
            return true
        } else {
            if (user?._id === video?.createdBy?._id) {
                return true
            } else {
                return false
            }
        }
    }
    return (
        <Col>
            <Card style={{ width: '18rem' }} className="mt-4" >
                <Card.Img variant="top" src={`${SERVER.URL_IMAGE}${video.photoURL}`} />
                <Card.Body>
                    <Card.Title className="custom-title" >{video?.title}</Card.Title>
                    <Card.Text className="custom-description content__overflow " dangerouslySetInnerHTML={{ __html: video?.metaDescription }}  >
                    </Card.Text>
                    <Card.Subtitle className="d-flex justify-content-between mt-2" style={{ alignItems: 'center', flexDirection: 'column' }} >
                        <div className="d-flex justify-content-between mt-2" style={{ width: '100%' }} >
                            <FontAwesomeIcon onClick={() => routerDetailVideo(video)} icon={faEye} style={{ cursor: 'pointer' }} />
                            {checkUser() && <>
                                <FontAwesomeIcon onClick={() => routerEditVideo(video)} icon={faEdit} style={{ cursor: 'pointer' }} />
                                <FontAwesomeIcon onClick={() => deleteVideo(video._id)} icon={faTrashAlt} style={{ cursor: 'pointer' }} />
                            </>}
                        </div>
                        <div
                            className="d-flex mt-4" style={{ width: '100%', justifyContent: 'flex-start' }}
                        ><FontAwesomeIcon icon={faTags} /> <small className="text-muted" style={{ marginLeft: 10 }} > {video?.category?.title}</small></div>
                    </Card.Subtitle>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">{moment(video?.createdAt).format("HH:mm DD/MM/YYYY")}</small> - <small className="text-muted">{video?.createdBy?.fullName}</small>
                </Card.Footer>
            </Card>
        </Col>
    )
}