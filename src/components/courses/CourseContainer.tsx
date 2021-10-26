import "bootstrap/dist/css/bootstrap.min.css";
import { ListGroup } from "react-bootstrap";
import { Course } from "./Course";
import { Droppable } from "react-beautiful-dnd";
import { CourseContext } from "../../context/CourseContext";
import React from "react";
import { Course as CourseType } from "../../interfaces/course";


export const CourseContainer = (props: { courses: CourseType[] }): JSX.Element =>
    <>
        <Droppable droppableId="coursecontainer">
            {(prov) =>
                <ListGroup {...prov.droppableProps} ref={prov.innerRef}>
                    {props.courses.map((e, i) => <Course name={`${e.name}-${e.section}`} ind={i} key={i} />)}
                    {prov.placeholder}
                </ListGroup>
            }
        </Droppable>
    </>;
