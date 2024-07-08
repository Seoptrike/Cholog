import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const QAInsert = () => {
  const [category, setCategory] = useState('공지사항');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const TitleChange = (e) => {
    setTitle(e.target.value);
  };

  const ContentChange = (event, editor) => {
    const data = editor.getData();
    setContent(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('카테고리:', category);
    console.log('제목:', title);
    console.log('내용:', content);
    navigate('/community/qa/list.json');
  };

  return (
    <div>
      <h1 className="text-center my-5">글쓰기</h1>
      <Form onSubmit={handleSubmit}>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="제목을 입력하세요"
            value={title}
            onChange={TitleChange}/>
        </InputGroup>
        <CKEditor
          editor={ClassicEditor}
          data="<p>내용을 입력하세요...</p>"
          onChange={ContentChange}/>
        <Button type="submit" className="mt-3" >
          등록
        </Button>
      </Form>
    </div>
  );
};

export default QAInsert;
