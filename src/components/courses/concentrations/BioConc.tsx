import { Accordion } from "react-bootstrap";
import CONCENTRATIONS from "../../../json/concentrations.json";
import { CourseContainer } from "../CourseContainer";
import { ConcentrationContainerType } from "../../../interfaces/concentrationcontainer";
import React, { useState, useEffect } from "react";
import { Course as CourseType } from "../../../interfaces/course";

export function BioConc(props: {StringsToCourses: (stringCourses:string[]) => Course[], setConcentrationContainers: React.Dispatch<React.SetStateAction<ConcentrationContainerType[]>>}): JSX.Element{
    const [coreCourses, setCoreCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[1].core));
    const [capstoneCourses, setCapstoneCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[1].capstone));
    const [generalCourses,setGeneralCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[1].conc.general));
    const [writingCourses, setWritingCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[1].writing));
    const [statCourses, setStatCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[1].conc.stats));
    const [labCourses,setLabCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[1].lab));
    const [ochemCourses,setOchemCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[1].conc.ochem));
    const [electiveCourses,setElectiveCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[1].conc.elective));
    const [dataCourses,setDataCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[1].conc.data));
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
                    "name": "data science",
                    "courses": dataCourses,
                    "setCourses": setDataCourses
                },
                {
                    "name": "ochem",
                    "courses": ochemCourses,
                    "setCourses": setOchemCourses
                }

            ]

        );
    }, []);

    /*

        <Accordion defaultActiveKey="0">

            <Accordion.Item eventKey="0">

                <Accordion.Header>

                </Accordion.Header>

                <Accordion.Body>

                    

                </Accordion.Body>

            </Accordion.Item>

        </Accordion>


    */

    return(
        <div>
            <h2>Bioinformatics</h2>
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
                        Chem Sequence
                    </Accordion.Header>
                    <Accordion.Body>
                        <CourseContainer courses={labCourses} name={"lab-1"} />
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="2">
                    <Accordion.Header>
                        One Organic Chem Sequence
                    </Accordion.Header>
                    <Accordion.Body>
                        <CourseContainer courses={ochemCourses} name={"ochem-1"} />
                    </Accordion.Body>
                </Accordion.Item>


                <Accordion.Item eventKey="3">
                    <Accordion.Header>
                        Writing Course
                    </Accordion.Header>
                    <Accordion.Body>
                        <CourseContainer courses={writingCourses} name="writing"/>
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="4">
                    <Accordion.Header>
                        One Statistics Course
                    </Accordion.Header>
                    <Accordion.Body>
                        <CourseContainer courses={statCourses} name="stat"/>
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="5">

                    <Accordion.Header>
                        One Data Analysis Course
                    </Accordion.Header>

                    <Accordion.Body>

                        <CourseContainer courses={dataCourses} name="data"/> 

                    </Accordion.Body>

                </Accordion.Item>

                <Accordion.Item eventKey="6">

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