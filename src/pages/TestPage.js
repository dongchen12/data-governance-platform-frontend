import React, {useRef} from "react";
import {Breadcrumb, Button, theme} from "antd";
import RuleDefinition from "../components/RuleDefinition";

const fields = [
    {
        "name": "model_col1",
        // number
        "type": 1,
        "description": "testDescription",
        "sensitive": false,
        "encrypt": false,
        "secretLevel": 0
    },
    {
        "name": "model_col2",
        // number
        "type": 1,
        "description": "testDescription",
        "sensitive": false,
        "encrypt": false,
        "secretLevel": 0
    },
    {
        "name": "model_col3",
        // string
        "type": 2,
        "description": "testDescription",
        "sensitive": false,
        "encrypt": false,
        "secretLevel": 0
    },
    {
        "name": "model_col4",
        // number
        "type": 1,
        "description": "testDescription",
        "sensitive": false,
        "encrypt": false,
        "secretLevel": 0
    }
];

const rules = [
    {
        "ruleType": 1,
        "rule": {
            "description": "testDescription",
            "leftFieldName": "model_col1",
            "rightFieldName": "model_col2",
            "type": 3
        }
    },
    {
        "ruleType": 2,
        "rule": {
            "description": 'testDescription',
            "fieldName": 'model_col3',
        }
    },
    {
        "ruleType": 3,
        "rule": {
            "description": 'testDescription',
            "fieldName": 'model_col4',
        }
    }

];

const ruleTypes = [
    {value: 1, label: '比较规则'},
    {value: 2, label: '非空规则'},
    {value: 3, label: '范围限制规则'}
];

const TestPage = () => {
    let ref2 = useRef();
    const {
        token: {colorBgContainer},
    } = theme.useToken();

    return (
        <div style={{height: '100%'}}>
            <Breadcrumb
                style={{
                    margin: '16px 0',
                }}
                items={[{title: 'User'}, {title: 'Bill'}]}
            />
            <div
                style={{
                    padding: 24,
                    minHeight: 360,
                    height: 800,
                    overflowY: 'scroll',
                    background: colorBgContainer,
                }}
            >
                <RuleDefinition columns={fields} currentRules={rules} ruleTypes={ruleTypes}/>
                {/*<Button onClick={() => {*/}
                {/*    ref2.current.scrollIntoView({behavior: 'smooth', block: 'start'})*/}
                {/*}}></Button>*/}
                {/*<div style={{backgroundColor: 'black', height: 1000}}></div>*/}
                {/*<div ref={ref2} style={{backgroundColor: 'blue', height: 1000}}></div>*/}
            </div>
        </div>
    )
}

export default TestPage;
