import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, InputGroup, FormControl, Spinner } from 'react-bootstrap';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';

const NoticeInsert = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const uid = sessionStorage.getItem("uid");
  const [form, setForm] = useState({
    notice_title: '',
    notice_contents: '',
    notice_writer: uid,
    notice_type: ''
  });

  const { notice_title, notice_contents, notice_type } = form;

  const onChangeForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onChangeCKEditor = (event, editor) => {
    let data = editor.getData();
    data = data.replace(/<\/?p>/g, '');  // <p> 태그를 제거
    setForm({ ...form, notice_contents: data });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (notice_title === "") {
      alert("제목을 입력하세요!");
      return;
    }
    if (!window.confirm("공지사항을 등록하실래요?")) return;
    setLoading(true);
  
    const updateForm = { ...form };
    const response = await axios.post("/notice/insert", updateForm);
    setLoading(false);
  
    if (response.status === 200) {
      alert('공지사항이 등록되었습니다.');
      navigate(`/community/notice/list.json`);
    } else {
      alert('공지사항 등록에 실패했습니다.');
    }
  };

  return (
    <div>
      <h1 className="text-center my-5">공지사항 등록</h1>
      <Form onSubmit={onSubmit}>
        <InputGroup className="mb-3">
          <FormControl
            as="select"
            name="notice_type"
            value={notice_type}
            onChange={onChangeForm}
            style={{ maxWidth: '150px', marginRight: '10px' }}>
            <option value="0">일반</option>
            <option value="1">포인트</option>
            <option value="2">이벤트</option>
          </FormControl>
          <FormControl
            type="text"
            name="notice_title"
            placeholder="제목을 입력하세요"
            value={notice_title}
            onChange={onChangeForm}
          />
        </InputGroup>
        <CKEditor
          editor={ClassicEditor}
          data={notice_contents}
          onChange={onChangeCKEditor}
        />
        <Button type="submit" className="mt-3" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : '등록'}
        </Button>
      </Form>
    </div>
  );
};

export default NoticeInsert;
