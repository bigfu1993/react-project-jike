import * as echarts from 'echarts';
import { useEffect } from 'react';

export default function BarChart({ style, title }) {
    // 基于准备好的dom，初始化echarts实例
    let id = `chart-${Math.random() * 100}`
    useEffect(() => {
        let myChart = echarts.init(document.getElementById(id));
        // 绘制图表
        myChart.setOption({
            title: {
                text: title
            },
            tooltip: {},
            xAxis: {
                data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
            },
            yAxis: {},
            series: [
                {
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }
            ]
        });
    }, [])
    return <div id={id} style={style}></div>
}