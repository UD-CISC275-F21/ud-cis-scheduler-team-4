import React, { useState } from "react";
import { Modal, Button, Badge, Row, Col } from "react-bootstrap";
import { Course as CourseType } from "../../interfaces/course";
import { Semester } from "../../interfaces/semester";
import { UseDispatchContext } from "./DispatchLogic/UseDispatchContext";
import { UseStateContext } from "./DispatchLogic/UseStateContext";

export const EditCourse = (props: {
    display: boolean;
    setDisplay: React.Dispatch<React.SetStateAction<boolean>>;
    course: CourseType;
    semesterNumber: number;
}): JSX.Element => {
    const [nameText, setNameText] = useState(props.course.name);
    const [titleText, setTitleText] = useState(props.course.title);
    const [descText, setDescText] = useState(props.course.description);
    const { state } = UseStateContext();
    const { dispatch } = UseDispatchContext();

    const closeDisplay = (): void => {
        props.setDisplay(false);
    };
    const courseEdit = () => {
        const theSemester: Semester = state.semesterCourses[props.semesterNumber];
        const courseIndex: number = theSemester.courses.findIndex(elem => elem.name === props.course.name);
        dispatch({type: "updateCourse", payload: { ...state, sourceIndex: courseIndex, sourceContainerIndex: props.semesterNumber,  toastMessage: `${descText}_${nameText}_${titleText}`}});
        props.setDisplay(false);
    };
    return (
        <Modal
            onHide={() => {
                closeDisplay();
            }}
            show={props.display}
        >
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
                <Row>
                    <Col>
                        Enter Title here:
                    </Col>
                    <Col>
                        <input
                            onChange={elem => {
                                setTitleText(elem.target.value);
                            }}
                            placeholder="Enter Course Title"
                            type="textbox"
                            value={titleText}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        Enter description here:
                    </Col>
                    <Col>
                        <form>
                            <textarea
                                cols={45}
                                onChange={elem => {
                                    setDescText(elem.target.value);
                                }}
                                placeholder="Enter Course Description"
                                rows={10}
                                value={descText}
                            />
                        </form>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer style={{ display: "block", textAlign: "center" }}>
                <Button onClick={courseEdit} variant="outline-primary" >Submit Changes</Button>
            </Modal.Footer>
        </Modal>
    );
};
