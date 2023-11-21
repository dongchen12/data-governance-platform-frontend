import React from 'react';
import { Row, Col } from 'antd';
import ChatBox from "../Components/Chat";
import CodeExecution from "../Components/CodeExecution";

const ChatPage = () => {
    return (

            <Row>
                <Col span={16} >
                    {/* 左侧组件，宽度为8（可以根据需要调整） */}
                    {/* 这里替换为你的左侧组件 */}
                    <ChatBox/>
                </Col>
                <Col span={8}>
                    {/* 右侧组件，宽度为16（可以根据需要调整） */}
                    {/* 这里替换为你的右侧组件 */}
                    <CodeExecution />
                </Col>
            </Row>

    );
}

export default ChatPage;
