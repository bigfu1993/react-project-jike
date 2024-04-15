import './index.scss'
import logo from '@/assets/logo.png'
import { Card, Form, Input, Button, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { fetchLogin } from '@/store/modules/userStore'
import { useDispatch } from 'react-redux'
// const logo = require('@/assets/logo.png')


const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleFormSubmit = async (foramData) => {
        console.log(foramData)
        await dispatch(fetchLogin(foramData))
        navigate('/')
        message.success('登陆成功')
    }
    return (
        <div className="login">
            <Card className="login-container">
                <img className="login-logo" src={logo} alt="" /> 
                <Form validateTrigger="onBlur" onFinish={handleFormSubmit}>
                    <Form.Item name="mobile" label="手机号" rules={[
                        { required: true, message: '请输入手机号' },
                        { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机格式' }
                    ]}>
                        <Input size="large" defaultValue={13800000002} placeholder="请输入手机号" />
                    </Form.Item>
                    <Form.Item name="code" label="密码" rules={[{ required: true, message: '请输入验证码' }]}>
                        <Input size="large" defaultValue={246810} placeholder="请输入验证码" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" size="large" block>
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Login