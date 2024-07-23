import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Chart } from 'react-google-charts';

const DiaryChart = () => {
    const [data ,setData]= useState();
    const callAPI= async ()=>{
       const res= await axios.get('/graph/diary')
       console.log(res.data)
       let array=[];
       array.push(['카테고리', '일기개수', '날짜'])
       res.data.forEach(row=>array.push([row.diary_state, row.diary_count, row.diary_date]))
       setData(array);
    }

    useEffect(()=>{
        callAPI();
    },[])

    // const data = [
    //     ["Year", "Sales", "Expenses", "Profit"],
    //     ["2014", 1000, 400, 200],
    //     ["2015", 1170, 460, 250],
    //     ["2016", 660, 1120, 300],
    //     ["2017", 1030, 540, 350],
    // ];

   const options = {
        title: "Population of Largest U.S. Cities",
        chartArea: { width: "50%" },
        colors: ["#b0120a", "#ffab91"],
        hAxis: {
          title: "Total Population",
          minValue: 0,
        },
        vAxis: {
          title: "City",
        },
      };

    return (
        <Chart
            chartType="BarChart"
            width="100%"
            height="400px"
            data={data}
            options={options}
        />
    )
}

export default DiaryChart