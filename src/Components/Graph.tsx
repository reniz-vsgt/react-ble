import { LineChart } from '@mui/x-charts/LineChart';
import './Graph.css'
const Graph: React.FC<any> = ({
    x,
    y
}) => {

    return (
        <>
            <div style={{ overflow: 'scroll' }}>
                <LineChart
                    className='Graph'
                    xAxis={x}
                    series={y}
                    height={200}
                    width={400}
                    grid={{ vertical: false, horizontal: true }}
                />
            </div>
        </>
    )
}

export default Graph;