import React, { useState } from 'react';
import {
    CloudDownloadOutlined,
    PieChartOutlined,
    SlidersOutlined,
} from '@ant-design/icons';
import DataModel from "./pages/dataModel";
import { Breadcrumb, ConfigProvider, Layout, Menu, theme } from 'antd';
import {Route, Routes, Link, Navigate} from "react-router-dom";
import ChatPage from "./pages/ChatPage";

const { Header, Content, Footer, Sider } = Layout;

const items = [
    { label: '数据模型', key: '/dataModel', icon: <PieChartOutlined /> },
    { label: '会话页', key: '/chatPage', icon: <CloudDownloadOutlined /> },
    { label: '测试页', key: '/test', icon: <SlidersOutlined /> },
];

const App = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
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
                    <Breadcrumb.Item>GagaDuck</Breadcrumb.Item>
                </Breadcrumb>
                <div
                    style={{
                        padding: 24,
                        minHeight: 360,
                        background: colorBgContainer,
                    }}
                >
                    GagaDuck is a duck.
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
                    {/* 下面这里是放logo的地方 */}
                    <div style={{ height: 60, width: 200, backgroundColor: "#FFFFFF" }}></div>
                    <Menu defaultSelectedKeys={['/dataModel']} defaultOpenKeys={['/dataModel']} mode="inline">
                        {items.map(item => (
                            <Menu.Item key={item.key} icon={item.icon}>
                                <Link to={item.key}>{item.label}</Link>
                            </Menu.Item>
                        ))}
                    </Menu>
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
                            <Route path={'/dataModel'} element={<DataModel />} />
                            <Route path={'/chatPage'} element={<ChatPage />} />
                            <Route path={'/test'} element={<TestElem />} />
                            {/* 设置默认路由 */}
                            <Route path={'/'} element={<Navigate to="/dataModel" />} />
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
