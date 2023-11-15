const mock_model_list = [
    {
        "type": 1,
        "modelName": "test_model",
        "modal": 1,
        "tag": "testTag",
        "domain": "testDomain",
        "description": "testDescription",
        "fields": [
            {
                "name": "model_col1",
                "type": 1,
                "description": "testDescription",
                "sensitive": false,
                "encrypt": false
            },
            {
                "name": "model_col2",
                "type": 1,
                "description": "testDescription",
                "sensitive": false,
                "encrypt": false
            },
            {
                "name": "model_col3",
                "type": 3,
                "description": "testDescription",
                "sensitive": false,
                "encrypt": false
            },
            {
                "name": "model_col4",
                "type": 2,
                "description": "testDescription",
                "sensitive": false,
                "encrypt": false
            }
        ],
        "rules": [
            {
                "ruleType": 1,
                "rule": {
                    "description": "testDescription",
                    "leftFieldName": "model_col1",
                    "rightFieldName": "model_col2",
                    "type": 3
                }
            }
        ],
        "sources": [
            {
                "sourceType": 1,
                "dataSource": {
                    "type": 1,
                    "url": "jdbc:postgresql://124.222.140.214:5666/data_management?user=postgres&password=123qweasd",
                    "tableName": "test_source",
                    "tag": "testTag",
                    "description": "testDescription",
                    "fieldMap": {
                        "source_col1": "model_col1",
                        "source_col2": "model_col2",
                        "source_col3": "model_col3",
                        "source_col4": "model_col4"
                    }
                }
            }
        ]
    }
];

export {mock_model_list};
