import React, { useState } from 'react';
import {Layout, List, Input, Button, Avatar, Tabs, Tag, Space, Typography} from 'antd';
import {
    DeleteOutlined,
    MessageOutlined,
    PlusOutlined,
    SendOutlined,
    SmileOutlined,
    UserOutlined
} from "@ant-design/icons";
import MessageList from "./MessageList";
const { Sider, Content } = Layout;

const ChatBox = () => {
    const [conversations, setConversations] = useState([]);
    const [currentConversation, setCurrentConversation] = useState(null);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const handleStartConversation = () => {
        // 创建新的会话
        const newConversation = { id: Date.now(), name: `会话 ${conversations.length + 1}` , messages: []};
        setConversations([...conversations, newConversation]);
        setCurrentConversation(newConversation);
        //TODO：保存到数据库

    };

    const handleSwitchConversation = (conversationId) => {
        // 切换会话
        const conversation = conversations.find((conversation) => conversation.id === conversationId);
        setCurrentConversation(conversation);
        // 在实际应用中，你可能需要从后端获取相应会话的聊天记录
        // 这里只是一个简单的示例，清空了消息记录
        setMessages(conversation.messages);

    };

    const handleSendMessage = () => {
        if (inputValue.trim() === '' || !currentConversation) {
            return;
        }

        // 添加用户发送的消息
        let   newMessaage =messages;
        // alert("before add"+JSON.stringify(newMessaage));
        const updatedMessages = [...messages, { type: 'user', content: inputValue }];
        setMessages(updatedMessages);
        newMessaage.push({ type: 'user', content: inputValue });

        // 重置输入框
        setInputValue('');

        // 模拟机器人回复，这里只是简单的示例
        setTimeout(() => {
            const robotReply = '这是机器人的回复，example：如下是查询物理系老师的的sql代码：select * from teacher where department = "物理系"';
            const updatedMessagesWithReply = [...updatedMessages, { type: 'robot', content: robotReply }];
            setMessages(updatedMessagesWithReply);
            newMessaage.push({ type: 'robot', content: robotReply });
            // alert("after add"+JSON.stringify(newMessaage));
            //将对话存入conversations
            const updatedConversations = conversations.map((conversation) => {
                    if (conversation.id === currentConversation.id) {
                        return { ...conversation, messages: newMessaage };
                    }
                    return conversation;
                }
            );

            setConversations(updatedConversations);
        }, 500); // 模拟机器人回复延迟，实际中需要发送到后端并获取响应
    };


    return (
        <Layout style={{ height: '81vh' }} >
            <Content style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ flex: 1, display: 'flex' }}>
                    <Sider theme="light" width={200} style={{ padding: '16px', display: 'flex', flexDirection: 'column',height:'110%' }} >
                        {/* 开始新会话按钮 */}
                        <Button type="primary" onClick={handleStartConversation} style={{ marginBottom: '10px' }} icon={<PlusOutlined/>} >
                            开始新会话
                        </Button>
                        {/* 侧边会话列表 */}
                        <div style={{ overflowY: 'auto', maxHeight:550 }}>
                            <List
                                dataSource={conversations}
                                renderItem={conversation => (
                                    <List.Item
                                        style={{
                                            textAlign: 'left',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            backgroundColor: conversation.id === currentConversation?.id ? '#e6f7ff' : '',
                                        }}
                                        onClick={() => handleSwitchConversation(conversation.id)}
                                    >
                                        <MessageOutlined style={{ marginRight: 35 }} />
                                        <List.Item.Meta title={conversation.name} />
                                        <Button icon={<DeleteOutlined />} shape="circle"  onClick={
                                            () => {
                                                const updatedConversations = conversations.filter((c) => c.id !== conversation.id);
                                                setConversations(updatedConversations);
                                                //TODO：保存到数据库
                                            }
                                        }/>
                                    </List.Item>
                                )}
                            />
                        </div>

                    </Sider>
                    <Content style={{ padding: '16px', flex: 1, overflowY: 'auto' }}>
                        {/* 聊天框 */}
                        {currentConversation && (

                            <MessageList messages={messages} />
                        )}
                    </Content>
                </div>
                <div style={{ marginBottom: '10px', display: 'flex',marginLeft:'200px' }}>
                    <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onPressEnter={handleSendMessage} // 让用户按下Enter键也可以发送消息
                        placeholder="输入消息..."
                        style={{ flex: 1 }} // 调整这里的样式，去掉 width: '80%'
                    />
                    <Button type="primary" onClick={handleSendMessage} style={{ marginLeft: '10px' }} icon={<SendOutlined/>}>
                        发送
                    </Button>
                </div>
            </Content>
        </Layout>
    );
};

export default ChatBox;