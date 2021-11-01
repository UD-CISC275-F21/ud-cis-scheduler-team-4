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

        semesterCourses.forEach(e => console.log(Object.entries(e)));

    },[semesterCourses]);

    const onDragEnd = (result: DropResult) => {
        console.log(semesterCourses);
        console.log(result);
        console.log(concentrationContainers);

        if (!result.destination) {
            return;
        }if(result.destination.droppableId.includes("semester-table")){
            
            if(!result.source.droppableId.includes("semester-table")){
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
            } else if(result.source.droppableId === result.destination.droppableId){

                // dropping in same table

                if(result.source.droppableId.includes("semester-table")){
                    
                    console.log("within same semester table");

                    const semesterNum = parseInt(result.source.droppableId.substring(result.source.droppableId.lastIndexOf("-")+1));

                    const tmpSemesters: SemesterType[] = [...semesterCourses];
                    
                    let tmpSemester: SemesterType = tmpSemesters[0];

                    let ind = 0;

                    for(let i = 0; i < tmpSemesters.length; i++){

                        if(tmpSemesters[i].semesternum == semesterNum){
                            // found semester
                            tmpSemester = tmpSemesters.splice(i,1)[0];
                            ind = i;
                            break;
                        }

                    }

                    console.log(Object.entries(tmpSemester));

                    const courses: CourseType[] = [...tmpSemester.courses];
                    console.log("----before any splicing----");
                    courses.forEach(e => console.log(Object.values(e)));
                    const theCourse: CourseType = courses.splice(result.source.index,1)[0]; // gets 108
                    console.log(`---spliced course--- : ${Object.values(theCourse)}`);
                    console.log("----before----");
                    courses.forEach(e => console.log(Object.values(e)));
                    courses.splice(result.destination.index,0,theCourse);
                    console.log("----after----");
                    courses.forEach(e => console.log(Object.values(e)));
                    tmpSemester.courseSetter([...courses]);
                    tmpSemester.courses = [...courses];
                    console.log("----after setting----");
                    tmpSemester.courses.forEach(e => console.log(Object.values(e)));
                    tmpSemesters.splice(ind,0,tmpSemester);
                    console.log("----before setting semesters----");
                    setSemesterCourses(tmpSemesters);

                }



            } else if(result.source.droppableId.includes("semester-table") && result.destination.droppableId.includes("semester-table")){

                // dropping from one semester table to the next

                console.log("semestertable --> semestertable");

                const semesterNum1Id = result.source.droppableId;
                const semesterNum2Id = result.destination.droppableId;

                //console.log(`semesterNum1Id = ${semesterNum1Id}`);
                //console.log(`semesterNum2Id = ${semesterNum2Id}`);

                const semesterNum1 = parseInt(semesterNum1Id.substring(semesterNum1Id.lastIndexOf("-")+1));

                const semesterNum2 = parseInt(semesterNum2Id.substring(semesterNum2Id.lastIndexOf("-")+1));

                // got the numbers of semester1 and semester2

                const tmpSemesters = [...semesterCourses];

                let oneFound = false;
                let twoFound = false;
                let semester1 = tmpSemesters[0];
                let semester2 = tmpSemesters[0];
                //console.log(`semester1# = ${semesterNum1}`);
                //console.log(`semester2# = ${semesterNum2}`);

                let i = 0;

                let ind1 = 0;
                let ind2 = 0;

                for(i = 0; !oneFound || !twoFound ;){

                    const theSemester = tmpSemesters[i];
                    if(theSemester){
                        //console.log(`the semester = ${Object.entries(theSemester)}, onefound = ${oneFound} and twofound = ${twoFound}, semesterstatus = ${theSemester === null || theSemester == undefined}`);
                    } else{
                        //console.log("semester is null");
                    }


                    if(oneFound && twoFound){
                        break;
                    } else if(!oneFound && theSemester.semesternum == semesterNum1){
                        //console.log("splicing first semester");
                        oneFound = true;
                        semester1 = tmpSemesters.splice(i,1)[0];
                        ind1 = i;
                        i = 0;
                        continue;
                    } else if(!twoFound && theSemester.semesternum == semesterNum2){
                        //console.log("splicing second semester");
                        twoFound = true;
                        semester2 = tmpSemesters.splice(i,1)[0];
                        ind2 = i;
                        i = 0;
                        continue;
                    } else{
                        i++;
                    }
                    //console.log("else");
                    //console.log(Object.values(tmpSemesters));

                }

                // got both semesters

                // splice from source

                const semester1Courses: CourseType[] = [...semester1.courses];
                const sourceCourse = semester1Courses.splice(result.source.index,1)[0];
                semester1.courseSetter(semester1Courses);
                semester1.courses = [...semester1Courses];

                const semester2Courses: CourseType[] = [...semester2.courses];
                semester2Courses.splice(result.destination.index,0,sourceCourse);
                semester2.courses = [...semester2Courses];
                semester2.courseSetter([...semester2Courses]);

                tmpSemesters.splice(ind1,0,semester1);
                tmpSemesters.splice(ind2,0,semester2);
                setSemesterCourses(tmpSemesters);

            }
        } else{

            if ( result.source.droppableId.includes("semester-table") && !result.destination.droppableId.includes("semester-table") ) {
                
                const tmpSemesters: SemesterType[] = [...semesterCourses];

                const sourceId: string = result.source.droppableId;
                const semesterNum: number = parseInt(sourceId.substring(sourceId.lastIndexOf("-")));
                let tmpSemester: SemesterType = tmpSemesters[0];
                let ind = -1;

                for(let i = 0; i < tmpSemesters.length; i++){

                    if(tmpSemesters[i].semesternum === semesterNum){
                        // found semester
                        tmpSemester = tmpSemesters.splice(i,1)[0];
                        ind = i;
                        break;
                    }

                }

                const tmpSemesterCourses: CourseType[] = [...tmpSemester.courses];
                const theCourse: CourseType = tmpSemesterCourses.splice(result.source.index,1)[0];

                tmpSemester.courses = [...tmpSemesterCourses];
                tmpSemester.courseSetter([...tmpSemesterCourses]);

                tmpSemesters.splice(ind,0,tmpSemester);

                setSemesterCourses(tmpSemesters);

                // semester updated


                const tmpConcContainers = [...concentrationContainers];

                let tmpConcContainer: ConcentrationContainerType = tmpConcContainers[0];

                let ind2 = -1;

                for(let i = 0; i < tmpConcContainers.length; i++){

                    if(tmpConcContainers[i].name === result.destination.droppableId){
                        // found concentration container
                        tmpConcContainer = tmpConcContainers.splice(i,1)[0];
                        ind2 = i;
                        break;
                    }

                }

                const tmpConcContainerCourses = [...tmpConcContainer.courses];

                tmpConcContainerCourses.splice(result.destination.index,0,theCourse);

                tmpConcContainer.courses = [...tmpConcContainerCourses];
                
                tmpConcContainer.setCourses([...tmpConcContainerCourses]);

                // found concentration container

                tmpConcContainers.splice(ind2,0,tmpConcContainer);

                setConcentrationContainers(tmpConcContainers);




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
