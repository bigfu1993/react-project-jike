// 导入资源
import { Button, Card, Table, Tag, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import img404 from '@/assets/error.png'

export default function CardTable({ columns, data, count }) {

    return (
        <div>
            {/*        */}
            <Card title={`根据筛选条件共查询到 ${count} 条结果：`}>
                <Table rowKey="id" columns={columns} dataSource={data} />
            </Card>
        </div>
    )
}