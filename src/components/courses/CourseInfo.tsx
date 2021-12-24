import React from "react";
import { Badge, Modal } from "react-bootstrap";

export const CourseInfo = (
    props:
    {display: boolean;
    setDisplay: React.Dispatch<React.SetStateAction<boolean>>;
    name: string;
    description: string;
    credits: number;
}): JSX.Element => {
    const courseName = props.name.split("-")[0];
    const courseTitle = props.name.split("-")[1];
    return (
        <Modal
            onHide={() => {
                props.setDisplay(false);
            }}
            show={props.display}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    <h1>{`${courseName}`}</h1>
                    <h5>{`${courseTitle}`}</h5>
                    <Badge>Credits: {`${props.credits}`}</Badge>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {`${props.description}`}
            </Modal.Body>
        </Modal>
    );
};
