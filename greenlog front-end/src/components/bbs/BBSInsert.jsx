import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, InputGroup, FormControl, Spinner } from 'react-bootstrap';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';

const BBSInsert = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const uid = sessionStorage.getItem("uid");
  const [form, setForm] = useState({
    bbs_title: '',
    bbs_contents: '',
    bbs_type: 0,
    bbs_writer: uid
  });

  const { bbs_title, bbs_contents, bbs_type, bbs_writer } = form;

  const onChangeForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onChangeCategory = (e) => {
    setForm({ ...form, bbs_type: parseInt(e.target.value) });
  };

  const onChangeCKEditor = (event, editor) => {
    let data = editor.getData();
    data = data.replace(/<\/?p>/g, '');  // <p> 태그를 제거
    setForm({ ...form, bbs_contents: data });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (bbs_title === "") {
      alert("제목을 입력하세요!");
      return;
    }
    if (!window.confirm("게시글을 등록하실래요?")) return;
    setLoading(true);
  
    const response = await axios.post("/bbs/insert", form);
    setLoading(false);
  
    if (response.status === 200) {
      alert('게시물이 등록되었습니다.');
      navigate(`/community/bbs/list.json`);
    } else {
      alert('게시물 등록에 실패했습니다.');
    }
  };

  return (
    <div>
      <h1 className="text-center my-5">글쓰기</h1>
      <Form onSubmit={onSubmit}>
        <InputGroup className="mb-3">
          <FormControl
            as="select"
            name="bbs_type"
            value={bbs_type}
            onChange={onChangeCategory}
            style={{ maxWidth: '150px', marginRight: '10px' }}>
            <option value={0}>꿀팁</option>
            <option value={1}>자유</option>
          </FormControl>
          <FormControl
            type="text"
            name="bbs_title"
            placeholder="제목을 입력하세요"
            value={bbs_title}
            onChange={onChangeForm}
          />
        </InputGroup>
        <CKEditor
          editor={ClassicEditor}
          data={bbs_contents}
          onChange={onChangeCKEditor}
        />
        <Button type="submit" className="mt-3" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : '등록'}
        </Button>
      </Form>
    </div>
  );
};

export default BBSInsert;
