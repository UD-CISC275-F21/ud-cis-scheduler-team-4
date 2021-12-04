import { Accordion } from "react-bootstrap";
import CONCENTRATIONS from "../../../json/concentrations.json";
import { CourseContainer } from "../CourseContainer";
import { ConcentrationContainerType } from "../../../interfaces/concentrationcontainer";
import React, { useState, useEffect } from "react";
import { Course as Course } from "../../../interfaces/course";

export const BioConc = (props: { StringsToCourses: (
        stringCourses: string[]) => Course[];
        setConcentrationContainers: (concentrationContainers: ConcentrationContainerType[]) => void;
    }): void => {
    /*
    const [coreCourses,
        setCoreCourses] = useState<Course[]>(props.StringsToCourses(CONCENTRATIONS[1].core));
    const [capstoneCourses,
        setCapstoneCourses] = useState<Course[]>(props.StringsToCourses(CONCENTRATIONS[1].capstone));
    const [generalCourses,
        setGeneralCourses] = useState<Course[]>(props.StringsToCourses(CONCENTRATIONS[1].conc.general));
    const [writingCourses,
        setWritingCourses] = useState<Course[]>(props.StringsToCourses(CONCENTRATIONS[1].writing));
    const [statCourses,
        setStatCourses] = useState<Course[]>(props.StringsToCourses(CONCENTRATIONS[1].conc.stats));
    const [labCourses,
        setLabCourses] = useState<Course[]>(props.StringsToCourses(CONCENTRATIONS[1].lab));
    const [ochemCourses,
        setOchemCourses] = useState<Course[]>(props.StringsToCourses(CONCENTRATIONS[1].conc.ochem));
    const [electiveCourses,
        setElectiveCourses] = useState<Course[]>(props.StringsToCourses(CONCENTRATIONS[1].conc.elective));
    const [dataCourses,
        setDataCourses] = useState<Course[]>(props.StringsToCourses(CONCENTRATIONS[1].conc.data));
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
                    courses: electiveCourses,
                    name: "electives",
                    setCourses: (courses: Course[]) => {
                        setElectiveCourses(courses);
                    },
                },
                {
                    courses: dataCourses,
                    name: "data",
                    setCourses: (courses: Course[]) => {
                        setDataCourses(courses);
                    },
                },
                {
                    courses: ochemCourses,
                    name: "ochem-1",
                    setCourses: (courses: Course[]) => {
                        setOchemCourses(courses);
                    },
                },

            ],

        );
    }, []);

    return (
        <div>
            <h2>Bioinformatics</h2>
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
                        Chem Sequence
                    </Accordion.Header>
                    <Accordion.Body>
                        <CourseContainer courses={labCourses} name="lab-1" />
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="2">
                    <Accordion.Header>
                        One Organic Chem Sequence
                    </Accordion.Header>
                    <Accordion.Body>
                        <CourseContainer courses={ochemCourses} name="ochem-1" />
                    </Accordion.Body>
                </Accordion.Item>


                <Accordion.Item eventKey="3">
                    <Accordion.Header>
                        Writing Course
                    </Accordion.Header>
                    <Accordion.Body>
                        <CourseContainer courses={writingCourses} name="writing" />
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="4">
                    <Accordion.Header>
                        One Statistics Course
                    </Accordion.Header>
                    <Accordion.Body>
                        <CourseContainer courses={statCourses} name="stat" />
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="5">

                    <Accordion.Header>
                        One Data Analysis Course
                    </Accordion.Header>

                    <Accordion.Body>

                        <CourseContainer courses={dataCourses} name="data" />

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
