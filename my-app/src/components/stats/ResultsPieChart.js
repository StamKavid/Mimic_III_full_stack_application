import React from "react";
import {Card, Col, Spin, Typography} from "antd";
import {Cell, Legend, Pie, PieChart, ResponsiveContainer,} from "recharts";

const {Title} = Typography;

const ResultsPieChart = (props) => {
    const {pieChartData, title} = props;

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <Col sm={{span: 24}} lg={{span: 12}}>
            {pieChartData.length ? (
                <div className="chart-container">
                    <Title level={4}>{title}</Title>
                    <div className="chart-inner">
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie
                                    data={pieChartData}
                                    dataKey="value"
                                    fill="#8884d8"
                                    innerRadius={60}
                                    outerRadius={100}
                                    label
                                >
                                    {
                                        pieChartData.map((entry, index) => <Cell key={`cell-${index}`}
                                                                                 fill={COLORS[index % COLORS.length]}/>)
                                    }
                                </Pie>
                                <Legend
                                    layout="vertical"
                                    iconType="circle"
                                    align="right"/>

                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            ) : (
                <Card style={{display: "flex", justifyContent: "center"}}>
                    <Spin size="large"/>
                </Card>
            )}
        </Col>
    );
};

export default ResultsPieChart;
