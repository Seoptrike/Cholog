import axios from 'axios'
import React, { useEffect } from 'react'

const MallSlider = () => {
    const callAPI = async () => {
        const res= await axios.get("/mall/list")
        console.log(res.data)
    }
    useEffect(()=>{callAPI();},[])
  return (
    <div className='text-center'>마감 임박한 피망</div>
  )
}

export default MallSlider