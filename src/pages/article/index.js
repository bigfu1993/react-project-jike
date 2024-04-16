import { Link } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select } from 'antd'
import locale from 'antd/es/date-picker/locale/zh_CN'
import Table from './components/Table'
import { useEffect } from 'react'
import { fetchChannels } from '@/store/modules/articleStore'
import { useDispatch, useSelector } from 'react-redux'
import { useChannel } from '@/hooks/useChannel'

const { Option } = Select
const { RangePicker } = DatePicker

export default function Article() {
    // let dispatch = useDispatch()
    // let channelsList = useSelector(state => state.article.channelsList)
    // useEffect(() => {
    //     dispatch(fetchChannels())
    // }, [])
    const { channels: channelsList } = useChannel()
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
                <Form initialValues={{ status: '' }}>
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
                            {channelsList.map(channel => <Option key={channel.id} value={channel.id} >{channel.name} </Option>)}
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
            <Table></Table>
        </div>
    )
}
