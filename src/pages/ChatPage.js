import React from 'react';
import {Row, Col, Card, Breadcrumb} from 'antd';
import ChatBox from "../components/Chat";
import CodeExecution from "../components/CodeExecution";

const ChatPage = () => {
    return (
        <div>
            <Breadcrumb
                style={{
                    margin: '16px 0',
                }}
                items={[{title: 'User'}, {title: 'GagaDuck'}]}
            />
            <Row>
                <Col span={14}  >
                    <Card title="会话窗口" bordered={true} style={{marginRight:"15px"}}>
                        <ChatBox/>
                    </Card>
                </Col>
                <Col span={10}>
                    <Card title="代码执行区">
                        <CodeExecution />
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default ChatPage;