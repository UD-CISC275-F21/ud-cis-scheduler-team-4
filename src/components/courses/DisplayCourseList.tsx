import React from "react";
import { Concentration } from "../../interfaces/concentration";
import { AIConc } from "./concentrations/AIConc";
import { BioConc } from "./concentrations/BioConc";
import { DataScienceConc } from "./concentrations/DataScienceConc";
import { HPCConc } from "./concentrations/HPCConc";
import { NetworksConc } from "./concentrations/NetworksConc";
import { SecurityConc } from "./concentrations/SecurityConc";
import { TheoryConc } from "./concentrations/TheoryConc";
import CONCENTRATIONS from "../../json/concentrations.json";
import COURSES from "../../json/courses.json";
import { Course as CourseType } from "../../interfaces/course";
import { ConcentrationContainerType } from "../../interfaces/concentrationcontainer";
import { DisplayCourseListMap } from "./DisplayCourseListHelperFunctions/DisplayCourseListMap";

export const DisplayCourseList = (props: {
        concentration: Concentration;
        setConcentrationContainers: React.Dispatch<React.SetStateAction<ConcentrationContainerType[]>>;
    }): JSX.Element => {

    return DisplayCourseListMap(props.concentration,props.setConcentrationContainers);
};
