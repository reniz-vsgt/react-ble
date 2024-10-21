import { Button, Empty, message, Select, Statistic, Typography } from 'antd';
import './Dashboard.css'
import { LeftOutlined, RightOutlined, HistoryOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import moment from 'moment';
import WeekView from '../../Components/WeekView';
import { getTimestamp } from '../../utils/utils';
import { useNavigate } from 'react-router-dom';
import { getAllSubjectsForUser, getScorsForSubject } from './Dashboard.api';
import { IBglScore, IOptions } from './Dashboard.interface';
import Loader from '../../Components/Loader';
import GaugeChart from '../../Components/GaugeChart';
const { Title } = Typography;



function Dashboard() {
    const navigate = useNavigate();
    const [loading, SetLoading] = useState<boolean>(false)
    const [messageApi, contextHolder] = message.useMessage();
    const [noSubjectData, SetNoSubjectData] = useState<boolean>(false)
    const [noData, SetNoData] = useState<boolean>(true)
    const [timestamp, SetTimestamp] = useState<string>(getTimestamp(moment().startOf('day').toDate()))
    const [subjectList, SetSubjectList] = useState<IOptions[]>([])
    const [subject, SetSubject] = useState<string>("")
    const [currentWeek, SetCurrentWeek] = useState(0)

    const [bglScoreState, SetBglScore] = useState<IBglScore>()

    const [startMonth, SetStartMonth] = useState(moment().add(currentWeek, 'weeks').startOf('isoWeek').format('MMMM YYYY'))
    const [endMonth, SetEndMonth] = useState(moment().add(currentWeek, 'weeks').endOf('isoWeek').format('MMMM YYYY'))


    const gotoHome = () => {
        navigate("/record");
    }
    const errorAlert = (message: string) => {
        messageApi.open({
            type: 'error',
            content: message,
        });
    };

    useEffect(() => {
        SetStartMonth(moment().add(currentWeek, 'weeks').startOf('isoWeek').format('MMMM YYYY'))
        SetEndMonth(moment().add(currentWeek, 'weeks').endOf('isoWeek').format('MMMM YYYY'))
    }, [currentWeek])



    useEffect(() => {
        const fetchAllSubjects = async () => {
            try {
                SetLoading(true)
                const token = localStorage.getItem('VSGTtoken')
                if (!token) {
                    navigate("/login")
                    return
                }
                const subjects = await getAllSubjectsForUser(token)
                if (subjects.length <= 0) {
                    SetNoSubjectData(true)
                    SetLoading(false)
                }
                const optionsList: IOptions[] = []
                subjects.forEach((sub) => {
                    optionsList.push({
                        value: sub,
                        label: sub
                    })
                })
                SetSubjectList(optionsList)
                SetLoading(false)
            } catch (error) {
                console.error("Error: ", error);
                errorAlert('Something Went wrong!!!');
                SetLoading(false)
            }

        }
        fetchAllSubjects()
    }, [])

    useEffect((() => {
        const getScorsForSubjectAPICall = async () => {
            try {
                SetLoading(true)
                SetBglScore(undefined)
                const token = localStorage.getItem('VSGTtoken')
                if (!token) {
                    navigate("/login")
                    SetLoading(false)
                    return
                }
                const bglScore = await getScorsForSubject(token, timestamp, subject)

                if (bglScore !== null) {
                    SetNoData(false)
                    SetBglScore(bglScore)
                    SetLoading(false)
                    return
                }
                SetNoData(true)
                SetLoading(false)
            } catch (error) {
                console.error("Error: ", error);
                errorAlert('Something Went wrong!!!');
                SetLoading(false)
            }

        }
        if (timestamp && subject)
            getScorsForSubjectAPICall()
    }), [timestamp, subject])

    const handleChange = (timestampFromChildComp: string) => {
        SetTimestamp(timestampFromChildComp)
    }

    if (noSubjectData) {
        return (
            <Empty>
                <Button style={{ backgroundColor: "#83BF8D" }} icon={<HistoryOutlined />} type="primary" onClick={gotoHome}>Start Recording</Button>
            </Empty>
        )
    }

    return (
        <>
            {contextHolder}
            {loading && (<Loader />)}
            <h3>
                Metabolic Health Summary
            </h3>
            <div className='top-container'>
                <Select
                    showSearch
                    style={{ width: 150 }}
                    placeholder="Select a subject"
                    filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    options={subjectList}
                    onChange={(e) => (SetSubject(e))}
                />
                <Button style={{ backgroundColor: "#83BF8D" }} icon={<HistoryOutlined />} type="primary" onClick={gotoHome}>Start Recording</Button>
            </div>
            <div className='controls'>
                <Button className='Button' onClick={() => { SetCurrentWeek(0); SetTimestamp(getTimestamp(moment().startOf('day').toDate())) }}> Today </Button>
                <Button icon={<LeftOutlined />} onClick={() => { SetCurrentWeek(currentWeek - 1) }} ></Button>
                <Title className='Month-text' level={5}>
                    {
                        startMonth.split(" ")[1] === endMonth.split(" ")[1] ?
                            startMonth === endMonth ? startMonth : `${startMonth.split(" ")[0]} - ${endMonth.split(" ")[0]} ${endMonth.split(" ")[1]}`
                            : `${startMonth} - ${endMonth}`
                    }
                </Title>
                <Button icon={<RightOutlined />} onClick={() => { SetCurrentWeek(currentWeek + 1) }} ></Button>
            </div>

            <WeekView week={currentWeek} callback={handleChange} value={timestamp} />
            {noData &&
                <>
                    <br />
                    <br />
                    <Empty />
                </>
            }

            <div className="card-container">
                {bglScoreState && (
                    <>

                        {/* <div>
                            <Title className='card-title' level={5}>{`${bglScoreState.name}`}</Title>
                        </div>
                        <div className='data-card'>
                            <Title style={{ color: "#205274", height:'auto', width:'100%', margin:0, marginTop:'40px', padding:0, alignItems:'center' }} level={3}>{`${bglScoreState.value}/${bglScoreState.outOf}`} </Title>
                            <p style={{ fontSize: "12px", paddingLeft: "5px", paddingRight: "5px" }}>{bglScoreState.name} </p>
                        </div> */}
                        <Statistic

                            title={
                                <div>
                                    <Title className='card-title' level={5}>{`${bglScoreState.name}`}</Title>
                                </div>
                            }
                            value={`${bglScoreState.value}/${bglScoreState.outOf}`}
                        />

                        <Title style={{ color: "#205274", margin: '0px', padding: '10px', paddingLeft: '50px', paddingRight: '50px' }} level={5}>{bglScoreState.description} </Title>
                        <div>
                            <GaugeChart riskScore={bglScoreState.value} maxScore={bglScoreState.outOf} />
                        </div>
                    </>
                )}
                {/* {scoreDataState &&
                    <div className="data-container">
                        {scoreDataState.map((parameter) => (
                            <div className='data-card'>
                                <Title style={{ color: "#205274" }} level={3}>{parameter.value}/{parameter.outOf} </Title>
                                <p style={{ fontSize: "12px", paddingLeft: "5px", paddingRight: "5px" }}>{parameter.name} </p>
                            </div>
                        ))}
                    </div>
                } */}
                <br />

            </div>

        </>
    );
}

export default Dashboard;