import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Course as CourseType } from "../../interfaces/course";
import { SemesterType } from "../../interfaces/semester";

export const EditCourse = (props: {display: boolean, setDisplay: React.Dispatch<React.SetStateAction<boolean>>, course: CourseType, setCourses: React.Dispatch<React.SetStateAction<CourseType[]>>, semesterNumber: number, semesterCourses: SemesterType[], setSemesterCourses: React.Dispatch<React.SetStateAction<SemesterType[]>> }): JSX.Element => {
    const [nameText, setNameText] = useState(props.course.name);
    return (
        <Modal show={true}>
            <Modal.Header>
                <Modal.Title>
                    HEADER
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <input placeholder="Enter Course Name"type="textbox" value={nameText} 
                    onChange={(e) =>{
                        setNameText(e.target.value);
                    }
                    }/>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => {
                    props.setDisplay(!props.display);
                    const tmpSemesters: SemesterType[] = props.semesterCourses;
                    let tmpSemester: SemesterType = tmpSemesters[0];
                    let ind1 = -1;
                    for(let i = 0; i < tmpSemesters.length; i++){
                        if(tmpSemesters[i].semesternum === props.semesterNumber){
                            // found semester
                            tmpSemester = tmpSemesters.splice(i,1)[0];
                            ind1 = i;
                            break;
                        }
                    }
                    for(let i=0;i<tmpSemester.courses.length;i++){
                        if(tmpSemester.courses[i].name===props.course.name){
                            //found course
                            tmpSemester.courses[i].name = nameText;
                        }
                    }
                    tmpSemesters.splice(ind1,0,tmpSemester);
                    props.setSemesterCourses([...tmpSemesters]);
                }}>END EDIT</Button>
            </Modal.Footer>
        </Modal>
    );
};