import React from 'react';
import DataModelsDisplay from "../components/DataModelsDisplay";
import DataModelDefinition from "../components/DataModelDefinition";
import ExistingDataTables from "../components/ExistingDataTables";
import DataTables from "../components/DataTables";

const DataModel = () => {

    return (
        <div>
            {/*data model display*/}
            <DataModelsDisplay />
            {/*data model definition*/}
            <DataModelDefinition />
            {/*existing data tables*/}
            <ExistingDataTables />
            {/*data tables*/}
            <DataTables />
        </div>
    );
};

export default DataModel;