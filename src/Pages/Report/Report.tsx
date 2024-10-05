import { Tabs, TabsProps, Statistic, Space, Typography, Button, Empty, StatisticProps, Badge, Card, Menu } from 'antd';
import { DownloadOutlined, HistoryOutlined } from '@ant-design/icons';
import CountUp from 'react-countup';
import './Report.css'
import Graph from '../../Components/Graph';
import { useLocation, useNavigate } from "react-router-dom";
import { PDFDownloadLink } from '@react-pdf/renderer';
import { MedicalReport } from './ReportPdf';
import { IReportProps } from './Report.interface';
import { useEffect } from 'react';




const { Title } = Typography;


const Report = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const gotoHome = () => {
        navigate("/record");
    }
    useEffect(() => {
        console.log(location.state, "-----> report");
    }, [])
    if (location.state === null) {
        return (
            <Empty>
                <Button style={{ backgroundColor: "#83BF8D" }} icon={<HistoryOutlined />} type="primary" onClick={gotoHome}>Start Recording</Button>
            </Empty>
        )
    }


    const { parameters, bgl, graphData, startTimestamp, formData, title }: IReportProps = location.state

    const formatter: StatisticProps['formatter'] = (value) => (
        <CountUp end={value as number} separator="," />
    );

    const items: TabsProps['items'] = graphData?.map((graph) => {
        return {
            key: graph.label,
            label: graph.label,
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
                        <Card styles={{ body: { paddingTop: "0" } }} className="card-header" title={
                            <p>
                                {title} profile <br /> {formData?.subjectId}
                            </p>
                        } >

                            <div className="card-container">
                                {bgl && (
                                    <Statistic title={
                                        <div>
                                            <Title className='card-title' level={5}>{`${bgl.name} (${bgl.unit})`}</Title>
                                            <p>({bgl.range1} to {bgl.range2} {bgl.unit})</p>
                                        </div>
                                    } value={(bgl?.bgl).toFixed(2)} formatter={formatter} />
                                )}
                                
                                <div className="data-container">
                                    {parameters.map((parameter) => (
                                        parameter.name === "Skin Temperature"?<></>:
                                        <div className='data-card'>
                                            <Title style={{color:"#205274"}} level={3}>{parameter.value} </Title>
                                            <p style={{fontSize: "12px", paddingLeft: "5px", paddingRight: "5px"}}>{parameter.name} {parameter.unit}</p>
                                        </div>
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