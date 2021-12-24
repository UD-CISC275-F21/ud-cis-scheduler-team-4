import React from "react";
import { Concentration } from "../../interfaces/concentration";
import { DisplayCourseListMap } from "./DisplayCourseListHelperFunctions/DisplayCourseListMap";
import { UseStateContext } from "../util/DispatchLogic/UseStateContext";

export const DisplayCourseList = ({concentration}: {concentration: Concentration}): JSX.Element => {
    const { state } = UseStateContext();
    const index = state.saveData.findIndex(eachSaveData => eachSaveData.concentration.name === state.concentration.name);
    return  index !== -1 ?
        DisplayCourseListMap(concentration)
        :
        <div>Cannot find Concentration Save Data</div>;
};
