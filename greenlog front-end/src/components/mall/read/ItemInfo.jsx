import React ,{useEffect, useState}from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap'
import '../../../common/useful/ellipsis.css'
import axios from 'axios';

const ItemInfo = ({mall_key}) => {
    const [form, setForm] = useState('');
    
    const callAPI = async() => {
        //const res=await axios.get(`/mall/read/${mall_key}`);
        //console.log(res.data);
        //setForm(res.data);
      }
    
      useEffect(()=>{
        callAPI(); 
      }, []);
  return (
    <div>
        <Row>
            <Col className='text-center'>
                <img src=' http://via.placeholder.com/300x300' alt='상품대표이미지'/>
            </Col>
            <Col >
            <Row>
            
                <Table bordered>
                    <tbody>
                        <tr>
                            <td className='ellipsis'>t팝니ㅏㄷ싸게파라용제발가지실분저개만아요제발요여러분</td>
                            <td  className='text-end w-25'>신고</td>
                        </tr>
                        <tr>
                            <td colSpan={2}>아이디(이름)</td>
                        </tr>
                        <tr>
                            <td colSpan={2}>0씨드</td>
                        </tr>
                        <tr>
                            <td colSpan={2}>네고 가능하고요
                                크랙 1하나있고 스티커자국 1개있습니다
                                그리고 엄청 깨끗해요
                                10번정도 탔어요
                            </td>
                        </tr> 
                        <tr>
                            <td colSpan={2}>
                                올린날 
                               
                            </td>
                        </tr>
                    </tbody> 
                    
                   
                </Table>
                    <div className='text-end'>
                         <Button size='sm' >삭제</Button>
                    </div>
            </Row>
                
            </Col>
        </Row>
    </div>
  )
}

export default ItemInfo