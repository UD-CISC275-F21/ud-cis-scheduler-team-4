import "bootstrap/dist/css/bootstrap.min.css";
import { ListGroup } from "react-bootstrap";
import { MouseEvent, useState } from "react";
import { Course } from "./Course";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { CourseContext } from "../context/CourseContext";
import React from "react";

export const CourseContainer = (): JSX.Element =>
    <>
        <CourseContext.Consumer>
            {value =>
                <Droppable droppableId="coursecontainer">
                    {(prov) =>
                        <ListGroup {...prov.droppableProps} ref={prov.innerRef}>
                            {value.map((e, i) => <Course name={`${e.name}-${e.section}`} ind={i} key={i} />)}
                            {prov.placeholder}
                        </ListGroup>
                    }
                </Droppable>
            }
        </CourseContext.Consumer>
    </>;
