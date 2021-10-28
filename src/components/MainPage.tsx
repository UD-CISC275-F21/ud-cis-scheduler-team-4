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

export const MainPage = (): JSX.Element => {
    const [concentration, setConcentration] = useState<Concentration>(CONCENTRATIONS[0] as Concentration);
    const [semesterCourses, setSemesterCourses] = useState<SemesterType[]>([]);
    const [display, setDisplay] = useState<boolean>(false);
    const [semesters, setSemesters] = useState<number>(1);
    const [concentrationContainers, setConcentrationContainers] = useState<ConcentrationContainerType[]>([]); // is initialized to the first concentration container, contains all of the parts of the concentration, outlined in the comment below
    /*

    {

        "name": "core" <--- what part of the concentration it is
        courses: [] <--- the courses in the part
        setCourses: [] <--- the way to update the courses in the part when we drag into the semester

    }


    */

    // maybe make an object like indexes are the semesters so {1: ["CISC101","CISC106"]}

    useEffect(() => {
        setDisplay(true);
        setTimeout(() => {
            setDisplay(false);
        },1);
    },[]);  

    useEffect(() => {
        console.log("updating concentration containers??");
        console.log(concentrationContainers);
    },[concentrationContainers]);

    const onDragEnd = (result: DropResult) => {
        console.log(semesterCourses);
        console.log(result);
        console.log(concentrationContainers);

        if (!result.destination) {
            return;
        }if(result.destination.droppableId.includes("semester-table")){
            
            const tmpConcentrationContainers = [...concentrationContainers];

            let tmpContainer: ConcentrationContainerType = tmpConcentrationContainers[0];
            let ind1 = -1;
            for(let i = 0; i < concentrationContainers.length; i++){ // finding container , ex: core, capstone

                if(concentrationContainers[i].name === result.source.droppableId){
                    tmpContainer = tmpConcentrationContainers.splice(i,1)[0];
                    ind1 = i;
                    break;
                }

            }

            const tmpConcCourses = tmpContainer.courses;
            const tmpConcCourse = tmpConcCourses.splice(result.source.index,1)[0];
            tmpContainer.setCourses(tmpConcCourses);
            tmpConcentrationContainers.splice(ind1,0,tmpContainer)[0];
            setConcentrationContainers(tmpConcentrationContainers);
            
            // move spliced course to semester table
            // get semester number from id
            const tmpSemesterCourses = [...semesterCourses];
            const semesterDropId = result.destination.droppableId;
            const semesterNumber = parseInt(semesterDropId.substring(semesterDropId.lastIndexOf("-")+1));
            let tmpSemester: SemesterType = [...tmpSemesterCourses][0];
            let ind2 = -1;
            for(let i = 0; i < semesterCourses.length; i++){

                if(semesterCourses[i].semesternum == semesterNumber){
                    tmpSemester = tmpSemesterCourses.splice(i,1)[0];
                    ind2 = i;
                    break;
                }

            }
            
            const tmpSemesterCourses2 = [...tmpSemester.courses]; 
            if(tmpSemesterCourses2.length === 0){
                tmpSemesterCourses2.push(tmpConcCourse);
                tmpSemester.courses = tmpSemesterCourses2;
                tmpSemester.courseSetter(tmpSemesterCourses2);
                tmpSemesterCourses.splice(ind2,0,tmpSemester);
                setSemesterCourses(tmpSemesterCourses);
            } else{

                tmpSemesterCourses2.splice(result.destination.index,0,tmpConcCourse);
                tmpSemester.courses = tmpSemesterCourses2;
                tmpSemester.courseSetter(tmpSemesterCourses2);
                tmpSemesterCourses.splice(ind2,0,tmpSemester);
                setSemesterCourses(tmpSemesterCourses);

            }

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
