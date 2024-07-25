import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Chart } from 'react-google-charts';

const DiaryDailyChart = () => {
    const [data, setData] = useState();
  const callAPI = async () => {
    const res = await axios.get('/graph/diary/daily')
    try {
      console.log(res.data)
      let array = [];
      array.push(['일별', '수량'])
      res.data.forEach(row => array.push([row.diary_regDaily, row.diary_count]))
      setData(array);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    callAPI();
  }, [])


  const options = {
    chart: {
      title: "Diary daily count chart",
      subtitle: "group by diary_regDate"
    }, 
    vAxis: {
        viewWindow: {
          min: 1, // 숫자 범위 최소값 설정
          max: 10, // 숫자 범위 최대값 설정
        },
      },
  };

  return (
    <Chart
      chartType="LineChart"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  )
}

export default DiaryDailyChart