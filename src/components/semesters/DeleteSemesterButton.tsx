import { Button } from "react-bootstrap";
import React from "react";

export const DeleteSemesterButton = (props: {
        setSemesters: React.Dispatch<React.SetStateAction<number>>;
        semesters: number;
        setDelete: React.Dispatch<React.SetStateAction<number>>;
    }): JSX.Element =>

    <Button
        onClick={() => {
            let tmpSemesters = props.semesters;
            if (tmpSemesters > 0) {
                tmpSemesters -= 1;
            }
            props.setSemesters(tmpSemesters);
            props.setDelete(0);
        }}
        variant="outline-danger"
        data-testid="deletesemesterbutton"
    >
        Delete Semester
    </Button>;
