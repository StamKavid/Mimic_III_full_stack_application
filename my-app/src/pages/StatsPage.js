import React, { useEffect, useState } from "react";
import { Col, Divider, Row, Typography } from "antd";
import "../styles/styles.css";
import ResultsPieChart from "../components/stats/ResultsPieChart";
import { getStats } from "../components/stats/StatsApi";
import ResultsBarChart from "../components/stats/ResultsBarChart";

const { Title } = Typography;

const StatsPage = () => {
  // const [stats, setStats] = useState([]);
  const [admissionTypesData, setAdmissionTypesData] = useState([]);
  const [genderData, setGenderData] = useState([]);
  const [admissionOriginData, setAdmissionOriginData] = useState([]);
  const [admissionInsuranceData, setAdmissionInsuranceData] = useState([]);

  const transformToAdmissionPieChartData = (preTransformationData) =>
    preTransformationData.map((preTransformationData) => ({
      name: preTransformationData.admission_type,
      value: preTransformationData.admission_type_per_hospitalization,
    }));

  const transformToGenderPieChartData = (preTransformationData) =>
    preTransformationData.map((preTransformationData) => ({
      name: preTransformationData === "F" ? "FEMALE" : "MALE",
      value: preTransformationData.count_per_gender,
    }));

  const transformToAdmissionOriginBarCharData = (preTransformationData) => {
    const transformedAr = preTransformationData.map((rawData) => {
      const keyToSplit = rawData.hospitalization_and_admission_origin;
      const name = keyToSplit.substr(0, keyToSplit.indexOf(" "));
      const type = keyToSplit.substr(keyToSplit.indexOf(" ") + 1);
      return {
        name,
        [type]: rawData.mean_age,
      };
    });

    return groupToBarChartData(transformedAr);
  };

  const transformToAdmissionInsuranceBarCharData = (preTransformationData) => {
    const transformedAr = preTransformationData.map((rawData) => {
      const keyToSplit = rawData.admission_per_insurance;
      let name = keyToSplit.substr(0, keyToSplit.lastIndexOf(" "));
      let type = keyToSplit.substr(keyToSplit.lastIndexOf(" ") + 1);
      if (type === "PAY") {
        type = "SELF PAY";
        name = name.replace(" SELF", "");
      }
      return {
        name,
        [type]: rawData.stats.count_admission_origin,
      };
    });

    return groupToBarChartData(transformedAr);
  };

  const groupToBarChartData = (array) => {
    return Object.values(
      array.reduce((r, { name, ...o }) => {
        Object.assign((r[name] = r[name] || { name }), o);
        return r;
      }, {})
    );
  };

  useEffect(() => {
    getStats().then((data) => {
      if (data) {
        const { plots } = data;
        const {
          figure_1: admissionPieChartData,
          figure_2: genderPieChartData,
          figure_3: admissionOriginData,
          figure_4: admissionInsuranceData,
        } = plots;

        if (admissionPieChartData) {
          setAdmissionTypesData(
            transformToAdmissionPieChartData(admissionPieChartData)
          );
        }
        if (genderPieChartData) {
          setGenderData(transformToGenderPieChartData(genderPieChartData));
        }
        if (admissionOriginData) {
          setAdmissionOriginData(
            transformToAdmissionOriginBarCharData(admissionOriginData)
          );
        }
        if (admissionInsuranceData) {
          setAdmissionInsuranceData(
            transformToAdmissionInsuranceBarCharData(admissionInsuranceData)
          );
        }
      }
    });
  }, []);

  return (
    <div className="stats-container">
      <Title>Statistics</Title>
      <Divider />
      <Row className="row" gutter={[24, 24]}>
        <ResultsPieChart
          pieChartData={admissionTypesData}
          title="Admission Types"
        />
        <ResultsPieChart pieChartData={genderData} title="Gender" />
        <Col sm={{ span: 24 }} lg={{ span: 12 }} />
      </Row>
      <Row className="row" gutter={[24, 24]}>
        <ResultsBarChart
          barChartData={admissionOriginData}
          size={10}
          title={"Hospitalization per Admission Origin"}
          dataTitles={[
            "CLINIC REFERRAL",
            "EMERGENCY ROOM ADMISSION",
            "HOSPITAL TRANSFER",
            "PHYSICAL REFERRAL",
          ]}
        />
        <ResultsBarChart
          barChartData={admissionInsuranceData}
          size={14}
          title={"Admission Type per Insurance"}
          dataTitles={[
            "GOVERNMENT",
            "MEDICAID",
            "MEDICARE",
            "PRIVATE",
            "SELF PAY",
          ]}
        />
      </Row>
    </div>
  );
};

export default StatsPage;
