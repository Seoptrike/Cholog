import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const StyledTabs = styled(Tabs)`
  .nav-item {
    margin-right: 10px;
  }

  .nav-link {
    padding: 10px 20px;
    border-radius: 5px;
    transition: background-color 0.3s, color 0.3s;
    font-size: 1rem;
  }

  .nav-link.active {
    background-color: #81C784; /* 연한 초록색 */
    color: white !important;
  }

  .nav-link:hover {
    background-color: #1B5E20; /* 조금 더 진한 초록색 */
    color: white;
  }

  .nav-tabs {
    border-bottom: none;
  }
`;

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
    <StyledTabs
      activeKey={getDefaultTab()}
      onSelect={handleTabSelect}
      id="header-tabs"
      className="mb-3"
      fill
    >
      <Tab eventKey="qa" title="Q&A" />
      <Tab eventKey="faq" title="FAQ" />
      <Tab eventKey="notice" title="공지사항" />
    </StyledTabs>
  );
};

export default HeaderTabs;
