import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Row, Col, Table, Tab, Tabs, Button } from 'react-bootstrap';
import HeaderTabs from '../../common/useful/HeaderTabs'; 

const NoticeList = () => {
  const navigate = useNavigate();
  const [activeKey, setActiveKey] = useState('전체');

  const pinnedNotices = [
    { id: 1, category: '전체', title: '고정공지', contents: '고정공지 내용입니다.', regDate: '2024-06-20', views: 5376 },
  ];

  const notices = [
    { id: 2, category: '이벤트', title: '이벤트공지', contents: '이벤트공지 내용입니다.', regDate: '2024-07-02', views: 6541 },
    { id: 3, category: '일반', title: '일반공지', contents: '일반공지 내용입니다.', regDate: '2024-07-01', views: 11515 },
    { id: 4, category: '포인트', title: '포인트공지', contents: '포인트공지 내용입니다.', regDate: '2024-06-30', views: 19735 },
  ];

  const filterNoticesByCategory = (category) => {
    return notices.filter(notice => category === '전체' || notice.category === category);
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
        {pinnedNotices.map(notice => (
          <React.Fragment key={notice.id}>
            <tr>
              <td>{notice.id}</td>
              <td>
                <Link to={`/community/notice/read/${notice.id}`}>{notice.title}</Link>
              </td>
              <td>{notice.category}</td>
              <td>{notice.regDate}</td>
              <td>{notice.views}</td>
            </tr>
          </React.Fragment>
        ))}
        {notices.map(notice => (
          <React.Fragment key={notice.id}>
            <tr>
              <td>{notice.id}</td>
              <td>
                <Link to={`/community/notice/read/${notice.id}`}>{notice.title}</Link>
              </td>
              <td>{notice.category}</td>
              <td>{notice.regDate}</td>
              <td>{notice.views}</td>
            </tr>
          </React.Fragment>
        ))}
      </tbody>
    </Table>
  );
};

export default NoticeList;
