

import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';

export default function BarChart({ style, title }) {
    // 基于准备好的dom，初始化echarts实例
    const chartRef = useRef(null)
    useEffect(() => {
        let myChart = echarts.init(chartRef.current);
        // 绘制图表
        myChart.setOption({
            title: {
                text: title
            },
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: [150, 230, 224, 218, 135, 147, 260],
                    type: 'line'
                }
            ]
        });
    }, [])
    return <div ref={chartRef} style={style}></div>
}