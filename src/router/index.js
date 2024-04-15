import { createBrowserRouter } from 'react-router-dom'

import AuthRoute from '@/components/AuthRoute'
import Layout from '@/pages/layout'
import Login from '@/pages/login'



const router = createBrowserRouter([
    {
        path: '/',
        element: <AuthRoute><Layout /></AuthRoute>
    },
    {
        path: '/login',
        element: <Login />
    }

])

export default router