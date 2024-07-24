import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'

const ReplyReadPage = (bbs_key) => {
    const [reply, setReply] = useState({
        reply_bbs_key: bbs_key,
        reply_writer: sessionStorage.getItem('uid'),
        reply_contents: '',
        reply_lock: 'unlock',
        reply_reaction: 'none',
        reply_regdate: '',
        reply_udate: '',
        user_img : '',
        user_nickname : ''
    })
    const { reply_key } = useParams();
    const uid = sessionStorage.getItem("uid");
    console.log(reply_key)
    const callAPI = async () => {
        const res = await axios.get(`/reply/read/${reply_key}`)
        console.log(res.data);
        setReply(res.data);
    }

    useEffect(() => {
        callAPI();
    }, []) 

    const { reply_writer, reply_contents, reply_regdate, reply_udate, user_img, user_nickname } = reply;



    return (
            <Row key={reply_key} className='justify-content-center mt-2'>
                <Col xs={7}>
                    <div className="d-flex align-items-center justify-content-between mb-2">
                        <div className="d-flex align-items-center">
                            <img src={user_img || "http://via.placeholder.com/20x20"} width="50" className='me-3 rounded-circle' />
                            <div className="d-flex flex-column">
                                <div className="d-flex align-items-center">
                                    <span>{user_nickname} ({reply_writer})</span>
                                </div>
                                <div>
                                    <span>{reply_udate ? `${reply_udate}` : `${reply_regdate}`} </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='my-3' style={{ whiteSpace: 'pre-wrap' }}>
                        <Row className='align-items-center my-2'>
                            <Col>
                                <div>{reply_contents}</div>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
    )
}

export default ReplyReadPage