import React, { useEffect, useState, useContext } from 'react';
import Pagination from 'react-js-pagination';
import { Link } from 'react-router-dom';
import axios from 'axios';
import HeaderTabs from '../../common/useful/HeaderTabs';
import { Container, TextField, MenuItem, Select, FormControl, Button, Typography, Box, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { UserContext } from '../user/UserContext';
import './NoticeList.css'; // CSS 파일 임포트

const NoticeList = () => {
  const { userData } = useContext(UserContext);
  const [list, setList] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [key, setKey] = useState('all');
  const [word, setWord] = useState('');
  const [searchClicked, setSearchClicked] = useState(false);

  const callAPI = async () => {
    const res = await axios.get(`/notice/list.json?key=${key}&word=${word}&page=${page}&size=${size}`);
    setList(res.data.documents);
    setCount(res.data.total);

    if (searchClicked && res.data.total === 0) {
      alert('검색 결과가 없습니다');
      setSearchClicked(false);
    }
  };

  useEffect(() => {
    callAPI();
  }, [page, key, size]);

  const onClickSearch = async (e) => {
    e.preventDefault();
    setPage(1);
    setSearchClicked(true);
    callAPI();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onClickSearch(e);
    }
  };

  const handleKeyChange = (event) => {
    setKey(event.target.value);
    setPage(1);
    callAPI();
  };

  return (
    <Container maxWidth="xl">
      <HeaderTabs />
      <Typography variant="h4" component="h1" align="center" my={5}>공지사항</Typography>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box display="flex" alignItems="center" className="search-container">
          <TextField
            variant="outlined"
            placeholder="검색어를 입력하세요"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            onKeyDown={handleKeyDown}
            className="search-input"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={onClickSearch}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
            sx={{ marginLeft: 2 }}
          />
        </Box>
        {userData.auth && (
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/community/notice/insert"
            sx={{ backgroundColor: 'black', color: 'white' }}
          >
            글쓰기
          </Button>
        )}
      </Box>
      <table className="notice-table">
        <thead>
          <tr>
            <th>No</th>
            <th>
              <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                <Select
                  value={key}
                  onChange={handleKeyChange}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                  className="category-select"
                >
                  <MenuItem value="all">카테고리</MenuItem>
                  <MenuItem value="normal">일반</MenuItem>
                  <MenuItem value="member">회원</MenuItem>
                  <MenuItem value="event">이벤트</MenuItem>
                </Select>
              </FormControl>
            </th>
            <th>제목</th>
            <th>등록일</th>
            <th>조회수</th>
          </tr>
        </thead>
        <tbody>
          {list.map((n, index) => (
            <tr key={n.notice_key}>
              <td>{index + 1}</td>
              <td>
                <span>
                  {n.notice_type === 1 ? '일반' : n.notice_type === 2 ? '회원' : '이벤트'}
                </span>
              </td>
              <td className="title-cell">
                <Link to={`/community/notice/read/${n.notice_key}`} className="notice-link">{n.notice_title}</Link>
              </td>
              <td>{n.fmtdate}</td>
              <td>{n.notice_vcnt}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {count > size && (
        <Pagination
          activePage={page}
          itemsCountPerPage={size}
          totalItemsCount={count}
          pageRangeDisplayed={5}
          prevPageText={"‹"}
          nextPageText={"›"}
          onChange={(pageNumber) => setPage(pageNumber)}
        />
      )}
    </Container>
  );
};

export default NoticeList;
