import React, { useState } from 'react';
import { Button, Card, Form, Input, message, Space, Typography } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { ISignupForm } from './Signup.interface';
import { signup } from './Signup.api';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../../Components/Loader';

const { Title } = Typography;

const Signup: React.FC = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
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
    const onFinish = async (values: ISignupForm) => {
        try {
            setLoading(true)
            if (values.password !== values.confirmPassword) {
                errorAlert('Passwords do not match');
                setLoading(false)
                return;
            }
            const response = await signup(values);
            if (response.status === 200) {
                SuccessAlert(response.message);
                navigate('/login');
            } else {
                errorAlert(response.message);
            }
        } catch (error: any) {
            errorAlert(error.message);
        }
        setLoading(false)
    };

    return (
        <>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                {loading && <Loader />}
                {contextHolder}
                <Card style={{ width: '100%', maxWidth: '400px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                    <Title level={2} style={{ textAlign: 'center' }}>Sign Up</Title>
                    <Form
                        name="signup"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Please input your Username!' }]}
                        >
                            <Input prefix={<UserOutlined style={{ color: "#83BF8D" }} />} placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: 'Please input your Email!' }]}
                        >
                            <Input type='email' prefix={<MailOutlined style={{ color: "#83BF8D" }} />} placeholder="Email" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                        >
                            <Input.Password prefix={<LockOutlined style={{ color: "#83BF8D" }} />} placeholder="Password" />
                        </Form.Item>
                        <Form.Item
                            name="confirmPassword"
                            rules={[{ required: true, message: 'Please input your Confirm Password!' }]}
                        >
                            <Input.Password prefix={<LockOutlined style={{ color: "#83BF8D" }} />} placeholder="Confirm Password" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{ width: '100%', backgroundColor: "#83BF8D" }}>
                                Sign Up
                            </Button>
                        </Form.Item>
                    </Form>
                    <Space direction="vertical" style={{ width: '100%', marginTop: '20px' }}>
                        <Link to="/login">Login</Link>
                        <Link to="/forgot-password">Forgot Password</Link>
                    </Space>
                </Card>
            </div>
        </>

    );
};

export default Signup;
