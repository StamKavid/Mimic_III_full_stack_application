import React from 'react';
import {Card, Descriptions, Divider, Typography} from "antd";

const ModelResults = (props) => {
    const {
        resultsVisible,
        results: {
            patient_info: {
                admission_origin: admissionOrigin,
                admission_type: admissionType,
                age,
                gender,
                insurance
            },
            prediction
        }
    } = props;

    return (
        resultsVisible && (
            <Card title="Model Results">
                <Descriptions title="Patient info" bordered column={5}>
                    <Descriptions.Item label="Admission Origin">{admissionOrigin}</Descriptions.Item>
                    <Descriptions.Item label="Admission Type">{admissionType}</Descriptions.Item>
                    <Descriptions.Item label="Age">{age}</Descriptions.Item>
                    <Descriptions.Item label="Gender">{gender}</Descriptions.Item>
                    <Descriptions.Item label="Insurance">{insurance}</Descriptions.Item>
                </Descriptions>
                <Divider/>
                <Typography>Prediction Results</Typography>
                <Typography.Text mark>The patient will stay to the hospital {prediction}</Typography.Text>
            </Card>
        )
    )
}

export default ModelResults;