import { Button } from "react-bootstrap";
import React from "react";

export const AddSemesterButton = (props: {
        setSemesters: React.Dispatch<React.SetStateAction<number>>;
        semesters: number;
    }): JSX.Element =>

    <Button
        onClick={() => {
            let tmpSemesters = props.semesters;
            tmpSemesters += 1;
            props.setSemesters(tmpSemesters);
        }}
        variant="outline-primary"
        data-testid="addsemesterbutton"
    >
        Add Semester
    </Button>;
