import { Button } from "react-bootstrap";
import React from "react";

export const DeleteSemesterButton = (props: {
        setDelete: () => void;
    }): JSX.Element =>

    <Button
        data-testid="deletesemesterbutton"
        onClick={() => {
            props.setDelete();
        }}
        variant="outline-danger"
    >
        Delete Semester
    </Button>;

