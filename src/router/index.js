import { createBrowserRouter } from 'react-router-dom'

import AuthRoute from '@/components/AuthRoute'
import Layout from '@/pages/layout'
import Login from '@/pages/login'
import Home from '@/pages/home'
import Article from '@/pages/article'
import Publish from '@/pages/publish'



const router = createBrowserRouter([
    {
        path: '/',
        element: <AuthRoute><Layout /></AuthRoute>,
        children: [
            {
                index: true,
                // path: 'home',
                element: <Home />
            },
            {
                path: 'article',
                element: <Article />
            },
            {
                path: 'publish',
                element: <Publish />
            }
        ]
    },
    {
        path: '/login',
        element: <Login />
    }

])

export default router