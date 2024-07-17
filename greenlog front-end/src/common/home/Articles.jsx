import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Articles = () => {
    const [list, setList] = useState([]);
    const callAPI = async () => {
        const res = await axios.get("/crawl/hkbs")
        //console.log(res.data)
        setList(res.data)
    }
    useEffect(() => { callAPI() }, [])
    return (
        <div>
             {list.map((art, index) => (
                <ul key={index} style={{ margin: 0, padding: 0 }}>
                    <li><a style={{ fontSize: '0.8rem', fontWeight: 'bold' }} href={art.link}>{art.title}</a></li>
                    <hr />
                </ul>
            ))}
        </div>
    )
}

export default Articles