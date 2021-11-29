import { Button } from "react-bootstrap";
import React from "react";

export const AddSemesterButton = (props: {
        setSemesters: React.Dispatch<React.SetStateAction<number>>;
        semesters: number;
    }): JSX.Element =>

    <Button
        data-testid="addsemesterbutton"
        onClick={() => {
            let tmpSemesterNumber = props.semesters;
            tmpSemesterNumber += 1;
            props.setSemesters(tmpSemesterNumber);
        }}
        variant="outline-primary"
    >
        Add Semester
    </Button>;
