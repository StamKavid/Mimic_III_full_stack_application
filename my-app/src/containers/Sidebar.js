import React from "react";
import {Link} from "react-router-dom";
import {Layout, Menu} from "antd";
import {DeploymentUnitOutlined, LineChartOutlined} from "@ant-design/icons";

const {Sider} = Layout;

const Sidebar = () => (
    <Sider width={200}>
        <Menu mode="inline" style={{height: "100%"}}>
            <Menu.Item key="1" icon={<DeploymentUnitOutlined/>}>
                Model Form
                <Link to="/model"/>
            </Menu.Item>
            <Menu.Item key="2" icon={<LineChartOutlined/>}>
                Stats
                <Link to="/stats"/>
            </Menu.Item>
        </Menu>
    </Sider>
);

export default Sidebar;
