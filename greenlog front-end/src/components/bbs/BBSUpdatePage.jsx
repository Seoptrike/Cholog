import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Row, Col, InputGroup, FormControl, Spinner, Badge } from 'react-bootstrap';
import { DragDropContext, Draggable, Droppable, } from 'react-beautiful-dnd';

const BBSUpdatePage = () => {
    const [loading, setLoading] = useState(false);
    const [file, setfile] = useState({
        name: '',
        byte: null
    })
    const [attach, setAttach]=useState([]);
    const refFile = useRef();
    const { bbs_key } = useParams();
    const [photos, setPhotos] = useState([]);
    const [form, setForm] = useState({
        bbs_title: '',
        bbs_contents: '',
        bbs_type: 0,
        bbs_writer: ''
    });
    const [list, setList] = useState(""); //기존데이터
    const [isModified, setIsModified] = useState(false);
    const onChangeFile = (e) => {
        setfile({
            name: URL.createObjectURL(e.target.files[0]),
            byte: e.target.files[0]
        })
    }

    const { bbs_title, bbs_contents, bbs_type, bbs_writer,bbs_photo } = form;

    const callAPI = async () => {
        const res = await axios.get(`/bbs/read/${bbs_key}`);
        setForm(res.data);
        setList(res.data);
    };
    const callAttach = async () => {
        //사진미리보기
        const res1 = await axios.get(`/bbs/attach/list/${bbs_key}`)
        setPhotos(res1.data);
        setAttach(res1.data);
    };


    const onClickUpdate = async (photos) => {
        if (isModified === true) {
            alert("게시글 수정 완료!");
            window.location.href = '/bbs/list.json';
        }
        else {
            // 기존 데이터와 폼 데이터 비교
            if (JSON.stringify(list) === JSON.stringify(form) && photos === attach) {
                alert("변경된 내용이 없습니다!");
                return;
            }
            if (!window.confirm("내용을 수정하실래요?")) return;
            console.log("form: " + form + "list: " + list);

        try {
            //사진순서 수정
            photos.forEach(async p => {
                await axios.post('/bbs/update/photo', p);
                console.log(p);
            });
            // 게시글 수정
            await axios.post("/bbs/update", form)
            alert("수정완료!");
            window.location.href = `/bbs/read/${bbs_key}`;

        } catch (error) {
            // 오류 발생 시 오류 메시지 출력
            console.error("게시글 수정 오류:", error.toString());
            alert("게시글 수정 중 오류가 발생했습니다.");
        }
    }
}
    const onChangeForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const onChangeCategory = (e) => {
        setForm({ ...form, bbs_type: parseInt(e.target.value) });
    };

    const onReset = () => {
        if (!window.confirm('변경된 내용을 취소하실래요?')) return;
        callAPI();
    };

    //사진 드래그 시 필수 셋팅
    const handleOnDragEnd = (result) => {
        if (!result.destination) return;
        const items = [...photos];
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        console.log("item", items);
        const updateSequence = items.map((item, index) => ({
            ...item,
            mallPhoto_sequence: index
        }));
        setPhotos(updateSequence);

    };
    const onClickDelete = async (photo) => {
        if (!window.confirm(`${photo.bbsPhoto_key}번 이미지를 삭제하시겠습니까?`)) return;
        //첨부파일삭제
        const res = await axios.post("/bbs/attach/delete", photo);
        if (res.data === 0) {
            alert("삭제 완료!");
            setIsModified(true);
            callAttach(); // 삭제 성공 시 필요한 추가 작업 (예: 목록 새로고침 등)
        } else {
            alert("대표이미지는 삭제 할 수 없습니다!");
        }
    }
    const onClickImageSave = async () => {
        if (file.byte === null) return;
        if (!window.confirm("이미지를 추가하시겠습니까?")) return;
        //이미지 업로드
        const formData = new FormData();
        formData.append("byte", file.byte);
        console.log(formData);
        await axios.post(`/bbs/attachOne/${bbs_key}`, formData);
        alert("이미지 추가완료!")
        setfile("");
        setIsModified(true);
        callAttach();
    }
    
    const onUpdateMainPhoto = async (photo) => {
        await axios.post("/bbs/update/mainPhoto", photo)
        setIsModified(true);
        callAPI();
        alert("대표이미지 변경 완료!")
    }

    const onClickCancel = () => {
        if (!window.confirm('변경취소! 이전 페이지로 돌아갑니다!')) return;
        window.location.href = `/bbs/read/${bbs_key}`;
    }

    useEffect(() => {
        callAPI();
        callAttach();
    }, [bbs_key]);
    return (
        <div>
            <h1 className="text-center my-5">글 수정하기</h1>
            <Form>
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
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId='photo.mallPhoto_photo' direction="horizontal">
                        {(provided) => (
                            <div
                                className='photo.mallPhoto_photo'
                                {...provided.droppableProps} ref={provided.innerRef}
                            >
                                <Row>
                                    {photos.map((photo, index) => {
                                        return (
                                            <Draggable key={photo.bbsPhoto_photo} draggableId={photo.bbsPhoto_photo} index={index}>
                                                {(provided) => (
                                                    <Col key={photo.bbsPhoto_photo} xs={2} className='mt-2'
                                                        ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                        <div style={{ position: "relative" }}>
                                                            <span>
                                                                {bbs_photo === photo.bbsPhoto_photo ?
                                                                    <Badge style={{ position: "absolute", top: '10px', right: "30px" }} bg='primary'>현재 대표이미지</Badge>
                                                                    :
                                                                    <Badge onClick={() => onUpdateMainPhoto(photo)} style={{ cursor: "pointer", position: "absolute", top: '10px', right: "30px" }} bg='success'>썸네일 설정하기</Badge>
                                                                }
                                                                <Badge onClick={() => onClickDelete(photo)} style={{ cursor: "pointer", position: "absolute", top: '10px', right: "5px" }} bg='danger'>X</Badge>
                                                            </span>
                                                        </div>

                                                        <img src={photo.bbsPhoto_photo} style={{ borderRadius: "50%", width: "10rem", height: "10rem" }} />
                                                    </Col>


                                                )}
                                            </Draggable>

                                        )
                                    }
                                    )}
                                    <Col xs={2}>
                                        <img src={file.name || "/images/plus.png"} style={{ borderRadius: "50%", width: "10rem", height: "10rem" }} onClick={() => refFile.current.click()} />
                                        <input ref={refFile} type="file" onChange={onChangeFile} style={{ display: "none" }} />
                                        {file.name &&
                                            <div className="text-center mt-2"><Button onClick={onClickImageSave} size="sm">이미지 추가</Button></div>
                                        }
                                    </Col>
                                    {provided.placeholder}
                                </Row>

                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
                <Button onClick={() => onClickUpdate(photos)} variant="outline-secondary" >게시글 수정</Button>
                <Button onClick={onClickCancel} variant="outline-secondary" >취소</Button>
            </Form>
        </div>
    )
}

export default BBSUpdatePage