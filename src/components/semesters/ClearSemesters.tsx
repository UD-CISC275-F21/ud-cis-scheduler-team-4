import { Button } from "react-bootstrap";
import React from "react";
import { SemesterType } from "../../interfaces/semester";

export const ClearSemesters = (props: {semesters: SemesterType[], setSemesterCourses: React.Dispatch<React.SetStateAction<SemesterType[]>>}): JSX.Element =>{
    return (
        <Button onClick = {()=>{
            const tmpSemesters: SemesterType[] = [...props.semesters];
            // cycle through each semester and clear all the courses right
            for(let i = 0; i < tmpSemesters.length; i++){
                const theSemester: SemesterType = tmpSemesters[i];
                // we have the semester here
                theSemester.courses = [];
                // set courses to empty
                theSemester.courseSetter([]);
            }
            // set semesters
            props.setSemesterCourses([...tmpSemesters]);
        }
        }>
            Clear
        </Button>
    );
};