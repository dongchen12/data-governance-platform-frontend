import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, Tag, Card, Space, Tabs } from 'antd';
const { TabPane } = Tabs;
const { Option } = Select;

const DataModel = () => {
    const [dataData, setDataData] = useState([
        {
            key: '1',
            name: '数据表 1',
            description: '这是数据表 1 的描述',
        },
        {
            key: '2',
            name: '数据表 2',
            description: '这是数据表 2 的描述',
        },
    ]); // 数据表目录数据的状态
    const dataColumns = [
        {
            title: '表名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '描述',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button onClick={() => handleDataEdit(record)}>修改</Button>
                    <Button onClick={() => handleDataDelete(record.key)}>删除</Button>
                </Space>
            ),
        },
    ];

    const handleDataEdit = (record) => {
        // 编辑数据表
        // 实现编辑操作的逻辑
        console.log('编辑数据表:', record);
    };

    const handleDataDelete = (key) => {
        // 删除数据表
        // 实现删除操作的逻辑
        setData(dataData.filter(item => item.key !== key));
    };

    const handleDataAdd = () => {
        // 添加数据表
        // 实现添加操作的逻辑，弹出添加数据表的模态框或表单

    };

    const [data, setData] = useState([]);
    const [modelData, setModelData] = useState([
        {
            key: '1',
            name: '模型名称 1',
            description: '这是模型 1 的描述。',
            tags: ['标签1', '标签2'],
            domains: ['业务域1', '业务域2']
        },
        {
            key: '2',
            name: '模型名称 2',
            description: '这是模型 2 的描述。',
            tags: ['标签3', '标签4'],
            domains: ['业务域3', '业务域4']
        },
        {
            key: '3',
            name: '模型名称 3',
            description: '这是模型 3 的描述。',
            tags: ['标签5', '标签6'],
            domains: ['业务域5', '业务域6']
        },
        // 添加更多模型对象
    ]);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();
    const [sequence, setSequence] = useState(null);
    const [businessDomain, setBusinessDomain] = useState('');
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState('');
    const [description, setDescription] = useState('');
    const [businessDomains, setBusinessDomains] = useState([]); // New state for business domains
    const [tableName, setTableName] = useState('');

    const columns = [
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '类别',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: '描述',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button onClick={() => handleEdit(record)}>编辑</Button>
                    <Button onClick={() => handleDelete(record.key)}>删除</Button>
                </Space>
            ),
        },
    ];

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
                    <strong>模型业务域:</strong>
                    {model.domains.map((domain, index) => (
                        <Tag key={index}>{domain}</Tag>
                    ))}
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

    const handleEdit = (record) => {
        form.setFieldsValue(record);
        setVisible(true);
    };

    const handleDelete = (key) => {
        setData(data.filter((item) => item.key !== key));
    };

    const handleAdd = () => {
        form.resetFields();
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const handleSave = () => {
        form.validateFields().then((values) => {
            const newData = [...data];
            const index = newData.findIndex((item) => item.key === values.key);

            if (index > -1) {
                newData[index] = values;
            } else {
                newData.push({
                    key: Date.now(),
                    ...values,
                });
            }

            setData(newData);
            setVisible(false);
        });
    };

    const handleTagInput = () => {
        if (tagInput) {
            setTags([...tags, tagInput]);
            setTagInput('');
        }
    };

    useEffect(() => {
        // You can fetch your data here and set it using setData
        // For now, let's use some dummy data for demonstration
        setLoading(true);

        setTimeout(() => {
            setData([
                { key: '1', name: 'Item 1', type: 'Type 1', description: 'Description 1' },
                { key: '2', name: 'Item 2', type: 'Type 2', description: 'Description 2' },
            ]);

            setLoading(false);
        }, 1000);
    }, []);

    // Function to handle adding a business domain
    const handleAddBusinessDomain = () => {
        if (businessDomain) {
            setBusinessDomains([...businessDomains, businessDomain]);
            setBusinessDomain('');
        }
    };

    return (
        <div>
            <Card title="现有模型展示" style={{ marginTop: 24 }}>
                <Tabs tabPosition="top" type="card">
                    {modelData.map((model) => (
                        <TabPane key={model.key} tab={model.name}>
                            {renderModelCard(model)}
                        </TabPane>
                    ))}
                </Tabs>
            </Card>
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
                        <Input
                            style={{ width: '100%' }}
                            placeholder="业务域"
                            value={businessDomain}
                            onChange={(e) => setBusinessDomain(e.target.value)}
                        />
                    </div>
                    <div style={{ flex: 1, marginLeft: 16 }}>
                        <span style={{ display: 'block', marginBottom: 4 }}>&nbsp;</span>
                        <Button type="primary" onClick={handleAddBusinessDomain}>
                            添加业务域
                        </Button>
                    </div>
                </div>
                <div>
                    {businessDomains.length > 0 && (
                        <div style={{ marginBottom: 16 }}>
                            {businessDomains.map((domain) => (
                                <Tag
                                    key={domain}
                                    closable
                                    onClose={() => setBusinessDomains(businessDomains.filter((d) => d !== domain))}
                                >
                                    {domain}
                                </Tag>
                            ))}
                        </div>
                    )}
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

            <Card title="现有数据表" style={{ marginBottom: 16 }} extra={
                <Button type="primary" onClick={handleDataAdd}>
                    添加数据表
                </Button>
            }>
                {dataData.length > 0 ? ( // 当有数据表目录时显示表格
                    <Table
                        columns={dataColumns}
                        dataSource={dataData}
                        pagination={{ pageSize: 10 }}
                    />
                ) : ( // 当没有数据表目录时显示暂无内容
                    <p>暂无内容</p>
                )}
            </Card>

            <Card title="数据表" style={{ marginBottom: 16 }}
                  extra={
                    <Button type="primary">
                        保存数据表
                    </Button>
            }>
                <Form
                    layout="vertical"
                    name="table_form"
                    onFinish={(values) => {
                        // Create a new data table object and add it to the data state
                        const newData = [...data];
                        newData.push({
                            key: Date.now(),
                            name: values.name,
                            type: values.type,
                            description: values.description,
                        });
                        setData(newData);

                        // Reset the form fields and close the modal
                        form.resetFields();
                        setVisible(false);
                    }}
                >
                    <Form.Item
                        name="name"
                        label="表名称"
                        rules={[{ required: true, message: '请输入表名称!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="描述"
                        rules={[{ required: true, message: '请输入描述!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
                <div style={{ marginBottom: 16 }}>
                    <Button onClick={handleAdd} type="primary">
                        添加数据
                    </Button>
                </div>
                <Table
                    columns={columns}
                    dataSource={data}
                    loading={loading}
                    pagination={{ pageSize: 10 }}
                />
            </Card>
            <Modal
                title="Edit Item"
                visible={visible}
                onOk={handleSave}
                onCancel={handleCancel}
            >
                <Form form={form} layout="vertical" name="item_form">
                    <Form.Item name="key" style={{ display: 'none' }}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="name"
                        label="名称"
                        rules={[{ required: true, message: 'Please enter the name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="type"
                        label="类别"
                        rules={[{ required: true, message: 'Please enter the type!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="描述"
                        rules={[{ required: true, message: 'Please enter the description!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default DataModel;