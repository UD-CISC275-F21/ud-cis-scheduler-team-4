import React from "react";
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


export const DisplayCourseListMap = (concentration: Concentration,
    setConcentrationContainers: (concentrationContainers: ConcentrationContainerType[]) => void,
    saveData: SavedProgress,
): JSX.Element => {

    switch(concentration){

    case CONCENTRATIONS[0]: {
        // we know its AIConc at this point
        return <AIConc
            StringsToCourses={StringsToCourses}
            setConcentrationContainers={setConcentrationContainers}
            saveData={saveData}
        />;
    }
    case CONCENTRATIONS[1]: {
        return <BioConc
            StringsToCourses={StringsToCourses}
            setConcentrationContainers={setConcentrationContainers}
        />;
    }
    case CONCENTRATIONS[2]: {
        return <SecurityConc
            StringsToCourses={StringsToCourses}
            setConcentrationContainers={setConcentrationContainers}
        />;
    }
    case CONCENTRATIONS[3]: {
        return <DataScienceConc
            StringsToCourses={StringsToCourses}
            setConcentrationContainers={setConcentrationContainers}
        />;
    }
    case CONCENTRATIONS[4]: {
        return <HPCConc
            StringsToCourses={StringsToCourses}
            setConcentrationContainers={setConcentrationContainers}
        />;
    }
    case CONCENTRATIONS[5]: {
        return <NetworksConc
            StringsToCourses={StringsToCourses}
            setConcentrationContainers={setConcentrationContainers}
        />;
    }
    case CONCENTRATIONS[6]: {
        return <TheoryConc
            StringsToCourses={StringsToCourses}
            setConcentrationContainers={setConcentrationContainers}
        />;
    }
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
};

