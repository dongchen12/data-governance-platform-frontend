import React from "react";
import {Card, Col, Row} from "antd";

const ModelDisplay = (modelList) => {
    return (
        <Row>
            <Col span={8}>
                <Card title="Card title" bordered={false}>
                    Card content
                </Card>
            </Col>
            <Col span={8}>
                <Card title="Card title" bordered={false}>
                    Card content
                </Card>
            </Col>
            <Col span={8}>
                <Card title="Card title" bordered={false}>
                    Card content
                </Card>
            </Col>

        </Row>
    )
}


export default ModelDisplay;
