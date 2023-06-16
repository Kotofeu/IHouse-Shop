import { Navigate } from 'react-router'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Layout from './Layout'
import ScrollToTop from '../../components/ScrollToTop'

import { userStore } from '../../store'
import { authRoutes, publiceRoutes } from './userRoutes'
import { observer } from 'mobx-react-lite'

export const Router = observer(() => {
    return (
        <BrowserRouter>
            <ScrollToTop />

            <Routes>
                <Route path='/' element={<Layout />}>
                    {userStore.isAuth && authRoutes.map(({ path, Component }) => (
                        <Route key={path} path={path} element={<Component />} />
                    ))}
                    {publiceRoutes.map(({ path, Component }) => (
                        <Route key={path} path={path} element={<Component />} />
                    ))}
                    <Route path='*' element={<Navigate to="/" replace />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
})