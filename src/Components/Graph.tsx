import { LineChart } from '@mui/x-charts/LineChart';
import './Graph.css'
const Graph: React.FC<any> = ({
    x,
    y
}) => {

    return (
        <>
            <div style={{overflow:'scroll'}}>
                <LineChart
                    className='Graph'
                    xAxis={[{ data: x, label: "Ticks" }]}
                    series={[
                        {
                            data: y,
                            showMark: false,
                        },
                    ]}
                    height={200}
                    width={400}
                    margin={{ left: 35, right: 30, top: 30, bottom: 60 }}
                    grid={{ vertical: true, horizontal: true }}
                />
            </div>
        </>
    )
}

export default Graph;