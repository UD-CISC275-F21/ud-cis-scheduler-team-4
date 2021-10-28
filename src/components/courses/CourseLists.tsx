import React from "react";
import CONCENTRATIONS from "../../json/concentrations.json";
import { Course } from "../../interfaces/course";
import { CourseContainer } from "./CourseContainer";
import { ConcentrationContainerType } from "../../interfaces/concentrationcontainer";


export function AIConc(props: {StringsToCourses: (stringCourses:string[]) => Course[], concentrationContainers: ConcentrationContainerType[], setConcentrationContainers: React.Dispatch<React.SetStateAction<ConcentrationContainerType[]>>} ): JSX.Element{
    return <div>
        <h2>Artificial Intelligence and Robotics</h2>
        <p>CISC Core and Concentration:</p>
        <CourseContainer courses={props.StringsToCourses(CONCENTRATIONS[0].core)} name={"core"} concentrationContainers={props.concentrationContainers} setConcentrationContainers={props.setConcentrationContainers} />
        <CourseContainer courses={props.StringsToCourses(CONCENTRATIONS[0].capstone)} name={"capstone-1"} concentrationContainers={props.concentrationContainers} setConcentrationContainers={props.setConcentrationContainers}/>
        <CourseContainer courses={props.StringsToCourses(CONCENTRATIONS[0].conc.general)} name={"general-1"} concentrationContainers={props.concentrationContainers} setConcentrationContainers={props.setConcentrationContainers}/>
        <p>Choose One Lab Sequence: (Needs fixing)</p>
        
        <p>Select One Writing Course:</p>
        <CourseContainer courses={props.StringsToCourses(CONCENTRATIONS[0].writing)} name={"writing"} concentrationContainers={props.concentrationContainers} setConcentrationContainers={props.setConcentrationContainers}/>
        <p>Select One Statistics Course:</p>
        <CourseContainer courses={props.StringsToCourses(CONCENTRATIONS[0].conc.stats)} name={"capstone-2"} concentrationContainers={props.concentrationContainers} setConcentrationContainers={props.setConcentrationContainers}/>
        <p>Select One Systems Course:</p>
        <CourseContainer courses={props.StringsToCourses(CONCENTRATIONS[0].conc.systems)} name={"general-2"} concentrationContainers={props.concentrationContainers} setConcentrationContainers={props.setConcentrationContainers}/>
        <p>Select Four from the Following:</p>
        <CourseContainer courses={props.StringsToCourses(CONCENTRATIONS[0].conc.elective)} name={"elective"} concentrationContainers={props.concentrationContainers} setConcentrationContainers={props.setConcentrationContainers}/>
    </div>;
}

export function BioConc({StringsToCourses}:
    {StringsToCourses: (stringCourses:string[])=>Course[]}): JSX.Element{
    return <div>

    </div>;
}

export function SecurityConc({StringsToCourses}:
    {StringsToCourses: (stringCourses:string[])=>Course[]}): JSX.Element{
    return <div>

    </div>;
}

export function DataScienceConc({StringsToCourses}:
    {StringsToCourses: (stringCourses:string[])=>Course[]}): JSX.Element{
    return <div>

    </div>;
}

export function HPCConc({StringsToCourses}:
    {StringsToCourses: (stringCourses:string[])=>Course[]}): JSX.Element{
    return <div>

    </div>;
}

export function NetworksConc({StringsToCourses}:
    {StringsToCourses: (stringCourses:string[])=>Course[]}): JSX.Element{
    return <div>

    </div>;
}

export function TheoryConc({StringsToCourses}:
    {StringsToCourses: (stringCourses:string[])=>Course[]}): JSX.Element{
    return <div>

    </div>;
}
