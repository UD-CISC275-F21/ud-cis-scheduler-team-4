import { Button } from "react-bootstrap";
import React from "react";

export const DeleteSemesterButton = (props: {
        setDelete: React.Dispatch<React.SetStateAction<number>>;
    }): JSX.Element =>

    <Button
        data-testid="deletesemesterbutton"
        onClick={() => {
            props.setDelete(0);
        }}
        variant="outline-danger"
    >
        Delete Semester
    </Button>;

