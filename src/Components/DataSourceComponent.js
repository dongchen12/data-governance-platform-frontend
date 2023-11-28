import React, {useState} from 'react';
import {Button, Checkbox, Form, Input, Modal, Popover, Select, Space, Table, Tag} from 'antd';

const DataSourceComponent = () => {
    const [dataSourceList, setDataSourceList] = useState([]);
    const [dataSourceFormVisible, setDataSourceFormVisible] = useState(false);
    const [form] = Form.useForm();
    const initialDataSource = {
        sourceType: '',
        dataSource: {
            type: '',
            url: '',
            tag: [],
            description: '',
            tables: [],
        },
    };
    const handleDataSourceFormSubmit = () => {
        form.validateFields().then((values) => {
            // 来自 initialDataSource 和 values 的值被合并到一个新对象 (newDataSource) 中，然后将这个新对象添加到 dataSourceList
            //将values中的tables属性的值添加到initialDataSource中的dataSource属性中的tables属性中
            setDataSourceList([...dataSourceList, { ...initialDataSource, ...values }]);
            form.resetFields();
            setDataSourceFormVisible(false);
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
                    <Popover content={
                        <ul>
                            {record.dataSource.tables.map((table) => (
                                <li key={table.tableId}>{table.tableName}</li>
                            ))}
                        </ul>

                    } title="选中的数据表" trigger="click">
                        <Button type='primary'>查看数据表</Button>
                    </Popover>
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
                url: form.getFieldValue(['dataSource', 'url']),
                username: form.getFieldValue('username'),
                password: form.getFieldValue('password'),
            };

            // 调用测试数据库连接的函数
            // await testDatabaseConnection(databaseInfo);

            const TestTables = [
                { tableId: 1, tableName: 'table1', checked: false },
                { tableId: 2, tableName: 'table2', checked: false },
                { tableId: 3, tableName: 'table3', checked: false },
            ];
            // 连接成功后，展示连接成功的提示信息，然后将数据库中的表信息展示出来，并且让用户勾选需要的表
            // 创建一个模态框并用于显示成功提示和表信息选择
            Modal.success({
                title: '数据库连接成功',
                content: (
                    <div>
                        <h1>连接成功！</h1>

                        <p>选择需要的表：</p>
                        <Checkbox.Group style={{ width: '100%' }}>
                            {TestTables.map(table => (
                                <Checkbox key={table.tableId} value={table.tableName}
                                onChange={(e) => {
                                    table.checked = e.target.checked;
                                }
                                }
                                >
                                    {table.tableName}
                                </Checkbox>
                            ))}
                        </Checkbox.Group>
                    </div>
                ),
                onOk: () => {
                    const selectedTables = TestTables.filter(table => table.checked).map(table => table);
                    //将表格信息添加到initialDataSource中的dataSource属性中的tables属性中
                    form.setFieldsValue({ dataSource: { tables: selectedTables } });
                    Modal.success({
                        title: '数据表添加成功',
                        okText: '确认',

                    });

                },
                okText: '确认',

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

    return (
        <div>
            <Button type="primary" onClick={() => setDataSourceFormVisible(true)}>
                添加数据源
            </Button>
            <Table
                dataSource={dataSourceList}
                columns={columns}
                />

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
                        <Select
                            placeholder="请选择数据源类型"
                            initialValue={'text'}
                            options={[
                                {
                                    value: 'seq',
                                    label: '时序',
                                },
                                {
                                    value: 'image',
                                    label: '图像',
                                },
                                {
                                    value: 'text',
                                    label: '文本',
                                },
                            ]}/>
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
                    <Form.Item name={['dataSource','tables']} hidden>
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
        </div>
    );
};

export default DataSourceComponent;