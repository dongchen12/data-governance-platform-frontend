import React from "react";
import ModelDisplay from "../components/ModelDisplay";

const ModelDefinitionPage = () => {
    return (
        <div>
        {/* Section1: display a list of defined models. Users could click some button to browse the detailed information of some certain model and make relevant operations on the model, such as mod, del and so on. */}
        {/* Advice from Chen: Implement Delete and Create first. */}
            <ModelDisplay></ModelDisplay>
        </div>
    );
}

export default ModelDefinitionPage;
