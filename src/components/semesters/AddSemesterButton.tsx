import { Button } from "react-bootstrap";
import React from "react";

export const AddSemesterButton = (props: { setSemesters: React.Dispatch<React.SetStateAction<number>>, semesters: number}): JSX.Element => 

    <Button variant="primary" onClick={() => {

        let tmpSemesters = props.semesters;
        ++tmpSemesters;
        props.setSemesters(tmpSemesters);

    }}>Add Semester</Button>;