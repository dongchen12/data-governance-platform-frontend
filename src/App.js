import React, {useState} from 'react';
import {
    CloudDownloadOutlined,
    PieChartOutlined,
    SlidersOutlined,

} from '@ant-design/icons';
import {Breadcrumb, ConfigProvider, Layout, Menu, theme} from 'antd';
import {Route, Routes} from "react-router";
import DataSourceComponent from "./Components/DataSourceComponent";
import ChatBox from "./Components/Chat";
import CodeExecution from "./Components/CodeExecution";
import ChatPage from "./views/ChatPage";

const {Header, Content, Footer, Sider} = Layout;

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const items = [
    getItem('数据汇集', '1', <PieChartOutlined/>, [
        getItem('模型配置', 'sub1', <SlidersOutlined/>),
        getItem('数据源配置', 'sub2', <CloudDownloadOutlined/>),
    ]),
];

const App = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: {colorBgContainer},
    } = theme.useToken();

    const TestElem = () => {
        return (
            <>
                <Breadcrumb
                    style={{
                        margin: '16px 0',
                    }}
                >
                    <Breadcrumb.Item>User</Breadcrumb.Item>
                    <Breadcrumb.Item>Bill</Breadcrumb.Item>
                </Breadcrumb>
                <div
                    style={{
                        padding: 24,
                        minHeight: 360,
                        background: colorBgContainer,
                    }}
                >
                    Bill is a cat.
                </div>
            </>
        )
    }
    return (
        <ConfigProvider theme={{
            components: {
                Layout: {
                    siderBg: '#FFFFFF',
                    triggerBg: "#FFFFFF",
                    triggerColor: "#1677FF"
                }
            }
        }}>
            <Layout
                style={{
                    minHeight: '100vh',
                }}
            >
                <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                    {/*下面这里是放logo的地方*/}
                    <div style={{height: 60, width: 200,  backgroundColor: "#FFFFFF"}}></div>
                    <Menu defaultSelectedKeys={['1']} defaultOpenKeys={['1']} mode="inline" items={items}/>
                </Sider>
                <Layout>
                    <Header
                        style={{
                            padding: 0,
                            background: colorBgContainer,
                        }}
                    />
                    <Content
                        style={{
                            margin: '0 16px',
                        }}
                    >
                        <Routes>
                            <Route path={'/test'} element={<TestElem/>}></Route>
                            <Route path={'/dataSourceTest'} element={<DataSourceComponent/>}></Route>
                            <Route path={'/chatBox'} element={<ChatBox/>}></Route>
                            <Route path={'/Code'} element={<CodeExecution/>}></Route>
                            <Route path={'/ChatPage'} element={<ChatPage/>}></Route>
                        </Routes>
                    </Content>
                    <Footer
                        style={{
                            textAlign: 'center',
                        }}
                    >
                        @SJTU-SE
                    </Footer>
                </Layout>
            </Layout>
        </ConfigProvider>
    );
};
export default App;
