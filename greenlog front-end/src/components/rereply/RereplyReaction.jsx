import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap'

const RereplyReaction = ({ rereply_key, uid }) => {
    const [reaction, setReaction] = useState([]);
    const [likeCount, setLikeCount] = useState('');
    const [hateCount, setHateCount] = useState('');
    const callAPI = async () => {
        const res = await axios.post("/rereply/readReaction", { rereply_key, rereply_writer: uid })
        const res2 = await axios.get(`/rereply/CountReaction/${rereply_key}`)
        setReaction(res.data)
        //console.log(res2.data)
        setLikeCount(res2.data.likeCount)
        setHateCount(res2.data.hateCount)
    }
    const onInsertLike = async () => {
        const res = await axios.post("/rereply/insert/like", { rereply_key, rereply_writer: uid })
        if (res.data === 1) {
            alert("좋아요")
            callAPI();
        } else {
            alert("로그인이 필요합니다")
        }
    }

    const onInsertHate = async () => {
        const res = await axios.post("/rereply/insert/hate", { rereply_key, rereply_writer: uid })
        if (res.data === 1) {
            alert("싫어요")
            callAPI();
        } else {
            alert("로그인이 필요합니다")
        }
    }

    const onReactionUpdate = async () => {
        await axios.post("/rereply/reactionUpdate", { rereply_key, rereply_writer: uid })
        callAPI();
    }

    const onReactionDelete = async () => {
        await axios.post("/rereply/reactionDelete", { rereply_key, rereply_writer: uid })
        callAPI();
    }

    useEffect(() => { callAPI() }, [])
    return (
        <div>
            {reaction ?
                <>
                    <span style={{ cursor: 'pointer' }}>
                        {reaction === 1 ? (
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

export default RereplyReaction