import { Navigate } from 'react-router'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Layout from './Layout'
import ScrollToTop from '../../components/ScrollToTop'
import { Home } from '../../pages/Home'
import { AboutUs } from '../../pages/AboutUs'
import { Basket } from '../../pages/Basket'
import { Favourite } from '../../pages/Favourite'
import { Catalog } from '../../pages/Catalog'
import { Offer } from '../../pages/Offer'
export const Router = () => {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="about-us" element={<AboutUs />} />
                    <Route path="basket" element={<Basket />} />
                    <Route path="favourite" element={<Favourite />} />
                    <Route path="offer/:id" element={<Offer />} />
                    <Route path='catalog'>
                        <Route index element={<Catalog />} />
                        <Route path='*' element={<Navigate to="/catalog" replace />} />
                    </Route>
                    <Route path='*' element={<Navigate to="/" replace />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}