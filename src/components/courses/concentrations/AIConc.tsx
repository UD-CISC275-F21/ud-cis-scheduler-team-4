import { Accordion } from "react-bootstrap";
import CONCENTRATIONS from "../../../json/concentrations.json";
import { CourseContainer } from "../CourseContainer";
import { ConcentrationContainerType } from "../../../interfaces/concentrationcontainer";
import React, { useState, useEffect } from "react";
import { Course } from "../../../interfaces/course";


export const AIConc = (props: {
    StringsToCourses: (stringCourses: string[]) => Course[];
    setConcentrationContainers: React.Dispatch<React.SetStateAction<ConcentrationContainerType[]>>;
    }): JSX.Element => {
    const [coreCourses,
        setCoreCourses] = useState<Course[]>(props.StringsToCourses(CONCENTRATIONS[0].core));
    const [capstone1Courses,
        setCapstone1Courses] = useState<Course[]>(props.StringsToCourses(CONCENTRATIONS[0].capstone));
    const [general1Courses,
        setGeneral1Courses] = useState<Course[]>(props.StringsToCourses(CONCENTRATIONS[0].conc.general));
    const [writingCourses,
        setWritingCourses] = useState<Course[]>(props.StringsToCourses(CONCENTRATIONS[0].writing));
    const [capstone2Courses,
        setCapstone2Courses] = useState<Course[]>(props.StringsToCourses(CONCENTRATIONS[0].conc.stats));
    const [general2Courses,
        setGeneral2Courses] = useState<Course[]>(props.StringsToCourses(CONCENTRATIONS[0].conc.systems));
    const [electiveCourses,
        setElectiveCourses] = useState<Course[]>(props.StringsToCourses(CONCENTRATIONS[0].conc.elective));
    const [labCourses,
        setLabCourses] = useState<Course[]>(props.StringsToCourses(CONCENTRATIONS[0].lab));

    useEffect(() => {
        props.setConcentrationContainers(

            [
                {
                    courses: coreCourses,
                    name: "core",
                    setCourses: (courses: Course[]) => {
                        setCoreCourses(courses);
                    },
                },
                {
                    courses: capstone1Courses,
                    name: "capstone-1",
                    setCourses: (courses: Course[]) => {
                        setCapstone1Courses(courses);
                    },

                },
                {
                    courses: general1Courses,
                    name: "general-1",
                    setCourses: (courses: Course[]) => {
                        setGeneral1Courses(courses);
                    },
                },
                {
                    courses: writingCourses,
                    name: "writing",
                    setCourses: (courses: Course[]) => {
                        setWritingCourses(courses);
                    },
                },
                {
                    courses: capstone2Courses,
                    name: "capstone-2",
                    setCourses: (courses: Course[]) => {
                        setCapstone2Courses(courses);
                    },
                },
                {
                    courses: general2Courses,
                    name: "general-2",
                    setCourses: (courses: Course[]) => {
                        setGeneral2Courses(courses);
                    },
                },
                {
                    courses: electiveCourses,
                    name: "elective",
                    setCourses: (courses: Course[]) => {
                        setElectiveCourses(courses);
                    },
                },
                {
                    courses: labCourses,
                    name: "lab-1",
                    setCourses: (courses: Course[]) => {
                        setLabCourses(courses);
                    },
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
