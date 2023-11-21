import React, { useState } from 'react';
import { Layout, List, Input, Button, Avatar } from 'antd';

const { Sider, Content } = Layout;

const ChatBox = () => {
    const [conversations, setConversations] = useState([]);
    const [currentConversation, setCurrentConversation] = useState(null);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const handleStartConversation = () => {
        // 创建新的会话
        const newConversation = { id: Date.now(), name: `会话 ${conversations.length + 1}` };
        setConversations([...conversations, newConversation]);
        setCurrentConversation(newConversation.id);
    };

    const handleSwitchConversation = (conversationId) => {
        setCurrentConversation(conversationId);
        // 在实际应用中，你可能需要从后端获取相应会话的聊天记录
        // 这里只是一个简单的示例，清空了消息记录
        setMessages([]);
    };

    const handleSendMessage = () => {
        if (inputValue.trim() === '' || !currentConversation) {
            return;
        }

        // 添加用户发送的消息
        const updatedMessages = [...messages, { type: 'user', content: inputValue }];
        setMessages(updatedMessages);
        setInputValue('');

        // 模拟机器人回复，这里只是简单的示例
        setTimeout(() => {
            const robotReply = '这是机器人的回复，你可以根据实际情况调整';
            const updatedMessagesWithReply = [...updatedMessages, { type: 'robot', content: robotReply }];
            setMessages(updatedMessagesWithReply);
        }, 500); // 模拟机器人回复延迟，实际中需要发送到后端并获取响应
    };

    return (
        <Layout style={{ height: '100vh' }}>
            <Content style={{ display: 'flex', flexDirection: 'column', height: '85%' }}>
                <div style={{ flex: 1, display: 'flex' }}>
                    <Sider theme="light" width={200} style={{ padding: '16px', display: 'flex', flexDirection: 'column' }}>
                        {/* 开始新会话按钮 */}
                        <Button type="primary" onClick={handleStartConversation} style={{ marginBottom: '10px' }}>
                            开始新会话
                        </Button>
                        {/* 侧边会话列表 */}
                        <List
                            dataSource={conversations}
                            renderItem={(conversation) => (
                                <List.Item
                                    style={{ textAlign: 'left', cursor: 'pointer' }}
                                    onClick={() => handleSwitchConversation(conversation.id)}
                                >
                                    {conversation.name}
                                </List.Item>
                            )}
                        />
                    </Sider>
                    <Content style={{ padding: '16px', flex: 1, overflowY: 'auto' }}>
                        {/* 聊天框 */}
                        {currentConversation && (
                            <List
                                dataSource={messages}
                                renderItem={(item) => (
                                    <List.Item
                                        style={{
                                            display: 'flex',
                                            alignItems: 'flex-start',
                                        }}
                                    >
                                        {item.type === 'robot' ? (
                                            <Avatar src="robot-avatar.jpg" alt="Robot Avatar" style={{ marginRight: '8px' }} />
                                        ) : (
                                            <div style={{ flex: 1 }} />
                                        )}
                                        <div style={{ maxWidth: '70%', wordWrap: 'break-word' }}>{item.content}</div>
                                        {item.type === 'user' ? (
                                            <Avatar src="user-avatar.jpg" alt="User Avatar" style={{ marginLeft: '8px' }} />
                                        ) : (
                                            <div style={{ flex: 1 }} />
                                        )}
                                    </List.Item>
                                )}
                            />
                        )}
                    </Content>
                </div>
                <div style={{ marginTop: '10px', display: 'flex',marginLeft:'200px' }}>
                    <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onPressEnter={handleSendMessage} // 让用户按下Enter键也可以发送消息
                        placeholder="输入消息..."
                        style={{ flex: 1 }} // 调整这里的样式，去掉 width: '80%'
                    />
                    <Button type="primary" onClick={handleSendMessage} style={{ marginLeft: '10px' }}>
                        发送
                    </Button>
                </div>
            </Content>
        </Layout>
    );
};

export default ChatBox;
