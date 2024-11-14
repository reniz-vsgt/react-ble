import { Tabs, TabsProps, Space, Typography, Button, Empty, Badge, Card, Progress } from 'antd';
import { DownloadOutlined, HistoryOutlined } from '@ant-design/icons';
import './Report.css'
import Graph from '../../Components/Graph';
import { useLocation, useNavigate } from "react-router-dom";
import { PDFDownloadLink } from '@react-pdf/renderer';
import { MedicalReport } from './ReportPdf';
import { IReportProps } from './Report.interface';


const { Title, Text } = Typography;


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


    const { parameters, bgl, graphData, startTimestamp, formData, title }: IReportProps = location.state

    const items: TabsProps['items'] = graphData?.map((graph) => {
        return {
            key: graph.label,
            label: graph.label === "Breath CO2" ? <p>Breath CO<sub>2</sub></p> : graph.label,
            children: <Graph x={graph.xAxis} y={graph.yAxis} />,
        }
    })


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
        title: title,
        startTime: startTimestamp,
        name: formData.subjectId,
        age: formData.age,
        diabetic: getDiabeticStatus(formData.diabetic),
        gender: formData.gender,
        height: formData.height,
        weight: formData.weight
    };


    return (
        <>

            <Space wrap={true} size="large">
                <div className='button-container'>
                    <Button style={{ backgroundColor: "#83BF8D" }} icon={<HistoryOutlined />} type="primary" onClick={gotoHome}>Record Again</Button>
                    <PDFDownloadLink document={<MedicalReport data={data} parameters={parameters} bgl={bgl} />} fileName={`${formData.subjectId}_${startTimestamp}_report.pdf`}>
                        <Button style={{ backgroundColor: "#83BF8D" }} icon={<DownloadOutlined />} type="primary">Download Report</Button>
                    </PDFDownloadLink>
                </div>
            </Space>

            <div id='chart-container' className="report-container">
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>

                    <br />
                    <Badge.Ribbon text={startTimestamp} color="#83BF8D" placement={'start'} >
                        <br />
                        <Card styles={{ body: { paddingTop: "0" } }} className="card-header" title={""
                            // <p>
                            //     {title} profile <br /> {formData?.subjectId}
                            // </p>
                        } >

                            <div className="card-container">
                                {bgl && (
                                    <div>
                                        <Title className='card-title' level={5}>{`${bgl.name}`}</Title>
                                        <Title style={{ color: "#205274", margin: 0, padding: '5px' }} level={5}>{bgl.description}</Title>
                                        <Progress steps={5} percent={bgl.percentage} showInfo={false} strokeColor={bgl.strokeColor} />
                                        <p style={{ marginTop: '0' }}>({bgl.range1} to {bgl.range2} {bgl.unit})</p>
                                    </div>
                                )}

                                <div className="data-container">
                                    {parameters.map((parameter) => (
                                        parameter.isDisplay && (
                                            <div className='data-card-graphics'>
                                                <Title style={{ color: "#205274", margin: 0, padding: '5px' }} level={parameter.percentage === 0 ? 4 : 5}>{parameter.description}</Title>
                                                {parameter.percentage !== 0 && 
                                                <Progress steps={5} percent={parameter.percentage} showInfo={false} strokeColor={parameter.strokeColor} />}
                                                <Text strong style={{ color: "#205274", fontSize: "12px", paddingLeft: "5px", paddingRight: "5px", margin: 0 }}>{parameter.name} <br /> {parameter.unit}</Text>
                                            </div>
                                        )
                                    ))}
                                </div>
                                <br />
                                {graphData && (
                                    <Tabs defaultActiveKey="1" items={items} />
                                )}
                            </div>
                        </Card>
                    </Badge.Ribbon>

                </Space>
            </div>
        </>

    )
}


export default Report;