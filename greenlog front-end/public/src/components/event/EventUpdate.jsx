import React, { useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const EventUpdate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const { event } = location.state;

  const [title, setTitle] = useState(event.title);
  const [contents, setContents] = useState(event.contents);
  const [category, setCategory] = useState(event.category);

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
    const updatedEvent = { title, contents, category };
    // 실제로는 axios.post()를 사용해 백엔드로 데이터를 전송
    // 여기서는 성공했다고 가정하고 바로 리다이렉트
    alert('이벤트가 수정되었습니다.');
    navigate(`/community/event/read/${id}`);
  };

  return (
    <div>
      <h1 className="text-center my-5">이벤트 수정</h1>
      <Form onSubmit={handleSubmit}>
        <InputGroup className="mb-3">
          <FormControl
            as="select"
            value={category}
            onChange={CategoryChange}
            style={{ maxWidth: '150px', marginRight: '10px' }}>
            <option value="이벤트">이벤트</option>
            <option value="봉사">봉사</option>
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

export default EventUpdate;
