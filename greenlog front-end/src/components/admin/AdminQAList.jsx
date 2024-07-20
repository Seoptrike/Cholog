import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import { Row, Col, InputGroup, Button, Table, Form } from 'react-bootstrap';
import axios from 'axios';

const AdminQAList = () => {
    const [list, setList] = useState([]);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [key, setKey] = useState('qa_title');
    const [word, setWord] = useState('');
    const callAPI = async () => {
        const res = await axios.get(`/qa/qaList?key=${key}&word=${word}&page=${page}&size=${size}`);
        setList(res.data.doc);
        setCount(res.data.total);

        if (res.data.total === 0) {
            alert('검색어가 없습니다');
        }
    };
    const adminIds = ['admin', 'seop', 'hanna', 'gr001231', 'laonmiku', 'ne4102'];
    const currentUser = sessionStorage.getItem('uid');
    useEffect(() => {
        callAPI();
    }, [page]);

    const onClickSearch = async (e) => {
        e.preventDefault();
        setPage(1);
        callAPI();
    };
    return (
        <div>
            <Row className="mb-3">
                <Col md={10}>
                    <InputGroup >
                        <Form.Select className='me-2' value={key} onChange={(e) => setKey(e.target.value)}>
                            <option value="qa_title">제목</option>
                            <option value="qa_contents">내용</option>
                            <option value="qa_writer">글쓴이</option>
                        </Form.Select>
                        <Form.Control placeholder='검색어' value={word} onChange={(e) => setWord(e.target.value)} />
                        <Button onClick={(e) => onClickSearch(e)} >검색</Button>
                    </InputGroup>
                </Col>
                <Col>
                    검색수: {count}건
                </Col>
            </Row>
            <Table className='text-center'>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>글쓴이</th>
                        <th>등록일</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((post, index) => (
                        <tr key={post.QA_key}>
                            <td>{list.length - index}</td>
                            <td>
                                {post.QA_lock === 1 && !adminIds.includes(currentUser) && currentUser !== post.QA_writer ? (
                                    <span>🔒 비밀글</span>
                                ) : (
                                    <Link to={`/community/qa/read/${post.QA_key}`}>{post.QA_title}</Link>
                                )}
                            </td>
                            <td>{post.QA_writer}</td>
                            <td>{post.QA_regDate}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {count > size &&
                <Pagination
                    activePage={page}
                    itemsCountPerPage={size}
                    totalItemsCount={count}
                    pageRangeDisplayed={5}
                    prevPageText={"‹"}
                    nextPageText={"›"}
                    onChange={(e) => setPage(e)}
                />
            }
        </div>
    )
}

export default AdminQAList