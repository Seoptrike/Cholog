import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, InputGroup, FormControl, Spinner } from 'react-bootstrap';
import axios from 'axios';

const BBSInsert = () => {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
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

  //파일 업로드 전 이미지 출력
  const onChangeFile = (e) => {
    let selFiles = [];
    for (let i = 0; i < e.target.files.length; i++) {
      const file = {
        name: URL.createObjectURL(e.target.files[i]),
        byte: e.target.files[i],
        sequence: i
      }
      selFiles.push(file);
    }
    setFiles(selFiles);
  }

  const onClickUpload = async (bbsphoto_bbs_key) => {
    if (files.length === 0) return;
    if (!window.confirm(`${files.length}개 사진파일을 업로드 하시겠습니까?`)) return;

    try{
    const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append('bytes', files[i].byte);
      }
    console.log(formData);

    await axios.post(`/bbs/attach/${bbsphoto_bbs_key}`, formData);
    alert("이미지저장완료!");
    setFiles([]);
  }catch(error){
    console.err("첨부파일업로드오류:" , error);
    alert("첨부파일 업로드 중 오류가 발생했습니다.");
  }
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    if (bbs_title.trim() === "") {
      alert("제목을 입력하세요!");
      return;
    }
    if (bbs_contents.trim() === "") {
      alert("내용을 입력하세요!");
      return;
    }
    if (!window.confirm("게시글을 등록하실래요?")) return;
    setLoading(true);

    const formData = {
      bbs_title,
      bbs_contents,
      bbs_type,
      bbs_writer
    };

    

    try {
      const response = await axios.post("/bbs/insert", formData);
      setLoading(false);

      if (response.status === 200) {
        alert('게시물이 등록되었습니다.');
        navigate(`/community/bbs/list.json`);
      } else {
        alert('게시물 등록에 실패했습니다.');
      }
    } catch (error) {
      setLoading(false);
      console.error('Error:', error.response ? error.response.data : error.message);
      alert('게시물 등록 중 오류가 발생했습니다.');
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
        <FormControl
          as="textarea"
          name="bbs_contents"
          placeholder="내용을 입력하세요"
          value={bbs_contents}
          onChange={onChangeForm}
          rows={10}
          className="mb-3"
        />
        <Button type="submit" className="mt-3" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : '등록'}
        </Button>
      </Form>
    </div>
  );
};

export default BBSInsert;
