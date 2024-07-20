import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Card } from 'react-bootstrap';
import { BsChevronDown } from 'react-icons/bs';
import ReplyInsertPage from './ReplyInsertPage';
import ReplyReadPage from './ReplyReadPage';
import axios from 'axios';

const ReplyPage = ({ bbs_key, bbs_writer }) => {
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(3);
    const [key, setKey] = useState('reply_regdate desc');
    const [count, setCount] = useState(0);
    const [reply, setReply] = useState([]);
    const [showReply, setShowReply] = useState(false);
    const [replyCount, setReplyCount] = useState("")
    let reply_bbs_key = bbs_key;

    const callAPI = async () => {
        const res= await axios.get(`/reply/count/${bbs_key}`)
        console.log(res.data)
        setReplyCount(res.data)
    };

    const callAPI2 = async()=>{
        if(reply_bbs_key){
        const res2= await axios.get(`/reply/plist/${reply_bbs_key}?size=${size}&page=${page}&key=${key}`)
        const data = res2.data.documents.map(doc => ({ ...doc, isEdit: false, text: doc.reply_contents, lock: doc.reply_lock, reaction: doc.reply_reaction }));
        setReply(data);
        setCount(res2.data.total);
        }
    }
    
    useEffect(()=>{
        callAPI()
        callAPI2()
    },[])

    useEffect(() => {
        callAPI();
    }, [replyCount]);

    return (
        <Row className='justify-content-center mt-3'>
            <Col xs={8}>
                <h5 className='mt-5 text-center'></h5>
                <Row className='justify-content-center mt-5'>
                    <Col>
                        <Button type='button' variant="" onClick={() => setShowReply(!showReply)}>
                            댓글 {replyCount} <BsChevronDown />
                        </Button>
                    </Col>
                </Row>
                <hr />
                {showReply && (
                    <Card className='mt-3'>
                        <ReplyInsertPage bbs_key={bbs_key} callAPI={callAPI} callAPI2={callAPI2}/>
                        <ReplyReadPage bbs_key={bbs_key} bbs_writer={bbs_writer} callAPI2={callAPI} />
                    </Card>
                )}
            </Col>
        </Row>
    );
};

export default ReplyPage;
