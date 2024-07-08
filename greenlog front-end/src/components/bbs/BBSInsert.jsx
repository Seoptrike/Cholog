import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';

const BBSInsert = () => {
  const [category, setCategory] = useState('꿀팁');
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [uid, setUid] = useState('sampleUser'); // 예시로 사용자가 'sampleUser'로 설정되어 있습니다.
  const navigate = useNavigate();

  const CategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const TitleChange = (e) => {
    setTitle(e.target.value);
  };

  const ContentChange = (event, editor) => {
    const data = editor.getData();
    setContents(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = {
      uid,
      title,
      contents,
    };
    
    try {
      const response = await axios.post('/bbs/insert', postData);
      if (response.status === 200) {
        alert('게시물이 등록되었습니다.');
        navigate('/community/bbs/list.json');
      } else {
        alert('게시물 등록에 실패했습니다.');
      }
    } catch (error) {
      console.error('There was an error registering the post!', error);
      alert('게시물 등록 중 오류가 발생했습니다.');
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
          data="<p>내용을 입력하세요...</p>"
          onChange={ContentChange}/>
        <Button type="submit" className="mt-3">
          등록
        </Button>
      </Form>
    </div>
  );
};

export default BBSInsert;
