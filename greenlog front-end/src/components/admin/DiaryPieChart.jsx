import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Chart } from 'react-google-charts';

const DiaryPieChart = () => {
    const [data ,setData]= useState();
    const callAPI= async ()=>{
       const res= await axios.get('/graph/diary/category')
       console.log(res.data)
       let array=[];
       array.push(['카테고리','수량'])
       res.data.forEach(row=>array.push([ row.diary_state, row.diary_count ]))
       setData(array);
    }

    useEffect(()=>{
        callAPI();
    },[])

    

    const options = {
        title: "Diary Category",
        is3D: true,
      };

    return (
        <Chart
            chartType="PieChart"
            width="100%"
            height="400px"
            data={data}
            options={options}
        />
    )
}

export default DiaryPieChart