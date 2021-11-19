import { Button } from "react-bootstrap";
import React from "react";
import { SemesterType } from "../../interfaces/semester";

export const DeleteSemesterButton = (props: {
        setSemesters: React.Dispatch<React.SetStateAction<number>>;
        semesters: number;
        setDelete: React.Dispatch<React.SetStateAction<number>>;
        semesterCourses: SemesterType[];
    }): JSX.Element => 

    <Button variant="outline-danger" data-testid="deletesemesterbutton" onClick={() => {
        
        let tmpSemesters = props.semesters;
        if (tmpSemesters > 0 && props.semesterCourses[tmpSemesters-1].courses.length==0) {
            --tmpSemesters;
        } else {
            window.alert("Please drag all courses out of the last semester before deleting.");
        }
        props.setSemesters(tmpSemesters);
        props.setDelete(0);

    }}>Delete Semester</Button>;
