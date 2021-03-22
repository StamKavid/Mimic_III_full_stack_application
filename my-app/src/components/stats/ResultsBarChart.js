import React from "react";
import { Card, Col, Row, Spin, Typography } from "antd";
import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const { Title } = Typography;

const ResultsBarChart = (props) => {
  const { barChartData, title, dataTitles, size } = props;

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#42C6FF"];
  return (
    <Col sm={{ span: 24 }} lg={{ span: size }}>
      {barChartData.length ? (
        <div className="chart-container">
          <Title level={4}>{title}</Title>
          <div className="chart-inner">
            <ResponsiveContainer>
              <RechartsBarChart
                data={barChartData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  height={50}
                  dataKey="name"
                  interval={0}
                  tick={{
                    fontSize: "14px",
                    width: "50px",
                    wordWrap: "break-word",
                  }}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                {dataTitles.map((title, index) => (
                  <Bar dataKey={title} fill={COLORS[index % COLORS.length]} />
                ))}
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : (
        <Card style={{ display: "flex", justifyContent: "center" }}>
          <Spin size="large" />
        </Card>
      )}
    </Col>
  );
};

export default ResultsBarChart;
