import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BsChevronDown } from "react-icons/bs";
const RereplyCount = ({reply_key}) => {
    const [rereplyCount, setRereplyCount] = useState("");

    const callAPI =async()=> {
        const res = await axios.get(`/rereply/count/${reply_key}`)
        setRereplyCount(res.data);
    }

    useEffect (()=>{
        callAPI();
    },[])

    return (
        <div>
           댓글 {rereplyCount} <BsChevronDown />
        </div>
    )
}

export default RereplyCount