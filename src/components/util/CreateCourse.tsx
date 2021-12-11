import { Button, ListGroup, Modal, ButtonToolbar, ButtonGroup } from "react-bootstrap";
import React, { useState } from "react";
import { UseStateContext } from "./DispatchLogic/UseStateContext";
import { UseDispatchContext } from "./DispatchLogic/UseDispatchContext";
import { PreReqChecker } from "./DNDLogicV2/prereqchecker";

export const CreateCourse = () => {

    const [show, setShow] = useState<boolean>(false);

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
                    This is the body of the modal
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
                                            console.log("clicked on listgroup item");
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
