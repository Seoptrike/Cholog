import React, { useEffect, useRef, useState } from "react";
import { TextField, Grid, Typography, Paper, MenuItem } from "@mui/material";
import { Form, Row, Col, Button, Badge } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";
import { DragDropContext, Draggable, Droppable, } from 'react-beautiful-dnd';

export const UpdatePage = () => {
    const { mall_key } = useParams();
    const [loading, setLoading] = useState(false);
    const uid = sessionStorage.getItem("uid");
    const [file, setfile] = useState({
        name: '',
        byte: null
    })
    const [isModified, setIsModified] = useState(false);
    const [photos, setPhotos] = useState([]);
    const [attach, setAttach] = useState([]);
    const refFile = useRef();
    const [form, setForm] = useState(""); //바꾸는데이터
    const [list, setList] = useState(""); //기존데이터
    const { mall_title, mall_info, mall_price, mall_photo, mall_tstate, mall_pstate, mall_endDate } = form;

    const today = new Date();
    const tomorrowDate = new Date(today);
    tomorrowDate.setDate(today.getDate() + 1);
    const tomorrow = tomorrowDate.toISOString().split('T')[0];
    const [edate, setEdate] = useState(tomorrow);

    //일반
    const onChangeForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }
    //엔드데이트
    const onChangeEndDate = (e) => {
        setEdate(e.target.value);
    }
    //사진
    const onChangeFile = (e) => {
        setfile({
            name: URL.createObjectURL(e.target.files[0]),
            byte: e.target.files[0]
        })
    }

    const callAPI = async () => {
        setLoading(true);
        const res = await axios.get(`/mall/read/${mall_key}`);
        // 데이터 처리
        setForm(res.data);
        setList(res.data);
        setLoading(false);
    }

    const callAttach = async () => {
        //사진미리보기
        const res1 = await axios.get(`/mall/attach/list/${mall_key}`)
        setPhotos(res1.data);
        setAttach(res1.data);
    }

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

    const onClickUpdate = async (photos) => {
        if (isModified === true) {
            alert("게시글 수정 완료!");
            window.location.href = '/mall/list.json';
        }
        else {
            // 기존 데이터와 폼 데이터 비교
            if (JSON.stringify(list) === JSON.stringify(form) && photos === attach) {
                alert("변경된 내용이 없습니다! 마감일은 단일 수정이 불가합니다!");
                return;
            }
            if (!window.confirm("내용을 수정하실래요?")) return;
            console.log("form: " + form + "list: " + list);

            try {
                //사진순서 수정
                photos.forEach(async p => {
                    await axios.post('/mall/update/photo', p);
                    console.log(p);
                });
                // 게시글 수정
                await axios.post("/mall/update", {
                    mall_key,
                    mall_info,
                    mall_title,
                    mall_tstate,
                    mall_pstate,
                    mall_price: mall_tstate === 1 ? 0 : mall_price,
                    mall_endDate: edate
                })
                alert("수정완료!");
                window.location.href = `/mall/read/${mall_key}`;

            } catch (error) {
                // 오류 발생 시 오류 메시지 출력
                console.error("게시글 수정 오류:", error.toString());
                alert("게시글 수정 중 오류가 발생했습니다.");
            }
        }
    }

    const onClickDelete = async (photo) => {
        if (!window.confirm(`${photo.mallPhoto_key}번 이미지를 삭제하시겠습니까?`)) return;
        //첨부파일삭제
        const res = await axios.post("/mall/attach/delete", photo);
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
        if (!window.confirm("변경된 이미지를 저장하시겠습니까?")) return;
        //이미지 업로드
        const formData = new FormData();
        formData.append("byte", file.byte);
        console.log(formData);
        await axios.post(`/mall/attachOne/${mall_key}`, formData);
        alert("이미지 변경완료!")
        setfile("");
        setIsModified(true);
        callAttach();
    }

    const onUpdateMainPhoto = async (photo) => {
        await axios.post("/mall/update/mainPhoto", photo)
        setIsModified(true);
        callAPI();
        alert("대표이미지 변경 완료!")
    }

    const onClickCancel = () => {
        if (!window.confirm('변경취소! 이전 페이지로 돌아갑니다!')) return;
        window.location.href = `/mall/read/${mall_key}`;
    }

    useEffect(() => {
        callAPI();
        callAttach();
    }, [])

    if (loading) return <h1 className='text-center'>로딩중...</h1>
    return (
        <div className="my-5">
            <Paper elevation={3} style={{ padding: 20 }}>
                <Typography variant="h3" gutterBottom className="text-center ">
                    🧩수정중입니다🧩
                </Typography>
                <form>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                name="mall_title"
                                label="제목"
                                value={mall_title}
                                onChange={onChangeForm}
                                fullWidth
                                required
                                inputProps={{ maxLength: 20 }}
                                helperText="최대 20자까지 입력 가능합니다."
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                select
                                label="유형"
                                value={mall_tstate}
                                onChange={onChangeForm}
                                name="mall_tstate"
                                required
                                fullWidth
                            >
                                <MenuItem value={0}>일반나눔 올리기</MenuItem>
                                <MenuItem value={1}>무료나눔 올리기</MenuItem>
                                <MenuItem value={2}>구매글 올리기</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                select
                                label="물품상태"
                                value={mall_pstate}
                                onChange={onChangeForm}
                                name="mall_pstate"
                                required
                                fullWidth
                            >
                                <MenuItem value={0}>중고</MenuItem>
                                <MenuItem value={1}>미개봉,미사용</MenuItem>
                            </TextField>
                        </Grid>
                        {mall_tstate === 1 ?
                            <Grid item xs={3}>
                                <TextField
                                    label="Seed"
                                    type="number"
                                    name="mall_price"
                                    fullWidth
                                    value={0}
                                    onChange={onChangeForm}
                                    disabled
                                    required
                                />
                            </Grid>
                            :
                            <Grid item xs={3}>
                                <TextField
                                    label="Seed"
                                    type="number"
                                    name="mall_price"
                                    fullWidth
                                    required
                                    value={mall_price}
                                    inputProps={{ min: "0", step: "1" }}
                                    onChange={onChangeForm}
                                />
                            </Grid>
                        }
                        <Grid item xs={3}>
                            <TextField
                                label="마감일"
                                type="date"
                                name="endDate"
                                fullWidth
                                value={edate}
                                onChange={onChangeEndDate}
                                inputProps={{
                                    min: tomorrow // 현재 날짜 이전의 날짜 선택 불가능
                                }}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="mall_info"
                                label="내용"
                                fullWidth
                                multiline
                                value={mall_info}
                                rows={4}
                                onChange={onChangeForm}
                            />
                        </Grid>
                        <Grid item xs={12}>
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
                                                        <Draggable key={photo.mallPhoto_photo} draggableId={photo.mallPhoto_photo} index={index}>
                                                            {(provided) => (
                                                                <Col key={photo.mallPhoto_photo} xs={2} className='mt-2'
                                                                    ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                                    <div style={{ position: "relative" }}>
                                                                        <span>
                                                                            {mall_photo === photo.mallPhoto_photo ?
                                                                                <Badge style={{ position: "absolute", top: '10px', right: "30px" }} bg='primary'>현재 대표이미지</Badge>
                                                                                :
                                                                                <Badge onClick={() => onUpdateMainPhoto(photo)} style={{ cursor: "pointer", position: "absolute", top: '10px', right: "30px" }} bg='success'>썸네일 설정하기</Badge>
                                                                            }
                                                                            <Badge onClick={() => onClickDelete(photo)} style={{ cursor: "pointer", position: "absolute", top: '10px', right: "5px" }} bg='danger'>X</Badge>
                                                                        </span>
                                                                    </div>
                                                                    <img src={photo.mallPhoto_photo} style={{ borderRadius: "50%", width: "10rem", height: "10rem" }} />
                                                                </Col>
                                                            )}
                                                        </Draggable>
                                                    )
                                                })}
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
                        </Grid>
                        <Grid item xs={12} className="text-end">
                            <Button onClick={onClickCancel} variant="outline-secondary me-3" >취소</Button>
                            <Button onClick={() => onClickUpdate(photos)} variant="outline-secondary me-3" >게시글 수정</Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </div>
    )
}
export default UpdatePage