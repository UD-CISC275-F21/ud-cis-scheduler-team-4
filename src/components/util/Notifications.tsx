import { Modal, Toast } from "react-bootstrap";
import React, { useEffect } from "react";
import { UseDispatchContext } from "../util/DispatchLogic/UseDispatchContext";
import { UseStateContext } from "../util/DispatchLogic/UseStateContext";

export const WelcomeToast = (props: { display: boolean }): JSX.Element =>
    <Modal show={props.display}>
        <Modal.Header>
            <Modal.Title>
                Welcome to the Course App!
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Here you can drag and drop courses into your schedule,
            and also concentrations are available to select from the dropdown as well!
        </Modal.Body>
        <Modal.Footer>
            <small>Created by Kurt, Luke, and Cameron!</small>
        </Modal.Footer>
    </Modal>;


export const PreReqSameSemesterToast = (props: { errMsg: string; display: boolean }): JSX.Element => {
    const { state } = UseStateContext();
    const { dispatch } = UseDispatchContext();
    useEffect(() => {
        if (props.display) {
            setTimeout(() => {
                dispatch({type: "displayToast", payload: { ...state, toastMessage: "", toastDisplay: false }});
            }, 4000);
        }
    },[props.display]);
    return(
        <Toast
            bg="danger"
            onClose={() => {
                dispatch({type: "displayToast", payload: { ...state, toastMessage: "", toastDisplay: false }});
            }}
            show={props.display}
        >
            <Toast.Header>
                <strong className="me-auto">Invalid Course Selected</strong>
                <small>
                    Close
                </small>
            </Toast.Header>
            <Toast.Body>
                {props.errMsg}
            </Toast.Body>
        </Toast>
    );
};
