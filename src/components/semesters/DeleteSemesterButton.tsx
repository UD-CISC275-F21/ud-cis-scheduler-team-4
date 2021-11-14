import { Button } from "react-bootstrap";
import React from "react";

export const DeleteSemesterButton = (props: { setSemesters: React.Dispatch<React.SetStateAction<number>>, semesters: number}): JSX.Element => 

    <Button variant="primary" onClick={() => {

        let tmpSemesters = props.semesters;
        if (tmpSemesters!=0){
            --tmpSemesters;
        }
        props.setSemesters(tmpSemesters);

    }}>Delete Last Semester</Button>;