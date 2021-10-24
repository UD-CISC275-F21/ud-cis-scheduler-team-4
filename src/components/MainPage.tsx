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
import { Concentration } from "../interfaces/concentration";
import CONCENTRATIONS from "../json/concentrations.json";
import { SemesterCountContext } from "../context/SemesterCountContext";
import { SemesterType } from "../interfaces/semester";

export const MainPage = (): JSX.Element => {
    const [concentration, setConcentration] = useState<Concentration>(CONCENTRATIONS[0] as Concentration);
    const [courses, setCourses] = useState<CourseType[]>(COURSES as CourseType[]);
    const [semesterCourses, setSemesterCourses] = useState<SemesterType[]>([]);
    const [display, setDisplay] = useState<boolean>(false);
    const [semesters, setSemesters] = useState<number>(1);

    // maybe make an object like indexes are the semesters so {1: ["CISC101","CISC106"]}

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
            console.log("tripped course -> semester");
            const id = result.destination.droppableId;
            const num = parseInt(id.substring(id.lastIndexOf("-")+1));
            let ind = 0;
            for(let i = 0; i < semesterCourses.length; i++){

                const semester = semesterCourses[i];
                if(semester.semesternum == num){
                    ind = i;
                    break;
                }

            }
            const tmpSemesterCourses = semesterCourses;
            const tmpSemester = tmpSemesterCourses.splice(ind,1)[0];
            const theCourse = courses.splice(result.source.index,1)[0];
            console.log(`tmpSemesterCourses = ${tmpSemesterCourses}`);
            console.log(`tmpSemester = ${tmpSemester}`);
            console.log(`theCourse = ${theCourse}`);
            tmpSemester.courses.push(theCourse);
            tmpSemester.courseSetter(tmpSemester.courses);
            tmpSemesterCourses.splice(ind,0,tmpSemester);
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
            console.log("dropping within semester table");
            if(result.source.droppableId == result.destination.droppableId){
                // same destination
                if(result.source.index == result.destination.index){
                    // do nothing
                } else{

                    const id1 = result.source.droppableId;
                    let ind1 = -1;
                    const num1 = parseInt(id1.substring(id1.lastIndexOf("-")+1));
                    for(let i = 0; i < semesterCourses.length; i++){

                        if(semesterCourses[i].semesternum == num1){
                            ind1 = i;
                            break;
                        }

                    }
                    // found where course is located
                    const tmpSemesterCourses = [...semesterCourses];
                    const theSemester = tmpSemesterCourses.splice(ind1,1)[0];
                    const theSemesterCourses = theSemester.courses;
                    const theCourse = theSemesterCourses.splice(result.source.index,1)[0];
                    theSemesterCourses.splice(result.destination.index,0,theCourse);
                    theSemester.courseSetter(theSemesterCourses);
                    theSemester.courses = theSemesterCourses;
                    tmpSemesterCourses.splice(ind1,0,theSemester);
                    setSemesterCourses(tmpSemesterCourses);
                    //const theCourse = theSemester.splice(result.source.index,1)[0];
                    //theSemester.splice(result.destination.index,0,theCourse);


                    /*
                    const id1 = result.source.droppableId;
                    const id2 = result.destination.droppableId;
                    const num1 = parseInt(id1.substring(id1.lastIndexOf("-")+1));
                    const num2 = parseInt(id2.substring(id2.lastIndexOf("-")+1));
                    let ind1 = -1;
                    let ind2 = -1;
                    for(let i = 0; i < semesterCourses.length; i++){

                        if(ind1 !== -1 && ind2 !== -1){
                            break;
                        } else if(semesterCourses[i].semesternum == num1){
                            ind1 = i;
                        } else if(semesterCourses[i].semesternum == num2){
                            ind2 = i;
                        }

                    }
                    // found indexes of both semesters

                    // TODO: May be able to be reused if moving courses from one different semester table to another

                    */


                }
            }
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
                                <SemesterTable semesters={semesters} semestersCourses={semesterCourses} setSemesterCourses={setSemesterCourses} />
                            </>
                        </Row>
                    </Container>
                </DragDropContext>
            </CourseContext.Provider>
        </>
    );
};
