import { Accordion } from "react-bootstrap";
import CONCENTRATIONS from "../../../json/concentrations.json";
import { CourseContainer } from "../CourseContainer";
import { ConcentrationContainerType } from "../../../interfaces/concentrationcontainer";
import React, { useState, useEffect } from "react";
import { Course as CourseType } from "../../../interfaces/course";

export function SecurityConc(props: {StringsToCourses: (stringCourses:string[]) => Course[], setConcentrationContainers: React.Dispatch<React.SetStateAction<ConcentrationContainerType[]>>}): JSX.Element{
    const [coreCourses, setCoreCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[2].core));
    const [capstoneCourses, setCapstoneCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[2].capstone));
    const [generalCourses,setGeneralCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[2].conc.general));
    const [writingCourses, setWritingCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[2].writing));
    const [statCourses, setStatCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[2].conc.stats));
    const [labCourses,setLabCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[2].lab));
    const [electiveCourses,setElectiveCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[2].conc.elective));
    const [secCourses,setSecCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[2].conc.cybersecurity));

    useEffect(() => {
        props.setConcentrationContainers(

            [   
                {
                    "name": "core",
                    "courses": coreCourses,
                    "setCourses": setCoreCourses
                },
                {
                    "name": "capstone",
                    "courses": capstoneCourses,
                    "setCourses": setCapstoneCourses

                },
                {
                    "name": "general",
                    "courses": generalCourses,
                    "setCourses": setGeneralCourses
                },
                {
                    "name": "writing",
                    "courses": writingCourses,
                    "setCourses": setWritingCourses
                },
                {
                    "name": "stat",
                    "courses": statCourses,
                    "setCourses": setStatCourses
                },
                {
                    "name": "lab",
                    "courses": labCourses,
                    "setCourses": setLabCourses
                },
                {
                    "name": "electives",
                    "courses": electiveCourses,
                    "setCourses": setElectiveCourses
                },
                {
                    "name": "cybersecurity",
                    "courses": secCourses,
                    "setCourses": setSecCourses
                }

            ]

        );
    }, []);
    
    return(
        <div>
            <h2>Cybersecurity</h2>
            <Accordion defaultActiveKey="8">

                <Accordion.Item eventKey="0">
                    <Accordion.Header>
                        CISC Core and Concentration
                    </Accordion.Header>
                    <Accordion.Body>
                        <CourseContainer courses={coreCourses} name="core"/>
                        <CourseContainer courses={capstoneCourses} name="capstone"/>
                        <CourseContainer courses={generalCourses} name="general"/>
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                    <Accordion.Header>
                        Two Lab Courses
                    </Accordion.Header>
                    <Accordion.Body>
                        <CourseContainer courses={labCourses} name={"lab-1"} />
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="2">
                    <Accordion.Header>
                        One Writing
                    </Accordion.Header>
                    <Accordion.Body>
                        <CourseContainer courses={writingCourses} name="writing"/>
                    </Accordion.Body>
                </Accordion.Item>


                <Accordion.Item eventKey="3">
                    <Accordion.Header>
                        Statistics Course
                    </Accordion.Header>
                    <Accordion.Body>
                        <CourseContainer courses={statCourses} name="stats"/>
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="4">
                    <Accordion.Header>
                        Two Advanced Requirements
                    </Accordion.Header>
                    <Accordion.Body>
                        <CourseContainer courses={secCourses} name="security"/>
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="5">

                    <Accordion.Header>
                        Two Electives
                    </Accordion.Header>

                    <Accordion.Body>

                        <CourseContainer courses={electiveCourses} name="electives"/>

                    </Accordion.Body>

                </Accordion.Item>



            </Accordion>


        </div>
    );
}