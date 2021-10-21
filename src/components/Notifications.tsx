import { Toast, ToastContainer } from "react-bootstrap";
import React from "react";

export const WelcomeToast = (): JSX.Element =>
    <ToastContainer position={"top-start"}>
        <Toast>
            <Toast.Header>
                <strong>Welcome to the class scheduler!</strong>
                <small>Created by Kurt, Luke, and Cameron</small>
            </Toast.Header>
            <Toast.Body>Here you can drag and drop courses into your schedule, and also concentrations are available to select from the dropdown as well!</Toast.Body>
        </Toast>
    </ToastContainer>;
