import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Row, Col, Table, Tab, Tabs, Button } from 'react-bootstrap';
import axios from 'axios';
import HeaderTabs from '../../common/useful/HeaderTabs'; 

const NoticeList = () => {
  const [activeKey, setActiveKey] = useState('전체');
  const [pinnedNotices, setPinnedNotices] = useState([]);
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const response = await axios.get('/notice/list');
      const allNotices = response.data;

      // 고정 공지와 일반 공지를 분리
      const pinned = allNotices.filter(notice => notice.is_pinned);
      const regular = allNotices.filter(notice => !notice.is_pinned);

      setPinnedNotices(pinned);
      setNotices(regular);
    } catch (error) {
      console.error('Error fetching notices:', error);
    }
  };

  const filterNoticesByCategory = (category) => {
    return notices.filter(notice => category === '전체' || notice.notice_category === category);
  };

  return (
    <div>
      <HeaderTabs />
      <Row className="mb-3">
        <Col>
          <Tabs activeKey={activeKey} onSelect={k => setActiveKey(k)} className="mb-3" fill>
            <Tab eventKey="전체" title="전체">
              <NoticeTabContent pinnedNotices={pinnedNotices} notices={filterNoticesByCategory('전체')} />
            </Tab>
            <Tab eventKey="일반" title="일반">
              <NoticeTabContent pinnedNotices={pinnedNotices} notices={filterNoticesByCategory('일반')} />
            </Tab>
            <Tab eventKey="포인트" title="포인트">
              <NoticeTabContent pinnedNotices={pinnedNotices} notices={filterNoticesByCategory('포인트')} />
            </Tab>
            <Tab eventKey="이벤트" title="이벤트">
              <NoticeTabContent pinnedNotices={pinnedNotices} notices={filterNoticesByCategory('이벤트')} />
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </div>
  );
};

const NoticeTabContent = ({ pinnedNotices, notices }) => {
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>카테고리</th>
            <th>작성일</th>
            <th>조회수</th>
          </tr>
        </thead>
        <tbody>
          {pinnedNotices.map((notice, index) => (
            <tr key={notice.notice_key}>
              <td>{index + 1}</td>
              <td>
                <Link to={`/community/notice/read/${notice.notice_key}`}>{notice.notice_title}</Link>
              </td>
              <td>{notice.notice_category}</td>
              <td>{notice.notice_regDate}</td>
              <td>{notice.notice_views}</td>
            </tr>
          ))}
          {notices.map((notice, index) => (
            <tr key={notice.notice_key}>
              <td>{pinnedNotices.length + index + 1}</td>
              <td>
                <Link to={`/community/notice/read/${notice.notice_key}`}>{notice.notice_title}</Link>
              </td>
              <td>{notice.notice_category}</td>
              <td>{notice.notice_regDate}</td>
              <td>{notice.notice_views}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="text-end mt-3">
        <Link to={'/community/notice/insert'}>
          <Button>글쓰기</Button>
        </Link>
      </div>
    </div>
  );
};

export default NoticeList;
