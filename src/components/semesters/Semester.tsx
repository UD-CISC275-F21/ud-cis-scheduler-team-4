import "bootstrap/dist/css/bootstrap.min.css";
import { Table, ListGroup, Accordion, Col, Button, Row, Badge } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { Droppable, DroppableProvided } from "react-beautiful-dnd";
import { Course } from "../courses/Course";
import { Course as CourseType } from "../../interfaces/course";
import { SemesterType } from "../../interfaces/semester";
import { EditCourse } from "../util/EditCourse";

/*

    @param : integer - semester number
    @return : Returns string representing semester

*/

export const getSemesterStr = (semesterNum: number): string => {
    switch (semesterNum % 10) {
    case 1:
        return `${semesterNum}st`;
    case 2:
        return `${semesterNum}nd`;
    case 3:
        return `${semesterNum}rd`;
    default:
        return `${semesterNum}th`;
    }
};

export const Semester = (props: { ind: number, semesterCourses: SemesterType[], setSemesterCourses: React.Dispatch<React.SetStateAction<SemesterType[]>> }): JSX.Element => {
    const [courses, setCourses] = useState<CourseType[]>([]);
    const [display, setDisplay] = useState<boolean>(false);
    const [credits, setCredits] = useState<number>(0);

    const func1 = (courses: CourseType[]) => {
        console.log("---calling func1 with---");
        courses.forEach(e => console.log(Object.values(e)));
        setCourses(courses);
        //getCredits(props.semesterCourses, props.ind);
    };

    useEffect(() => {

        console.log("rendering semester");
        if(!props.semesterCourses.find(e => e.semesternum == props.ind+1)){
            // not in list
            const semesters: SemesterType[] = [...props.semesterCourses];
            semesters.push({semesternum: props.ind+1, courses: courses, courseSetter: func1});
            props.setSemesterCourses(semesters);
        }
    }, []);

    useEffect(() => {

        console.log("----courses are now----");
        courses.forEach(e => console.log(Object.values(e)));
        getCredits(courses);

    }, [courses]);

    const getCredits = (courses: CourseType[]) => {
        console.log("inside getCredits");
        console.log(courses);
        const tmpCourses: CourseType[] = courses;
        console.log(tmpCourses);
        let count=0;
        for(let i=0;i<tmpCourses.length;i++){
            count+=tmpCourses[i].credits;
        }
        console.log("count is: " + count);
        setCredits(count);
    };
    

    return(
        <Accordion key={`accordion ${props.ind}`} defaultActiveKey="0">
            <Accordion.Item eventKey="0">
                <Accordion.Header>
                    <Col xs={2}>
                        {`Semester ${props.ind+1}`}
                    </Col>
                    <Col>
                        <Button variant="danger" onClick={() => {
                        
                            const tmpSemesterCourses = [...props.semesterCourses];

                            let theSemester = tmpSemesterCourses[0];

                            let ind1 = 0;

                            for(let i = 0; i < tmpSemesterCourses.length; i++){

                                if(tmpSemesterCourses[i].semesternum === props.ind+1){
                                    // found semester
                                    ind1 = i;
                                    theSemester = tmpSemesterCourses.splice(i,1)[0];
                                    break;
                                }

                            }

                            theSemester.courses = [];
                            theSemester.courseSetter([]);

                            tmpSemesterCourses.splice(ind1,0,theSemester);

                            props.setSemesterCourses([...tmpSemesterCourses]);
                        }}></Button>
                    </Col>
                    <Col>
                        <Badge>
                            {`Credits: ${credits}`}
                        </Badge>
                    </Col>
                    
                </Accordion.Header>
                <Accordion.Body>
                    <Col key={`semester-table-col-${props.ind}`}>
                        <Droppable droppableId={`semester-table-${props.ind+1}`}>
                            {(prov: DroppableProvided) =>
                                <Table key={`semester-table-table-${props.ind}`}>
                                    <thead>
                                        <tr>
                                            <td>{`${getSemesterStr(props.ind+1)}`}</td>
                                        </tr>
                                    </thead>
                                    <tbody {...prov.droppableProps} ref={prov.innerRef}>
                                        <tr>
                                            <td>
                                                <ListGroup>
                                                    {
                                                        courses.map((e, i) =>
                                                            <>
                                                                <ListGroup.Item key={i}>
                                                                    <Row>
                                                                        <Col>
                                                                            <Course name={`${e.name}-${e.section}`} ind={i}/>
                                                                        </Col>
                                                                        <Col xs lg="1">
                                                                            <Button variant="danger" onClick={() => {
                                                                                const tmpCourses: CourseType[] = [...courses];
                                                                                for(let i = 0; i < tmpCourses.length; i++){
                                                                                    const theCourse: CourseType = tmpCourses[i];
                                                                                    if(theCourse.name === e.name){
                                                                                        // found course
                                                                                        tmpCourses.splice(i,1);
                                                                                    }
                                                                                }
                                                                                setCourses([...tmpCourses]);
                                                                                const tmpSemesters: SemesterType[] = props.semesterCourses;
                                                                                let tmpSemester: SemesterType = tmpSemesters[0];
                                                                                for(let i = 0; i < tmpSemesters.length; i++){
                                                                                    tmpSemester = tmpSemesters[i];
                                                                                    if(tmpSemester.semesternum === props.ind+1){
                                                                                        // found semester
                                                                                        tmpSemester = tmpSemesters.splice(i,1)[0];
                                                                                        tmpSemester.courses = [...tmpCourses];
                                                                                        tmpSemester.courseSetter([...tmpCourses]);
                                                                                        tmpSemesters.splice(i,0,tmpSemester);
                                                                                        props.setSemesterCourses([...tmpSemesters]);
                                                                                        return e.name;
                                                                                    }
                                                                                }

                                                                                return e.name;
                                                                            }}></Button>
                                                                            <Button variant="warning" onClick={()=>{
                                                                                setDisplay(!display);
                                                                            }}>
                                                                            </Button>
                                                                            {display && <EditCourse display={display} setDisplay={setDisplay} course={e} setCourses={setCourses} semesterNumber={props.ind+1} semesterCourses={props.semesterCourses} setSemesterCourses={props.setSemesterCourses} ></EditCourse>}
                                                                        </Col>
                                                                    </Row>
                                                                </ListGroup.Item>
                                                            </>
                                                        )
                                                    }
                                                </ListGroup>
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            }
                        </Droppable>
                    </Col>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );


};