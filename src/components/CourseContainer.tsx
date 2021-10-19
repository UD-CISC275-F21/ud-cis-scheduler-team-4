import "bootstrap/dist/css/bootstrap.min.css";
import { ListGroup } from "react-bootstrap";
import React, { MouseEvent, useState } from "react";
import { Course } from "./Course";
import { Droppable, Draggable, DroppableProvided } from "react-beautiful-dnd";
import { CourseContext } from "../context/CourseContext";
import { Course as CourseType } from "../interfaces/course";

export const CourseContainer = (props: { deleteFunc: (arg: string) => void}): JSX.Element =>
    <>
        <CourseContext.Consumer>
            {value =>
                <Droppable droppableId="coursecontainer">
                    {(prov: DroppableProvided) =>
                        <ListGroup {...prov.droppableProps} ref={prov.innerRef}>
                            {value.map((e: CourseType, i: number) => <Course name={`${e.name}-${e.section}`} ind={i} deleteFunc={props.deleteFunc} key={i} />)}
                            {prov.placeholder}
                        </ListGroup>
                    }
                </Droppable>
            }
        </CourseContext.Consumer>
    </>;