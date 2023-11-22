import React, { useState } from 'react';
import { Card, Button, Space, Modal, Table, Form, Input } from 'antd';

const ExistingDataTables = () => {
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

    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();

    const handleDataEdit = (record) => {
        form.setFieldsValue(record);
        setVisible(true);
    };

    const handleDataDelete = (key) => {
        setDataData(dataData.filter(item => item.key !== key));
    };

    const handleDataAdd = () => {
        // 添加数据表逻辑，可以在这里处理添加数据表的操作，弹出添加数据表的模态框或表单
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const handleSave = () => {
        form.validateFields().then((values) => {
            const newData = [...dataData];
            const index = newData.findIndex((item) => item.key === values.key);

            if (index > -1) {
                newData[index] = values;
                setDataData(newData);
            }

            setVisible(false);
        });
    };

    const columns = [
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

    return (
        <div>
            <Card title="现有数据表" style={{ marginBottom: 16 }} extra={
                <Button type="primary" onClick={handleDataAdd}>
                    添加数据表
                </Button>
            }>
                {dataData.length > 0 ? ( // 当有数据表目录时显示表格
                    <Table
                        columns={columns}
                        dataSource={dataData}
                        pagination={{ pageSize: 10 }}
                    />
                ) : ( // 当没有数据表目录时显示暂无内容
                    <p>暂无内容</p>
                )}
            </Card>

            <Modal
                title="编辑数据表"
                visible={visible}
                onOk={handleSave}
                onCancel={handleCancel}
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="key" style={{ display: 'none' }}>
                        <Input />
                    </Form.Item>
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
            </Modal>
        </div>
    );
};

export default ExistingDataTables;
