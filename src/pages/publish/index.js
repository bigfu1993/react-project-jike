import {
    Card,
    Breadcrumb,
    Form,
    Button,
    Radio,
    Input,
    Upload,
    Space,
    Select,
    message
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import './index.scss'
import { useEffect, useState } from 'react'
import { getChannelAPI, createArticleAPI } from '@/apis/modules/article'

const { Option } = Select

const Publish = () => {
    useEffect(() => {
        async function fetchChannels() {
            let res = await getChannelAPI()
            setChannels(res.data.channels)
        }
        fetchChannels()
    }, [])

    const breadItems = [
        { title: <Link to={'/'}>首页</Link> },
        { title: '发布文章' }
    ]
    // 

    // channel
    const [channels, setChannels] = useState([])
    // 上传回调
    const [imageList, setImageList] = useState([])
    const handleUpload = (uploadData) => {
        console.log('正在上传中', uploadData)
        setImageList(uploadData.fileList)
    }

    // 切换图片封面类型
    const [imageType, setImageType] = useState(0)
    const handleTypeChange = (e) => {
        console.log('切换封面了', e.target.value)
        setImageType(e.target.value)
    }

    const handleFormSubmit = (formData) => {
        console.log(formData)
        if (imageList.length !== imageType) return message.warning('封面类型和图片数量不匹配')
        const { title, content, channel_id } = formData
        // 校验封面类型imageType是否和实际的图片列表imageList数量是相等的
        // 1. 按照接口文档的格式处理收集到的表单数据
        const reqData = {
            title,
            channel_id,
            content,
            cover: {
                type: imageType, // 封面模式
                // 这里的url处理逻辑只是在新增时候的逻辑
                // 编辑的时候需要做处理
                images: imageList.map(item => {
                    if (item.response) {
                        return item.response.data.url
                    } else {
                        return item.url
                    }
                }) // 图片列表
            },
        }
        createArticleAPI(reqData)
        message.success('发布文章成功')
        // // 2. 调用接口提交
        // // 处理调用不同的接口 新增 - 新增接口  编辑状态 - 更新接口  id
        // if (articleId) {
        //     // 更新接口
        //     updateArticleAPI({ ...reqData, id: articleId })
        // } else {
        //     createArticleAPI(reqData)
        // }
    }
    return (
        <div className="publish">
            <Card title={<Breadcrumb items={breadItems} />} >
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ type: 0 }}
                    onFinish={handleFormSubmit}
                >
                    <Form.Item
                        label="标题"
                        name="title"
                        rules={[{ required: true, message: '请输入文章标题' }]}
                    >
                        <Input placeholder="请输入文章标题" style={{ width: 400 }} />
                    </Form.Item>
                    <Form.Item
                        label="频道"
                        name="channel_id"
                        rules={[{ required: true, message: '请选择文章频道' }]}
                    >
                        <Select placeholder="请选择文章频道" style={{ width: 400 }}>
                            {channels.map(ch => <Option key={ch.id} value={ch.id}>{ch.name}</Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item label="封面">
                        <Form.Item name="type">
                            <Radio.Group onChange={handleTypeChange}>
                                <Radio value={1}>单图</Radio>
                                <Radio value={3}>三图</Radio>
                                <Radio value={0}>无图</Radio>
                            </Radio.Group>
                        </Form.Item>
                        {imageType > 0 && <Upload
                            listType="picture-card"
                            showUploadList
                            action={'http://geek.itheima.net/v1_0/upload'}
                            name='image'
                            maxCount={imageType}
                            fileList={imageList}
                            onChange={handleUpload}
                        >
                            <div style={{ marginTop: 8 }}>
                                <PlusOutlined />
                            </div>
                        </Upload>}
                    </Form.Item>
                    <Form.Item
                        label="内容"
                        name="content"
                        rules={[{ required: true, message: '请输入文章内容' }]}
                    >
                        <ReactQuill
                            className="publish-quill"
                            theme="snow"
                            placeholder="请输入文章内容"
                        />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 4 }}>
                        <Space>
                            <Button size="large" type="primary" htmlType="submit">
                                发布文章
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Publish