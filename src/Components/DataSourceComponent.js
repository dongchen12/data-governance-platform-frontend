import React, { useState } from 'react';
import { Button, Table, Modal, Form, Input, Space, Tag, Popover } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const DataSourceComponent = () => {
        const [dataSourceList, setDataSourceList] = useState([]);
        const [dataSourceFormVisible, setDataSourceFormVisible] = useState(false);
        const [form] = Form.useForm();
        const [fieldMapModalVisible, setFieldMapModalVisible] = useState(false);
        const [currentDataSource, setCurrentDataSource] = useState(null);
        const [fieldMapForm] = Form.useForm();
// 在数据源对象中初始化 fieldMap 为一个空数组
    const initialDataSource = {
        sourceType: '',
        dataSource: {
            type: '',
            url: '',
            tableName: '',
            tag: [],
            description: '',
        },
        fieldMap: [], // 初始化为一个空数组
    };
    const handleDataSourceFormSubmit = () => {
        form.validateFields().then((values) => {
            // 使用initialDataSource克隆一个新的数据源对象并添加到dataSourceList
            setDataSourceList([...dataSourceList, { ...initialDataSource, ...values }]);
            form.resetFields();
            setDataSourceFormVisible(false);
        });
    };

    const handleFieldMapFormSubmit = () => {
        fieldMapForm.validateFields().then((values) => {
            const updatedDataSourceList = dataSourceList.map((dataSource) => {
                if (dataSource === currentDataSource) {
                    return { ...dataSource, fieldMap: values.fieldMap };
                }
                return dataSource;
            });
            setDataSourceList(updatedDataSourceList);
            setFieldMapModalVisible(false);
        });
    };

        const columns = [
            {
                title: 'Source Type',
                dataIndex: 'sourceType',
                key: 'sourceType',
            },
            {
                title: 'Data Source Type',
                dataIndex: ['dataSource', 'type'],
                key: 'dataSourceType',
            },
            {
                title: 'URL',
                dataIndex: ['dataSource', 'url'],
                key: 'dataSourceURL',
            },
            {
                title: 'Table Name',
                dataIndex: ['dataSource', 'tableName'],
                key: 'dataSourceTableName',
            },
            {
                title: 'Tag',
                dataIndex: ['dataSource', 'tag'],
                key: 'dataSourceTag',
                render: (tag) => (
                    <Space>
                            <Tag key={tag}>{tag}</Tag>
                    </Space>)
    },
    {
        title: 'Actions',
        key: 'actions',
        render: (text, record) => (
            <Space>
                <Button
                    type="primary"
                    onClick={() => {
                        setCurrentDataSource(record);
                        fieldMapForm.setFieldsValue({ fieldMap: record.fieldMap || {} });
                        setFieldMapModalVisible(true);
                    }}
                >
                    编辑映射
                </Button>

            </Space>
        ),
},
];

return (
    <div>
        <Button type="primary" onClick={() => setDataSourceFormVisible(true)}>
            添加数据源
        </Button>
        <Table dataSource={dataSourceList} columns={columns} />

        <Modal
            title="添加数据源"
            visible={dataSourceFormVisible}
            onCancel={() => {
                form.resetFields();
                setDataSourceFormVisible(false);
            }}
            onOk={handleDataSourceFormSubmit}
        >
            <Form form={form}>
                <Form.Item name="sourceType" label="Source Type" rules={[{ required: true, message: 'Please input Source Type' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={['dataSource', 'type']} label="Data Source Type" rules={[{ required: true, message: 'Please input Data Source Type' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={['dataSource', 'url']} label="URL" rules={[{ required: true, message: 'Please input URL' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={['dataSource', 'tableName']} label="Table Name" rules={[{ required: true, message: 'Please input Table Name' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={['dataSource', 'tag']} label="Tag">
                    <Input />
                </Form.Item>
                <Form.Item name={['dataSource', 'description']} label="Description" rules={[{ required: true, message: 'Please input Description' }]}>
                    <Input />
                </Form.Item>
            </Form>
        </Modal>

        <Modal
            title="编辑映射"
            visible={fieldMapModalVisible}
            onCancel={() => {
                fieldMapForm.resetFields();
                setFieldMapModalVisible(false);
            }}
            onOk={handleFieldMapFormSubmit}
        >
            <Form form={fieldMapForm}>
                <Form.List name="fieldMap">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, fieldKey, ...restField }) => (
                                <Space key={key} style={{ display: 'flex', marginBottom: 8 }}>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'sourceColumn']}
                                        fieldKey={[fieldKey, 'sourceColumn']}
                                        label="Source Column"
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'modelColumn']}
                                        fieldKey={[fieldKey, 'modelColumn']}
                                        label="Model Column"
                                    >
                                        <Input />
                                    </Form.Item>
                                    <MinusCircleOutlined onClick={() => remove(name)} />
                                </Space>
                            ))}
                            <Form.Item>
                                <Button
                                    type="dashed"
                                    onClick={() => add()}
                                    icon={<PlusOutlined />}
                                >
                                    添加映射
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
            </Form>
        </Modal>
    </div>
);
};

export default DataSourceComponent;
