import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Table, Button, InputGroup, Form } from 'react-bootstrap'
import Pagination from 'react-js-pagination';

const ModalFollower = ({ uid, cnt }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [word, setWord] = useState('');
    const [key, setKey] = useState('id');
    const [size, setSize] = useState(10);
    const [page, setPage] = useState(1);
    const [list, setList] = useState([])
    const [count, setCount] = useState('');
    const callAPI = async () => {
        const res = await axios.get(`/follow/follower/${uid}?key=${key}&word=${word}&size=${size}&page=${page}`)
        setList(res.data.doc)
        setCount(res.data.total)
        console.log(res.data)
    }
    useEffect(() => { callAPI() }, [page])

    const onClickSearch = (e) => {
        e.preventDefault();
        setWord("");
        callAPI();
    }
    return (
        <>
            <div onClick={handleShow}>
                팔로워 {count}
            </div>
            <Modal
                style={{ top: "25%" }}
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size='lg'
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h5 className='text-center'>나를 팔로우 하는 친구</h5>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <Row>
                            <Col xs={12}>
                                <Card>
                                    <Row>
                                        <Col xs={8} className='my-2 ms-2'>
                                            <form onSubmit={onClickSearch}>
                                                <InputGroup className='text-center'>
                                                    <Form.Select
                                                        value={key}
                                                        onChange={(e) => {
                                                            setKey(e.target.value)
                                                        }}>
                                                        <option value="id">아이디</option>
                                                        <option value="nickname">닉네임</option>
                                                    </Form.Select>
                                                    <Form.Control onChange={(e) => { setWord(e.target.value) }} value={word} placeholder='검색어를 입력하세요'></Form.Control>
                                                    <Button type='submit' size='sm'>검색</Button>
                                                </InputGroup>
                                            </form>
                                        </Col>
                                    </Row>
                                    <Row className='justify-content-center'>
                                        <Col xs={12}>
                                            <Table>
                                                <thead>
                                                    <tr>
                                                        <td>사진</td>
                                                        <td>아이디(닉네임)</td>
                                                        <td></td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {list.map((f, index) =>
                                                        <tr key={index}>
                                                            <td><img src={f.user_img} style={{ width: "100%", height: "2rem", objectFit: "contain" }} /></td>
                                                            <td>{f.user_uid}({f.user_nickname})</td>
                                                            {uid === sessionStorage.getItem("uid") &&
                                                                <td className='text-end'><Button variant='danger' size='sm'>삭제</Button></td>
                                                            }
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </Table>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>
                        {count > size &&
                            <Pagination
                                activePage={page}
                                itemsCountPerPage={size}
                                totalItemsCount={count}
                                pageRangeDisplayed={5}
                                prevPageText={"‹"}
                                nextPageText={"›"}
                                onChange={(e) => setPage(e)} />
                        }
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalFollower