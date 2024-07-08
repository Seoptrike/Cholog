import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';

const HeaderTabs = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleTabSelect = (key) => {
    if (key === 'faq') {
      navigate('/community/faq/list.json');
    } else if (key === 'notice') {
      navigate('/community/notice/list.json');
    } else {
      navigate('/community/qa/list.json');
    }
  };

  const getDefaultTab = () => {
    if (location.pathname.includes('/community/faq')) {
      return 'faq';
    } else if (location.pathname.includes('/community/notice')) {
      return 'notice';
    }
    return 'qa';
  };

  return (
    <Tabs
      activeKey={getDefaultTab()}
      onSelect={handleTabSelect}
      id="header-tabs"
      className="mb-3"
      fill
    >
      <Tab eventKey="qa" title="Q&A" />
      <Tab eventKey="faq" title="FAQ" />
      <Tab eventKey="notice" title="공지사항" />
    </Tabs>
  );
};

export default HeaderTabs;
