import React from "react";
import CONCENTRATIONS from "../../json/concentrations.json";
import { Course } from "../../interfaces/course";
import { CourseContainer } from "./CourseContainer";

export function AIConc({StringsToCourses}:
    {StringsToCourses: (stringCourses:string[])=>Course[]}): JSX.Element{
    return <div>
        <h2>Artificial Intelligence and Robotics</h2>
        <p>CISC Core and Concentration:</p>
        <CourseContainer courses={StringsToCourses(CONCENTRATIONS[0].core)} name={"core"}/>
        <CourseContainer courses={StringsToCourses(CONCENTRATIONS[0].capstone)} name={"capstone"} />
        <CourseContainer courses={StringsToCourses(CONCENTRATIONS[0].conc.general)} name={"general"}/>
        <p>Choose One Lab Sequence: (Needs fixing)</p>
        
        <p>Select One Writing Course:</p>
        <CourseContainer courses={StringsToCourses(CONCENTRATIONS[0].writing)} name={"core"} />
        <p>Select One Statistics Course:</p>
        <CourseContainer courses={StringsToCourses(CONCENTRATIONS[0].conc.stats)} name={"capstone"} />
        <p>Select One Systems Course:</p>
        <CourseContainer courses={StringsToCourses(CONCENTRATIONS[0].conc.systems)} name={"general"} />
        <p>Select Four from the Following:</p>
        <CourseContainer courses={StringsToCourses(CONCENTRATIONS[0].conc.elective)} name={"elective"} />
    </div>;
}

export function BioConc({StringsToCourses}:
    {StringsToCourses: (stringCourses:string[])=>Course[]}): JSX.Element{
    return <div>
        <h2>Bioinformatics</h2>
        <p>CISC Core and Concentration:</p>
        <CourseContainer courses={StringsToCourses(CONCENTRATIONS[1].core)} name={"core"} />
        <CourseContainer courses={StringsToCourses(CONCENTRATIONS[1].capstone)} name={"capstone"} />
        <CourseContainer courses={StringsToCourses(CONCENTRATIONS[1].conc.general)} name={"genral"} />
        <p>Choose One Chem Sequence:</p>
        <p>Choose One Organic Chem Sequence:</p>
        <p>Select One Writing Course:</p>
        <CourseContainer courses={StringsToCourses(CONCENTRATIONS[1].writing)} name={"writing"} />
        <p>Select One Statistics Course:</p>
        <CourseContainer courses={StringsToCourses(CONCENTRATIONS[1].conc.stats)} name={"stats"} />
        <p>Select One Data Analysis Course:</p>
        <p>Select Two from the Following:</p>
    </div>;
}

export function SecurityConc({StringsToCourses}:
    {StringsToCourses: (stringCourses:string[])=>Course[]}): JSX.Element{
    return <div>
        <h2>Cybersecurity</h2>
        <p>CISC Core and Concentration:</p>
        <CourseContainer courses={StringsToCourses(CONCENTRATIONS[2].core)} name={"core"} />
        <CourseContainer courses={StringsToCourses(CONCENTRATIONS[2].capstone)} name={"capstone"} />
        <CourseContainer courses={StringsToCourses(CONCENTRATIONS[2].conc.general)} name={"general"} />
        <p>Choose One Lab Sequence:</p>
        <p>Select One Writing Course:</p>
        <CourseContainer courses={StringsToCourses(CONCENTRATIONS[2].writing)} name={"writing"} />
        <p>Select One Statistics Course:</p>
        <CourseContainer courses={StringsToCourses(CONCENTRATIONS[2].conc.stats)} name={"stats"} />
        <p>Select Two Advanced Reqs:</p>
        <p>Select Two from the Following:</p>
    </div>;
}

export function DataScienceConc({StringsToCourses}:
    {StringsToCourses: (stringCourses:string[])=>Course[]}): JSX.Element{
    return <div>
        <h2>Data Science</h2>
        <p>CISC Core and Concentration:</p>
        <CourseContainer courses={StringsToCourses(CONCENTRATIONS[3].core)} name={"core"} />
        <CourseContainer courses={StringsToCourses(CONCENTRATIONS[3].capstone)} name={"capstone"} />
        <CourseContainer courses={StringsToCourses(CONCENTRATIONS[3].conc.general)} name={"general"} />
        <p>Choose One Lab Sequence:</p>
        <p>Select One Writing Course:</p>
        <CourseContainer courses={StringsToCourses(CONCENTRATIONS[2].writing)} name={"writing"} />
        <p>Select One Advanced Data Science:</p>
        <p>Select One Advanced Math:</p>
        <p>Select One of the Following:</p>
    </div>;
}

export function HPCConc({StringsToCourses}:
    {StringsToCourses: (stringCourses:string[])=>Course[]}): JSX.Element{
    return <div>
        <p>Come back and figure this one out later</p>
        <CourseContainer courses={StringsToCourses(CONCENTRATIONS[2].writing)} name={"writing"} />
    </div>;
}

export function NetworksConc({StringsToCourses}:
    {StringsToCourses: (stringCourses:string[])=>Course[]}): JSX.Element{
    return <div>
        <h2>Networks and Systems</h2>
        <p>CISC Core and Concentration:</p>
        <CourseContainer courses={StringsToCourses(CONCENTRATIONS[5].core)} name={"core"} />
        <CourseContainer courses={StringsToCourses(CONCENTRATIONS[5].capstone)} name={"capstone"} />
        <CourseContainer courses={StringsToCourses(CONCENTRATIONS[5].conc.general)} name={"general"} />
        <p>Choose One Lab Sequence:</p>
        <p>Select One Writing Course:</p>
        <CourseContainer courses={StringsToCourses(CONCENTRATIONS[5].writing)} name={"writing"} />
        <p>Select One Statistics Course:</p>
        <CourseContainer courses={StringsToCourses(CONCENTRATIONS[5].conc.stats)} name={"stats"} />
        <p>Select One Security Requirement:</p>
        <p>Select Two Systems Requirements:</p>
        <p>Select Two of the Following:</p>
    </div>;
}

export function TheoryConc({StringsToCourses}:
    {StringsToCourses: (stringCourses:string[])=>Course[]}): JSX.Element{
    return <div>
        <h2>Theory</h2>
        <p>CISC Core and Concentration:</p>
        <CourseContainer courses={StringsToCourses(CONCENTRATIONS[6].core)} name={"core"} />
        <CourseContainer courses={StringsToCourses(CONCENTRATIONS[6].capstone)} name={"capstone"} />
        <CourseContainer courses={StringsToCourses(CONCENTRATIONS[6].conc.general)} name={"general"} />
        <p>Choose One Lab Sequence:</p>
        <p>Select One Writing Course:</p>
        <CourseContainer courses={StringsToCourses(CONCENTRATIONS[6].writing)} name={"writing"} />
        <p>Select One Statistics Course:</p>
        <CourseContainer courses={StringsToCourses(CONCENTRATIONS[6].conc.stats)} name={"stats"} />
        <p>Select One of the Following Tracks:</p>
        <p>Select Two of the Following:</p>
    </div>;
}