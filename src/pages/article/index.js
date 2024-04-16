import { Link } from 'react-router-dom'
import { Card, Space, Tag, Breadcrumb, Form, Button, Radio, DatePicker, Select } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import locale from 'antd/es/date-picker/locale/zh_CN'
import Table from './components/Table'
import { useEffect, useState } from 'react'
import { fetchChannels } from '@/store/modules/articleStore'
import { useDispatch, useSelector } from 'react-redux'
import { useChannel } from '@/hooks/useChannel'
import img404 from '@/assets/error.png'
import { getArticleListAPI } from '@/apis/modules/article'

const { Option } = Select
const { RangePicker } = DatePicker

export default function Article() {
    // let dispatch = useDispatch()
    // let channels = useSelector(state => state.article.channelsList)
    // useEffect(() => {
    //     dispatch(fetchChannels())
    // }, [])


    const { channels } = useChannel()

    let [list, setList] = useState([])
    let [count, setCount] = useState(0)
    // 筛选功能
    // 1. 准备参数
    let [reqData, setReqData] = useState({
        status: '',
        channel_id: '',
        begin_pubdate: '',
        end_pubdate: '',
        page: 1,
        per_page: 4
    })

    // 准备列数据
    const columns = [
        {
            title: '封面',
            dataIndex: 'cover',
            width: 120,
            render: cover => {
                return <img src={cover.images[0] || img404} width={80} height={60} alt="" />
            }
        },
        {
            title: '标题',
            dataIndex: 'title',
            width: 220
        },
        {
            title: '状态',
            dataIndex: 'status',
            render: data => <Tag color={data == 1 ? "warning" : 'green'}>{data == 1 ? '待审核' : '审核通过'}</Tag>
        },
        {
            title: '发布时间',
            dataIndex: 'pubdate'
        },
        {
            title: '阅读数',
            dataIndex: 'read_count'
        },
        {
            title: '评论数',
            dataIndex: 'comment_count'
        },
        {
            title: '点赞数',
            dataIndex: 'like_count'
        },
        {
            title: '操作',
            render: data => {
                return (
                    <Space size="middle">
                        <Button type="primary" shape="circle" icon={<EditOutlined />} />
                        <Button
                            type="primary"
                            danger
                            shape="circle"
                            icon={<DeleteOutlined />}
                        />
                    </Space>
                )
            }
        }
    ]
    useEffect(() => {
        async function fetchArticleList() {
            let res = await getArticleListAPI(reqData)
            setList(res.data.results)
            setCount(res.data.total_count)
        }
        fetchArticleList()
    }, [reqData])
    function handleFilter(formValue) {
        console.log(formValue)
        // 3. 把表单收集到数据放到参数中(不可变的方式)
        setReqData({
            ...reqData,
            channel_id: formValue.channel_id,
            status: formValue.status,
            begin_pubdate: formValue.date && formValue.date[0].format('YYYY-MM-DD'),
            end_pubdate: formValue.date && formValue.date[1].format('YYYY-MM-DD')
        })
        // 4. 重新拉取文章列表 + 渲染table逻辑重复的 - 复用
        // reqData依赖项发生变化 重复执行副作用函数 
    }
    return (
        <div>
            <Card
                title={
                    <Breadcrumb items={[
                        { title: <Link to={'/'}>首页</Link> },
                        { title: '文章列表' },
                    ]} />
                }
                style={{ marginBottom: 20 }}
            >
                <Form initialValues={{ status: '' }} onFinish={handleFilter}>
                    <Form.Item label="状态" name="status">
                        <Radio.Group>
                            <Radio value={''}>全部</Radio>
                            <Radio value={0}>草稿</Radio>
                            <Radio value={2}>审核通过</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item label="频道" name="channel_id">
                        <Select
                            placeholder="请选择文章频道"
                            style={{ width: 120 }}
                        >
                            {channels.map(channel => <Option key={channel.id} value={channel.id} >{channel.name} </Option>)}
                        </Select>
                    </Form.Item>

                    <Form.Item label="日期" name="date">
                        {/* 传入locale属性 控制中文显示*/}
                        <RangePicker locale={locale}></RangePicker>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>
                            筛选
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
            <Table columns={columns} data={list} count={count}></Table>
        </div>
    )
}
