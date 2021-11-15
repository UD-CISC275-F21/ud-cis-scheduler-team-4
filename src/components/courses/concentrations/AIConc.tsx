import { Accordion } from "react-bootstrap";
import CONCENTRATIONS from "../../../json/concentrations.json";
import { CourseContainer } from "../CourseContainer";
import { ConcentrationContainerType } from "../../../interfaces/concentrationcontainer";
import React, { useState, useEffect } from "react";
import { Course as CourseType } from "../../../interfaces/course";


export const AIConc = (props: {
    StringsToCourses: (stringCourses: string[]) => CourseType[];
    setConcentrationContainers: React.Dispatch<React.SetStateAction<ConcentrationContainerType[]>>;
    }): JSX.Element => {
    const [coreCourses,
        setCoreCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[0].core));
    const [capstone1Courses,
        setCapstone1Courses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[0].capstone));
    const [general1Courses,
        setGeneral1Courses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[0].conc.general));
    const [writingCourses,
        setWritingCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[0].writing));
    const [capstone2Courses,
        setCapstone2Courses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[0].conc.stats));
    const [general2Courses,
        setGeneral2Courses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[0].conc.systems));
    const [electiveCourses,
        setElectiveCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[0].conc.elective));
    const [labCourses,
        setLabCourses] = useState<CourseType[]>(props.StringsToCourses(CONCENTRATIONS[0].lab));

    useEffect(() => {
        props.setConcentrationContainers(

            [
                {
                    courses: coreCourses,
                    name: "core",
                    setCourses: setCoreCourses,
                },
                {
                    courses: capstone1Courses,
                    name: "capstone-1",
                    setCourses: setCapstone1Courses,

                },
                {
                    courses: general1Courses,
                    name: "general-1",
                    setCourses: setGeneral1Courses,
                },
                {
                    courses: writingCourses,
                    name: "writing",
                    setCourses: setWritingCourses,
                },
                {
                    courses: capstone2Courses,
                    name: "capstone-2",
                    setCourses: setCapstone2Courses,
                },
                {
                    courses: general2Courses,
                    name: "general-2",
                    setCourses: setGeneral2Courses,
                },
                {
                    courses: electiveCourses,
                    name: "elective",
                    setCourses: setElectiveCourses,
                },
                {
                    courses: labCourses,
                    name: "lab",
                    setCourses: setLabCourses,
                },

            ],

        );
    }, []);

    return (
        <div>
            <h2>Artificial Intelligence and Robotics</h2>
            <Accordion defaultActiveKey="8">

                <Accordion.Item eventKey="0">
                    <Accordion.Header>CISC Core and Concentration</Accordion.Header>
                    <Accordion.Body>
                        <CourseContainer courses={coreCourses} name="core" />
                        <CourseContainer courses={capstone1Courses} name="capstone-1" />
                        <CourseContainer courses={general1Courses} name="general-1" />
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                    <Accordion.Header>Two-Course Lab Sequence</Accordion.Header>
                    <Accordion.Body>
                        <CourseContainer courses={labCourses} name="lab-1" />
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="2">
                    <Accordion.Header>Writing Course</Accordion.Header>
                    <Accordion.Body>
                        <CourseContainer courses={writingCourses} name="writing" />
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="3">
                    <Accordion.Header>Statistics Course</Accordion.Header>
                    <Accordion.Body>
                        <CourseContainer courses={capstone2Courses} name="capstone-2" />
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="4">
                    <Accordion.Header>Systems Course</Accordion.Header>
                    <Accordion.Body>
                        <CourseContainer courses={general2Courses} name="general-2" />
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="5">
                    <Accordion.Header>Electives(Select Four)</Accordion.Header>
                    <Accordion.Body>
                        <CourseContainer courses={electiveCourses} name="elective" />
                    </Accordion.Body>
                </Accordion.Item>

            </Accordion>
        </div>
    );
};
