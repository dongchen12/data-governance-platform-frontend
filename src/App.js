import React, {useRef, useState} from 'react';
import {
    CloudDownloadOutlined,
    PieChartOutlined,
    SlidersOutlined,

} from '@ant-design/icons';
import {Breadcrumb, ConfigProvider, Layout, Menu, theme, App as AntdApp, Button, Divider} from 'antd';
import {Route, Routes} from "react-router";
import TestPage from "./pages/TestPage";
import DataAssetManagementPage from "./pages/DataAssetManagementPage";

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
        getItem('模型配置', '/modelConfig', <SlidersOutlined/>),
        getItem('数据源配置', '/dataSourceConfig', <CloudDownloadOutlined/>),
    ]),
];

const App = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: {colorBgContainer},
    } = theme.useToken();
    const clickItem = ({key, keyPath, domEvent}) => {
        console.log('keyPath: ' + keyPath + ', key: ' + key)
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
            <AntdApp>
                <Layout
                    style={{
                        minHeight: '100vh',
                    }}
                >
                    <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                        {/*下面这里是放logo的地方*/}
                        <div style={{height: 60, width: 200, backgroundColor: "#FFFFFF"}}></div>
                        <Menu defaultSelectedKeys={['1']} defaultOpenKeys={['1']} mode="inline" items={items}
                              onClick={clickItem}/>
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
                                <Route path={'/test'} element={<DataAssetManagementPage/>}></Route>
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
            </AntdApp>
        </ConfigProvider>
    );
};
export default App;
