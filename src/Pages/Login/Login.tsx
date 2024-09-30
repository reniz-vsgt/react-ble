import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Typography, Space, Card, Divider, message } from 'antd';
import { UserOutlined, LockOutlined, GoogleOutlined } from '@ant-design/icons';
import { ILoginCredentials, ILoginResponse } from './Login.interface';
import { login } from './Login.api';
import Loader from '../../Components/Loader';
import { baseUrl, googleAuthUrl, googleOAuth2Key, googleOAuth2LoginRedirectUrl, VERSION } from '../../Constants/Constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'




const { Title } = Typography;

const Login: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [googleRes, setGoogleRes] = useState<ILoginResponse>();


    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const paramData = urlParams.get('res');
        if (paramData) {
            setGoogleRes(JSON.parse(paramData));
        }
    }, []);

    useEffect(() => {
        if (googleRes) {
            localStorage.setItem('isLoggedIn', 'true')
            localStorage.setItem('token', googleRes.payload.token)
            SuccessAlert(googleRes.message)
            navigate('/record');
        }
    }, [googleRes]);

    const onFinish = async (values: ILoginCredentials) => {
        try {
            setLoading(true)
            const response = await login(values)
            if (response.status === 200) {
                localStorage.setItem('isLoggedIn', 'true')
                localStorage.setItem('token', response.payload.token)
            }
            setLoading(false)
            SuccessAlert(response.message)
            navigate('/record');
        } catch (error: any) {
            setLoading(false)
            errorAlert(error.message)
        }

    };

    const handleGoogleLogin = () => {
        const scope = 'email profile';
        const params = new URLSearchParams({
            client_id: googleOAuth2Key,
            redirect_uri: `${baseUrl}/api/${VERSION}/vsgt-service/${googleOAuth2LoginRedirectUrl}`,
            response_type: 'code',
            scope: scope,
            access_type: 'offline',
            prompt: 'consent',
        });

        window.location.href = `${googleAuthUrl}?${params.toString()}`
    };

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

    return (
        <>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                {loading && (
                    <Loader />
                )}
                {contextHolder}
                <Card style={{ width: '100%', maxWidth: '400px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                    <Title level={2} style={{ textAlign: 'center' }}>Login</Title>
                    <Form
                        name="login"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: 'Please input your Email!' }]}
                        >
                            <Input type='email' prefix={<UserOutlined style={{color: "#83BF8D"}} />} placeholder="Email" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                        >
                            <Input.Password prefix={<LockOutlined style={{color: "#83BF8D"}} />} placeholder="Password" />
                        </Form.Item>
                        <Form.Item>
                            <Button icon={<FontAwesomeIcon icon={faRightToBracket} style={{color: "#ffffff",}} />} type="primary" htmlType="submit" style={{ width: '100%', backgroundColor: "#83BF8D" }} disabled={loading}>
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                    <Divider>Or</Divider>
                    <Button
                        icon={<GoogleOutlined />}
                        onClick={handleGoogleLogin}
                        style={{ width: '100%', backgroundColor: "#83BF8D", color: "white" }}
                        disabled={loading}
                    >
                        Continue with Google
                    </Button>
                    <Space direction="vertical" style={{ width: '100%', marginTop: '20px' }}>
                        <Link to="/signup">Sign Up</Link>
                        <Link to="/forgot-password">Forgot Password</Link>
                    </Space>
                </Card>
            </div>
        </>
    );
};

export default Login;