import { Layout, Menu, Popconfirm } from 'antd'
import {
    HomeOutlined,
    DiffOutlined,
    EditOutlined,
    LogoutOutlined,
} from '@ant-design/icons'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { fetchUserInfo, clearUserInfo } from '@/store/modules/userStore'

import './index.scss'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const { Header, Sider } = Layout

const items = [
    {
        label: '首页',
        key: '/',
        icon: <HomeOutlined />,
    },
    {
        label: '文章管理',
        key: '/article',
        icon: <DiffOutlined />,
    },
    {
        label: '创建文章',
        key: '/publish',
        icon: <EditOutlined />,
    },
]

const GeekLayout = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    const userInfo = useSelector(state => state.user.userInfo)

    useEffect(() => {
        dispatch(fetchUserInfo())
    }, [])

    const handleMenuSelect = (menuData) => {
        navigate(menuData.key)
    }
    const handleExit = () => {
        console.log(1);
        dispatch(clearUserInfo())
        navigate('/login')
    }
    console.log(userInfo);
    return (
        <Layout>
            <Header className="header">
                <div className="logo" />
                <div className="user-info">
                    <span className="user-name">{userInfo.name}</span>
                    <span className="user-logout">
                        <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消" onConfirm={handleExit}>
                            <LogoutOutlined /> 退出
                        </Popconfirm>
                    </span>
                </div>
            </Header>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        theme="dark"
                        selectedKeys={[location.pathname]}
                        items={items}
                        style={{ height: '100%', borderRight: 0 }}
                        onSelect={handleMenuSelect}></Menu>
                </Sider>
                <Layout className="layout-content" style={{ padding: 20 }}>
                    <Outlet />
                </Layout>
            </Layout>
        </Layout>
    )
}
export default GeekLayout