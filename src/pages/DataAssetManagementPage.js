import React from 'react';
import Graphin, {Utils, Behaviors, GraphinTreeData, GraphinContext, Components} from '@antv/graphin';
import {Card, Breadcrumb, theme, App, Space, notification, Typography, Tag, Descriptions, Menu} from 'antd';

const {ContextMenu} = Components;

// 这里的数据和原型图片上的保持一致
const mockData = {
    id: 'node0',
    label: '数据资产',
    children: [
        {
            id: 'node1',
            label: '设计域',
            children: [
                {
                    id: 'node4',
                    label: '产品图纸'
                }
            ]
        },
        {
            id: 'node2',
            label: '制造域',
            children: [
                {
                    id: 'node5',
                    label: '订单数据',
                    children: [
                        {
                            id: 'node8',
                            label: 'customer_id',
                            description: [
                                {label: '数据类型', children: 'INTEGER'},
                                {label: '描述', children: '客户的唯一标识符'},
                                {label: '语义标签', children: '产品信息决策层、客户、标识符数据源类型: 结构化'},
                                {
                                    label: 'URI',
                                    children: 'data:devops/customer/semistructure/mongodb://127.0.0.1:27012/devops/customer/customer_id'
                                }
                            ],
                        },
                        {
                            id: 'node9',
                            label: 'product_id',
                        },
                        {
                            id: 'node10',
                            label: 'quantity',
                        },
                        {
                            id: 'node11',
                            label: 'order_date',
                        }
                    ]
                },
                {
                    id: 'node6',
                    label: '产品信息',
                    description: [
                        {label: '描述', children: '存储公司产品信息的数据库'},
                        {label: '语义标签', children: '产品信息，决策层'},
                        {label: '数据源类型', children: '结构化'},
                        {
                            label: 'URI',
                            children: 'datamanufacture/product/structure/postgresql:/127.0.0.1:5432/manufacture/product'
                        }
                    ],
                    children: [
                        {
                            id: 'node12',
                            label: 'product_id',
                        },
                        {
                            id: 'node13',
                            label: 'product_name',
                        },
                        {
                            id: 'node14',
                            label: 'category',
                        },
                        {
                            id: 'node15',
                            label: 'price',
                        },
                        {
                            id: 'node16',
                            label: 'stock',
                        }
                    ]
                }
            ]
        },
        {
            id: 'node3',
            label: '运维域',
            children: [
                {
                    id: 'node7',
                    label: '客户信息',
                    children: [
                        {
                            id: 'node17',
                            label: 'customer_id',
                        },
                        {
                            id: 'node18',
                            label: 'data_format',
                        },
                        {
                            id: 'node19',
                            label: 'data_file',
                        },
                    ]
                }
            ]
        }
    ]
}

// 遍历树查找对应的描述太麻烦了，直接用一个map存节点id到描述列表的映射
let descriptionMap = new Map();

// 只有叶子结点才能导出，记录可导出的id
let exportSet = new Set();

// 遍历整个树，更改节点样式，增加辅助属性
const walk = (node: GraphinTreeData, callback: (node: GraphinTreeData) => void, layer) => {
    callback(node); // 所有节点共同的特征
    if (layer === 0) {
        node.style.keyshape = {
            size: 70,
        }
    } else if (layer === 1) {
        node.style.keyshape = {
            size: 45
        }
    }
    if (node.children && node.children.length > 0) {
        node.children.forEach(child => {
            walk(child, callback, layer + 1);
        });
    } else {
        // 这里默认叶子结点可以导出，用户可以自行选择可导出的节点，把他们的id加入到exportSet即可
        exportSet.add(node.id)
    }
};

walk(mockData, node => {
    node.style = {
        label: {
            value: node.label,
        },
    };
    if (node.description)
        descriptionMap.set(node.id, node.description);
}, 0);


/**
 * TODO：
 * 1. 尝试自定义交互行为：弹窗显示详细信息。 ✓
 * 2. 尝试自定义节点大小、颜色、形状。 ✓
 * 3. 尝试给需要的节点添加一个按钮
 */

const layout = {
    type: 'compactBox',
    minNodeSpacing: 70,
    options: {
        direction: 'LR',
        getId: function getId(d) {
            return d.id;
        }
    },
};

const RightClickMenu = (props) => {
    const {message} = App.useApp();

    const handleMenuClick = (e) => {
        const {onClose, id, handleNotify, handleExport} = props;
        if (e.key === 'detail') {
            if (descriptionMap.has(id)) {
                handleNotify(descriptionMap.get(id));
            } else {
                message.warning('该内容没有详情描述！');
            }
        } else if (e.key === 'export') {
            if (exportSet.has(id)) {
                handleExport(descriptionMap.get(id));
            } else {
                message.warning('该内容不可导出！');
            }
        }
        onClose();
    };

    return <Menu onClick={handleMenuClick}>
        <Menu.Item key="detail">详情</Menu.Item>
        <Menu.Item key="export">导出</Menu.Item>
    </Menu>
}


export default function DataAssetManagementPage() {
    const [api, contextHolder] = notification.useNotification();

    const openNotification = (descriptions) => {
        api.info({
            message: '详细信息',
            description: <Descriptions items={descriptions} layout={'vertical'}/>,
            placement: 'bottomLeft',
        });
    };

    const exportColumn = (nodeId) => {
        // 这里填写点击导出后所执行的操作，nodeId是被点击节点的id
    }

    return (
        <div style={{height: '100%'}}>
            {contextHolder}
            <Breadcrumb
                style={{
                    margin: '16px 0',
                }}
                items={[{title: 'User'}, {title: 'Bill'}]}
            />
            <Card title={"数据资产管理"} style={{overflowX: 'scroll'}} extra={'右键点击节点可查看详细信息或导出'}>
                <Graphin
                    data={mockData}
                    theme={{primaryColor: '#000000'}}
                    layout={{type: "compactBox", ...(layout.options)}}
                    modes={{default: ['drag-canvas']}}
                    fitView
                    height={700}
                >
                    <ContextMenu style={{background: '#fff'}} bindType="node">
                        {value => {
                            return <RightClickMenu {...value} handleNotify={openNotification} handleExport={exportColumn}/>;
                        }}
                    </ContextMenu>
                </Graphin>
            </Card>
        </div>);
};
