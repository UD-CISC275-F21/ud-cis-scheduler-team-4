import React from "react";
import { Concentration } from "../../interfaces/concentration";
import { ConcentrationContainerType } from "../../interfaces/concentrationcontainer";
import { DisplayCourseListMap } from "./DisplayCourseListHelperFunctions/DisplayCourseListMap";
import { SavedProgress } from "../../interfaces/savedprogress";

export const DisplayCourseList = (props: {
        concentration: Concentration;
        setConcentrationContainers: (concentrationContainers: ConcentrationContainerType[]) => void;
        saveData: SavedProgress[];
    }): JSX.Element => {
    const index = props.saveData.findIndex(eachSaveData => eachSaveData.concentration.name === props.concentration.name);
    return(    index !== -1 ?
        DisplayCourseListMap(props.concentration, props.setConcentrationContainers, props.saveData[index])
        :
        <div>Cannot find Concentration Save Data</div>
    );
};
