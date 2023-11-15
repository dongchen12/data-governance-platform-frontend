import React, {useRef} from "react";
import {Breadcrumb, Button, theme} from "antd";
import ModelDisplay from "../components/ModelDisplay";
import MiddleBlock from "../temp/MiddleBlock"

const TestPage = () => {
    let ref2 = useRef();
    const {
        token: {colorBgContainer},
    } = theme.useToken();

    return (
        <div style={{height: '100%'}}>
            <Breadcrumb
                style={{
                    margin: '16px 0',
                }}
                items={[{title: 'User'}, {title: 'Bill'}]}
            />
            <div
                style={{
                    padding: 24,
                    minHeight: 360,
                    height: 800,
                    overflowY: 'scroll',
                    background: colorBgContainer,
                }}
            >
                <MiddleBlock />
                // 下面这个按钮和两个不同颜色的块演示了如何使用锚点进行跳转
                // 1. 获取想要跳转的node的ref（使用useRef，并传给对应的组件）
                // 2. 把button的点击事件设置为scroll
                <Button onClick={() => {
                    ref2.current.scrollIntoView({behavior: 'smooth', block: 'start'})
                }}></Button>
                <div style={{backgroundColor: 'black', height: 1000}}></div>
                <div ref={ref2} style={{backgroundColor: 'blue', height: 1000}}></div>
            </div>
        </div>
    )
}

export default TestPage;
