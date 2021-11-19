import { Accordion } from "react-bootstrap";
import CONCENTRATIONS from "../../../json/concentrations.json";
import { CourseContainer } from "../CourseContainer";
import { ConcentrationContainerType } from "../../../interfaces/concentrationcontainer";
import React, { useState, useEffect } from "react";
import { Course as CourseType } from "../../../interfaces/course";

export const NetworksConc = (props:
        { StringsToCourses: (stringCourses: string[]) => CourseType[];
        setConcentrationContainers: React.Dispatch<React.SetStateAction<ConcentrationContainerType[]>>;
    }): JSX.Element => {
    const [coreCourses,
        setCoreCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[5].core));
    const [capstoneCourses,
        setCapstoneCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[5].capstone));
    const [generalCourses,
        setGeneralCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[5].conc.general));
    const [writingCourses,
        setWritingCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[5].writing));
    const [statCourses,
        setStatCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[5].conc.stats));
    const [labCourses,
        setLabCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[5].lab));
    const [secCourses,
        setSecCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[5].conc.cybersecurity));
    const [systemsCourses,
        setSystemsCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[5].conc.systems));
    const [electiveCourses,
        setElectiveCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[5].conc.elective));

    useEffect(() => {
        props.setConcentrationContainers(

            [
                {
                    courses: coreCourses,
                    name: "core",
                    setCourses: setCoreCourses,
                },
                {
                    courses: capstoneCourses,
                    name: "capstone",
                    setCourses: setCapstoneCourses,

                },
                {
                    courses: generalCourses,
                    name: "general",
                    setCourses: setGeneralCourses,
                },
                {
                    courses: writingCourses,
                    name: "writing",
                    setCourses: setWritingCourses,
                },
                {
                    courses: statCourses,
                    name: "stat",
                    setCourses: setStatCourses,
                },
                {
                    courses: labCourses,
                    name: "lab-1",
                    setCourses: setLabCourses,
                },
                {
                    courses: secCourses,
                    name: "security",
                    setCourses: setSecCourses,
                },
                {
                    courses: systemsCourses,
                    name: "systems",
                    setCourses: setSystemsCourses,
                },
                {
                    courses: electiveCourses,
                    name: "electives",
                    setCourses: setElectiveCourses,
                },

            ],

        );
    }, []);
    return (
        <div>
            <h2>Networks and Systems</h2>

            <Accordion defaultActiveKey="8">

                <Accordion.Item eventKey="0">
                    <Accordion.Header>
                        CISC Core and Concentration
                    </Accordion.Header>
                    <Accordion.Body>
                        <CourseContainer courses={coreCourses} name="core" />
                        <CourseContainer courses={capstoneCourses} name="capstone" />
                        <CourseContainer courses={generalCourses} name="general" />
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                    <Accordion.Header>
                        Two Lab Courses
                    </Accordion.Header>
                    <Accordion.Body>
                        <CourseContainer courses={labCourses} name="lab-1" />
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="2">
                    <Accordion.Header>
                        One Writing
                    </Accordion.Header>
                    <Accordion.Body>
                        <CourseContainer courses={writingCourses} name="writing" />
                    </Accordion.Body>
                </Accordion.Item>


                <Accordion.Item eventKey="3">
                    <Accordion.Header>
                        One Statistics Course
                    </Accordion.Header>
                    <Accordion.Body>
                        <CourseContainer courses={statCourses} name="stat" />
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="4">
                    <Accordion.Header>
                        One Security Math
                    </Accordion.Header>
                    <Accordion.Body>
                        <CourseContainer courses={secCourses} name="security" />
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="5">

                    <Accordion.Header>
                        Two Systems Courses
                    </Accordion.Header>

                    <Accordion.Body>

                        <CourseContainer courses={systemsCourses} name="systems" />

                    </Accordion.Body>

                </Accordion.Item>

                <Accordion.Item eventKey="6">

                    <Accordion.Header>
                        Two Electives
                    </Accordion.Header>

                    <Accordion.Body>
                        <CourseContainer courses={electiveCourses} name="electives" />
                    </Accordion.Body>

                </Accordion.Item>


            </Accordion>
        </div>
    );
};
