import { Modal } from "react-bootstrap";
import React from "react";

export const WelcomeToast = (props: {display: boolean }): JSX.Element =>
    <>
        <Modal show={props.display}>
            <Modal.Header>
                <Modal.Title>
                    Welcome to the Course Scheduler!
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>Here you can drag and drop courses into your schedule, and also concentrations are available to select from the dropdown as well!</Modal.Body>
            <Modal.Footer>
                <small>Created by Kurt, Luke, and Cameron!</small>
            </Modal.Footer>
        </Modal>
    </>;