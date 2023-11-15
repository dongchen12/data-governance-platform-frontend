import React, {useState} from 'react';
import {Button, Table, Modal, Form, Input, Space, Tag, Checkbox} from 'antd';
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
            tag: [],
            description: '',
        },
        //tables嵌套，里面是一个数组，每个元素有tableName属性还有fieldMap属性
        tables: [],
    };
    const handleDataSourceFormSubmit = () => {
        form.validateFields().then((values) => {
            // 来自 initialDataSource 和 values 的值被合并到一个新对象 (newDataSource) 中，然后将这个新对象添加到 dataSourceList
            alert(JSON.stringify(values));
            setDataSourceList([...dataSourceList, { ...initialDataSource, ...values }]);
            form.resetFields();
            setDataSourceFormVisible(false);
        });

    };

    //TODO:修改下面的函数，使得其能更新对应table的fieldMap，而不是更新dataSource的fieldMap
    const handleFieldMapFormSubmit = () => {
        fieldMapForm.validateFields().then((values) => {
            const updatedDataSourceList = dataSourceList.map((dataSource) => {
                // 寻找当前表格所在的数据源
                const foundTable = dataSource.tables.find((table) => table === currentDataSource);
                if (foundTable) {
                    // 更新当前表格的 fieldMap 值为 values.fieldMap
                    const updatedTables = dataSource.tables.map((table) => {
                        if (table === foundTable) {
                            return { ...table, fieldMap: values.fieldMap };
                        }
                        return table;
                    });
                    return { ...dataSource, tables: updatedTables };
                }
                return dataSource;
            });
            setDataSourceList(updatedDataSourceList);
            setFieldMapModalVisible(false);
        });

    };
    //处理删除数据源的函数
    const handleDeleteDataSource = (record) => {
        const updatedDataSourceList = dataSourceList.filter((dataSource) => dataSource !== record);
        setDataSourceList(updatedDataSourceList);
    }

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
            title: 'Tag',
            dataIndex: ['dataSource', 'tag'],
            key: 'dataSourceTag',
            render: (tag) => (
                <Space>
                    <Tag key={tag} color='red'>{tag}</Tag>
                </Space>)
        },
        {
            title: 'Description',
            dataIndex: ['dataSource','description'],
            key: 'dataSourceDescription',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <Space>
                    <Button
                        //删除数据源,将type设置为delete
                        danger
                        onClick={() => {
                            //增加个确认框
                            Modal.confirm(
                                {   title: '确认删除数据源吗？',
                                    content: '删除后将无法恢复',
                                    okText: '确认',
                                    cancelText: '取消',
                                    onOk: () => {
                                        handleDeleteDataSource(record);
                                    },


                                }
                            );

                        }}
                    >
                        删除
                    </Button>

                </Space>
            ),
        },
    ];
    const handleTestDatabaseConnection = async () => {
        try {
            // 模拟数据库连接信息，实际使用时需要替换为真实的连接信息
            const databaseInfo = {
                type: form.getFieldValue(['dataSource', 'type']),
                url: form.getFieldValue(['dataSource', 'url']),
                username: form.getFieldValue('username'),
                password: form.getFieldValue('password'),
            };

            // 调用测试数据库连接的函数
            // await testDatabaseConnection(databaseInfo);

            // 这里可以进行连接成功后的处理，例如提示、更新UI等

            const TestTables = [{
                tableId: 1,
                tableName: 'table1',
                fieldMap: [],
                checked: false,
            }, {
                tableId: 2,
                tableName: 'table2',
                fieldMap: [],
                checked: false,
            }, {
                tableId: 3,
                tableName: 'table3',
                fieldMap: [],
                checked: false,
            }];
            // 将测试结果添加到表单的 dataSource下的 tables 中
            form.setFieldsValue({ 'tables': TestTables });
            Modal.success({
                title: '数据库连接成功',
                content: (
                    <div>
                        <p>数据库中的表：</p>
                        <p>{JSON.stringify(databaseInfo)}</p>
                        <ul>
                            {TestTables.map((table) => (
                                <li key={table.tableId}>{table.tableName}</li>
                            ))}
                        </ul>
                    </div>

                ),

            });


        } catch (error) {
            // 这里可以进行连接失败后的处理，例如错误提示、更新UI等
            console.error('连接失败：', error);
            Modal.error({
                title: '数据库连接失败',
                content: '请检查连接信息并重试。',
            });
        }
    };
    const expandedRowRender = (record) => {
        const tableColumns = [
            {
                title: 'Table Name',
                dataIndex: 'tableName',
                key: 'tableName',
                render: (text, tableRecord) => (
                    <Checkbox
                        checked={tableRecord.checked}
                        //实现点击checkbox选中表格
                        onChange={(e) => {  //e是事件对象
                            const checked = e.target.checked;//获取checkbox的选中状态
                            //更新dataSourceList
                            const updatedDataSourceList = dataSourceList.map((dataSource) => {
                                //如果dataSource是当前的dataSource
                                if (dataSource === record) {
                                    //更新tables
                                    const updatedTables = dataSource.tables.map((table) => {
                                        if (table === tableRecord) {
                                            return { ...table, checked };
                                        }
                                        return table;
                                    });
                                    return { ...dataSource, tables: updatedTables };
                                }
                                return dataSource;
});
                            setDataSourceList(updatedDataSourceList);
                        }}
                    >
                        {text}
                    </Checkbox>
                ),
            },

            {
                title: 'Actions',
                key: 'actions',
                render: (text, record) => (
                    <Space>
                        <Button
                            disabled={!record.checked}
                            type="primary"
                            onClick={() => {
                                // 保存当前数据源对象
                                setCurrentDataSource(record);
                                // 将当前数据源对象的 fieldMap 值设置到 fieldMapForm 中
                                fieldMapForm.setFieldsValue({ fieldMap: record.fieldMap || {} });
                                // 显示编辑映射的对话框
                                setFieldMapModalVisible(true);
                            }}
                        >
                            编辑映射
                        </Button>
                    </Space>
                ),
            },

        ];
        const dataSourceTables = record.tables || [];
        // const dataSourceTables = record.dataSource.tables || [];
        return <Table columns={tableColumns} dataSource={dataSourceTables} pagination={false} />;
    };
    return (
        <div>
            <Button type="primary" onClick={() => setDataSourceFormVisible(true)}>
                添加数据源
            </Button>
            <Table
                dataSource={dataSourceList}
                columns={columns}
                expandable={{ expandedRowRender }}/>

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
                    <Form.Item name="username" label="Username" rules={[{ required: true, message: 'Please input username' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="password" label="Password"rules={[{ required: true, message: 'Please input password' }]}>
                        <Input.Password />
                    </Form.Item>
                    <Form.Item name="testbtn" >
                        <Button type="primary" onClick={handleTestDatabaseConnection}>
                            测试数据库连接
                        </Button>
                    </Form.Item>
                    <Form.Item name='tables' hidden>
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