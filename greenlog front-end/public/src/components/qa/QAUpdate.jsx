import React, { useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';

const QAUpdate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const { post } = location.state;

  const [title, setTitle] = useState(post.title);
  const [contents, setContents] = useState(post.contents);
  const [category, setCategory] = useState(post.category);

  const TitleChange = (e) => {
    setTitle(e.target.value);
  };

  const ContentsChange = (event, editor) => {
    const data = editor.getData();
    setContents(data);
  };

  const CategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedPost = { title, contents, category };
    // 실제로는 axios.post()를 사용해 백엔드로 데이터를 전송합니다.
    // 여기서는 성공했다고 가정하고 바로 리다이렉트합니다.
    alert('문의사항이 수정되었습니다.');
    navigate(`/community/qa/read/${id}`);
  };

  return (
    <div>
      <h1 className="text-center my-5">문의사항 수정</h1>
      <Form onSubmit={handleSubmit}>
        <InputGroup className="mb-3">
          <FormControl
            as="select"
            value={category}
            onChange={CategoryChange}
            style={{ maxWidth: '150px', marginRight: '10px' }}>
            <option value="일반">일반</option>
            <option value="포인트">포인트</option>
            <option value="이벤트">이벤트</option>
          </FormControl>
          <FormControl
            placeholder="제목을 입력하세요"
            value={title}
            onChange={TitleChange}/>
        </InputGroup>
        <CKEditor
          editor={ClassicEditor}
          data={contents}
          onChange={ContentsChange}/>
        <Button type="submit" className="mt-3">
          수정
        </Button>
      </Form>
    </div>
  );
};

export default QAUpdate;
