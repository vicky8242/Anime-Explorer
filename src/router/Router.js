import { NavLink, BrowserRouter, Navigate, useNavigate, Routes, Route } from 'react-router-dom'
import Animedisplay from '../components/Animedisplay'
import Home from '../components/Home'

export default function Router() {

    return (
        <>
        <BrowserRouter>
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route path='/anime/:id' element={<Animedisplay />} />
            </Routes>
        </BrowserRouter>
        </>
    )
}