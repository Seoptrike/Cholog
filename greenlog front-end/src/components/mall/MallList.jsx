import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'

const MallList = () => {
    const uid=sessionStorage.getItem("uid");
    const [list,setList] = useState([]);
    
    const callAPI= async()=>{
        const res = await axios.get(`/mall/list/${uid}?page=0&size=1000`);
        setList(res.data);
    }

    useEffect(()=>{
        callAPI();
    },[])

   // const endDate = moment(list.mall_endDate).format('YYYY-MM-DD'); // "2024-07-25"
    //const fmtRdate = moment(list.mall_regDate).format('yyyy년 MM월 DD일 HH시mm분');

    return (
        <>
            <h1 className='text-center my-5'>피망이용목록</h1>
            <Table>
                <thead>
                    <tr>
                        <td>글번호</td>
                        <td colSpan={2}>상품명</td>
                        <td>글쓴이</td>
                        <td>마감일</td>
                        <td>작성일</td>
                    </tr>
                </thead>
                <tbody>
                    {list.map(list=>
                         <tr>
                            <td>{list.mall_key}</td>
                            <td colSpan={2}>{list.mall_title}</td>
                            <td>{list.mall_seller}</td>
                            <td>{list.mall_endDate}</td>
                            <td>{list.mall_regDate}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </>
    )
}

export default MallList