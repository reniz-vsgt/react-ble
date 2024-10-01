import React, { useState } from 'react';
import { Form, Input, Button, Typography, Card, message } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { sendOTP, verifyOTP } from './ForgotPassword.api';
import { Timer } from '../../Components/Timer';
import { OTP_EXPIRY_TIME } from '../../Constants/Constants';
import ResetPassword from '../ResetPassword/ResetPassword';

const { Title, Text } = Typography;

const ForgotPassword: React.FC = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState<boolean>(false);
    const [isOTPSent, setIsOTPSent] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [otp, setOtp] = useState<string>("");
    const [iaValidOTP, setIsValidOTP] = useState<boolean>(false)


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
    const sendOTPFE = async () => {
        try {
            setLoading(true)
            const sendOTPResponse = await sendOTP({ email: email })
            SuccessAlert(sendOTPResponse.message)
            setIsOTPSent(true)
            setLoading(false)
        } catch (error: any) {
            console.error(error.message)
            errorAlert(error.message)
            setLoading(false)
        }
    }
    const verifyOTPFE = async () => {
        setLoading(true);
        try {
            const verifyOTPResponse = await verifyOTP({ email: email, otp: otp })
            SuccessAlert(verifyOTPResponse.message)
            setIsValidOTP(true)
        } catch (error: any) {
            console.error(error.message)
            errorAlert(error.message)
        }

        setLoading(false);
    };

    const handleOtpExpired = () => {
        errorAlert("OTP Expired!!")
        setIsOTPSent(false)
    }

    if (iaValidOTP) {
        return <ResetPassword email={email} />
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
            {contextHolder}
            <Card style={{ width: '100%', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', maxWidth: 400 }}>
                <div style={{ textAlign: 'center', marginBottom: 24 }}>
                    <FontAwesomeIcon icon={faLock} style={{ fontSize: 48, color: '#83BF8D' }} />
                    <Title level={2}>Forgot Password</Title>
                    <Text type="secondary">Enter your email to reset your password</Text>
                </div>
                <Form
                    name="forgot-password"
                    layout="vertical"
                >
                    <Form.Item
                        name="email"
                        rules={[
                            { required: true, message: 'Please input your email!' },
                            { type: 'email', message: 'Please enter a valid email address' }
                        ]}
                    >
                        <Input
                            onChange={(e) => setEmail(e.target.value)}
                            prefix={<MailOutlined style={{ color: "#83BF8D" }} />}
                            placeholder="Email"
                            size="large" />
                    </Form.Item>
                    <Form.Item hidden={isOTPSent}>
                        <Button
                            onClick={sendOTPFE}
                            style={{ backgroundColor: "#83BF8D" }}
                            icon={<FontAwesomeIcon icon={faLock} style={{ color: "#ffffff" }} />}
                            type="primary"
                            loading={loading}
                            block size="large">
                            Send OTP
                        </Button>
                    </Form.Item>

                    <Form.Item
                        hidden={!isOTPSent}
                        name="otp"
                        rules={[{ required: true, message: 'Please input your OTP!' }]}>
                        <Input
                            onChange={(e) => setOtp(e.target.value)}
                            prefix={<FontAwesomeIcon icon={faLock} style={{ color: "#83BF8D" }} />}
                            placeholder="OTP" size="large" />
                    </Form.Item>
                    {isOTPSent && (
                        <Form.Item>
                            <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                                <Text type="secondary">
                                    OTP expires in: <Timer initialTime={OTP_EXPIRY_TIME} onExpire={handleOtpExpired} />
                                </Text>
                            </div>
                        </Form.Item>
                    )}
                    <Form.Item hidden={!isOTPSent}>
                        <Button
                            onClick={verifyOTPFE}
                            style={{ backgroundColor: "#83BF8D" }}
                            icon={<FontAwesomeIcon icon={faLock} style={{ color: "#ffffff" }} />}
                            type="primary"
                            loading={loading}
                            block
                            size="large">
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