import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import RouterPage from '../routers/RouterPage';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const TotalPage = () => {
    const uid= sessionStorage.getItem("uid")
    return (
        <div>
            <Row>
                <Col xs={2}>
                    <ListGroup>
                        <ListGroup.Item >유저</ListGroup.Item>
                        <ListGroup.Item> <Link to={"/user/login"}>로그인</Link></ListGroup.Item>
                        <ListGroup.Item> <Link to={`/user/read/${uid}`}>마이페이지</Link></ListGroup.Item>
                        <ListGroup.Item> <Link to={"/user/join"}>회원가입</Link></ListGroup.Item>
                        <ListGroup.Item> <Link to={"/user/following"}>팔로잉</Link></ListGroup.Item>
                        <ListGroup.Item> <Link to={"/user/follower"}>팔로워</Link></ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col xs={2}>
                    <ListGroup>
                        <ListGroup.Item >관리자</ListGroup.Item>
                        <ListGroup.Item> <Link to={"/user/admin"}>관리자대시보드</Link></ListGroup.Item>
                        <ListGroup.Item> <Link to={"/user/admin/question"}>관리자1:1/FAQ/Q&A</Link></ListGroup.Item>
                        <ListGroup.Item> <Link to={"/user/admin/list.json"}>관리자회원목록</Link></ListGroup.Item>
                        <ListGroup.Item> <Link to={"/user/admin/read/:user_uid"}>관리자용 회원정보</Link></ListGroup.Item>
                        <ListGroup.Item> <Link to={"/report/list.json"}>관리자용 신고접수</Link></ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col xs={2}>
                    <ListGroup>
                        <ListGroup.Item>다이어리</ListGroup.Item>
                        <ListGroup.Item> <Link to={"/diary/list.json/:user_uid"}>다이어리목록</Link></ListGroup.Item>
                        <ListGroup.Item> <Link to={"/diary/insert"}>다이어리작성</Link></ListGroup.Item>
                        <ListGroup.Item> <Link to={"/diary/read/:diary_key"}>다이어리읽기</Link></ListGroup.Item>
                        <ListGroup.Item> <Link to={"/diary/list.json"}>다이어리목록</Link></ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col xs={2}>
                    <ListGroup>
                        <ListGroup.Item>피망몰</ListGroup.Item>
                        <ListGroup.Item> <Link to={"/mall/list.json"}>상품리스트</Link></ListGroup.Item>
                        <ListGroup.Item> <Link to={`/mall/read/:mall_key`}>상품정보</Link></ListGroup.Item>
                        <ListGroup.Item> <Link to={"/mall/update/:mall_key"}>상품정보수정</Link></ListGroup.Item>
                        <ListGroup.Item> <Link to={"/mall/insert"}>상품등록</Link></ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col xs={2}>
                    <ListGroup>
                        <ListGroup.Item>댓글/리뷰</ListGroup.Item>
                        <ListGroup.Item> <Link to={"/reply/list.json"}>댓글리스트</Link></ListGroup.Item>
                        <ListGroup.Item> <Link to={"/reply/insert"}>댓글작성</Link></ListGroup.Item>
                        <ListGroup.Item> <Link to={"/review/list.json"}>리뷰리스트</Link></ListGroup.Item>
                        <ListGroup.Item> <Link to={"/review/insert"}>리뷰작성</Link></ListGroup.Item>
                        <ListGroup.Item> <Link to={"/review/update/:review_key"}>리뷰수정</Link></ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col xs={2}>
                    <ListGroup>
                        <ListGroup.Item>씨앗</ListGroup.Item>
                        <ListGroup.Item> <Link to={"/user/wallet/:user_uid"}>개인씨앗지갑</Link></ListGroup.Item>
                        <ListGroup.Item> <Link to={"/trade/list.json"}>개인거래내역</Link></ListGroup.Item>
                        <ListGroup.Item> <Link to={"/user/admin/seed/list.json"}>전체씨앗지갑목록</Link></ListGroup.Item>
                        <ListGroup.Item> <Link to={"/trade/admin/list.json"}>전체씨앗거래내역</Link></ListGroup.Item>
                        <ListGroup.Item> <Link to={"/auction/list.json/:user_uid"}>개인경매목록</Link></ListGroup.Item>
                        <ListGroup.Item> <Link to={"/auction/read/:auction_key"}>경매거래내역</Link></ListGroup.Item>
                        <ListGroup.Item> <Link to={"/auction/admin/list.json"}>전체경매목록</Link></ListGroup.Item>
                        <ListGroup.Item> <Link to={"/auction/update/:auction_key"}>경매내역수정</Link></ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </div>
    )
}

export default TotalPage