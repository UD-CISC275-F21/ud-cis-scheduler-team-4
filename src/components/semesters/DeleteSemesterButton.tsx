import { Button } from "react-bootstrap";
import React from "react";
import { SemesterType } from "../../interfaces/semester";

export const DeleteSemesterButton = (props: {
        setSemesters: React.Dispatch<React.SetStateAction<number>>;
        semesters: number;
        setDelete: React.Dispatch<React.SetStateAction<number>>;
    }): JSX.Element => 

    <Button variant="primary" onClick={() => {
        
        let tmpSemesters = props.semesters;
        if (tmpSemesters > 0) {
            --tmpSemesters;
        }
        props.setSemesters(tmpSemesters);
        props.setDelete(0);

    }}>Delete Last Semester</Button>;