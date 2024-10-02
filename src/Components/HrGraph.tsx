import { LineChart } from '@mui/x-charts/LineChart';
const HrGraph: React.FC<any> = ({ data }: { data: { timestamps: string[], hr: number[], hrv: number[] } }) => {

    return (
        <>
            <div style={{ overflow: 'scroll' }}>
                <LineChart
                    className='Graph'
                    xAxis={[{ data: data.timestamps, scaleType: 'point' }]}
                    series={[
                        { curve: "natural", data: data.hr, showMark: false, label: 'HR', color:'#fd4d50' },
                        { curve: "natural", data: data.hrv, showMark: false, label: 'HRV', color:'#02b2af' },
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

export default HrGraph;