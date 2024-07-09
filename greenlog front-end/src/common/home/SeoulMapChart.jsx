import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import axios from 'axios';
const SeoulMapChart = () => {
    const [geoJSON, setGeoJSON] = useState(null);
    const [airQualityData, setAirQualityData] = useState([]); 

    const callAPI = async (date) => {
        const res = await axios.get('/api/air');
        //console.log(res.data.response.body.items);
        const data = res.data.response.body.items.map(item => ({
            region: item.stationName,
            value: parseFloat(item.khaiValue)
        }));
        setAirQualityData(data);
    }
    useEffect(() => {
        const currentDate = new Date().toISOString().slice(0, 10); // YYYY-MM-DD 형식의 문자열
        callAPI(currentDate);
    }, [])

    useEffect(() => {
        fetch('https://raw.githubusercontent.com/southkorea/seoul-maps/master/kostat/2013/json/seoul_municipalities_geo.json')
            .then((response) => response.json())
            .then((data) => {
                echarts.registerMap('Seoul', data);
                setGeoJSON(data);
            })
            .catch((error) => console.error('Error fetching GeoJSON:', error));
    }, []);

    const seriesData = geoJSON?.features.map(feature => {
        const regionName = feature.properties.name.replace(' ', '');
        const airQuality = airQualityData.find(item => item.region === regionName);
        return {
            name: regionName,
            value: airQuality ? airQuality.value : 0 // 해당 지역의 대기정보 값을 설정
        };
    });

    const option = {
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c}'
        },
        visualMap: {
          min: 0,
          max: 100, // 대기정보 값의 최대값에 맞게 설정
          left: 'left',
          top: 'bottom',
          text: ['High', 'Low'],
          itemWidth: 20, // 너비 조절
          itemHeight: 80, // 높이 조절
          calculable: true,
          inRange: {
            color: ['#50a3ba', '#eac736', '#d94e5d']
          }
        },
        series: [
          {
            type: 'map',
            map: 'Seoul',
            roam: true,
            label: {
              show: true,
              formatter: '{b}'
            },
            itemStyle: {
              normal: {
                areaColor: '#c9e6ff',
                borderColor: '#111'
              },
              emphasis: {
                areaColor: '#ff9933'
              }
            },
            data: seriesData
          }
        ]
      };
    return (
        geoJSON ? <ReactECharts option={option} style={{ height: '30rem', width: '100%' }} /> : <div>Loading...</div>
    )
}

export default SeoulMapChart