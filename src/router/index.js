import { createBrowserRouter } from 'react-router-dom'
import { lazy, Suspense } from 'react'

import AuthRoute from '@/components/AuthRoute'
import Layout from '@/pages/layout'

const Login = lazy(() => import('@/pages/login'))
const Home = lazy(() => import('@/pages/home'))
const Article = lazy(() => import('@/pages/article'))
const Publish = lazy(() => import('@/pages/publish'))



const router = createBrowserRouter([
    {
        path: '/',
        element: <AuthRoute><Layout /></AuthRoute>,
        children: [
            {
                index: true,
                // path: 'home',
                element: (
                    <Suspense fallback={'加载中'}>
                        <Home />
                    </Suspense>
                )
            },
            {
                path: 'article',
                element: (
                    <Suspense fallback={'加载中'}>
                        <Article />
                    </Suspense>
                )
            },
            {
                path: 'publish',
                element: (
                    <Suspense fallback={'加载中'}>
                        <Publish />
                    </Suspense>
                )
            }
        ]
    },
    {
        path: '/login',
        element: <Login />
    }

])

export default router