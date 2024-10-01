import { Form, Input, Button, Typography, Card, message } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { LockOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { IProps, IResetPasswordForm } from './ResetPassword.interface';
import { resetPasswordAPI } from './ResetPassword.api';
const { Title } = Typography;


const ResetPassword = ({ email }: IProps) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState<boolean>(false);

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

    const onFinish = async (values: IResetPasswordForm) => {
        try {
            setLoading(true)
            const payload = {
                email,
                password: values.password
            }
            const response = await resetPasswordAPI(payload)
            SuccessAlert(response.message)
            if (values.password !== values.confirmPassword) {
                errorAlert('Passwords do not match');
            }
            setLoading(false)
        } catch (error: any) {
            errorAlert(error.message);
            setLoading(false)
        }
    }
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
                {contextHolder}
                <Card style={{ width: '100%', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', maxWidth: 400 }}>
                    <div style={{ textAlign: 'center', marginBottom: 24 }}>
                        <FontAwesomeIcon icon={faLock} style={{ fontSize: 48, color: '#83BF8D' }} />
                        <Title level={2}>Reset Password</Title>
                    </div>
                    <Form
                        name="reset-password"
                        layout="vertical"
                        onFinish={onFinish}
                    >
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
                            <Button type="primary" htmlType="submit" style={{ width: '100%', backgroundColor: "#83BF8D" }} disabled={loading}>
                                Reset Password
                            </Button>
                        </Form.Item>
                    </Form>
                    <div style={{ textAlign: 'center' }}>
                        <a href="/login">Back to Login</a>
                    </div>
                </Card>
            </div>
        </>
    )
}

export default ResetPassword;