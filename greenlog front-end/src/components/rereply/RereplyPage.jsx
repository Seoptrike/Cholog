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

    const callAPI = async () => {
        const res= await axios.get(`/rereply/count/${reply_key}`)
        //console.log(res.data, reply_key)
        setRereplyCount(res.data)
    };
    
    const callAPI2 = async()=>{
        if(reply_key){
        const res2= await axios.get(`/rereply/plist/${reply_key}`)
        const data = res2.data.documents.map(doc => ({ ...doc, isEdit: false, text: doc.rereply_contents, lock: doc.rereply_lock, reaction: doc.rereply_reaction }));
        setRereply(data);
        setCount(res2.data.total);
        }
    }

    useEffect(()=>{
        callAPI()
        callAPI2()
    },[])

    useEffect(() => {
        callAPI();
    }, [rereplyCount]);


    const toggleRep = () => {
        setShowRep(!showRep);
    };

    return (
        <Row className='justify-content-center'>
            <Col xs={12}>
                {showRep && (
                    <>
                        <RereplyReadPage reply_key={reply_key} reply_writer={reply_writer} callAPI2={callAPI2} />    
                        <RereplyInsertPage reply_key={reply_key} callAPI={callAPI} callAPI2={callAPI2} />
                        <Button variant='' onClick={toggleRep} size="sm" className='text-end me-2'>답글 접기</Button>
                    </>
                )}
                
            </Col>
        </Row>
    );
};

export default RereplyPage;
