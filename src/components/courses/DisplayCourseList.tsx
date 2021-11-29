import React from "react";
import { Concentration } from "../../interfaces/concentration";
import { ConcentrationContainerType } from "../../interfaces/concentrationcontainer";
import { DisplayCourseListMap } from "./DisplayCourseListHelperFunctions/DisplayCourseListMap";

export const DisplayCourseList = (props: {
        concentration: Concentration;
        setConcentrationContainers: React.Dispatch<React.SetStateAction<ConcentrationContainerType[]>>;
    }): JSX.Element => {

    return DisplayCourseListMap(props.concentration,props.setConcentrationContainers);
};
