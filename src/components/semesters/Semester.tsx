import "bootstrap/dist/css/bootstrap.min.css";
import { Table, ListGroup } from "react-bootstrap";
import React, { useState } from "react";
import { Droppable, DroppableProvided } from "react-beautiful-dnd";
import { Course } from "../courses/Course";
import { Col } from "react-bootstrap";
import { Course as CourseType } from "../../interfaces/course";


export const Semester = (props: { ind: number }) => {
    const [courses, setCourses] = useState<Course[]>([]);
    
    return(

        <Col key={`semester-table-col-${props.ind}`}>
            <Droppable droppableId={`semester-table-${props.ind+1}`}>
                {(prov: DroppableProvided) =>
                    <Table key={`semester-table-table-${props.ind}`}>
                        <thead>
                            <tr>
                                {`${getSemesterStr(props.ind+1)}`}
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