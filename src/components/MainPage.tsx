import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Badge } from "react-bootstrap";
import { WelcomeToast } from "./util/Notifications";
import { SemesterTable } from "./semesters/SemesterTable";
import { AddSemesterButton } from "./semesters/AddSemesterButton";
import React, { useState, useEffect } from "react";
import {DropdownMenu} from "./util/DropdownMenu";
import { DisplayCourseList } from "./courses/DisplayCourseList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { CourseContainer } from "./courses/CourseContainer";
import { CourseContext } from "../context/CourseContext";
import COURSES from "../json/courses.json";
import { Course as CourseType } from "../interfaces/course";
import { SemesterCourseContext } from "../context/SemesterCourseContext";
import { Concentration } from "../interfaces/concentration";
import CONCENTRATIONS from "../json/concentrations.json";
import { SemesterCountContext } from "../context/SemesterCountContext";

export const MainPage = (): JSX.Element => {
    const [concentration, setConcentration] = useState<Concentration>(CONCENTRATIONS[0] as Concentration);
    const [courses, setCourses] = useState<CourseType[]>(COURSES as CourseType[]);
    const [semesterCourses, setSemesterCourses] = useState<CourseType[]>([]);
    const [display, setDisplay] = useState<boolean>(false);
    const [semesters, setSemesters] = useState<number>(1);

    useEffect(() => {
        setDisplay(true);
        setTimeout(() => {
            setDisplay(false);
        },1);
    },[]);  

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) {
            return;
        }
        console.log(result);
        if(result.source.droppableId == "coursecontainer" && result.destination?.droppableId.includes("semester-table")){
            // dragging course from course container to semester table
            const theCourses = courses;
            const theCourse = theCourses.splice(result.source.index, 1)[0];
            setCourses(theCourses);
            const tmpSemesterCourses = semesterCourses;
            tmpSemesterCourses.splice(result.destination?.index,0,theCourse);
            setSemesterCourses(tmpSemesterCourses);

        } else if(result.source.droppableId == "coursecontainer" && result.destination?.droppableId == "coursecontainer"){

            // dropping within same container
            if(result.source.index == result.destination?.index){
                // do nothing
            } else {
                const tmpCourses = courses;
                const theCourse = courses.splice(result.source.index,1)[0];
                tmpCourses.splice(result.destination?.index,0,theCourse);
                setCourses(tmpCourses);
            }

        } else if(result.source.droppableId.includes("semester-table") && result.destination?.droppableId.includes("semester-table")){
            // dropping within same semester-table
            if(result.source.index == result.destination.index){
                // do nothing
            } else{
                // edit order
                const tmpSemesterCourses = semesterCourses;
                // take course out of old spot
                const theCourse = tmpSemesterCourses.splice(result.source.index,1)[0];
                // place course in new spot
                tmpSemesterCourses.splice(result.destination?.index,0,theCourse);
                setSemesterCourses(tmpSemesterCourses);
            }
        }
    };

    return (
        <>
            <CourseContext.Provider value={courses}>
                <SemesterCourseContext.Provider value={semesterCourses}>
                    <SemesterCountContext.Provider value={semesters} />
                    <DragDropContext
                        onDragEnd={onDragEnd}
                    >
                        <Container>
                            <br />
                            <Row>
                                <Col>
                                    {<WelcomeToast display={display}/>}
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
                                        <Col>
                                            <AddSemesterButton setSemesters={setSemesters} semesters={semesters} />
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
                                <>
                                    {

                                        new Array(semesters).fill(0).map((e,i) => <SemesterTable id={i} key={i} />)

                                    }
                                </>
                            </Row>
                        </Container>
                    </DragDropContext>
                </SemesterCourseContext.Provider>
            </CourseContext.Provider>
        </>
    );
};
