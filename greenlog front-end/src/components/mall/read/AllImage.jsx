import React from 'react'
import '../mall.css'

const AllImage = () => {
  const imagePaths = [
    '/images/sorry.png',
    '/images/sorry.png',
    '/images/sorry.png',
    '/images/sorry.png'
    // 필요한 만큼 이미지 경로 추가
  ];
  return (
    <div>
    
    
  
    <div className="allImage mt-5">
      {imagePaths.map((path, index) => (
        <img key={index} src={process.env.PUBLIC_URL + path} alt={`Product ${index + 1}`} />
      ))}
    </div>
  
    </div>
  )
}

export default AllImage