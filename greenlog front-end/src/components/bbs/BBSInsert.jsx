import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, InputGroup, FormControl, Spinner } from 'react-bootstrap';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import moment from 'moment';
import axios from 'axios';

const BBSInsert = () => {
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState(0);
  const navigate = useNavigate();
  const uid = sessionStorage.getItem("uid");
  const [form, setForm] = useState({
    bbs_title: '',
    bbs_contents: '',
    bbs_type: 0,
    bbs_writer:uid
  });

  const { bbs_title, bbs_contents, bbs_type, bbs_writer} = form;

  const onChangeForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onChangeCKEditor = (event, editor) => {
    const data = editor.getData();
    setForm({ ...form, bbs_contents: data });
  };

  const onSubmit = async(e) => {
    e.preventDefault();
    if (bbs_title === "") {
      alert("제목을 입력하세요!");
      return;
    }
    if (!window.confirm("게시글을 등록하실래요?")) return;
    setLoading(true);

    const updateForm = {...form, bbs_category:category}
    await axios.post("/bbs/insert", updateForm)
      .then(response => {
        setLoading(false);
        if (response.status === 200) {
          alert('게시물이 등록되었습니다.');
          navigate(`/community/bbs/list.json`);
        } else {
          alert('게시물 등록에 실패했습니다.');
          console.error('Response data:', response.data);
        }
      })
      .catch(error => {
        setLoading(false);
        console.error('There was an error registering the post!', error);
        alert('게시물 등록 중 오류가 발생했습니다.');
      });
  };

  return (
    <div>
      <h1 className="text-center my-5">글쓰기</h1>
      <Form onSubmit={onSubmit}>
        <InputGroup className="mb-3">
          <FormControl
            as="select"
            value={category}
            onChange={(e)=>setCategory(parseInt((e.target.value)))}
            style={{ maxWidth: '150px', marginRight: '10px' }}>
            <option value="0">꿀팁</option>
            <option value="1">자유</option>
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
          value={bbs_contents}
          data="내용을 입력하세요..."
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
