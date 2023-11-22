import React, {useState} from 'react';
import {Card, Tabs, Button, Tag, Space} from 'antd';

const { TabPane } = Tabs;

const DataModelsDisplay = () => {
    const [ modelData, setModelData] = useState([
        {
            key: '1',
            name: '模型名称 1',
            description: '这是模型 1 的描述。',
            tags: ['标签1', '标签2'],
            domains: '业务域1'
        },
        {
            key: '2',
            name: '模型名称 2',
            description: '这是模型 2 的描述。',
            tags: ['标签3', '标签4'],
            domains: '业务域4'
        },
        {
            key: '3',
            name: '模型名称 3',
            description: '这是模型 3 的描述。',
            tags: ['标签5', '标签6'],
            domains: '业务域5'
        },
    ]);

    const renderModelCard = (model) => {
        const handleDeleteModel = () => {
            // 使用 filter 方法从 modelData 中删除指定 key 的模型
            setModelData((prevModelData) => prevModelData.filter((item) => item.key !== model.key));
        };

        return (
            <div key={model.key} style={{ padding: 16, border: '1px solid #d9d9d9', borderRadius: 4 }}>
                <div style={{ marginBottom: 16 }}>
                    <strong>模型名称:</strong> {model.name}
                </div>
                <div style={{ marginBottom: 16 }}>
                    <strong>模型描述:</strong> {model.description}
                </div>
                <div style={{ marginBottom: 16 }}>
                    <strong>模型描述:</strong> {model.domains}
                </div>
                <div style={{ marginBottom: 16 }}>
                    <strong>模型 Tags:</strong>
                    {model.tags.map((tag, index) => (
                        <Tag key={index}>{tag}</Tag>
                    ))}
                </div>
                <Space>
                    <Button type="primary">查看</Button>
                    <Button type="danger" onClick={handleDeleteModel}>删除</Button>
                </Space>
            </div>
        );
    };


    return (
        <Card title="现有模型展示" style={{ marginTop: 24 }}>
            <Tabs tabPosition="top" type="card">
                {modelData.map((model) => (
                    <TabPane key={model.key} tab={model.name}>
                        {renderModelCard(model)}
                    </TabPane>
                ))}
            </Tabs>
        </Card>
    );
};

export default DataModelsDisplay;
