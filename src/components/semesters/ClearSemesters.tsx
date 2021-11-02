import { Button } from "react-bootstrap";
import React from "react";
import { SemesterType } from "../../interfaces/semester";

export const ClearSemesters = (props:{ setSemesterCourses: React.Dispatch<React.SetStateAction<SemesterType[]>>}): JSX.Element =>{
    return (
        <Button onClick = {()=>{
            props.setSemesterCourses;
        }
        }>
            Clear
        </Button>
    );
};