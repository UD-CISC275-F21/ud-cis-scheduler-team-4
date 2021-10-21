import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Badge } from "react-bootstrap";
import { WelcomeToast } from "./Notifications";
import { SemesterTable } from "./SemesterTable";
import React, { useState, useEffect } from "react";
import {DropdownMenu} from "./DropdownMenu";
import { DisplayCourseList } from "./DisplayCourseList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { CourseContainer } from "./CourseContainer";
import { CourseContext } from "../context/CourseContext";
import COURSES from "../json/courses.json";
import { Course as CourseType } from "../interfaces/course";
import { SemesterCourseContext } from "../context/SemesterCourseContext";
import { Concentration } from "../interfaces/concentration";
import CONCENTRATIONS from "../json/concentrations.json";

export const MainPage = (): JSX.Element => {
    const [concentration, setConcentration] = useState<Concentration>(CONCENTRATIONS[0] as Concentration);
    const [courses, setCourses] = useState<CourseType[]>(COURSES as CourseType[]);
    const [semesterCourses, setSemesterCourses] = useState<CourseType[]>([]);
    const [display, setDisplay] = useState<boolean>(false);

    useEffect(() => {
        setDisplay(true);
        setTimeout(() => {
            setDisplay(false);
        },5000);
    },[]);

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) {
            return;
        }
        console.log(result);
        const theCourses = courses;
        const theCourse = theCourses.splice(result.source.index, 1)[0];
        if (result.destination.droppableId === "coursecontainer") {
            theCourses.splice(result.destination?.index, 0, theCourse);
            setCourses(theCourses);
        } else if (result.destination.droppableId === "semester-table") {
            const tmpSemesterCourses = [...semesterCourses, theCourse];
            setSemesterCourses(tmpSemesterCourses);
            setCourses(theCourses);
            console.log("running proper func");
        }
    };

    return (
        <>
            <CourseContext.Provider value={courses}>
                <SemesterCourseContext.Provider value={semesterCourses}>
                    <DragDropContext
                        onDragEnd={onDragEnd}
                    >
                        <Container>
                            <br />
                            <Row>
                                <Col>
                                    {display && <WelcomeToast />}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Badge bg="primary"><h1>Course Scheduler</h1></Badge>
                                </Col>
                            </Row>
                            <br />
                            <Row>
                                <Col>
                                    <Row>
                                        <Col>
                                            <DropdownMenu setConcentration={setConcentration}></DropdownMenu>
                                        </Col>
                                    </Row>
                                    <br />
                                    <Row>
                                        <Col>
                                            <DisplayCourseList concentration={concentration}></DisplayCourseList>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <br />
                            <br />
                            <Row>
                                <Col>
                                    <CourseContainer />
                                </Col>
                                <Col>
                                    <SemesterTable />
                                </Col>
                            </Row>
                        </Container>
                    </DragDropContext>
                </SemesterCourseContext.Provider>
            </CourseContext.Provider>
        </>
    );
};
