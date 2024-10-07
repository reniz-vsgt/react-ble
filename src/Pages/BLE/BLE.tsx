import React, { useEffect, useState } from 'react';
import { BluetoothDevice, BluetoothRemoteGATTCharacteristic, BluetoothRemoteGATTServer, IFormData, RequestDeviceOptions } from './BLE.types';
import { Space, Typography, Button, Modal, Form, Input, FormProps, Switch, Select, message } from 'antd';
import { cardio } from 'ldrs'
import './BLE.css'
import TextArea from 'antd/es/input/TextArea';
import { LinkOutlined, FormOutlined, CaretRightOutlined, StopOutlined } from '@ant-design/icons';
import { uploadAccFile, uploadFile } from './BLE.api';
import { useNavigate } from "react-router-dom";
import { baseUrl, onDemandCharUUID, readCharUUID, readServiceUUID, writeCharUUID, writeServiceUUID, writeValue } from '../../Constants/Constants';
import Loader from '../../Components/Loader';

const { Option } = Select;

cardio.register()

const { Title } = Typography;

const BLE = ({ sampleType }: { sampleType: string }) => {
    const [messageApi, contextHolder] = message.useMessage();

    const [device, setDevice] = useState<BluetoothDevice | null>(null);
    const [characteristicValue, setCharacteristicValue] = useState<Uint8Array>();
    const [finalData, setFinalData] = useState<Uint8Array>(new Uint8Array(0));
    const [loader, setLoader] = useState<boolean>(false)
    const [Isprocessing, setIsProcessing] = useState<boolean>(false)
    const [seconds, setSeconds] = useState<number>(0)
    const [min, setMin] = React.useState<number>(0);
    const [sec, setSec] = React.useState<number>(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [switchOn, setSwitchOn] = useState(false);
    const [IsStarted, setIsStarted] = useState(false);
    const [onDemandData, setOnDemandData] = useState<string[][]>([]);
    const [battery, setBattery] = useState<number>(0);


    const [service, setService] = useState<BluetoothRemoteGATTServer | undefined>();

    const [writeChar, setWriteChar] = useState<BluetoothRemoteGATTCharacteristic>();

    const [readChar, setReadChar] = useState<BluetoothRemoteGATTCharacteristic>();

    const [onDemandChar, setOnDemandChar] = useState<BluetoothRemoteGATTCharacteristic>();

    const [timer, setTimer] = useState<NodeJS.Timer>()
    const [startTimestamp, setStartTimestamp] = useState<string>("")
    const [formData, setFormData] = useState<IFormData | null>(null)

    const [form] = Form.useForm();
    const navigate = useNavigate();

    const errorAlert = (message: string) => {
        messageApi.open({
            type: 'error',
            content: message,
        });
    };

    const getTimestamp = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const milliseconds = String(now.getMilliseconds()).padStart(3, '0');
        const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;
        return formattedDateTime;
    }


    const makeTimeForm = (time: number): void => {
        if (time < 60) {
            setMin(0);
            setSec(time);
        } else {
            let min = Math.floor(time / 60);
            let sec = time - min * 60;
            setSec(sec);
            setMin(min);
        }
    };

    const stopTimer = async () => {
        setIsProcessing(true)
        setIsStarted(false)
        const audio = new Audio("/stop.wav")
        await audio.play()
        setLoader(false)
        clearInterval(timer)
        setDevice(null)
        device?.gatt?.disconnect()
        try {
            if (formData) {
                const token = localStorage.getItem('VSGTtoken')
                if (!token) {
                    errorAlert("Please login first")
                    navigate("/login")
                    return
                }
                if (sampleType === "Metabolic") {
                    const { parameters, graphData, bgl } = await uploadFile("Co2", finalData, baseUrl, token, device?.name ? device.name : "", startTimestamp, formData)
                    await uploadAccFile(token, baseUrl, device?.name ? device.name : "", startTimestamp, onDemandData)
                    setIsProcessing(false)
                    if (parameters && bgl && graphData)
                        navigate("/report", { state: { parameters, bgl, graphData, startTimestamp, formData, title: sampleType } });
                }
                else {
                    const vitalsData = await uploadFile("PPG", finalData, baseUrl, token, device?.name ? device.name : "", startTimestamp, formData)
                    const parameters = vitalsData.parameters
                    await uploadAccFile(token, baseUrl, device?.name ? device.name : "", startTimestamp, onDemandData)
                    setIsProcessing(false)
                    if (parameters)
                        navigate("/report", { state: { parameters, bgl: null, graphData: null, startTimestamp, formData, title: sampleType } });
                }

            }
            setIsProcessing(false)
        } catch (error: any) {
            setIsProcessing(false)
            errorAlert(error.message)
        }
    }

    useEffect((): void => {
        if (seconds === 60)
            stopTimer()
        makeTimeForm(seconds);
    }, [seconds]);



    const mergeArrays = (arrays: any) => {
        const totalLength = arrays.reduce((acc: any, arr: any) => acc + arr.length, 0);
        const merged = new Uint8Array(totalLength);
        let offset = 0;
        arrays.forEach((arr: any) => {
            merged.set(arr, offset);
            offset += arr.length;
        });
        return merged;
    };



    useEffect(() => {
        if (characteristicValue) {
            const merged = mergeArrays([finalData, characteristicValue]);
            setFinalData(merged)
        }

    }, [characteristicValue]);

    const connectToDevice = async () => {
        try {
            const options: RequestDeviceOptions = {
                optionalServices: [readServiceUUID, writeServiceUUID],
                filters: [
                    {
                        namePrefix: "MB4"
                    },
                    {
                        namePrefix: "bBand"
                    },
                ]
            };
            const device = await (navigator as any).bluetooth.requestDevice(options);
            setDevice(device);

            const service = await device.gatt?.connect();
            setService(service);

            const readService = await service.getPrimaryService(readServiceUUID);
            const readChar = await readService.getCharacteristic(readCharUUID);
            setReadChar(readChar)

            const writeService = await service.getPrimaryService(writeServiceUUID);
            const writeChar = await writeService.getCharacteristic(writeCharUUID);
            setWriteChar(writeChar)

            const onDemandChar = await writeService.getCharacteristic(onDemandCharUUID);
            setOnDemandChar(onDemandChar)

            onDemandChar?.readValue().then((val: any) => {
                const data = new Uint8Array(val?.buffer || new ArrayBuffer(0));
                const arrayData = uint8ArrayToArray(data)
                const bg_volts = (Number(arrayData[1]) * 4 * 4.88) / 1000
                const battery = ((100 * (bg_volts - 4.2)) / 1.1) + 100
                setBattery(battery)
            })

        } catch (error) {
            console.error('Failed to connect:', error);
        }
    };


    const writeCharacteristic = async (newValue: string) => {
        if (!device) {
            console.error('No device connected');
            errorAlert("Please connect a device first")
            return;
        }
        try {
            if (service) {
                const uint8 = new Uint8Array(16);
                for (let index = 0; index < newValue.length; index++) {
                    uint8[index] = parseInt(newValue[index]);
                }
                await writeChar?.writeValue(uint8);
            }

        } catch (error) {
            console.error('Failed to write characteristic:', error);
            errorAlert("Device disconnected")
        }
    };



    const readCharacteristic = async () => {
        try {
            setFinalData(new Uint8Array(0));
            clearInterval(timer)
            await writeCharacteristic(writeValue)
            if (!device) {
                console.error('No device connected');
                errorAlert("Please connect a device first");
                return;
            }
            if (!formData) {
                console.error('Please enter subject details first');
                errorAlert("Please enter subject details first")
                return;
            }
            const audio = new Audio("/start.wav")
            await audio.play()
            if (service) {
                try {
                    setStartTimestamp("")
                    await readChar?.startNotifications();
                    setOnDemandData([])
                    startTimer()
                    setStartTimestamp(getTimestamp())

                    readChar?.addEventListener('characteristicvaluechanged', (event) => {
                        const val = (event.target as BluetoothRemoteGATTCharacteristic).value?.buffer;
                        if (val) {
                            const data = new Uint8Array(val || new ArrayBuffer(0));
                            setCharacteristicValue(data)
                        }
                    });
                }
                catch (error) {
                    console.error('Failed to read data:', error);

                    errorAlert("Device disconnected")
                }
            }

        } catch (error) {
            console.error('Failed to read characteristic:', error);
            errorAlert("Device disconnected")
        }
    };

    const uint8ArrayToArray = (uint8Array: Uint8Array) => {
        var array = [getTimestamp()];
        for (var i = 0; i < uint8Array.byteLength; i++) {
            array.push((uint8Array[i]).toString());
        }
        return array;
    }



    const onDemand = () => {
        onDemandChar?.readValue().then((val: any) => {
            const data = new Uint8Array(val?.buffer || new ArrayBuffer(0));
            const arrayData = uint8ArrayToArray(data)
            setOnDemandData(prevState => (
                [...prevState, arrayData]
            ))
        })
    }



    const startTimer = async () => {
        if (timer) {
            clearInterval(timer)
        }
        setIsStarted(true)
        setSeconds(0)
        setLoader(true)
        const intervalId = setInterval(async () => {
            setSeconds(seconds => seconds + 1)
            onDemand();
        }, 1000)
        setTimer(intervalId)
    }

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinish: FormProps<IFormData>['onFinish'] = (values) => {
        if (!values.latestWeight)
            values.latestWeight = false
        setFormData(values)
        setIsModalOpen(false)
        localStorage.setItem('form', JSON.stringify(values));

    };

    const fillForm = () => {
        const formdata = localStorage.getItem("form")
        if (formdata) {
            const values = JSON.parse(formdata)
            form.setFieldsValue(values)
            setFormData(values)
        }
        setIsModalOpen(true)
    }

    if (Isprocessing) {
        return <Loader />
    }
    return (
        <>
            {contextHolder}
            <br />
            <Title style={{ color: "#205274", fontFamily: "'Poppins', sans-serif" }}>New Breath Sample</Title>
            <Title style={{ fontFamily: "'Poppins', sans-serif" }} level={3}> Get your {sampleType} profile </Title>
            <div className="button-container">
                {device ? (<></>) : (
                    <Button style={{ backgroundColor: "#83BF8D" }} type="primary" icon={<LinkOutlined />} onClick={connectToDevice}>Connect to Device</Button>
                )}

                {device != null ? (
                    <>
                        <Button style={{ backgroundColor: "#83BF8D" }} type="primary" icon={<FormOutlined />} onClick={fillForm}>Enter Details</Button>
                        {IsStarted ? (
                            <Button style={{ backgroundColor: "#83BF8D" }} type="primary" icon={<StopOutlined />} onClick={stopTimer} disabled={!IsStarted}>Stop</Button>
                        ) : (
                            <Button style={{ backgroundColor: "#83BF8D" }} type="primary" icon={<CaretRightOutlined />} onClick={readCharacteristic} disabled={IsStarted}>Start</Button>
                        )}
                        <br />

                    </>
                ) : null}
            </div>
            <br />
            <br />
            <Space wrap={true} size="large">
                {
                    device &&
                    <>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <p>Connected to device: <b> {device.name}</b> </p>
                            {
                                battery > 0 && (
                                    <div style={{ display: "flex", alignItems: "center", gap: "1px" }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#83BF8D"><path d="m402.67-187.33 255-306H484.33L518-759.67l-230.33 333h149l-34 239.34ZM320-80l40-280H160l360-520h80l-40 320h240L400-80h-80Zm153-394Z" /></svg>
                                        <p>{battery ? `${battery.toFixed(0)}%` : ""}</p>
                                    </div>
                                )
                            }

                        </div>

                    </>

                }

            </Space>
            {loader ? (
                <div>
                    <l-cardio
                        size="200"
                        stroke="4"
                        speed="2"
                        color="#83BF8D"
                    ></l-cardio>
                    <br />
                    <Title level={2}>Reading your data from device!!</Title>
                    <Title level={3}>Keep Breathing ...</Title>
                </div>
            ) : null}

            {device && (
                <div className="timer-wrapper">
                    <div>
                        <span className="time">{min}</span>
                        <span className="unit">min</span>
                        <span className="time right">{sec}</span>
                        <span className="unit">sec</span>
                    </div>
                </div>
            )}


            <Modal title="Enter Details" open={isModalOpen} footer={null} onCancel={handleCancel}>
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    autoComplete="on"
                >
                    <Form.Item
                        label="Subject ID"
                        name="subjectId"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Age (years)"
                        name="age"
                        rules={[{ required: true, message: 'Please input your age!' }]}
                    >
                        <Input type='number' />
                    </Form.Item>
                    <Form.Item
                        label="Height (cm)"
                        name="height"
                        rules={[{ required: true, message: 'Please input your height!' }]}
                    >
                        <Input type='number' />
                    </Form.Item>
                    <Form.Item
                        label="Weight (kg)"
                        name="weight"
                        rules={[{ required: true, message: 'Please input your weight!' }]}
                    >
                        <Input type='number' />
                    </Form.Item>

                    <Form.Item
                        name="gender"
                        label="Select Gender"
                        rules={[{ required: true, message: 'Please select gender!' }]}
                    >
                        <Select placeholder="select your gender">
                            <Option value="male">Male</Option>
                            <Option value="female">Female</Option>
                            <Option value="other">Other</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="diabetic"
                        label="Select Diabetic Category"
                        rules={[{ required: true, message: 'Please select diabetic!' }]}
                    >
                        <Select placeholder="select diabetic">
                            <Option value="C1">Non-Diabetic (FBG = 126)</Option>
                            <Option value="C2">Diabetic-controlled  (FBG = 126-150)</Option>
                            <Option value="C3">Diabetic-moderate (FBG = 150-200)</Option>
                            <Option value="C4">Diabetic-severe (FBG {'>'} 200)</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label="Latest Weight ?" name={"latestWeight"} valuePropName="checked">
                        <Switch
                            onChange={() => setSwitchOn(!switchOn)}
                            style={switchOn ? { backgroundColor: "#d3d3d3" } : { backgroundColor: "#83BF8D" }} />
                    </Form.Item>

                    <Form.Item label="Comments" name={"comments"}>
                        <TextArea showCount maxLength={100} placeholder="Comments" />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit" style={{ backgroundColor: "#83BF8D" }}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>

    );
};

export default BLE;
