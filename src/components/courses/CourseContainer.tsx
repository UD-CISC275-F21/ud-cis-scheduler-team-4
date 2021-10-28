import "bootstrap/dist/css/bootstrap.min.css";
import { ListGroup } from "react-bootstrap";
import { Course } from "./Course";
import { Droppable } from "react-beautiful-dnd";
import React, { useState, useEffect } from "react";
import { Course as CourseType } from "../../interfaces/course";
import { ConcentrationContainerType } from "../../interfaces/concentrationcontainer";


export const CourseContainer = (props: { courses: CourseType[], name: string, concentrationContainers: ConcentrationContainerType[], setConcentrationContainers: React.Dispatch<React.SetStateAction<ConcentrationContainerType[]>> }): JSX.Element => {
    const [containerCourses, setContainerCourses] = useState<CourseType[]>(props.courses);
    useEffect(() => {

        console.log(`initializing ${props.name}`);
        const tmpConContainers = props.concentrationContainers;
        tmpConContainers.push({name: props.name, courses: containerCourses, setCourses: setContainerCourses});

    },[]);
    useEffect(() => {
        console.log("triggered");
    },containerCourses);
    return(
        <>
            <Droppable droppableId={props.name}>
                {(prov) =>
                    <ListGroup {...prov.droppableProps} ref={prov.innerRef}>
                        {props.courses.map((e, i) => <Course name={`${e.name}-${e.section}`} ind={i} key={i} />)}
                        {prov.placeholder}
                    </ListGroup>
                }
            </Droppable>
        </>
    );
};
