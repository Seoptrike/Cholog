import React, { useEffect, useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import RereplyInsertPage from './RereplyInsertPage';
import RereplyReadPage from './RereplyReadPage';
import axios from 'axios';

const RereplyPage = ({ reply_key, reply_writer }) => {
    const [count, setCount] = useState(0);
    const [rereply, setRereply] = useState([]);
    const [showRep, setShowRep] = useState(true);
    const [rereplyCount, setRereplyCount] = useState("")

    const callCount = async () => {
        const res= await axios.get(`/rereply/count/${reply_key}`)
        console.log(res.data)
        setRereplyCount(res.data)
    };
    
    const callList = async()=>{
        const res = await axios.get(`/rereply/plist/${reply_key}`);
        if (res.data.total === 0) {
            setCount(0);
            setRereply([]);
        } else {
            const data = res.data.documents.map(doc => ({ ...doc, isEdit: false, text: doc.rereply_contents, lock: doc.rereply_lock, reaction: doc.rereply_reaction }));
            setRereply(data);
            setCount(res.data.total);
        }
    }

    useEffect(()=>{
        callCount()
        callList()
    },[])

    const toggleRep = () => {
        setShowRep(!showRep);
    };

    return (
        <Row className='justify-content-center'>
            <Col xs={12}>
                {showRep && (
                    <>
                        <RereplyReadPage reply_key={reply_key} reply_writer={reply_writer} rereply={rereply} setRereply={setRereply} callList={callList} callCount={callCount} />    
                        <RereplyInsertPage reply_key={reply_key} callCount={callCount} callList={callList} />
                        <Button variant='' onClick={toggleRep} size="sm" className='text-end me-2'>답글 접기</Button>
                    </>
                )}
                
            </Col>
        </Row>
    );
};

export default RereplyPage;
