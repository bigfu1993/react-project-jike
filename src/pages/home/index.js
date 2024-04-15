import BarChart from "./components/BarChart"
import LineChart from "./components/LineChart"

const Home = () => {

    return (
        <div>
            <BarChart title={'三大框架满意度1'} style={{ width: '400px', height: '400px' }} />
            <LineChart title={'三大框架使用度2'} style={{ width: '400px', height: '400px' }} />
        </div>
    )
}

export default Home