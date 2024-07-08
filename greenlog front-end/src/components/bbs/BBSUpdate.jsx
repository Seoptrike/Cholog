import React, { useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';

const BBSUpdate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const { post } = location.state;

  const [category, setCategory] = useState(post.category);
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.contents);

  const CategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const TitleChange = (e) => {
    setTitle(e.target.value);
  };

  const ContentChange = (event, editor) => {
    const data = editor.getData();
    setContent(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedPost = { category, title, contents: content };
    try {
      const res = await axios.post(`/bbs/update/${id}`, updatedPost);
      if (res.data.success) {
        alert('게시물이 수정되었습니다.');
        navigate(`/community/bbs/read/${id}`);
      } else {
        alert('수정에 실패했습니다.');
      }
    } catch (error) {
      alert('수정 중 오류가 발생했습니다.');
    }
  };

  return (
    <div>
      <h1 className="text-center my-5">게시물 수정</h1>
      <Form onSubmit={handleSubmit}>
        <InputGroup className="mb-3">
          <FormControl
            as="select"
            value={category}
            onChange={CategoryChange}
            style={{ maxWidth: '150px', marginRight: '10px' }}>
            <option value="꿀팁">꿀팁</option>
            <option value="자유">자유</option>
          </FormControl>
          <FormControl
            placeholder="제목을 입력하세요"
            value={title}
            onChange={TitleChange}/>
        </InputGroup>
        <CKEditor
          editor={ClassicEditor}
          data={content}
          onChange={ContentChange}/>
        <Button type="submit" className="mt-3">
          수정
        </Button>
      </Form>
    </div>
  );
};

export default BBSUpdate;
