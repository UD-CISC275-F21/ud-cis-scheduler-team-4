import { Accordion } from "react-bootstrap";
import CONCENTRATIONS from "../../../json/concentrations.json";
import { CourseContainer } from "../CourseContainer";
import { ConcentrationContainerType } from "../../../interfaces/concentrationcontainer";
import React, { useState, useEffect } from "react";
import { Course as Course } from "../../../interfaces/course";

export const NetworksConc = (props:
        { StringsToCourses: (stringCourses: string[]) => Course[];
        setConcentrationContainers: (concentrationContainers: ConcentrationContainerType[]) => void;
    }): void => {
    /*
    const [coreCourses,
        setCoreCourses] = useState<Course[]>(props.StringsToCourses(CONCENTRATIONS[5].core));
    const [capstoneCourses,
        setCapstoneCourses] = useState<Course[]>(props.StringsToCourses(CONCENTRATIONS[5].capstone));
    const [generalCourses,
        setGeneralCourses] = useState<Course[]>(props.StringsToCourses(CONCENTRATIONS[5].conc.general));
    const [writingCourses,
        setWritingCourses] = useState<Course[]>(props.StringsToCourses(CONCENTRATIONS[5].writing));
    const [statCourses,
        setStatCourses] = useState<Course[]>(props.StringsToCourses(CONCENTRATIONS[5].conc.stats));
    const [labCourses,
        setLabCourses] = useState<Course[]>(props.StringsToCourses(CONCENTRATIONS[5].lab));
    const [secCourses,
        setSecCourses] = useState<Course[]>(props.StringsToCourses(CONCENTRATIONS[5].conc.cybersecurity));
    const [systemsCourses,
        setSystemsCourses] = useState<Course[]>(props.StringsToCourses(CONCENTRATIONS[5].conc.systems));
    const [electiveCourses,
        setElectiveCourses] = useState<Course[]>(props.StringsToCourses(CONCENTRATIONS[5].conc.elective));

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
                    courses: capstoneCourses,
                    name: "capstone",
                    setCourses: (courses: Course[]) => {
                        setCapstoneCourses(courses);
                    },

                },
                {
                    courses: generalCourses,
                    name: "general",
                    setCourses: (courses: Course[]) => {
                        setGeneralCourses(courses);
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
                    courses: statCourses,
                    name: "stat",
                    setCourses: (courses: Course[]) => {
                        setStatCourses(courses);
                    },
                },
                {
                    courses: labCourses,
                    name: "lab-1",
                    setCourses: (courses: Course[]) => {
                        setLabCourses(courses);
                    },
                },
                {
                    courses: secCourses,
                    name: "security",
                    setCourses: (courses: Course[]) => {
                        setSecCourses(courses);
                    },
                },
                {
                    courses: systemsCourses,
                    name: "systems",
                    setCourses: (courses: Course[]) => {
                        setSystemsCourses(courses);
                    },
                },
                {
                    courses: electiveCourses,
                    name: "electives",
                    setCourses: (courses: Course[]) => {
                        setElectiveCourses(courses);
                    },
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
    */
};
