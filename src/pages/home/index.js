import BarChart from "./components/BarChart"
import LineChart from "./components/LineChart"

const Home = () => {

    return (
        <div>
            <BarChart title={'服装调查'} style={{ width: '400px', height: '400px' }} />
            <LineChart title={'购买力趋势'} style={{ width: '400px', height: '400px' }} />
        </div>
    )
}

export default Home