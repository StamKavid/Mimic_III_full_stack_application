import React, {useState} from 'react';
import {Button, Card, Col, Form, InputNumber, Radio, Row, Select, Switch, Typography,} from 'antd';
import axios from '../../utils/Axios'
import ModelResults from "./ModelResults";

const {Option} = Select;

const rowsItemLayout = {
    labelCol: {
        xs: {
            span: 24
        },
        sm: {
            span: 16,
        },
        md: {
            span: 16,
        },
        lg: {
            span: 16,
        },
        xl: {
            span: 16,
        }
    },
    wrapperCol: {
        xs: {
            span: 24
        },
        sm: {
            span: 8,
        },
    },
};


const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 8,
        },
        sm: {
            span: 16,
            offset: 1,
        },
    },
};

const {Title} = Typography;

const ModelForm = () => {
    const [form] = Form.useForm();
    const [modelResults, setModelResults] = useState({
        patient_info: {},
        prediction: []
    });
    const [resultsVisible, setResultsVisible] = useState(false);

    const getModelResults = (values) => {
        axios.post("model/", values)
            .then(value => {
                setModelResults(value.data);
                setResultsVisible(true)
            })
            .catch(reason => {
                console.error(reason)
            })
    };

    const onFormReset = () => {
        form.resetFields();
        setResultsVisible(false);
        setModelResults({
            patient_info: {},
            prediction: []
        });
    }

    return (
        <div>
            <Title>Model Form</Title>
            <Card>
                <Form
                    {...rowsItemLayout}
                    form={form}
                    name="model"
                    onFinish={getModelResults}
                    scrollToFirstError
                >
                    <Row>
                        <Col span={4}>
                            <Form.Item
                                name="age"
                                label="Age"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input age!',
                                    },
                                ]}
                            >
                                <InputNumber min={0} max={120}/>
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item
                                name="gender"
                                label="Gender"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input gender!',
                                    },
                                ]}
                            >
                                <Radio.Group>
                                    <Radio value="Male">Male</Radio>
                                    <Radio value="Female">Female</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item
                                {...rowsItemLayout}
                                name="expired"
                                label="Expired"
                            >
                                <Switch/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={4}>
                            <Form.Item
                                name="admission_type"
                                label="Admission Type"
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select an admission type!',
                                    },
                                ]}
                            >
                                <Select placeholder="Please select an admission type">
                                    <Option value="EMERGENCY">EMERGENCY</Option>
                                    <Option value="NEWBORN">NEWBORN</Option>
                                    <Option value="ELECTIVE">ELECTIVE</Option>
                                    <Option value="URGENT">URGENT</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item
                                name="admission_origin"
                                label="Admission Origin"
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select an admission origin!',
                                    },
                                ]}
                            >
                                <Select placeholder="Please select an admission origin">
                                    <Option value="EMERGENCY ROOM ADMISSION">EMERGENCY ROOM ADMISSION</Option>
                                    <Option value="PHYSICAL REFERRAL">PHYSICAL REFERRAL</Option>
                                    <Option value="CLINIC REFERRAL">CLINIC REFERRAL</Option>
                                    <Option value="HOSPITAL TRANSFER">HOSPITAL TRANSFER</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item
                                name="insurance"
                                label="Insurance"
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select an insurance type!',
                                    },
                                ]}
                            >
                                <Select placeholder="Please select an insurance type">
                                    <Option value="Medicare">Medicare</Option>
                                    <Option value="Private">Private</Option>
                                    <Option value="Medicaid">Medicaid</Option>
                                    <Option value="Government">Government</Option>
                                    <Option value=" Self Pay">Self Pay</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={4}>
                            <Form.Item
                                {...rowsItemLayout}
                                name="num_callouts"
                                label="Num callouts"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input the nummber of callouts!',
                                    },
                                ]}
                            >
                                <InputNumber min={0}/>
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item
                                {...rowsItemLayout}
                                name="num_diagnoses"
                                label="Num diagnoses"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input a number of diagnoses!',
                                    },
                                ]}
                            >
                                <InputNumber min={0}/>
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item
                                {...rowsItemLayout}
                                name="num_procedures"
                                label="Num procedures"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input the number of procedures!',
                                    },
                                ]}
                            >
                                <InputNumber min={0}/>
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item
                                {...rowsItemLayout}
                                name="num_cptevents"
                                label="Num cptevents"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input the number of cptevents!',
                                    },
                                ]}
                            >
                                <InputNumber min={0}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={4}>
                            <Form.Item
                                {...rowsItemLayout}
                                name="num_inputevents"
                                label="Num input events"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input the number of input events!',
                                    },
                                ]}
                            >
                                <InputNumber min={0}/>
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item
                                {...rowsItemLayout}
                                name="num_labevents"
                                label="Num lab events"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input the number of lab events!',
                                    },
                                ]}
                            >
                                <InputNumber min={0}/>
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item
                                {...rowsItemLayout}
                                name="num_microbiologyevents"
                                label="Num microbiology events"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input the number of microbiology events!',
                                    },
                                ]}
                            >
                                <InputNumber min={0}/>
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item
                                {...rowsItemLayout}
                                name="num_noteevents"
                                label="Num note events"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input the number of note events!',
                                    },
                                ]}
                            >
                                <InputNumber min={0}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={4}>
                            <Form.Item
                                {...rowsItemLayout}
                                name="num_outputevents"
                                label="Num output events"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input the number of output events!',
                                    },
                                ]}
                            >
                                <InputNumber min={0}/>
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item
                                {...rowsItemLayout}
                                name="num_procedureevents"
                                label="Num procedure events"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input the number of procedure events!',
                                    },
                                ]}
                            >
                                <InputNumber min={0}/>
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item
                                {...rowsItemLayout}
                                name="num_transfers"
                                label="Num transfers"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input the number of transfers!',
                                    },
                                ]}
                            >
                                <InputNumber min={0}/>
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item
                                {...rowsItemLayout}
                                name="num_chartevents"
                                label="Num chart events"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input the number of chart events!',
                                    },
                                ]}
                            >
                                <InputNumber min={0}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            Get Results
                        </Button>
                        <Button htmlType="button" onClick={onFormReset} style={{margin: '0 8px'}}>
                            Reset
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
            <ModelResults
                results={modelResults}
                resultsVisible={resultsVisible}
            />
        </div>
    );
};

export default ModelForm;