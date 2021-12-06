import React from "react";
import { Concentration } from "../../interfaces/concentration";
import { ConcentrationContainerType } from "../../interfaces/concentrationcontainer";
import { DisplayCourseListMap } from "./DisplayCourseListHelperFunctions/DisplayCourseListMap";
import { SavedProgress } from "../../interfaces/savedprogress";
import { UseStateContext } from "../MainPage";

export const DisplayCourseList = ({concentration}: {concentration: Concentration}): JSX.Element => {
    const { state } = UseStateContext();
    const index = state.saveData.findIndex(eachSaveData => eachSaveData.concentration.name === state.concentration.name);
    console.log("saveData = ", state.saveData);
    return(    index !== -1 ?
        DisplayCourseListMap(concentration, state.saveData[index])
        :
        <div>Cannot find Concentration Save Data</div>
    );
};
