import { Tabs, TabsProps, Statistic, Space, Typography, Button, Empty, StatisticProps, Badge, Card } from 'antd';
import { DownloadOutlined, HistoryOutlined } from '@ant-design/icons';
import CountUp from 'react-countup';
import html2canvas from 'html2canvas';
import './Report.css'
import Graph from '../../Components/Graph';
import { useLocation, useNavigate } from "react-router-dom";
import { PDFDownloadLink } from '@react-pdf/renderer';
import { MedicalReport } from './ReportPdf';
import { IReportProps } from './Report.interface';
import HrGraph from '../../Components/HrGraph';




const { Title } = Typography;


const Report = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const gotoHome = () => {
        navigate("/record");
    }
    if (location.state === null) {
        return (
            <Empty>
                <Button style={{ backgroundColor: "#83BF8D" }} icon={<HistoryOutlined />} type="primary" onClick={gotoHome}>Start Recording</Button>
            </Empty>
        )
    }

    const { graphData, bglData, startTimestamp, finalData, formData }: IReportProps = location.state

    const formatter: StatisticProps['formatter'] = (value) => (
        <CountUp end={value as number} separator="," />
    );

    const downloadFile = () => {
        const filename = `${startTimestamp}_${formData?.subjectId}.bin`
        const blob = new Blob([finalData], { type: 'application/octet-stream' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    const saveGraph = () => {
        const filename = `${startTimestamp}_${formData?.subjectId}.png`
        const chartContainer = document.getElementById('chart-container');
        if (chartContainer) {
            html2canvas(chartContainer).then(canvas => {
                const pngUrl = canvas.toDataURL('image/png');
                const a = document.createElement('a');
                a.href = pngUrl;
                a.download = filename;
                a.click();
            });
        }

    }



    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Breath Co2 percentage',
            children: <Graph x={graphData?.payload?.ticks} y={graphData?.payload?.co2_percentage} />,
        },
        {
            key: '2',
            label: 'Breath Humidity',
            children: <Graph x={graphData?.payload?.ticks} y={graphData?.payload?.humidity} />,
        },
        {
            key: '3',
            label: 'Breath Temperature',
            children: <Graph x={graphData?.payload?.ticks} y={graphData?.payload?.temp} />,
        },
        {
            key: '4',
            label: 'HR and HRV',
            children: <HrGraph data={graphData?.payload.graphData}/>,
        },
    ];



    const getDiabeticStatus = (diabeticKey: string) => {
        switch (diabeticKey) {
            case 'C1':
                return "Non-Diabetic"
            case 'C2':
                return "Diabetic-controlled"
            case 'C3':
                return "Diabetic-moderate"
            case 'C4':
                return "Diabetic-severe"
            default:
                break;
        }
    }

    const data = {
        startTime: startTimestamp,
        name: formData.subjectId,
        age: formData.age,
        diabetic: getDiabeticStatus(formData.diabetic),
        gender: formData.gender,
        height: formData.height,
        weight: formData.weight,
        bloodGlucose: bglData.BGL,
        glucoseRange: { lower: bglData.range1, upper: bglData.range2 },
        eeCalPerMin: graphData.payload.gluocose_data.EE_cal_per_min,
        glucoseUtilized: graphData.payload.gluocose_data.Glucose_utilise_mg_per_min,
        percentCaloriesFromGlucose: graphData.payload.gluocose_data.percentage_calories_from_glucose,
        hr: (graphData.payload.gluocose_data.hr).toFixed(0),
        hrv: (graphData.payload.gluocose_data.hrv).toFixed(0),
    };


    return (
        <>

            <Space wrap={true} size="large">
                <div className='button-container'>
                    <Button style={{ backgroundColor: "#83BF8D" }} icon={<DownloadOutlined />} type="primary" onClick={downloadFile}>Download Bin File</Button>
                    <Button style={{ backgroundColor: "#83BF8D" }} icon={<DownloadOutlined />} type="primary" onClick={saveGraph}>Save Graph</Button>
                    <Button style={{ backgroundColor: "#83BF8D" }} icon={<HistoryOutlined />} type="primary" onClick={gotoHome}>Record Again</Button>
                    <PDFDownloadLink document={<MedicalReport data={data} />} fileName={`${formData.subjectId}_${startTimestamp}_report.pdf`}>
                        <Button style={{ backgroundColor: "#83BF8D" }} icon={<DownloadOutlined />} type="primary">Download Report</Button>
                    </PDFDownloadLink>
                </div>
            </Space>

            <div id='chart-container' className="report-container">
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>

                    <br />
                    <Badge.Ribbon text={startTimestamp} color="#83BF8D" placement={'start'} >
                        <br />
                        <Card className="card-header" title={
                            <p>
                                Metabloic profile <br /> {formData?.subjectId}
                            </p>
                        } >

                            <div className="card-container">
                                <Statistic title={
                                    <div>
                                        <Title level={5}>Blood Glucose mg/dl</Title>
                                        <p>({bglData.range1} to {bglData.range2})</p>
                                    </div>
                                } value={(bglData?.BGL).toFixed(2)} formatter={formatter} />
                                <div className="data-container">
                                    <Card size="small" title="Glucose utilise rate mg/min" >
                                        <p>{formatter((graphData['payload']['gluocose_data']['Glucose_utilise_mg_per_min']).toFixed(2))}</p>
                                    </Card>
                                    <Card size="small" title="% calories from glucose" >
                                        <p>{formatter((graphData['payload']['gluocose_data']['percentage_calories_from_glucose']).toFixed(2))}</p>
                                    </Card>
                                    <Card size="small" title="EE cal per min" >
                                        <p>{formatter((graphData['payload']['gluocose_data']['EE_cal_per_min']).toFixed(2))}</p>
                                    </Card>
                                    <Card size="small" title="Heart Rate" >
                                        <p>{formatter((graphData['payload']['gluocose_data']['hr']).toFixed(2))}</p>
                                    </Card>
                                    <Card size="small" title="Heart Rate Variability" >
                                        <p>{formatter((graphData['payload']['gluocose_data']['hrv']).toFixed(2))}</p>
                                    </Card>
                                    {/* <Card size="small" title="Breath Rate" >
                                        <p>{formatter((graphData['payload']['gluocose_data']['br']).toFixed(2))}</p>
                                    </Card> */}
                                </div>
                                <br />
                                <Tabs defaultActiveKey="1" items={items} />
                            </div>
                        </Card>
                    </Badge.Ribbon>

                </Space>
            </div>
        </>

    )
}


export default Report;