import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ReviewPage from '../components/review/ReviewPage'

const ReviewRouter = () => {
    return (
        <Routes>
            <Route path='list.jon' element={<ReviewPage/>}></Route>
        </Routes>
    )
}

export default ReviewRouter