import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Badge } from "react-bootstrap";
import { WelcomeToast } from "./util/Notifications";
import { SemesterTable } from "./semesters/SemesterTable";
import React, { useState, useEffect } from "react";
import {DropdownMenu} from "./util/DropdownMenu";
import { DisplayCourseList } from "./courses/DisplayCourseList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Concentration } from "../interfaces/concentration";
import CONCENTRATIONS from "../json/concentrations.json";
import { SemesterType } from "../interfaces/semester";
import { AddSemesterButton } from "./semesters/AddSemesterButton";
import { ConcentrationContainerType } from "../interfaces/concentrationcontainer";
import { onDragEndLogic } from "./util/DropLogic";

export const MainPage = (): JSX.Element => {
    const [concentration, setConcentration] = useState<Concentration>(CONCENTRATIONS[0] as Concentration);
    const [semesterCourses, setSemesterCourses] = useState<SemesterType[]>([]);
    const [display, setDisplay] = useState<boolean>(false);
    const [semesters, setSemesters] = useState<number>(1);
    const [concentrationContainers, setConcentrationContainers] = useState<ConcentrationContainerType[]>([]); // is initialized to the first concentration container, contains all of the parts of the concentration, outlined in the comment below

    useEffect(() => {
        setDisplay(true);
        setTimeout(() => {
            setDisplay(false);
        },1);
    },[]);

    const onDragEnd = (result: DropResult) => {
        onDragEndLogic(result,concentrationContainers,setConcentrationContainers,semesterCourses,setSemesterCourses);
    };

    return (
        <>
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
                            <DropdownMenu setConcentration={setConcentration} semesterCourses={semesterCourses} setSemesterCourses={setSemesterCourses}></DropdownMenu>
                        </Col>
                        <Col>
                            <h3>Useful Links:</h3>
                            <a href="https://udapps.nss.udel.edu/CoursesSearch/" target="_blank" rel="noopener noreferrer">Courses Search</a> 
                            <div>
                                <a href="https://www.cis.udel.edu/academics/undergraduate-programs/resources/courses/" target="_blank" rel="noopener noreferrer">Course Descriptions</a>
                            </div>
                            <a href="https://webreg.nss.udel.edu/registration/schedule/" target="_blank" rel="noopener noreferrer">Blue Hen Planner</a>
                        </Col>
                        <br />
                        <Col>
                            <AddSemesterButton setSemesters={setSemesters} semesters={semesters} />
                        </Col>
                    </Row>
                    <br />
                    <br />
                    <Row>
                        <Col>
                            <DisplayCourseList concentration={concentration} setConcentrationContainers={setConcentrationContainers} ></DisplayCourseList>
                        </Col>
                        <Col>
                            <SemesterTable semesters={semesters} semestersCourses={semesterCourses} setSemesterCourses={setSemesterCourses}/>
                        </Col>
                    </Row>
                </Container>
            </DragDropContext>
        </>
    );
};
