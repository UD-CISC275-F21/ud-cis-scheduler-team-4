import "bootswatch/dist/lux/bootstrap.min.css";
import { Table, ListGroup, Accordion, Col, Row, Badge } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { Droppable, DroppableProvided } from "react-beautiful-dnd";
import { Course } from "../courses/Course";
import { Course as CourseType } from "../../interfaces/course";
import { Semester as SemesterType } from "../../interfaces/semester";
import { EditCoursePanel } from "../courses/EditCoursePanel";
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

export const getCourses = (semesterCourses: SemesterType[], index: number): CourseType[] => {

    const result = semesterCourses[index];
    if (result === undefined) {
        //console.log(">>>> undefined ");
        return [];
    } else {
        const result2 = semesterCourses[index].courses.length > 0;
        if ( result2 ) {
            //console.log(">>>> valid courses >>>>> ", semesterCourses[index].courses);
            return semesterCourses[index].courses;
        } else {
            //console.log(">>>> invalid courses ");
            return [];
        }
    }

    //const [courses, setCourses] = useState<CourseType[]>(
    //    props.semesterCourses[props.ind] !== undefined ? 
    //    (props.semesterCourses[props.ind].courses.length > 0 ? props.semesterCourses[props.ind].courses : [])
    //    : []);

};

export const Semester = (props: {
    ind: number;
    semesterCourse: SemesterType;
}): JSX.Element => {
    const [courses, setCourses] = useState<CourseType[]>(
        props.semesterCourse !== undefined ? props.semesterCourse.courses : []);
    const [credits, setCredits] = useState<number>(0);
    useEffect(() => {
        return() => {
            //console.log("unmounting");
            setCourses([]);
        };
    }, []);

    const getCredits = (courses: CourseType[]) => {
        const tmpCourses: CourseType[] = courses;
        let count = 0;
        for (const eachCourse of tmpCourses) {
            count += eachCourse.credits;
        }
        setCredits(count);
    };

    useEffect(() => {
        //console.log("courses changed -- ", props.semesterCourse);
        if (props.semesterCourse !== undefined) {
            //console.log("courses changed [in if]-- ", props.semesterCourse);
            setCourses(props.semesterCourse.courses);
            getCredits(props.semesterCourse.courses);
            //console.log(courses);
        }
    }, [props.semesterCourse]);

    return (
        <Accordion data-testid="semesteraccordian" defaultActiveKey="0" key={`accordion ${props.ind}`} >
            <Accordion.Item eventKey="0">
                <Accordion.Header>
                    <Col xs={2}>
                        {`Semester ${props.ind + 1}`}
                    </Col>
                    <Col>
                        <Badge>
                            {`Credits: ${credits}`}
                        </Badge>
                    </Col>
                </Accordion.Header>
                <Accordion.Body>
                    <Col key={`semester-table-col-${props.ind}`}>
                        <Droppable droppableId={`semester-table-${props.ind + 1}`}>
                            {(prov: DroppableProvided) =>
                                <Table key={`semester-table-table-${props.ind}`}>
                                    <thead>
                                        <tr>
                                            <td>{`${getSemesterStr(props.ind + 1)}`}</td>
                                        </tr>
                                    </thead>
                                    <tbody {...prov.droppableProps} ref={prov.innerRef}>
                                        <tr>
                                            <td>
                                                <ListGroup data-testid="semestertable">
                                                    {
                                                        courses.map((elem: CourseType, index: number) =>
                                                            <ListGroup.Item key={elem.name}>
                                                                <Row>
                                                                    <Col>
                                                                        <Course
                                                                            credits={elem.credits}
                                                                            description={elem.description}
                                                                            ind={index}
                                                                            name={`${elem.name}${elem.title.length > 0 ? `-${elem.title}` : ""}`}
                                                                            title={elem.title}
                                                                        />
                                                                    </Col>
                                                                    <EditCoursePanel 
                                                                        elem={elem}
                                                                        ind={props.ind}
                                                                    />
                                                                </Row>
                                                            </ListGroup.Item>,
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
