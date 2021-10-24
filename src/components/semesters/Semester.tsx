import "bootstrap/dist/css/bootstrap.min.css";
import { Table, ListGroup } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, DroppableProvided } from "react-beautiful-dnd";
import { Course } from "../courses/Course";
import { Col } from "react-bootstrap";
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

    useEffect(() => {

        if(!props.semesterCourses.find(e => e.semesternum == props.ind+1)){
            // not in list
            const semesters: SemesterType[] = [...props.semesterCourses];
            semesters.push({semesternum: props.ind+1, courses: courses, courseSetter: setCourses});
            props.setSemesterCourses(semesters);
            console.log(semesters);
        }

    }, []);

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
                                                <ListGroup.Item key={i}>
                                                    <Course name={`${e.name}-${e.section}`} ind={i}/>
                                                </ListGroup.Item>
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