import React, { useState } from 'react'
import { Button, Select, MenuItem, FormControl, TextField } from '@mui/material';
import { Modal } from 'react-bootstrap';
import axios from 'axios';


const SeedInsertModal = ({ seed_number, seed_uid}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const [type, setType] = useState('');
  const [form, setForm]=useState({
    amount:0,
    info:""
  });

  const {amount, info} =form;

  const handleChange = (e) => {
    setType(e.target.value)
  }

  


  const payment = async () => {
    if(!window.confirm("씨앗내역을 입력하시겠습니까?")) return;
    await axios.post('/trade/insert', {
      trade_to: seed_number,
      trade_from: 'seed00000000',
      amount:amount,
      seed_number: seed_number,
      trade_state: type,
      trade_info: info
    })
    console.log(amount, info, type);
    alert("씨앗내역 작성완료!")
    window.location.href=`/user/wallet/${seed_uid}`
  }

  const changeForm = (e)=>{
    setForm({...form, [e.target.name]:e.target.value});
  }


  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleShow}>
        씨앗내역관리
      </Button>

      <Modal
        style={{ top: "25%" }}
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>관리자용 씨앗 내역입력</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormControl sx={{ m: 1, width: '25ch' }} className='me-2'>
            <Select label="거래" value={type} onChange={handleChange}>
              <MenuItem value={1}>지급</MenuItem>
              <MenuItem value={-1}>지급취하</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, width: '25ch' }} className='me-2'>
            <TextField label="씨앗지갑번호"value={seed_number} disabled></TextField>
          </FormControl>
          <FormControl className='mb-4' sx={{ m: 1, width: '25ch' }}>
            <TextField label="ID" value={seed_uid} disabled ></TextField>
          </FormControl>
          <FormControl className='me-2' sx={{ m: 1, width: '50ch' }}>
            <TextField label="지급내역" name="info" value={info} onChange={changeForm}></TextField>
          </FormControl>
          <FormControl sx={{ m: 1, width: '25ch' }}>
            <TextField label="씨드" name="amount" value={amount} onChange={changeForm}></TextField>
          </FormControl>
          <Button size="large" className='mt-2' onClick={payment}>입력</Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SeedInsertModal