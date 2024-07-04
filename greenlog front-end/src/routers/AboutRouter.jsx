import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AboutClover from '../components/about/AboutClover'
import AboutGreenLog from '../components/about/AboutGreenLog'

const AboutRouter = () => {
    return (
        <Routes>
            <Route path='clover' element={<AboutClover />}></Route>
            <Route path='greenlog' element={<AboutGreenLog />}></Route>
        </Routes>
    )
}

export default AboutRouter