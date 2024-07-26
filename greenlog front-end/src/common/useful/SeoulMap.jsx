import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import ElectricCarIcon from '@mui/icons-material/ElectricCar';

const SeoulMap = ({ locations }) => {

    const [selectedLocation, setSelectedLocation] = useState(null);

    const mapContainerStyle = {
        width: '40rem',
        height: '40rem'
      };

    const center = {
        lat: 37.476970,
        lng: 126.879535
    };

    const handleMarkerClick = (location) => {
        setSelectedLocation(location);
    };

    const handleCloseClick = () => {
        setSelectedLocation(null);
    };
    const electricBoltIconURL = 'https://example.com/path-to-your-electric-bolt-icon.png';

    return (
        <LoadScript
            googleMapsApiKey="AIzaSyDfd1kQ4v4nIiisRvWDri5R-JQHshOGS7c"
        >
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={15}
            >
                <Marker
                    position={center}
                />
                {locations.map((location, index) => (
                    <Marker
                        key={index}
                        position={{ lat: Number(location.lat), lng: Number(location.lot) }}
                        onClick={() => handleMarkerClick(location)}
                        icon={{
                            url: electricBoltIconURL,
                        }}
                    />
                ))}

                {selectedLocation && (
                    <InfoWindow
                        position={{ lat: Number(selectedLocation.lat), lng: Number(selectedLocation.lot) }}
                        onCloseClick={handleCloseClick}
                    >
                        <div>
                            <h2>{selectedLocation.str_pnt_name}</h2>
                            <p>{selectedLocation.addr}</p>
                            <p>공유전기차 주차장</p>
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        </LoadScript>
    );
}

export default SeoulMap;
