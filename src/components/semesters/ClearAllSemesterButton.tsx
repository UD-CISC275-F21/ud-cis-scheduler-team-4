import { Button } from "react-bootstrap";
import React from "react";

export const DeleteSemesterButton = (props: {
        setDeleteAllSemesters: React.Dispatch<React.SetStateAction<number>>;
    }): JSX.Element =>

    <Button
        data-testid="deletesemesterbutton"
        onClick={() => {
            console.log("deleting all semesters");
        }}
        variant="outline-danger"
    >
        Clear All Semesters
    </Button>;

