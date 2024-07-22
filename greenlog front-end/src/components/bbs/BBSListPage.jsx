import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination as MuiPagination, Chip } from '@mui/material';
import { styled } from '@mui/system';
import { Row, Col, InputGroup, Button, Form, Badge } from 'react-bootstrap';
import { FaHotjar } from "react-icons/fa";
import { Link } from 'react-router-dom';

// Define custom styles for top list rows
const TopListTableRow = styled(TableRow)(({ theme }) => ({
    backgroundColor: '#f5f5f5',
}));

// Define custom styles for default rows
const DefaultTableRow = styled(TableRow)(({ theme }) => ({
    backgroundColor: '#ffffff',
}));

const BBSListPage = () => {
    const [list, setList] = useState([]);
    const [topList, setTopList] = useState([]);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [key, setKey] = useState('title');
    const [key2, setKey2] = useState("all");
    const [word, setWord] = useState('');

    const callAPI = async () => {
        const res = await axios.get(`/bbs/list?key=${key}&word=${word}&page=${page}&size=${size}&key2=${key2}`);
        setList(res.data.documents);
        setCount(res.data.total);
        const res2 = await axios.get('/bbs/top');
        setTopList(res2.data);
        //console.log(res2.data)
    };
    console.log(key2);
    console.log(key);

    useEffect(() => {
        callAPI();
    }, [page]);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const onClickSearch = async (e) => {
        e.preventDefault();
        setPage(1);
        await callAPI();
    };

    const onClickRead = (bbs_key) => {
        window.location.href = `/bbs/read/${bbs_key}`
    }

    const renderChip = (type) => {
        switch (type) {
            case 0:
                return <Chip label="자유" color="primary" size="small" />;
            case 1:
                return <Chip label="꿀팁" color="secondary" size="small" />;
            default:
                return <Chip label="기타" size="small" />;
        }
    }
    return (
        <div>
            <h1 className="text-center my-5">자유게시판</h1>
            <Row className="mb-3">
                <Col xs={6}>
                    <InputGroup >
                        <Form.Select className='me-2' value={key2} onChange={(e) => setKey2(e.target.value)}>
                            <option value="all">전체</option>
                            <option value="free">자유</option>
                            <option value="tip">꿀팁</option>
                        </Form.Select>
                        <Form.Select className='me-2' value={key} onChange={(e) => setKey(e.target.value)}>
                            <option value="title">제목</option>
                            <option value="writer">글쓴이</option>
                            <option value="contents">내용</option>
                        </Form.Select>
                        <Form.Control placeholder='검색어' value={word} onChange={(e) => setWord(e.target.value)} />
                        <Button onClick={(e) => onClickSearch(e)} >검색</Button>
                    </InputGroup>
                </Col>
                <Col xs={6} className="text-end">
                    {sessionStorage.getItem('uid') && (
                        <Link to="/bbs/insert">
                            <Button>글쓰기</Button>
                        </Link>
                    )}
                </Col>
            </Row>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ width: '8%'}}>글번호</TableCell>
                            <TableCell sx={{ width: '54%' }}>제목</TableCell>
                            <TableCell sx={{ width: '10%' }}>글쓴이</TableCell>
                            <TableCell sx={{ width: '10%' }}>등록일</TableCell>
                            <TableCell sx={{ width: '8%' }}>조회수</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {topList.map(post => (
                            <TopListTableRow key={post.bbs_key} onClick={() => onClickRead(post.bbs_key)} sx={{ cursor:'pointer' }}>
                                <TableCell>{post.bbs_key}</TableCell>
                                <TableCell>
                                    {renderChip(post.bbs_type)} {post.bbs_title} <span style={{ color: "red" }}>HOT<FaHotjar style={{ color: "red" }} /> </span>
                                </TableCell>
                                <TableCell>{post.bbs_writer}</TableCell>
                                <TableCell>{post.fmtdate}</TableCell>
                                <TableCell>{post.bbs_vcnt}</TableCell>
                            </TopListTableRow>
                        ))}
                        {list.map(post => (
                            <DefaultTableRow key={post.bbs_key} onClick={() => onClickRead(post.bbs_key)} sx={{ '&:hover': { backgroundColor: '#f5f5f5' } , cursor:'pointer'  }}>
                                <TableCell>{post.bbs_key}</TableCell>
                                <TableCell>
                                    {renderChip(post.bbs_type)} {post.bbs_title}
                                </TableCell>
                                <TableCell>{post.bbs_writer}</TableCell>
                                <TableCell>{post.fmtdate}</TableCell>
                                <TableCell>{post.bbs_vcnt}</TableCell>
                            </DefaultTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {count > size &&
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
                    <MuiPagination
                        count={Math.ceil(count / size)}
                        page={page}
                        onChange={handlePageChange}
                        color="primary"
                        variant="outlined"
                        shape="rounded"
                    />
                </div>
            }
        </div>
    );
};

export default BBSListPage;
