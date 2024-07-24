import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'

const RereplyReadPage = (reply_key) => {
    const [rereply, setRereply] = useState({
        reply_key: reply_key,
        rereply_writer: sessionStorage.getItem('uid'),
        rereply_contents: '',
        rereply_lock: 'unlock',
        rereply_reaction: 'none',
        rereply_regdate: '',
        rereply_udate: ''
    })
    

    const { rereply_key } = useParams();
    const uid = sessionStorage.getItem("uid");
    console.log(rereply_key)
    const callAPI = async () => {
        const res = await axios.get(`/rereply/read/${rereply_key}`)
        console.log(res.data);
        setRereply(res.data);
    }

    useEffect(() => {
        callAPI();
    }, [])

    const { rereply_writer, rereply_contents, rereply_regdate, rereply_udate, user_img, user_nickname } = rereply;

    return (
        <Row key={rereply_key} className='justify-content-center mt-2'>
            <Col xs={7}>
                <div className="d-flex align-items-center justify-content-between mb-2">
                    <div className="d-flex align-items-center">
                        <img src={user_img || "http://via.placeholder.com/20x20"} width="50" className='me-3 rounded-circle' />
                        <div className="d-flex flex-column">
                            <div className="d-flex align-items-center">
                                <span>{user_nickname} ({rereply_writer})</span>
                            </div>
                            <div>
                                <span>{rereply_udate ? `${rereply_udate}` : `${rereply_regdate}`} </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='my-3' style={{ whiteSpace: 'pre-wrap' }}>
                    <Row className='align-items-center my-2'>
                        <Col>
                            <div>{rereply_contents}</div>
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>
    )
}

export default RereplyReadPage