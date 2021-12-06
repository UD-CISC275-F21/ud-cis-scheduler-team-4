import React, { useEffect } from "react";
import { Concentration } from "../../../interfaces/concentration";
import { AIConc } from "../concentrations/AIConc";
import { BioConc } from "../concentrations/BioConc";
import { DataScienceConc } from "../concentrations/DataScienceConc";
import { HPCConc } from "../concentrations/HPCConc";
import { NetworksConc } from "../concentrations/NetworksConc";
import { SecurityConc } from "../concentrations/SecurityConc";
import { TheoryConc } from "../concentrations/TheoryConc";
import CONCENTRATIONS from "../../../json/concentrations.json";
import { ConcentrationContainerType } from "../../../interfaces/concentrationcontainer";
import { StringsToCourses } from "./StringsToCourses";
import { SavedProgress } from "../../../interfaces/savedprogress";
import { Course } from "../../../interfaces/course";
import { UseStateContext } from "../../util/DispatchLogic/UseStateContext";


export const DisplayCourseListMap = (concentration: Concentration,
    saveData: SavedProgress,
): JSX.Element => {

    const { state } = UseStateContext();
    console.log("concentration = ", concentration);
    switch(concentration.name){

    case CONCENTRATIONS[0].name: {
        // we know its AIConc at this point
        return <AIConc/>;
    }
    case CONCENTRATIONS[1].name: {
        return <BioConc/>;
    }
    /*
    case CONCENTRATIONS[2]: {
        return <SecurityConc
            StringsToCourses={StringsToCourses}
        />;
    }
    case CONCENTRATIONS[3]: {
        return <DataScienceConc
            StringsToCourses={StringsToCourses}
        />;
    }
    case CONCENTRATIONS[4]: {
        return <HPCConc
            StringsToCourses={StringsToCourses}
        />;
    }
    case CONCENTRATIONS[5]: {
        return <NetworksConc
            StringsToCourses={StringsToCourses}
        />;
    }
    case CONCENTRATIONS[6]: {
        return <TheoryConc
            StringsToCourses={StringsToCourses}
        />;
    }
    */
    default: {
        return <div>Concentration Unavailable</div>;
    }

    }
};

export const mapper = (concentration: Concentration): ((props: {
    StringsToCourses: (stringCourses: string[]) => Course[];
    setConcentrationContainers: (concentrationContainers: ConcentrationContainerType[]) => void;
    saveData: SavedProgress;
}) => JSX.Element) | undefined => {
    switch(concentration) {
    case CONCENTRATIONS[0]:
        return AIConc;
    }
    /*
    case CONCENTRATIONS[1]:
        return BioConc;
    case CONCENTRATIONS[2]:
        return DataScienceConc;
    case CONCENTRATIONS[3]:
        return HPCConc;
    case CONCENTRATIONS[4]:
        return NetworksConc;
    case CONCENTRATIONS[5]:
        return SecurityConc;
    case CONCENTRATIONS[6]:
        return TheoryConc;
    }
    */
};