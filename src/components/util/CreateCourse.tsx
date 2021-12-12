import { Button, ListGroup, Modal, ButtonToolbar, ButtonGroup, Form } from "react-bootstrap";
import React, { useState } from "react";
import { UseStateContext } from "./DispatchLogic/UseStateContext";
import { UseDispatchContext } from "./DispatchLogic/UseDispatchContext";
import Multiselect from "multiselect-react-dropdown";
import { PreReqChecker } from "./DNDLogicV2/prereqchecker";
import CourseNames from "../../assets/courseData/CourseNames";

export const CreateCourse = () => {

    const [show, setShow] = useState<boolean>(false);
    const [courseName, setCourseName] = useState<string>("");
    const [courseDescription, setCourseDescription] = useState<string>("");
    const [courseCredits, setCourseCredits] = useState<number>(0);
    const [courseTitle, setCourseTitle] = useState<string>("");
    const [selectedPreReqs, setSelectedPreReqs] = useState<string[]>([]);
    const [selectedCoReqs, setSelectedCoReqs] = useState<string[]>([]);

    const { state } = UseStateContext();
    const { dispatch } = UseDispatchContext();
    const numberOfSemesters = state.currentSaveData.semesters.length;
    console.log("numberofsemesters = ", numberOfSemesters);

    return(

        <>
        
            <Button variant="primary" onClick={() => setShow(true)}>
                Create Course
            </Button>

            <Modal show={show} onHide={() => setShow(false)}>

                <Modal.Header closeButton>
                    <Modal.Title>Create Course Menu</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="basicCourseName">
                            <Form.Control type="text" placeholder="e.g. CISC181" onChange={(e) => setCourseName(e.target.value)}/>
                            <Form.Text>Course Name</Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="basicCourseDescription">
                            <Form.Control type="text" placeholder="e.g. Introduction to Computer Science 2" onChange={(e) => setCourseDescription(e.target.value)} />
                            <Form.Text>Course Description</Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="basicCourseCreditSelector">
                            <Form.Control as="select" aria-label="basicCourseCreditSelector" value={courseCredits} onChange={(e) => setCourseCredits(parseInt(e.target.value,10))}>
                                <option value={0} key={0}>
                                    0
                                </option>
                                <option value={1} key={1}>
                                    1
                                </option>
                                <option value={2} key={2}>
                                    2
                                </option>
                                <option value={3} key={3}>
                                    3
                                </option>
                                <option value={4} key={4}>
                                    4
                                </option>
                            </Form.Control>
                            <Form.Text>
                                Credits
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="basicPreReqSelector">
                            <Form.Label>Pre Reqs</Form.Label>
                            <Multiselect 
                                options={CourseNames.map((eachCourseName) => ({name : eachCourseName}))}
                                selectedValues={selectedPreReqs}
                                onSelect={setSelectedPreReqs}
                                onRemove={setSelectedPreReqs}
                                displayValue="name"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="basicCoReqSelector">
                            <Form.Label>Co Reqs</Form.Label>
                            <Multiselect
                                options={CourseNames.map((eachCourseName) => ({name : eachCourseName}))}
                                selectedValues={selectedCoReqs}
                                onSelect={setSelectedCoReqs}
                                onRemove={setSelectedCoReqs}
                                displayValue="name"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <ButtonToolbar>
                        {
                            new Array(numberOfSemesters).fill(0).map((eachElement, index) =>
                                <ButtonGroup  key={index} className="me-2" aria-label="create course modal button group">
                                    <Button
                                        data-testid="createcoursebutton"
                                        key={index}
                                        variant="outline-primary"
                                        onClick={()=>{
                                            console.log("values = ", selectedPreReqs);
                                            dispatch({type: "createCourse", payload: { ...state, destContainerIndex: index, newCourse: {
                                                name: courseName,
                                                description: courseDescription,
                                                credits: courseCredits,
                                                title: courseTitle,
                                                prereqs: selectedPreReqs,
                                                coreqs: selectedCoReqs,
                                                section: 10,
                                                lab: courseCredits > 3,
                                                fromIndex: 0,
                                                fromContainerIndex: 0
                                            }}});
                                        }}
                                    >
                                        {`Semester ${index+1}`}
                                    </Button>
                                </ButtonGroup>
                            )
                        }
                    </ButtonToolbar>
                </Modal.Footer>
            </Modal>
        </>
    );
};
