import React, {useRef} from 'react';
import DataModelsDisplay from "../components/DataModelsDisplay";
import DataModelDefinition from "../components/DataModelDefinition";
import ExistingDataTables from "../components/ExistingDataTables";
import DataTables from "../components/DataTables";
import {Breadcrumb, theme} from "antd";
import RuleDefinition from "../components/RuleDefinition";
import DataSourceComponent from "../components/DataSourceComponent";

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

const DataModel = () => {
    let ref2 = useRef();
    const {
        token: {colorBgContainer},
    } = theme.useToken();

    return (
        <div>
            <Breadcrumb
                style={{
                    margin: '16px 0',
                }}
                items={[{title: 'User'}, {title: 'GagaDuck'}]}
            />
            {/*data model display*/}
            <DataModelsDisplay />
            {/*data model definition*/}
            <DataModelDefinition />
            {/*existing data tables*/}
            <ExistingDataTables />
            {/*data tables*/}
            <DataTables />
            {/*Rule Definition*/}
            <RuleDefinition columns={fields} currentRules={rules} ruleTypes={ruleTypes}/>
            {/*Data Source Component*/}
            <DataSourceComponent />
        </div>
    );
};

export default DataModel;