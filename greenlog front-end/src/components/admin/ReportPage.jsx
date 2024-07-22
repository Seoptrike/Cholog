import React, { useEffect, useState } from 'react'
import { Row, Col, Table } from 'react-bootstrap'
import Sidebar from './Sidebar'
import axios from 'axios'

//신고접수데이터 필요, ellipsis를 이용하여 클릭시 처리하게끔 제작
const ReportPage = () => {
    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(12);
    const [key, setKey] = useState('mall_title');
    const [word, setWord] = useState('');

    const callAPI = async () => {
        const res = await axios.get(`/report/list?key=${key}&word=${word}&page=${page}&size=${size}`)
        console.log(res.data)
        setList(res.data)
    }
    useEffect(() => { callAPI() }, [])
    return (
        <Row>
            <Col>
                <h5 className='mb-5 text-center'> 신고접수 현황</h5>
                <Table>
                    <thead>
                        <tr>
                            <td><input type="checkbox" /></td>
                            <td>신고접수번호</td>
                            <td>신고글</td>
                            <td>신고자</td>
                            <td>신고당한회원</td>
                            <td>신고내용</td>
                            <td>처리상태</td>
                        </tr>
                    </thead>
                    <thead>
                        {list.map(report =>
                            <tr key={report.report_key}>
                                <td><input type="checkbox" /></td>
                                <td>{report.report_key}</td>
                                <td>
                                    <a
                                        href={`http://localhost:3000/${report.report_root}/read/${report.report_origin}`}
                                    >
                                        {report.report_root}_key={report.report_origin}
                                    </a>
                                </td>
                                <td>{report.report_from}</td>
                                <td>{report.report_to}</td>
                                <td>{report.report_contents}</td>
                                <td>{report.report_state === 0 ? "미처리" : "처리"}</td>
                            </tr>
                        )}
                    </thead>
                </Table>
            </Col>
        </Row>
    )
}

export default ReportPage