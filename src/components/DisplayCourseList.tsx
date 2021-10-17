import React from "react";
import { AIConc, BioConc, SecurityConc, DataScienceConc, HPCConc, NetworksConc, TheoryConc } from "./CourseLists";

export function DisplayCourseList({concentration}:{concentration:string}): JSX.Element{
    if (concentration=="AI"){
        return <AIConc></AIConc>;
    } else if (concentration=="Bio"){
        return <BioConc></BioConc>;
    } else if (concentration=="Security"){
        return <SecurityConc></SecurityConc>;
    } else if (concentration=="Data Science"){
        return <DataScienceConc></DataScienceConc>;
    } else if (concentration=="HPC"){
        return <HPCConc></HPCConc>;
    } else if (concentration=="Networks"){
        return <NetworksConc></NetworksConc>;
    } else if (concentration=="Theory"){
        return <TheoryConc></TheoryConc>;
    } else {
        return <div></div>;
    }
}