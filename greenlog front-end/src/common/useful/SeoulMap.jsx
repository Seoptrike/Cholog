import React from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const SeoulMap = () => {
    const containerStyle = {
        width: '100%',
        height: '100vh'
      };
      const center = {
        lat: 37.5665,
        lng: 126.9780
      };
  return (
    <LoadScript
      googleMapsApiKey="AIzaSyDfd1kQ4v4nIiisRvWDri5R-JQHshOGS7c"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  )
}

export default SeoulMap