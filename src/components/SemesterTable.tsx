import "bootstrap/dist/css/bootstrap.min.css";
import { Table, ListGroup } from "react-bootstrap";
import React from "react";
import { Droppable, DroppableProvided } from "react-beautiful-dnd";
import { SemesterCourseContext } from "../context/SemesterCourseContext";
import { Course } from "./Course";

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

export const SemesterTable = (): JSX.Element =>
    <SemesterCourseContext.Consumer>
        {value =>
            <Droppable droppableId="semester-table">
                {(prov: DroppableProvided) =>

                    <Table >
                        <thead>
                            <tr>
                                {new Array(1).fill(0).map((e, i) => <th key={i}>{`${getSemesterStr(i + 1)} semester`}</th>)}
                            </tr>
                        </thead>
                        <tbody {...prov.droppableProps} ref={prov.innerRef}>
                            <tr>
                                <td>
                                    <ListGroup>
                                        {
                                            value.map((e, i) =>
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
        }
    </SemesterCourseContext.Consumer>;
