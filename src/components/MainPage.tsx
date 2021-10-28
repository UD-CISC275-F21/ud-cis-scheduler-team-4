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
import { Course as CourseType } from "../interfaces/course";

export const MainPage = (): JSX.Element => {
    const [concentration, setConcentration] = useState<Concentration>(CONCENTRATIONS[0] as Concentration);
    const [semesterCourses, setSemesterCourses] = useState<SemesterType[]>([]);
    const [display, setDisplay] = useState<boolean>(false);
    const [semesters, setSemesters] = useState<number>(1);
    const [concentrationContainers, setConcentrationContainers] = useState<ConcentrationContainerType[]>([]);
    /*

    {

        "name": core
        courses: []
        setCourses: []

    }


    */

    // maybe make an object like indexes are the semesters so {1: ["CISC101","CISC106"]}

    useEffect(() => {
        setDisplay(true);
        setTimeout(() => {
            setDisplay(false);
        },1);
    },[]);  

    const onDragEnd = (result: DropResult) => {
        console.log(semesterCourses);
        console.log(result);
        console.log(concentrationContainers);

        if (!result.destination) {
            return;
        }if(result.destination.droppableId.includes("semester-table")){
            const resDest = result.destination.droppableId;
            const semesterNumber = parseInt(resDest.substring(resDest.lastIndexOf("-")+1));
            let theSemester: SemesterType = semesterCourses[0];
            let ind2 = 0;
            const tmpSemesterCourses = semesterCourses;
            for(let i = 0; i < semesterCourses.length; i++){

                if(tmpSemesterCourses[i].semesternum == semesterNumber){
                    // found semester
                    ind2 = i;
                    theSemester = tmpSemesterCourses.splice(i,1)[0];
                    break;
                }

            }
            const foundSemesterCourses = theSemester.courses;
            // got courses from semester found
            // now we have the semester
            const tmpContainers = concentrationContainers;
            let container: ConcentrationContainerType = concentrationContainers[0];
            let ind = 0;
            for(let i = 0; i < concentrationContainers.length; i++){

                if(concentrationContainers[i].name == result.source.droppableId){

                    ind = i;
                    container = tmpContainers.splice(ind,1)[0];
                    break;

                }

            }

            // got container
            const theCourses: CourseType[] = container.courses;
            // removed course from concentration container
            const theCourse: CourseType = theCourses.splice(result.source.index,1)[0];
            // add course to semester table
            if(theSemester.courses.length == 0){
                theSemester.courses.push(theCourse);
            } else{
                theSemester.courses.splice(result.destination.index,0,theCourse);
            }
            // added course to semester table
            // set concentration containers courses
            container.setCourses(theCourses);
            // add container back into tmpContainers
            tmpContainers.splice(ind,0,container);
            // set concentration containers
            setConcentrationContainers(tmpContainers);
            // set semester course
            tmpSemesterCourses.splice(ind2,0,theSemester);
            setSemesterCourses(tmpSemesterCourses);

            
        }
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
                            <Row>
                                <Col>
                                    <DropdownMenu setConcentration={setConcentration}></DropdownMenu>
                                </Col>
                            </Row>
                            <br />
                            <Row>
                                <Col>
                                    <AddSemesterButton setSemesters={setSemesters} semesters={semesters} />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <br />
                    <br />
                    <Row>
                        <Col>
                            <DisplayCourseList concentration={concentration} concentrationContainers={concentrationContainers} setConcentrationContainers={setConcentrationContainers} ></DisplayCourseList>
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
