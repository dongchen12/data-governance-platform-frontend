import React, {useState} from "react";
import {Card, Button, Table, Tag, Space, Form, Select, Input, Row, Col, Empty} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";

const {Option} = Select;

/**
 * todo:
 *  1. 确定形参列表，把需要的mockData外移。
 *  2. 调表单，获取全部表单数据，增加可能的约束条件。
 *  3.
 */

/**
 * @returns {JSX.Element}
 * @constructor
 * @param ruleTypes
 * @param predefinedRules - 为当前模型预定义的规则列表，具体格式见README。
 * @param columns - 当前已经添加的表的字段。
 * @param currentRules -
 */
export default function RuleDefinition({ruleTypes, columns, currentRules, onDelRule, onModRule}) {
    const tableColumns = [
        Table.SELECTION_COLUMN,
        {
            title: '字段名',
            children: [
                {
                    title: '左字段',
                    dataIndex: 'leftFieldName',
                    align: 'center',
                    onCell: (item, index) => ({
                        colSpan: item.ruleType === 2 || item.ruleType === 3 ? 2 : 1,
                    })
                },
                {
                    title: '右字段',
                    dataIndex: 'rightFieldName',
                    align: 'center',
                    onCell: (item, index) => ({
                        colSpan: item.ruleType === 2 || item.ruleType === 3 ? 0 : 1,
                    })
                }
            ],
        }, {
            dataIndex: 'ruleType',
            title: '类型',
            render: (type) => <Tag>{type === 1 && "比较规则"}{type === 2 && "非空规则"}{type === 3 && "范围规则"}</Tag>,
        }, {
            dataIndex: 'description', title: '描述',
        }, {
            render: (_, item) => <Button.Group>
                <Button icon={<EditOutlined/>} onClick={() => {
                    handleModRule(item)
                }}></Button>
                <Button icon={<DeleteOutlined/>} onClick={() => {
                    handleDelRule(item)
                }
                }></Button>
            </Button.Group>
        }
    ];

    const comparisonRules = [
        {id: 1, label: '大于等于'},
        {id: 2, label: '大于'},
        {id: 3, label: '等于'},
        {id: 4, label: '小于等于'},
        {id: 5, label: '小于'},
    ]

    let formList = Array
        .from({length: 3})
        .map(() => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            let [fm] = Form.useForm();
            return fm;
        });

    //当前选择的规则id
    const [rule, setRule] = useState(0);

    // 添加规则的回调
    const handleAddRule = (formId, values) => {
        console.log(formId);
        console.log(values);
    };

    const handleDelRule = (item) => {
        onDelRule(item)
    }

    //
    const handleModRule = (item) => {
        onModRule(item)
    }

    const handleFormChange = (value) => {
        setRule(value);
    }

    return <>
        <Card title={'质量规则定义'}>
            {/*这里是模型为结构化模型时的表单*/}
            <Row gutter={16}>
                <Col span={12}>
                    <Card
                        type={'inner'}
                        title={'选择预定义质量规则'}
                        extra={<Space>
                            <Select placeholder={'请选择规则类型'} onChange={handleFormChange} options={ruleTypes}/>
                        </Space>}
                    >
                        {
                            rule === 1 && (<Form form={formList[0]} onFinish={(values) => {
                                handleAddRule(0, values)
                            }}>
                                <Form.Item name='ruleType' label={'规则类型'}>
                                    <Select>
                                        {comparisonRules.map(item => <Option value={item.id}>{item.label}</Option>)}
                                    </Select>
                                </Form.Item>
                                <Form.Item name='leftFieldName' label={'左字段'}>
                                    <Select>
                                        {
                                            columns.map(
                                                ({name, type, description}) =>
                                                    <Option value={name}>
                                                        <Row>
                                                            <Col span={6}>
                                                                {name}
                                                            </Col>
                                                            <Col span={6}>
                                                                <Tag>{type === 1 ? 'number' : (type === 2 ? 'string' : null)}</Tag>
                                                            </Col>
                                                            <Col span={12}>
                                                                {description}
                                                            </Col>
                                                        </Row>
                                                    </Option>
                                            )
                                        }
                                    </Select>
                                </Form.Item>
                                <Form.Item name='rightFieldName' label={'右字段'}>
                                    <Select>
                                        {
                                            columns.map(
                                                ({name, type, description}) =>
                                                    <Option value={name}>
                                                        <Row>
                                                            <Col span={6}>
                                                                {name}
                                                            </Col>
                                                            <Col span={6}>
                                                                <Tag>{type === 1 ? 'number' : (type === 2 ? 'string' : null)}</Tag>
                                                            </Col>
                                                            <Col span={12}>
                                                                {description}
                                                            </Col>
                                                        </Row>
                                                    </Option>
                                            )
                                        }
                                    </Select>
                                </Form.Item>
                                <Form.Item name='description' label={'规则描述'}>
                                    <Input.TextArea></Input.TextArea>
                                </Form.Item>
                                <Form.Item style={{display: 'flex', justifyContent: 'flex-end'}}>
                                    <Space>
                                        <Button htmlType={'reset'}>清空</Button>
                                        <Button type={'primary'} htmlType={'submit'}>添加规则</Button>
                                    </Space>
                                </Form.Item>
                            </Form>)
                        }
                        {
                            rule === 2 && (<Form form={formList[1]} onFinish={(values) => {
                                handleAddRule(1, values)
                            }}>
                                <Form.Item name='field' label={'字段选择'}>
                                    <Select placeholder={'请选择字段'}>
                                        {
                                            columns && columns.map(item => (<Option value={item.name}>{item.name}</Option>))
                                        }
                                    </Select>
                                </Form.Item>
                                <Form.Item name='description' label={'规则描述'}>
                                    <Input/>
                                </Form.Item>
                                <Form.Item style={{display: 'flex', justifyContent: 'flex-end'}}>
                                    <Space>
                                        <Button htmlType={'reset'}>清空</Button>
                                        <Button type={'primary'} htmlType={'submit'}>添加规则</Button>
                                    </Space>
                                </Form.Item>
                            </Form>)
                        }
                        {
                            rule === 3 && (<Form form={formList[2]} onFinish={(values) => {
                                handleAddRule(2, values)
                            }}>
                                <Form.Item name='field' label={'字段选择'}>
                                    <Select>
                                        {
                                            columns.map(
                                                ({name, type, description}) =>
                                                    <Option value={name}>
                                                        <Row>
                                                            <Col span={6}>
                                                                {name}
                                                            </Col>
                                                            <Col span={6}>
                                                                <Tag>{type === 1 ? 'number' : (type === 2 ? 'string' : null)}</Tag>
                                                            </Col>
                                                            <Col span={12} style={{overflow: 'hidden'}}>
                                                                {description}
                                                            </Col>
                                                        </Row>
                                                    </Option>
                                            )
                                        }
                                    </Select>
                                </Form.Item>
                                <Space.Compact>
                                    <Form.Item name='min' label={'范围选择'}>
                                        <Input addonBefore={'min'} placeholder={'请输入最小值'}/>
                                    </Form.Item>
                                    <Form.Item name='max'>
                                        <Input addonAfter={'max'} placeholder={'请输入最大值'}/>
                                    </Form.Item>
                                </Space.Compact>
                                <Form.Item name='description'>
                                    <Input.TextArea placeholder={'请输入规则描述'}/>
                                </Form.Item>
                                <Form.Item style={{display: 'flex', justifyContent: 'flex-end'}}>
                                    <Space>
                                        <Button htmlType={'reset'}>清空</Button>
                                        <Button htmlType={'submit'} type={'primary'}>添加规则</Button>
                                    </Space>
                                </Form.Item>
                            </Form>)
                        }
                        {
                            rule === 0 && (<Empty/>)
                        }
                    </Card>
                </Col>
                <Col span={12}>
                    <Table dataSource={currentRules.map(item => {
                        // eslint-disable-next-line default-case
                        switch (item.ruleType) {
                            case 1:
                                return ({
                                    ruleType: item.ruleType,
                                    ...item.rule
                                })
                            case 2:
                                return ({
                                    ruleType: item.ruleType,
                                    description: item.rule.description,
                                    leftFieldName: item.rule.fieldName,
                                })
                            case 3:
                                return ({
                                    ruleType: item.ruleType,
                                    description: item.rule.description,
                                    leftFieldName: item.rule.fieldName,
                                    min: item.rule.min,
                                    max: item.rule.max,
                                })
                        }
                        return null;
                    })} columns={tableColumns} rowSelection={{}} bordered>
                    </Table>
                </Col>
            </Row>
        </Card>
    </>
}