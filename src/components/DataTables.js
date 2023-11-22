import React, {useEffect, useState} from 'react';
import { Card, Button, Space, Table, Form, Modal, Input } from 'antd';

const DataTables = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();
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

    const handleEdit = (record) => {
        form.setFieldsValue(record);
        setVisible(true);
    };

    const handleTableSave =  () => {

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

    return (
        <div>
            <Card title="数据表" style={{ marginBottom: 16 }}
                  extra={
                      <Button type="primary" onClick={handleTableSave}>
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

export default DataTables;
