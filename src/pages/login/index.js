import './index.scss'
import { Card, Form, Input, Button } from 'antd'
import logo from '@/assets/logo.png'
import { fetchLogin } from '@/store/modules/userStore'
import { useDispatch } from 'react-redux'
// const logo = require('@/assets/logo.png')


const Login = () => {
    const dispatch = useDispatch()
    const handleFormSubmit = (foramData)=>{
        console.log(foramData)
        dispatch(fetchLogin(foramData))
    }
    return (
        <div className="login">
            <Card className="login-container">
                <img className="login-logo" src={logo} alt="" />
                {/* 登录表单 */}
                <Form validateTrigger="onBlur" onFinish={handleFormSubmit}>
                    <Form.Item name="name" label="手机号" rules={[
                        { required: true, message: '请输入手机号' },
                        { pattern: /^1[3-9]\d{9}$/,message:'请输入正确的手机格式' }
                    ]}>
                        <Input size="large" placeholder="请输入手机号" />
                    </Form.Item>
                    <Form.Item name="pwd" label="密码" rules={[{ required: true, message: '请输入验证码' }]}>
                        <Input size="large" placeholder="请输入验证码" />
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