import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const FAQInsert = () => {
  const [category, setCategory] = useState('FAQ');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('카테고리:', category);
    console.log('제목:', title);
    console.log('내용:', content);
    
    if (category === 'FAQ') {
      navigate('/community/faq/list.json');
    } else if (category === '공지사항') {
      navigate('/community/notice/list.json');
    }
  };

  return (
    <div>
      <h1 className="text-center my-5">글쓰기</h1>
      <Form onSubmit={handleSubmit}>
        <InputGroup className="mb-3">
          <FormControl
            as="select"
            value={category}
            onChange={CategoryChange}
            style={{ maxWidth: '150px', marginRight: '10px' }}>
            <option value="FAQ">FAQ</option>
            <option value="공지사항">공지사항</option>
          </FormControl>
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

export default FAQInsert;
