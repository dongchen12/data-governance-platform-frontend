import React, {useState} from 'react';
import {Card, Tabs, Button, Tag, Space, Input, Select} from 'antd';

const { Option } = Select;

const DataModelDefinition = () => {
    const [description, setDescription] = useState('');
    const [sequence, setSequence] = useState(null);
    const [tagInput, setTagInput] = useState('');
    const [tags, setTags] = useState([]);
    const businessDomains = [
        { value: '1', label: '业务域1' },
        { value: '2', label: '业务域2' },
        { value: '3', label: '业务域3' },
    ];

    const handleTagInput = () => {
        if (tagInput) {
            setTags([...tags, tagInput]);
            setTagInput('');
        }
    };

    return (
        <Card title="数据模型定义" style={{ marginBottom: 16, marginTop: 24 }}>
            <div style={{ marginBottom: 16 }}>
                <span style={{ display: 'block', marginBottom: 4 }}>模型名称</span>
                <Input
                    style={{ width: '100%' }}
                    placeholder="模型名称"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div style={{ display: 'flex', marginBottom: 16 }}>
                <div style={{ flex: 1 }}>
                    <span style={{ display: 'block', marginBottom: 4 }}>模态定义</span>
                    <Select
                        style={{ width: '100%' }}
                        placeholder="选择模态"
                        onChange={setSequence}
                    >
                        <Option value="time">时序</Option>
                        <Option value="image">图像</Option>
                        <Option value="text">文本</Option>
                    </Select>
                </div>
            </div>
            <div style={{ display: 'flex', marginBottom: 16 }}>
                <div style={{ flex: 1 }}>
                    <span style={{ display: 'block', marginBottom: 4 }}>储存形态</span>
                    <Select
                        style={{ width: '100%' }}
                        placeholder="选择形态"
                        onChange={setSequence}
                    >
                        <Option value="struc">结构</Option>
                        <Option value="semiStruc">半结构</Option>
                        <Option value="nonStruc">非结构</Option>
                    </Select>
                </div>
            </div>
            <div style={{ display: 'flex', marginBottom: 16 }}>
                <div style={{ flex: 1 }}>
                    <span style={{ display: 'block', marginBottom: 4 }}>业务域</span>
                    <Select
                        style={{ width: '100%' }}
                        placeholder="选择业务域"
                        onChange={setSequence}
                    >
                        {businessDomains.map((domain) => (
                            <Option key={domain.value} value={domain.value}>
                                {domain.label}
                            </Option>
                        ))}
                    </Select>
                </div>
            </div>
            <div style={{ display: 'flex', marginBottom: 16 }}>
                <div style={{ flex: 1 }}>
                    <span style={{ display: 'block', marginBottom: 4 }}>标签</span>
                    <Input
                        style={{ width: '100%' }}
                        placeholder="标签"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                    />
                </div>
                <div style={{ flex: 1, marginLeft: 16 }}>
                    <span style={{ display: 'block', marginBottom: 4 }}>&nbsp;</span>
                    <Button type="primary" onClick={handleTagInput}>
                        添加标签
                    </Button>
                </div>
            </div>
            <div>
                {tags.length > 0 && (
                    <div style={{ marginBottom: 16 }}>
                        {tags.map((tag) => (
                            <Tag
                                key={tag}
                                closable
                                onClose={() => setTags(tags.filter((t) => t !== tag))}
                            >
                                {tag}
                            </Tag>
                        ))}
                    </div>
                )}
            </div>
            <div style={{ marginBottom: 16 }}>
                <span style={{ display: 'block', marginBottom: 4 }}>模型描述</span>
                <Input
                    style={{ width: '100%' }}
                    placeholder="描述"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
        </Card>
    );
};

export default DataModelDefinition;