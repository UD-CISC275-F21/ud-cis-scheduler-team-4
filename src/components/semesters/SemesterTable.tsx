import "bootstrap/dist/css/bootstrap.min.css";
import { Table, ListGroup } from "react-bootstrap";
import React, { useState } from "react";
import { Droppable, DroppableProvided } from "react-beautiful-dnd";
import { Course } from "../courses/Course";
import { Col } from "react-bootstrap";
import { Course as CourseType } from "../../interfaces/course";

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

/*

    @param - props - object that contains a key of id(number)
    @return JSX.Element

*/

export const SemesterTable = (props: { semesters: number }): JSX.Element => {
    const [courses, setCourses] = useState<CourseType[]>([]);

    return(
        <>
            {
                new Array(props.semesters).fill(0).map((elem, ind) =>
                    <Col key={`semester-table-col-${ind}`}>
                        <Droppable droppableId={`semester-table-${ind+1}`}>
                            {(prov: DroppableProvided) =>
                                <Table key={`semester-table-table-${ind}`}>
                                    <thead>
                                        <tr>
                                            {`${getSemesterStr(ind+1)}`}
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
                )
            }
        </>
    );
};
