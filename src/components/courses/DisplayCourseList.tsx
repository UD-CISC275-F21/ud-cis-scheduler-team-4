import React from "react";
import { Concentration } from "../../interfaces/concentration";
import { ConcentrationContainerType } from "../../interfaces/concentrationcontainer";
import { DisplayCourseListMap } from "./DisplayCourseListHelperFunctions/DisplayCourseListMap";
import { SavedProgress } from "../../interfaces/savedprogress";

export const DisplayCourseList = (props: {
        concentration: Concentration;
        setConcentrationContainers: React.Dispatch<React.SetStateAction<ConcentrationContainerType[]>>;
        saveData: SavedProgress;
    }): JSX.Element => {
    return(
        DisplayCourseListMap(props.concentration, props.setConcentrationContainers, props.saveData)
    );
};
