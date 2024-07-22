import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Row, Col, Card, Button, Dropdown } from 'react-bootstrap';
import ReplyPage from '../reply/ReplyPage';
import axios from 'axios';
import ReportInsert from '../report/ReportInsert';
import { BsThreeDotsVertical } from "react-icons/bs";


const BBSReadPage = () => {
    const { bbs_key } = useParams();
    console.log(bbs_key);
    const uid = sessionStorage.getItem('uid');
    const [form, setForm] = useState({});
    const root = 'bbs'
    const [photos, setPhotos] = useState([]);
    const callAPI = async () => {
        try {
            const res = await axios.get(`/bbs/read/${bbs_key}`);
            const res2 = await axios.get(`/bbs/attach/list/${bbs_key}`)
            setForm(res.data);
            setPhotos(res2.data)
            console.log(res.data);
        } catch (error) {
            console.error('There was an error fetching the post!', error);
        }
    };
    const { bbs_type, bbs_contents, bbs_title, bbs_writer, bbs_regDate, bbs_uDate, bbs_vcnt, bbs_photo,user_nickname, user_img } = form;

    useEffect(() => {
        callAPI();
    }, []);

    const onDelete = async () => {
        if (!window.confirm(`${bbs_key}번 게시글을 삭제하실래요?`)) return;
        try {
            await axios.post(`/bbs/delete/${bbs_key}`);
            alert("게시글 삭제 완료!");
            window.location.href = '/community/bbs/list.json';
        } catch (error) {
            console.error('There was an error deleting the post!', error);
            alert('게시물 삭제 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className='my-5'>
            <Row className='justify-content-center'>
                <Col xs={10}>
                    <Card>
                        <Card.Header>
                            <Row>
                                <Col>
                                    <h5>[{bbs_type === 0 ? "자유" : "꿀팁"}] {bbs_title}</h5>
                                </Col>
                                <Col className='text-end'>
                                    {sessionStorage.getItem("uid")==!bbs_writer &&
                                        <Dropdown >
                                            <Dropdown.Toggle variant="" id="dropdown-basic">
                                                <BsThreeDotsVertical />
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item><ReportInsert uid={sessionStorage.getItem("uid")} origin={bbs_key} writer={bbs_writer} root={root} /></Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    }
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <span>
                                        <span className='me-2'><img src={user_img} style={{borderRadius:"50%", width:"2rem", height:"2rem"}}/></span>
                                        <span className='me-2'><Link to={`/user/mypage/${bbs_writer}`}>{bbs_writer}</Link></span>
                                        <span className='me-2'>조회수: {bbs_vcnt}</span>
                                        <span>{bbs_uDate ? bbs_uDate : bbs_regDate}</span>
                                    </span>
                                </Col>
                            </Row>
                        </Card.Header>
                        <Card.Body style={{ whiteSpace: 'pre-wrap' }}>
                            <div>
                                <Row>
                                    {photos.map(p =>
                                        <Col xs={12}>
                                            <img src={p.bbsPhoto_photo} style={{ width: "20rem" }} />
                                        </Col>
                                    )}
                                </Row>
                            </div>
                            {bbs_contents}
                        </Card.Body>
                    </Card>
                    {uid === bbs_writer && (
                        <div className='text-center my-3'>
                            <Link to={`/bbs/update/${bbs_key}`}>
                                <Button className='me-2'>수정</Button>
                            </Link>
                            <Button onClick={onDelete}>삭제</Button>
                        </div>
                    )}
                </Col>
                <ReplyPage bbs_key={bbs_key} bbs_writer={bbs_writer} />
            </Row>
        </div>
    )
}

export default BBSReadPage