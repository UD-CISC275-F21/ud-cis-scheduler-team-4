import "bootswatch/dist/lux/bootstrap.min.css";
import { Table, ListGroup, Accordion, Col, Button, Row, Badge } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { Droppable, DroppableProvided } from "react-beautiful-dnd";
import { Course } from "../courses/Course";
import { Course as CourseType } from "../../interfaces/course";
import { SemesterType } from "../../interfaces/semester";
import { EditCourse } from "../util/EditCourse";

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

export const Semester = (props: {
    ind: number;
    semesterCourses: SemesterType[];
    setSemesterCourses: React.Dispatch<React.SetStateAction<SemesterType[]>>;
}): JSX.Element => {
    const [courses, setCourses] = useState<CourseType[]>([]);
    const [display, setDisplay] = useState<boolean>(false);
    const [credits, setCredits] = useState<number>(0);

    const courseDeleteFunc = (elem: CourseType): string => {
        const tmpCourses: CourseType[] = [...courses];
        for (let i = 0; i < tmpCourses.length; i += 1) {
            const theCourse: CourseType = tmpCourses[i];
            if (theCourse.name === elem.name) {
                // found course
                tmpCourses.splice(i, 1);
            }
        }
        setCourses([...tmpCourses]);
        const tmpSemesters: SemesterType[] = props.semesterCourses;
        let tmpSemester: SemesterType = tmpSemesters[0];
        for (let i = 0; i < tmpSemesters.length; i += 1) {
            tmpSemester = tmpSemesters[i];
            if (tmpSemester.semesternum === props.ind + 1) {
                // found semester
                tmpSemester = tmpSemesters.splice(i, 1)[0];
                tmpSemester.courses = [...tmpCourses];
                tmpSemester.courseSetter([...tmpCourses]);
                tmpSemesters.splice(i, 0, tmpSemester);
                props.setSemesterCourses([...tmpSemesters]);
                return elem.name;
            }
        }

        return elem.name;
    };

    const semesterDeleteFunc = () => {

        const tmpSemesterCourses = [...props.semesterCourses];

        let theSemester = tmpSemesterCourses[0];

        let ind1 = 0;

        for (let i = 0; i < tmpSemesterCourses.length; i += 1) {

            if (tmpSemesterCourses[i].semesternum === props.ind + 1) {
                // found semester
                ind1 = i;
                theSemester = tmpSemesterCourses.splice(i, 1)[0];
                break;
            }
        }
        theSemester.courses = [];
        theSemester.courseSetter([]);
        tmpSemesterCourses.splice(ind1, 0, theSemester);
        props.setSemesterCourses([...tmpSemesterCourses]);
    };

    useEffect(() => {

        // console.log("rendering semester");
        if (!props.semesterCourses.find(elem => elem.semesternum === props.ind + 1)) {
            // not in list
            const semesters: SemesterType[] = [...props.semesterCourses];
            semesters.push({ courseSetter: (newCourses: CourseType[]) => {
                setCourses(newCourses);
            }, courses, semesternum: props.ind + 1 });
            props.setSemesterCourses(semesters);
        }
    }, []);

    const getCredits = (courses: CourseType[]) => {
        // console.log("inside getCredits");
        // console.log(courses);
        const tmpCourses: CourseType[] = courses;
        let count = 0;
        for (const eachCourse of tmpCourses) {
            count += eachCourse.credits;
        }
        setCredits(count);
    };

    useEffect(() => {
        console.log("----courses are now----");
        console.log(courses);
        // verify that course you are trying to add is not a prereq of course in current semester
        getCredits(courses);

    }, [courses]);

    return (
        <Accordion defaultActiveKey="0" key={`accordion ${props.ind}`} >
            <Accordion.Item eventKey="0">
                <Accordion.Header>
                    <Col xs={2}>
                        {`Semester ${props.ind + 1}`}
                    </Col>
                    <Col>
                        <Button onClick={semesterDeleteFunc} variant="danger" />
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
                                                <ListGroup>
                                                    {
                                                        courses.map((elem: CourseType, index: number) =>
                                                            <ListGroup.Item key={elem.name}>
                                                                <Row>
                                                                    <Col>
                                                                        <Course ind={index} name={`${elem.name}${elem.title.length > 0? "-" + elem.title:""}`} />
                                                                    </Col>
                                                                    <Col lg="1" xs>
                                                                        <Button
                                                                            onClick={() => {
                                                                                courseDeleteFunc(elem);
                                                                            }}
                                                                            variant="danger"
                                                                        />
                                                                        <Button
                                                                            onClick={() => {
                                                                                setDisplay(!display);
                                                                            }} variant="warning"
                                                                        />
                                                                        {display &&
                                                                        <EditCourse
                                                                            course={elem} display={display}
                                                                            semesterCourses={props.semesterCourses}
                                                                            semesterNumber={props.ind + 1}
                                                                            setDisplay={setDisplay}
                                                                            setSemesterCourses={
                                                                                props.setSemesterCourses
                                                                            }
                                                                        />
                                                                        }
                                                                    </Col>
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
