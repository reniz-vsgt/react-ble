import React, { useState } from 'react';
import { Form, Input, Button, Typography, Card, message } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { IForgotPassword } from './ForgotPassword.interface';
import { sendOTP, verifyOTP } from './ForgotPassword.api';

const { Title, Text } = Typography;

const ForgotPassword: React.FC = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState<boolean>(false);
    const [isOTPSent, setIsOTPSent] = useState<boolean>(false);


    const errorAlert = (message: string) => {
        messageApi.open({
            type: 'error',
            content: message,
        });
    };
    const SuccessAlert = (message: string) => {
        messageApi.open({
            type: 'success',
            content: message,
        });
    };
    const onFinish = async (values: any) => {
        console.log("onFinish", values);
        setLoading(true);
        if (!isOTPSent) {
            try {
                console.log("sendOTP", values);
                
                const sendOTPResponse = await sendOTP(values)
                SuccessAlert(sendOTPResponse.message)
                setIsOTPSent(true)
            } catch (error: any) {
                console.error(error.message)
                errorAlert(error.message)
                setIsOTPSent(false)
            }
        }
        else {
            console.log(values, "--------> values verify");
            try {
                const verifyOTPResponse = await verifyOTP(values)
                SuccessAlert(verifyOTPResponse.message)
            } catch (error: any) {
                console.error(error.message)
                errorAlert(error.message)
            }
        }
        setLoading(false);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', height:'100%' }}>
            {contextHolder}
            <Card style={{ width: '100%', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', maxWidth: 400 }}>
                <div style={{ textAlign: 'center', marginBottom: 24 }}>
                    <FontAwesomeIcon icon={faLock} style={{ fontSize: 48, color: '#83BF8D' }} />
                    <Title level={2}>Forgot Password</Title>
                    <Text type="secondary">Enter your email to reset your password</Text>
                </div>
                <Form
                    name="forgot-password"
                    onFinish={onFinish}
                    layout="vertical"
                >
                    <Form.Item
                        name="email"
                        rules={[
                            { required: true, message: 'Please input your email!' },
                            { type: 'email', message: 'Please enter a valid email address' }
                        ]}
                    >
                        <Input prefix={<MailOutlined style={{ color: "#83BF8D" }} />} placeholder="Email" size="large" />
                    </Form.Item>
                    <Form.Item hidden={isOTPSent}>
                        <Button style={{ backgroundColor: "#83BF8D" }} icon={<FontAwesomeIcon icon={faLock} style={{ color: "#ffffff" }} />} type="primary" htmlType="submit" loading={loading} block size="large">
                            Send OTP
                        </Button>
                    </Form.Item>
                    <Form.Item hidden={!isOTPSent} name="otp" rules={[{ required: true, message: 'Please input your OTP!' }]}>
                        <Input prefix={<FontAwesomeIcon icon={faLock} style={{ color: "#83BF8D" }} />} placeholder="OTP" size="large" />
                    </Form.Item>
                    <Form.Item hidden={!isOTPSent}>
                        <Button style={{ backgroundColor: "#83BF8D" }} icon={<FontAwesomeIcon icon={faLock} style={{ color: "#ffffff" }} />} type="primary" htmlType="submit" loading={loading} block size="large">
                            Verify OTP
                        </Button>
                    </Form.Item>
                </Form>
                <div style={{ textAlign: 'center' }}>
                    <a href="/login">Back to Login</a>
                </div>
            </Card>
        </div>
    );
};

export default ForgotPassword;