import { Navigate } from 'react-router'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Layout from './Layout'
import ScrollToTop from '../../components/ScrollToTop'
import { Home } from '../../pages/Home'
import { AboutUs } from '../../pages/AboutUs'
export const Router = () => {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="about-us" element={<AboutUs />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
/*                    <Route path='blog'>
                        <Route index element={<Blogs />} />
                        <Route path=':id' element={<Blog />} />
                    </Route>
                    <Route path='event'>
                        <Route index element={<Blogs />} />
                        <Route path=':id' element={<Blog />} />
                        <Route path='*' element={<Navigate to="/" replace />} />
                    </Route> */