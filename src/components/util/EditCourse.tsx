import React, { useState } from "react";
import { Modal, Button, Badge, Row, Col } from "react-bootstrap";
import { Course as CourseType } from "../../interfaces/course";
import { SemesterType } from "../../interfaces/semester";

export const EditCourse = (props: {
    display: boolean;
    setDisplay: React.Dispatch<React.SetStateAction<boolean>>;
    course: CourseType;
    semesterNumber: number;
    semesterCourses: SemesterType[];
    setSemesterCourses: React.Dispatch<React.SetStateAction<SemesterType[]>>;
}): JSX.Element => {
    const [nameText, setNameText] = useState(props.course.name);
    const setDisplay = (): boolean => {
        props.setDisplay(false);
        return props.display;
    };
    const courseEdit = () => {
        props.setDisplay(!props.display);
        const tmpSemesters: SemesterType[] = props.semesterCourses;
        let tmpSemester: SemesterType = tmpSemesters[0];
        let ind1 = -1;
        for (let i = 0; i < tmpSemesters.length; i += 1) {
            if (tmpSemesters[i].semesternum === props.semesterNumber) {
                // found semester
                tmpSemester = tmpSemesters.splice(i, 1)[0];
                ind1 = i;
                break;
            }
        }
        for (const eachcourse of tmpSemester.courses) {
            if (eachcourse.name === props.course.name) {
                eachcourse.name = nameText;
            }
        }
        tmpSemesters.splice(ind1, 0, tmpSemester);
        props.setSemesterCourses([...tmpSemesters]);
    };
    return (
        <Modal onHide={() => setDisplay()} show={props.display} >
            <Modal.Header closeButton>
                <Modal.Title>
                    <Badge bg="primary">Edit Course Details</Badge>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col>
                        Enter name here:
                    </Col>
                    <Col>
                        <input
                            onChange={elem => {
                                setNameText(elem.target.value);
                            }}
                            placeholder="Enter Course Name"
                            type="textbox"
                            value={nameText}
                        />
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer style={{ display: "block", textAlign: "center" }}>
                <Button onClick={courseEdit} variant="outline-primary" >Submit Changes</Button>
            </Modal.Footer>
        </Modal>
    );
};
