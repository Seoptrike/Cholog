import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap'
const ReplyReaction = ({ reply_key, uid }) => {
    const [reaction, setReaction] = useState([]);
    const [likeCount, setLikeCount] = useState('');
    const [hateCount, setHateCount] = useState('');
    const callAPI = async () => {
        const res = await axios.post("/reply/readReaction", { reply_key, reply_writer: uid })
        const res2 = await axios.get(`/reply/CountReaction/${reply_key}`)
        setReaction(res.data)
        //console.log(res2.data)
        setLikeCount(res2.data.likeCount)
        setHateCount(res2.data.hateCount)
    }
    //console.log(likeCount)
    const onInsertLike = async()=>{
        const res = await axios.post("/reply/insert/like",{reply_key, reply_writer: uid})
        if(res.data===1){
            alert("좋아요")
            callAPI();
        }else{
            alert("로그인이 필요합니다")
        }
    }

    const onInsertHate = async()=>{
        const res = await axios.post("/reply/insert/hate",{reply_key, reply_writer: uid})
        if(res.data===1){
            alert("싫어요")
            callAPI();
        }else{
            alert("로그인이 필요합니다")
        }
    }

    const onReactionUpdate = async()=>{
        await axios.post("/reply/reactionUpdate",{reply_key, reply_writer: uid})
        callAPI();
    }
    
    const onReactionDelete = async()=>{
        await axios.post("/reply/reactionDelete",{reply_key, reply_writer: uid})
        callAPI();
    }

    useEffect(() => { callAPI() }, [])
    return (
        <div>
            {reaction ?
                <>
                    <span style={{ cursor: 'pointer' }}>
                        {reaction=== 1 ? (
                           <Button variant="success" size='sm' className='me-2' onClick={onReactionDelete}>좋아요 {likeCount}</Button>
                        ) : (
                            <Button variant="outline-success" size='sm' className='me-2' onClick={onReactionUpdate}>좋아요 {likeCount}</Button>
                        )}
                    </span>
                    <span style={{ cursor: 'pointer' }}>
                        {reaction === -1 ? (
                       <Button variant="danger" size='sm' onClick={onReactionDelete}>싫어요 {hateCount}</Button>
                        ) : (
                            <Button variant="outline-danger" size='sm' onClick={onReactionUpdate}>싫어요 {hateCount}</Button>
                        )}
                    </span>
                </>
                :   
                <>
                <Button variant="outline-success" size='sm' className='me-2' onClick={onInsertLike}>좋아요 {likeCount}</Button>
                <Button variant="outline-danger" size='sm' onClick={onInsertHate}>싫어요 {hateCount}</Button>
                </>
            }
        </div>
    )
}

export default ReplyReaction