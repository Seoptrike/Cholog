import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Row, Col, InputGroup, Form, Button, Badge } from 'react-bootstrap'
import { FaRegThumbsUp } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa";
import { Link, useParams } from 'react-router-dom';
import '../../common/useful/Paging.css';
import Pagination from 'react-js-pagination'


//스피너기능 넣기

const DiaryListPage = () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [origin, setOrigin] = useState([]);
  const [checked, setChecked] = useState(0);
  const [size, setSize] = useState(8);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const { diary_writer } = useParams();
  const uid = sessionStorage.getItem("uid");

  const callAPI = async () => {
    const res = await axios.get(`/diary/list.json/${diary_writer}?user_uid=${uid}&page=${page}&size=${size}`);
    console.log(diary_writer);
    console.log(res.data);
    const data = res.data.documents.map(diary => diary && { ...diary, checked: false })
    setList(data);
    setOrigin(data);
    setCount(res.data.total);

  }

  useEffect(() => {
    callAPI();
  }, [page])

  useEffect(() => {
    let cnt = 0;
    list.forEach(list => list.checked && cnt++);
    setChecked(cnt);
  }, [list])


  const onChangeAll = (e) => {
    const data = list.map(diary => diary && { ...diary, checked: e.target.checked });
    setList(data);
  }

  const onChangeSingle = (e, diary_key) => {
    const data = list.map(diary => diary.diary_key === diary_key ? { ...diary, checked: e.target.checked } : diary);
    setList(data);
  }

  const onClickDelete = () => {
    if (!window.confirm("선택하신 일기를 삭제하시겠습니까?")) return;
    let cnt = 0;
    list.forEach(async list => {
      if (list.checked) {
        await axios.post(`/diary/delete/${list.diary_key}`);
        cnt++

        if (cnt === checked) {
          alert(`${cnt}개 일기가 삭제되었습니다`);
          callAPI();
          setPage(1);
        }
      }
    })
  }

  const LikePress = async (diary_key) => {
    await axios.post(`/diary/like`, { user_uid: sessionStorage.getItem("uid"), diary_key });
    if(list.ucnt===1){
      alert("이미 좋아요를 누른 일기입니다.")
    }else{
      alert("좋아요를 눌렀습니다!");
      callAPI();
      setLoading(false);
    }
    
  }

  const LikeCancel = async (diary_key) => {
    if (diary_key === "") {
      setLoading(true);
    } else {
      await axios.post(`/diary/cancel`, { user_uid: sessionStorage.getItem("uid"), diary_key });
      if(list.ucnt===0){
        alert("좋아요를 이미 취소한 상태입니다.")
      }else{
      alert("좋아요가 취소되었습니다");
      callAPI();
      setLoading(false);
      }
    }
  }

  if (loading) return <h1>로딩중</h1>
  return (
    <div>
      <h1 className='my-5 text-center'>행운일기목록</h1>
      <Row>
        {(count===0) || sessionStorage.getItem("uid")===diary_writer &&
          <>
            <div>
              <input type="checkbox" onClick={onChangeAll} checked={list.length === checked} className='me-2' /> 전체선택
            </div>
            <div className='text-end mb-2'>
              <Button onClick={onClickDelete}>선택삭제</Button>
            </div>
          </>
        }
        {list.map(d =>
          <Col lg={3} key={d.diary_key} className="mb-5 mt-3">
            <Card className='mb-3' style={{height:"100%", width:"100%"}}>
              <Card.Header>
                <input onChange={(e) => onChangeSingle(e, d.diary_key)}
                  type="checkbox" checked={d.checked} className='me-2' />
                <Badge className='me-3'>{d.diary_state}</Badge>
                <div class="ellipsis">
                  <span>{d.diary_title}</span>
                </div>
              </Card.Header>
              <Card.Body>
                <Link to={`/diary/read/${d.diary_key}`}>
                <img src={d.diary_thumbnail ||"http://via.placeholder.com/100x100"} width="100%" height="310" />
                </Link>
                <hr />
                <Col>
                  <div class="ellipsis">{d.diary_contents}</div>
                </Col>
                <Col>
                  <div className='text-end' style={{ cursor: "pointer" }} >
                    {d.ucnt == 0 ? <FaRegThumbsUp style={{ fontSize: "20px" }} onClick={() => LikePress(d.diary_key)} /> :
                      <FaThumbsUp style={{ fontSize: "20px" }} onClick={() => LikeCancel(d.diary_key)} />}
                    {d.fcnt}
                  </div>
                </Col>
                <hr />
                {d.fmtUdate===d.fmtDdate ?  `등록일: ${d.fmtDdate}`: `수정일: ${d.fmtUdate}`}
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>
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

export default DiaryListPage