import axios from 'axios'
import React, { useEffect, useState } from 'react';
import { Chart } from "react-google-charts";


const O3Chart = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const oneWeekAgo = new Date(yesterday);
    oneWeekAgo.setDate(yesterday.getDate() - 6);

    // 날짜 포맷 변환 (YYYYMMDD)
    const formattedYesterday = yesterday.toISOString().slice(0, 10).replace(/-/g, '');
    const formattedOneWeekAgo = oneWeekAgo.toISOString().slice(0, 10).replace(/-/g, '');

    const [data, setData] = useState([]);

    const callAPI = async () => {
        const res = await axios.get("/api/o3", {
            params: {
                inqBginDt: formattedOneWeekAgo,  // 일주일 전 날짜
                inqEndDt: formattedYesterday,   // 어제 날짜
                msrstnName: "강남구"
            }
        });
        //console.log(res.data.response.body.items);
        let array = [];
        array.push(['Date', 'O3', 'SO2', 'CO', 'NO2']);
        res.data.response.body.items.forEach(row => {
            const date = new Date(row.msurDt);
            const fmtDate = `${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
            array.push([
                fmtDate, 
                parseFloat(row.o3Value), 
                parseFloat(row.so2Value), 
                parseFloat(row.coValue), 
                parseFloat(row.no2Value), 
            ]);
        });
        setData(array);
    };

    const options = {
        chart: {
            title: "Air Quality Data over Time",
            subtitle: "오존, 이산화황, 일산화탄소, 이산화질소 levels",
        },
        series: {
            1: { curveType: 'function' },
        },
    };
    useEffect(() => {
        callAPI();
    }, []);
    return (
            <Chart
                chartType="LineChart"
                width="100%"
                height="30rem"
                data={data}
                options={options}
            />
    )
}

export default O3Chart