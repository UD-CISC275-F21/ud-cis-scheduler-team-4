import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { DropResult } from "react-beautiful-dnd";
import { Course as CourseType } from "../../interfaces/course";
import { SemesterType } from "../../interfaces/semester";


export const onDragEnd = (result: DropResult, courses: CourseType[], semesterCourses: SemesterType[], semesters: number, setSemesterCourses: React.Dispatch<React.SetStateAction<SemesterType[]>>, setCourses: React.Dispatch<React.SetStateAction<CourseType[]>> ): void => {
    if (!result.destination) {
        return;
    }
    console.log(result);
    if(result.source.droppableId == "coursecontainer" && result.destination?.droppableId.includes("semester-table")){
        // dragging course from course container to semester table
        console.log("tripped course -> semester");
        const id = result.destination.droppableId;
        const num = parseInt(id.substring(id.lastIndexOf("-")+1));
        let ind = 0;
        for(let i = 0; i < semesterCourses.length; i++){

            const semester = semesterCourses[i];
            console.log(`semester = ${Object.values(semester)}`);
            if(semester.semesternum == num){
                ind = i;
                break;
            }

        }
        const tmpSemesterCourses = semesterCourses;
        const tmpSemester = tmpSemesterCourses.splice(ind,1)[0];
        const theCourse = courses.splice(result.source.index,1)[0];

        console.log(`tmpSemesterCourses = ${tmpSemesterCourses}`);
        console.log(`tmpSemester = ${tmpSemester}`);
        console.log(`theCourse = ${theCourse}`);

        tmpSemester.courses.push(theCourse);
        tmpSemester.courseSetter(tmpSemester.courses);
        tmpSemesterCourses.splice(ind,0,tmpSemester);
        setSemesterCourses(tmpSemesterCourses);
        
    } else if(result.source.droppableId == "coursecontainer" && result.destination?.droppableId == "coursecontainer"){

        // dropping within same container
        if(result.source.index == result.destination?.index){
            // do nothing
        } else {
            const tmpCourses = courses;
            const theCourse = courses.splice(result.source.index,1)[0];
            tmpCourses.splice(result.destination?.index,0,theCourse);
            setCourses(tmpCourses);
        }

    } else if(result.source.droppableId.includes("semester-table") && result.destination?.droppableId.includes("semester-table")){
        // dropping within same semester-table
        console.log("dropping within semester table");
        // issue occurs here when we move semesters around in the same table and then try introducing another course, method fails
        if(result.source.droppableId == result.destination.droppableId){ // dropping in exact same container
            console.log("Dropping in same exact container");
            console.log(`Semester courses = ${Object.values(semesterCourses)}`);
            // same destination
            if(result.source.index == result.destination.index){
                // do nothing
            } else{

                const id1 = result.source.droppableId;
                let ind1 = -1;
                const num1 = parseInt(id1.substring(id1.lastIndexOf("-")+1));
                for(let i = 0; i < semesterCourses.length; i++){

                    if(semesterCourses[i].semesternum == num1){
                        ind1 = i;
                        break;
                    }

                }
                // found where semester is located
                const tmpSemesterCourses = [...semesterCourses];
                const theSemester = tmpSemesterCourses.splice(ind1,1)[0];
                const theSemesterCourses = theSemester.courses;
                const theCourse = theSemesterCourses.splice(result.source.index,1)[0];
                theSemesterCourses.splice(result.destination.index,0,theCourse);
                theSemester.courseSetter(theSemesterCourses);
                theSemester.courses = theSemesterCourses;
                tmpSemesterCourses.splice(ind1,0,theSemester);
                setSemesterCourses(tmpSemesterCourses);

            }
        }
        if(result.source.index == result.destination.index){
            // do nothing
        } else{
            // edit order
            const tmpSemesterCourses = semesterCourses;
            // take course out of old spot
            const theCourse = tmpSemesterCourses.splice(result.source.index,1)[0];
            // place course in new spot
            tmpSemesterCourses.splice(result.destination?.index,0,theCourse);
            setSemesterCourses(tmpSemesterCourses);
        }
    }
};