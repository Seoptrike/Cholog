import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BsChevronDown, BsHandThumbsUp, BsHandThumbsUpFill, BsHandThumbsDown, BsHandThumbsDownFill, BsThreeDotsVertical } from "react-icons/bs";

const ReplyReaction = ({ reply_key, uid }) => {
    const [reaction, setReaction] = useState([]);
    const callAPI = async () => {
        const res = await axios.post("/reply/readReaction", { reply_key, reply_writer: uid })
        setReaction(res.data)
        console.log(res.data)
    }
    useEffect(() => { callAPI() }, [])
    return (
        <div>
            {reaction ?
                <>
                    <span style={{ cursor: 'pointer' }}>
                        {reaction=== 'like' ? (
                            <BsHandThumbsUpFill
                       
                                className='me-4'
                            />
                        ) : (
                            <BsHandThumbsUp

                                className='me-4'
                            />
                        )}
                    </span>
                    <span style={{ cursor: 'pointer' }}>
                        {reaction === 'dislike' ? (
                            <BsHandThumbsDownFill

                                className='me-4'
                            />
                        ) : (
                            <BsHandThumbsDown

                                className='ml-4'
                            />
                        )}
                    </span>
                </>
                :
                
                <>
                 <BsHandThumbsUp

className='me-4'
/>
                <BsHandThumbsDown

className='ml-4'
/>
                </>
            }
        </div>
    )
}

export default ReplyReaction