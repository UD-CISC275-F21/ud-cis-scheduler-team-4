import "bootstrap/dist/css/bootstrap.min.css";
import { Table, ListGroup } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { Droppable, DroppableProvided } from "react-beautiful-dnd";
import { Course } from "../courses/Course";
import { Col, Button, Row } from "react-bootstrap";
import { Course as CourseType } from "../../interfaces/course";
import { SemesterType } from "../../interfaces/semester";

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

    const func1 = (courses: CourseType[]) => {

        console.log("---calling func1 with---");
        courses.forEach(e => console.log(Object.values(e)));
        setCourses(courses);

    };

    useEffect(() => {

        console.log("rendering semester");
        if(!props.semesterCourses.find(e => e.semesternum == props.ind+1)){
            // not in list
            const semesters: SemesterType[] = [...props.semesterCourses];
            semesters.push({semesternum: props.ind+1, courses: courses, courseSetter: func1});
            props.setSemesterCourses(semesters);
            //console.log(semesters);
        }

    }, []);

    useEffect(() => {

        console.log("setter changed!");

    },[setCourses]);

    useEffect(() => {

        console.log("----courses are now----");
        courses.forEach(e => console.log(Object.values(e)));

    }, [courses]);

    return(
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
    );


};