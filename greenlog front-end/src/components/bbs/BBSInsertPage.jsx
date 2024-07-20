import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, InputGroup, FormControl, Spinner, Row, Col,Tooltip } from 'react-bootstrap';
import axios from 'axios';

const BBSInsertPage = () => {
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
    const uploadPhoto = async (bbsPhoto_bbs_key) => {
        if (files.length === 0) return;
        if (!window.confirm(`${files.length} 개 파일을 업로드 하시겠습니까? 취소시 이미지는 올라가지 않습니다!`)) return;

        try {
            const formData = new FormData();
            for (let i = 0; i < files.length; i++) {
                formData.append('bytes', files[i].byte);
            }
            // 첨부 파일 업로드 요청
            await axios.post(`/bbs/attach/${bbsPhoto_bbs_key}`, formData);
            //alert("첨부파일 업로드 완료!");
            setFiles([]); // 파일 상태 초기화
        } catch (error) {
            console.error("첨부 파일 업로드 오류:", error);
            alert("첨부 파일 업로드 중 오류가 발생했습니다.");
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!window.confirm("게시글을 등록하시겠습니까?")) return;
        //console.log(form);
        // 경매 상품이면서 시드가 0일 경우 경고 메시지를 띄우고 함수를 종료합니다.
        try {
            // 게시글 등록
            const response = await axios.post('/bbs/insert', form);
            const insertedMallKey = response.data; // 삽입된 행의 자동 생성 키
            //첨부 파일 업로드 함수 호출
            if (insertedMallKey) {
                await uploadPhoto(insertedMallKey);
                alert("게시글 등록 완료!");
                window.location.href = '/bbs/list.json';
            }

        } catch (error) {
            // 오류 발생 시 오류 메시지 출력
            console.error("게시글 등록 오류:", error);
            alert("게시글 등록 중 오류가 발생했습니다.");
        }
    }
    const thumbnail = (props) => ( 
        <Tooltip id="button-tooltip" {...props}>
            가장 왼쪽에 있는 이미지가 대표이미지로 임의 지정됩니다.
        </Tooltip>
    );
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
                        <option value={0}>자유</option>
                        <option value={1}>꿀팁</option>
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
                <Row>
                    {files.map(f =>
                        <Col key={f.name} xs={2} className='mb-2'>
                            <img src={f.name} style={{ width: "10rem", height: "10rem" }} />
                        </Col>
                    )}
                </Row>
                <Button type="submit" className="mt-3" disabled={loading}>
                    {loading ? <Spinner animation="border" size="sm" /> : '등록'}
                </Button>
            </Form>
        </div>
    )
}

export default BBSInsertPage