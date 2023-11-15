import React from "react";
import {Card, Descriptions, Space, Tag} from "antd";

const ModelCard = ({modelName, type, tags, domain, description}) => {
    let items = [
        {
            key: '1',
            label: '模型分类',
            children: type
        },
        {
            key: '2',
            label: '业务域',
            span: 2,
            children: domain
        },
        {
            key: '3',
            label: '标签',
            span: 3,
            children: <Space size={[0, 8]} wrap={true}>
                {tags.map(item => {
                    return <Tag>
                        item.name
                    </Tag>
                })}
            </Space>

        }
    ]
    return (
        <Card bordered={false} style={{width: 300}}>
            <Descriptions title={'模型名称：'+modelName}>
                {description}
            </Descriptions>
        </Card>
    )
}

export default ModelCard;
