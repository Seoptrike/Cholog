import React, { useState } from 'react'
import { Row, Col, Card, Table, Button, InputGroup, Form } from 'react-bootstrap'

const Following = () => {
    const [word, setWord] = useState('');
    const [key, setKey] = useState('follow_from')

    const onClickSearch = (e) => {
        e.preventDefault();
        //callAPI();
    }
    return (
        <div>
            <Row>
                <Col xs={6}>
                    <Card>
                        <h5 className='text-center mt-3'>내가 팔로우 하는 친구</h5>
                        <hr />
                        <Row className='justify-content-center'>
                            <Col xs={11}>
                                <form onSubmit={onClickSearch}>
                                    <InputGroup className='text-center'>
                                        <Form.Select
                                            value={key}
                                            onChange={(e) => {
                                                setKey(e.target.value)
                                            }}>
                                            <option value="follow_from">아이디</option>
                                            <option value="user_nickname">닉네임</option>
                                        </Form.Select>
                                        <Form.Control onChange={(e) => { setWord(e.target.value) }} value={word} placeholder='검색어를 입력하세요'></Form.Control>
                                        <Button type='submit' size='sm'>검색</Button>
                                    </InputGroup>
                                </form>
                            </Col>
                        </Row>
                        <Row className='justify-content-center'>
                            <Col xs={11}>
                                <Table>
                                    <thead>
                                        <tr>
                                            <td>사진</td>
                                            <td>아이디(닉네임)</td>
                                            <td className='text-end'><Button variant='danger' size='sm'>삭제</Button></td>
                                        </tr>
                                    </thead>
                                </Table>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Following