import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SeoulMap from '../../common/useful/SeoulMap';
import carImage from './car.png';

const CarSpot = () => {
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        const callAPI = async () => {
            try {
                const res = await axios.get("/api/carspot");
                setLocations(res.data.DATA);
                console.log(res.data.DATA);
            } catch (error) {
                console.error('API 호출 중 오류가 발생했습니다:', error);
            }
        };

        callAPI();
    }, []);

    return (
        <div>
            {locations.length > 0 ? (
                <SeoulMap locations={locations} />
            ) : (
                <p>데이터를 불러오는 중입니다...</p>
            )}
        </div>
    );
}

export default CarSpot;
