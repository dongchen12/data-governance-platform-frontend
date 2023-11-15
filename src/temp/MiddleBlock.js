import React, {useEffect, useState} from "react";
import {
    Typography,
    Divider,
    Card,
    Transfer,
    Button,
    Table,
    Tag,
    Space,
    Switch,
    App,
    Form,
    Drawer,
    Select,
    Input, Row, Col
} from "antd";
import difference from 'lodash/difference';
import {EditOutlined, PlusCircleOutlined} from "@ant-design/icons";

const {Option} = Select;

const TableTransfer = ({leftColumns, rightColumns, ...restProps}) => (
    <Transfer {...restProps}>
        {({
              direction,
              filteredItems,
              onItemSelectAll,
              onItemSelect,
              selectedKeys: listSelectedKeys,
              disabled: listDisabled,
          }) => {
            const columns = direction === 'left' ? leftColumns : rightColumns;
            const rowSelection = {
                getCheckboxProps: (item) => ({
                    disabled: listDisabled || item.disabled,
                }),
                onSelectAll(selected, selectedRows) {
                    const treeSelectedKeys = selectedRows
                        .filter((item) => !item.disabled)
                        .map(({key}) => key);
                    const diffKeys = selected
                        ? difference(treeSelectedKeys, listSelectedKeys)
                        : difference(listSelectedKeys, treeSelectedKeys);
                    onItemSelectAll(diffKeys, selected);
                },
                onSelect({key}, selected) {
                    onItemSelect(key, selected);
                },
                selectedRowKeys: listSelectedKeys,
            };
            return (
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={filteredItems}
                    size="small"
                    style={{
                        pointerEvents: listDisabled ? 'none' : undefined,
                    }}

                    onRow={({key, disabled: itemDisabled}) => ({
                        onClick: () => {
                            if (itemDisabled || listDisabled) return;
                            onItemSelect(key, !listSelectedKeys.includes(key));
                        },
                    })}
                />
            );
        }}
    </Transfer>
);

const mockTags = ['label1', 'label2', 'label3'];
const mockData = Array.from({
    length: 10,
}).map((_, i) => ({
    key: i.toString(),
    name: `rule${i + 1}`,
    description: `description of rule${i + 1}`,
    disabled: false,
    tag: mockTags[i % 3],
}));
const originTargetKeys = mockData
    .filter((item) => Number(item.key) > 5)
    .map((item) => item.key);

const mockRuleType = Array.from({length: 3}).map((_, index) => ({
    id: index + 1,
    name: 'rule' + String(index + 1)
}));
const mockDataColumn = Array.from({length: 6}).map((_, index) => ({
    name: 'model_col' + String(index + 1),
    type: index % 3,
    description: 'test description' + String(index + 1),
    sensitive: false,
    encrypt: false
}));

export default function QualityRuleDefinition() {
    const tableColumns = [
        {
            dataIndex: 'name',
            title: '规则名',
        },
        {
            dataIndex: 'tag',
            title: '类型',
            render: (tag) => <Tag>{tag}</Tag>,
        },
        {
            dataIndex: 'description',
            title: '描述',
        },
        {
            title: '',
            render: (_, item) => <Button icon={<EditOutlined/>} onClick={() => {
                handleModRule(item.name)
            }}></Button>
        }
    ];

    const [targetKeys, setTargetKeys] = useState(originTargetKeys);
    const onChange = (nextTargetKeys) => {
        console.log(nextTargetKeys)
        setTargetKeys(nextTargetKeys);
    };
    const {message, modal, notification} = App.useApp();
    const handleOpenDrawer = () => {
        setOpen(true);
    };
    const handleCloseDrawer = () => {
        setOpen(false);
    };
    const handleAddRule = () => {
        setOpen(false);
    }
    const handleModRule = (ruleName) => {
        console.log(ruleName)
    }
    const [open, setOpen] = useState(false);


    return (
        <>
            <Drawer
                title={'添加规则'}
                width={720}
                open={open}
                onClose={handleCloseDrawer}
                styles={{
                    body: {
                        paddingBottom: 80,
                    },
                }}
                extra={
                    <Space>
                        <Button onClick={handleCloseDrawer}>取消</Button>
                        <Button onClick={handleAddRule} type="primary">
                            添加
                        </Button>
                    </Space>
                }
            >
                <Form layout={'vertical'}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label={'规则类型'}>
                                <Select placeholder={'请选择一个规则类型'}>
                                    {mockRuleType.map(item => <Option value={item.name}>{item.name}</Option>)}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label={'规则名称'}>
                                <Input placeholder={'请输入规则名称'}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label={'规则左字段'}>
                                <Select placeholder={'请选择一个字段'}>
                                    {mockDataColumn.map(item => <Option value={item.name}>{item.name}</Option>)}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label={'规则右字段'}>
                                <Select placeholder={'请选择一个字段'}>
                                    {mockDataColumn.map(item => <Option value={item.name}>{item.name}</Option>)}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item label={'规则描述'}>
                        <Input.TextArea placeholder={'请输入规则描述'}/>
                    </Form.Item>
                </Form>
            </Drawer>
            <Card title={'质量规则定义'}
                  extra={<Space><Button onClick={handleOpenDrawer}
                                        icon={<PlusCircleOutlined/>}
                                        type={'primary'}>自定义规则</Button></Space>}>
                {/*<Space>*/}
                {/*    <Select style={{width: 160}} placeholder={'请选择左字段'}></Select>*/}
                {/*    <Select style={{width: 160}} placeholder={'请选择右字段'}></Select>*/}
                {/*</Space>*/}
                {/*<Table>*/}

                {/*</Table>*/}
                {/*<Divider/>*/}
                <TableTransfer
                    dataSource={mockData}
                    targetKeys={targetKeys}
                    disabled={false}
                    showSearch={true}
                    onChange={onChange}
                    filterOption={(inputValue, item) =>
                        item.title.indexOf(inputValue) !== -1 || item.tag.indexOf(inputValue) !== -1
                    }
                    operations={['添加规则', '删除规则']}
                    titles={['预定义规则', '已选规则']}
                    leftColumns={tableColumns}
                    rightColumns={tableColumns}
                />
            </Card>
        </>
    );
}
