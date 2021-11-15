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

export const DisplayCourseList = (props: {
        concentration: Concentration;
        setConcentrationContainers: React.Dispatch<React.SetStateAction<ConcentrationContainerType[]>>;
    }): JSX.Element => {

    function StringsToCourses(stringCourses: string[]): CourseType[] {
        /** Takes a list of strings, and returns a list of courses by looking in courses.json for matching names.
         *  Will need to be optimized to not be O^n, since it currently just loops through the entire json.
         */
        const allCourses = COURSES as CourseType[];
        const tmparr: CourseType[] = stringCourses.map(elem => [...allCourses.filter(i => i.name === elem)]).flat(2);
        return tmparr;
    }

    if (props.concentration === CONCENTRATIONS[0]) {
        return (<AIConc
                StringsToCourses={StringsToCourses}
                setConcentrationContainers={props.setConcentrationContainers}
                />
                );
    } else if (props.concentration === CONCENTRATIONS[1]) {
        return (
                <BioConc
                StringsToCourses={StringsToCourses}
                setConcentrationContainers={props.setConcentrationContainers}
                />
                );
    } else if (props.concentration === CONCENTRATIONS[2]) {
        return (
                <SecurityConc
                StringsToCourses={StringsToCourses}
                setConcentrationContainers={props.setConcentrationContainers}
                />
                );
    } else if (props.concentration === CONCENTRATIONS[3]) {
        return (
                <DataScienceConc
                StringsToCourses={StringsToCourses}
                setConcentrationContainers={props.setConcentrationContainers}
                />);
    } else if (props.concentration === CONCENTRATIONS[4]) {
        return (
                <HPCConc
                StringsToCourses={StringsToCourses}
                setConcentrationContainers={props.setConcentrationContainers}
                />
                );
    } else if (props.concentration === CONCENTRATIONS[5]) {
        return (
                <NetworksConc
                StringsToCourses={StringsToCourses}
                setConcentrationContainers={props.setConcentrationContainers}
                />
                );
    } else if (props.concentration === CONCENTRATIONS[6]) {
        return (
                <TheoryConc
                StringsToCourses={StringsToCourses}
                setConcentrationContainers={props.setConcentrationContainers}
                />
                );
    } return <div />;
};
