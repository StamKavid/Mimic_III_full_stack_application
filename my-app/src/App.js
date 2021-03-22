import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Layout} from "antd";
import Header from "./containers/Header";
import Sidebar from "./containers/Sidebar";
import ModelForm from "./components/model/ModelForm";
import StatsPage from "./pages/StatsPage";

const {Content} = Layout;

const App = () => {
    return (
        <Router>
            <Layout className="layout-container">
                <Header/>
                <Layout>
                    <Sidebar/>
                    <Content className="inner-content">
                        <Switch>
                            <Route
                                exact
                                path="/model"
                                component={ModelForm}
                            />
                            <Route
                                exact
                                path="/stats"
                                component={StatsPage}
                            />
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        </Router>
    );
};

export default App;
