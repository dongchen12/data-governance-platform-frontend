import React from 'react';
import {Row, Col, Card} from 'antd';
import ChatBox from "../components/Chat";
import CodeExecution from "../components/CodeExecution";

const ChatPage = () => {
    return (

        <Row>
            <Col span={14}  >
                <Card title="会话窗口" bordered={true} style={{marginLeft:"-15px"}}>
                    <ChatBox/>
                </Card>
            </Col>
            <Col span={10}>
                <Card title="代码执行区">
                    <CodeExecution />
                </Card>
            </Col>
        </Row>

    );
}

export default ChatPage;