import { Button, Form, Input, Select, Switch } from "antd"
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
const { Option } = Select;

const UserDetailsForm = ({ onFinish }: { onFinish: any }) => {
    const [switchOn, setSwitchOn] = useState(false);
    const [form] = Form.useForm();

    // useEffect((() => {
    //     const formdata = localStorage.getItem("form")
    //     if (formdata) {
    //         const values = JSON.parse(formdata)
    //         delete values['meal']
    //         delete values['gt']
    //         delete values['unit']
    //         form.setFieldsValue(values)
    //     }
    // }), [])

    const diabetic_options = [
        {
            label: "Non-Diabetic",
            value: "C1",
            desc: "Fasting Glucose 70 to 126"
        },
        {
            label: "Diabetic-controlled",
            value: "C2",
            desc: "Fasting Glucose is between 126 to 150"
        },
        {
            label: "Diabetic-moderate",
            value: "C3",
            desc: "Fasting Glucose is between 150 to 200"
        },
        {
            label: "Diabetic-severe",
            value: "C4",
            desc: "Fasting Glucose is more than 200"
        },
    ]

    const meal_options = [
        {
            label: 'Fasting',
            value: 'P1',
            desc: 'More than 6 hours of last meal',
        },
        {
            label: 'Post Meal',
            value: 'P2',
            desc: '30 min to 3 hours of last meal',
        },
        {
            label: 'Random',
            value: 'P3',
            desc: '3 hours to 6 hours of last meal',
        },
    ]
    const selectUnit = (
        <Form.Item name={"unit"} valuePropName="checked" style={{ marginBottom: 0, height: '30px' }}>
            <Switch style={{ backgroundColor: "#83BF8D" }} checkedChildren="mg/dL" unCheckedChildren="mmol/L" defaultChecked />
        </Form.Item>
    );

    return (
        <>
            <Form
                form={form}
                name="userDetails"
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
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
                    <Select
                        placeholder="select diabetic"
                        options={diabetic_options}
                        optionRender={(option) => (
                            <p><strong>{option.data.label}</strong><br />{option.data.desc}</p>
                        )}
                    />
                </Form.Item>

                <Form.Item
                    name="meal"
                    label="Select Breath Sample Category"
                    rules={[{ required: true, message: 'Please select sample category!' }]}
                >
                    <Select
                        placeholder="select sample category"
                        options={meal_options}
                        optionRender={(option) => (
                            <p><strong>{option.data.label}</strong><br />{option.data.desc}</p>
                        )}
                    />
                </Form.Item>
                <Form.Item
                    label="Glucometer Reading"
                    name="gt">
                    <Input placeholder="Glucometer reading" addonAfter={selectUnit} />
                </Form.Item>

                <Form.Item label="Latest Weight ?" name={"latestWeight"} valuePropName="checked">
                    <Switch
                        onChange={() => setSwitchOn(!switchOn)}
                        style={switchOn ? { backgroundColor: "#83BF8D" } : { backgroundColor: "#d3d3d3" }}
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}

                    />
                </Form.Item>

                <Form.Item label="Comments" name={"comments"}>
                    <TextArea showCount maxLength={200} placeholder="Comments" />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit" style={{ backgroundColor: "#83BF8D" }}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default UserDetailsForm;