import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Chart } from 'react-google-charts';

const DiaryChart = () => {
    const [data ,setData]= useState();
    const callAPI= async ()=>{
       const res= await axios.get('/graph/diary')
       try{
        const diaryData=[['date', 'daily dairy count', 'monthly diary count']]
        const monthlyCounts={};
        let lastMonth = '';

        res.data.forEach(d=>{
          const date = d.diary_date;
          const month = date.slice(0,7);
           
          if (!monthlyCounts[month]) {
            monthlyCounts[month] = d.monthly_count;
            lastMonth = month;
          }
          // 월이 바뀌면 이전 월의 값을 넣지 않도록 설정
          const monthlyCountForDay = month === lastMonth ? d.monthly_count : null;

          diaryData.push([date, d.diary_count, monthlyCountForDay]);
        });

        setData(diaryData);
       }catch(error){
        console.error('Error fetching data:', error);
       }
    }

    useEffect(()=>{
        callAPI();
    },[])


   const options = {
    // Material design options
    chart: {
      title: "Diary count chart",
      subtitle: "group by diary_regDate",
    },
    seriesType: 'line',
          series: { 1: { type: 'bars' } },
          vAxes: {
            0: { title: 'Daily Count' },
            1: { title: 'Monthly Count' },
          },
          hAxis: {
            title: 'Date',
            format: 'yyyy-MM-dd',
          },
          interpolateNulls: true,

  };

    return (
        <Chart
            chartType="ComboChart"
            width="100%"
            height="400px"
            data={data}
            options={options}
        />
    )
}

export default DiaryChart