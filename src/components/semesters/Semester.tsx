import "bootswatch/dist/lux/bootstrap.min.css";
import { Table, ListGroup, Accordion, Col, Row, Badge } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { Droppable, DroppableProvided } from "react-beautiful-dnd";
import { Course } from "../courses/Course";
import { Course as CourseType } from "../../interfaces/course";
import { Semester as SemesterType } from "../../interfaces/semester";
import { EditCoursePanel } from "../courses/EditCoursePanel";
import { updateSemesterContainer } from "./SemesterHelperFunctions/UpdateSemesterContainers";

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
    semesterCourses: SemesterType[];
    setSemesterCourses: React.Dispatch<React.SetStateAction<SemesterType[]>>;
}): JSX.Element => {
    const result = getCourses(props.semesterCourses,props.ind);
    //// BUG: HERE IS WHERE THE BUG IS, FOR SOME REASON THE FIRST SET OF COURSES ARE NOT
    // BEING SENT IN TO SETCOURSES AND CAUSING THE COURSES STATE TO UPDATE 
    // , BUT ALL OTHER SEMESTER COURSES ARE UPDATING THE STATE, VERY ODD BUG
    const [courses, setCourses] = useState<CourseType[]>(
        [...result]);
    const [credits, setCredits] = useState<number>(0);
    let tmpSemesters: SemesterType[] = props.semesterCourses;
    useEffect(() => {
        //console.log("THE INDEX = ", props.ind);
        if (!props.semesterCourses.find(eachSemester => eachSemester.semesternum === (props.ind+1))) {
            //console.log("IN INDEX IF");
            const semesters: SemesterType[] = [...props.semesterCourses];
            semesters.push({ courseSetter: (newCourses: CourseType[]) => {
                setCourses(newCourses);
            }, courses, semesternum: props.ind + 1 });
            props.setSemesterCourses(semesters);
            //console.log("semesters = ", semesters);
            tmpSemesters = semesters;
        }
        //console.log("RENDERING SEMESTER'S FIRST USEEFFECT", semesters);
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
        //console.log("UPDATING COURSES ", props.semesterCourses, " and ind = ", props.ind-1);
        // if [0] and ind = 1
        //console.log(tmpSemesters);
        if (props.semesterCourses.length !== 0) {
            //console.log("IN UPDATING COURSES IF");
            // BUG HAPPENING HERE, WE ARE PASSING IT AN EMPTY ARRAY OF COURSES WHEN SEMESTERCOURSES HAS COURSES IN IT
            props.setSemesterCourses(updateSemesterContainer(tmpSemesters, props.ind, courses));
        }
        getCredits(courses);
    }, [courses]);

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
                                                                        semesterCourses={props.semesterCourses}
                                                                        setSemesterCourses={props.setSemesterCourses}
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
