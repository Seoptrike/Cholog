import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const UpdatePage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { bbs_key } = useParams();
  const [form, setForm] = useState({
    bbs_title: '',
    bbs_contents: '',
    bbs_type: 0,
    bbs_writer: ''
  });
  const [category, setCategory] = useState(0);
  const { bbs_title, bbs_contents, bbs_type, bbs_writer } = form;

  const callAPI = async () => {
    try {
      const res = await axios.get(`/bbs/read/${bbs_key}`); 
      if (res.status === 200) {
        const data = res.data;
        setForm({
          bbs_title: data.bbs_title,
          bbs_contents: data.bbs_contents,
          bbs_type: data.bbs_type,
          bbs_writer: data.bbs_writer
        });
        setCategory(data.bbs_category); 
      } else {
        console.error('Failed to fetch data:', res.data);
      }
    } catch (error) {
      console.error('There was an error fetching the post data!', error);
    }
  };

  useEffect(() => {
    callAPI();
  }, [bbs_key]);

  const onChangeForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onChangeCKEditor = (event, editor) => {
    const data = editor.getData();
    setForm({ ...form, bbs_contents: data });
  };

  const onReset = () => {
    if (!window.confirm('변경된 내용을 취소하실래요?')) return;
    callAPI();
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!window.confirm('변경된 내용을 수정하실래요?')) return;
    setLoading(true);

    const updateForm = { ...form, bbs_category: category }; 
    console.log(updateForm);
    try {
      const response = await axios.post(`/bbs/update/${bbs_key}`, updateForm); 
      setLoading(false);
      if (response.status === 200) {
        alert('게시물이 수정되었습니다.');
       window.location.href=`/community/bbs/read/${bbs_key}`;
      } else {
        alert('게시물 수정에 실패했습니다.');
        console.error('Response data:', response.data);
      }
    } catch (error) {
      setLoading(false);
      console.error('There was an error updating the post!', error);
      alert('게시물 수정 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className='my-5'>
      <h1 className='text-center mb-5'>게시글 수정</h1>
      <Row className='justify-content-center'>
        <Col xs={12} md={10} lg={8}>
          <Form onReset={onReset} onSubmit={onSubmit}>
            <Form.Control
              value={bbs_title}
              name="bbs_title"
              onChange={onChangeForm}
              className='mb-2'
              placeholder="제목을 입력하세요"
            />
            <CKEditor
              editor={ClassicEditor}
              data={bbs_contents}
              onChange={onChangeCKEditor}
            />
            <div className='text-center mt-3'>
              <Button type="submit" className='px-5 me-2' disabled={loading}>
                {loading ? '수정 중...' : '수정'}
              </Button>
              <Button type="reset" className='px-5' variant='secondary'>취소</Button>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default UpdatePage;
