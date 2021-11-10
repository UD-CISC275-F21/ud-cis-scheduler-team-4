import React from "react";
import { DropResult } from "react-beautiful-dnd";
import { SemesterType } from "../../interfaces/semester";
import { ConcentrationContainerType } from "../../interfaces/concentrationcontainer";
import { Course as CourseType } from "../../interfaces/course";

export const onDragEndLogic = (result: DropResult, 
    concentrationContainers: ConcentrationContainerType[], 
    setConcentrationContainers: React.Dispatch<React.SetStateAction<ConcentrationContainerType[]>>,
    semesterCourses: SemesterType[],
    setSemesterCourses: React.Dispatch<React.SetStateAction<SemesterType[]>>,
    displayToast: (msg: string) => void ): void => {


    if (!result.destination) {
        return;
    }
    
    /*

    If where you are dropping TO is a semester

    */

    if(result.destination.droppableId.includes("semester-table")){
        
        /*

         If where you are dropping FROM is not a semester, then go into this if

         Case: Concentration Courses ---> Semester

        */

        if(!result.source.droppableId.includes("semester-table")){

            console.log("from conc container");

            const tmpConcentrationContainers = [...concentrationContainers];


            const chkTmpSemesterCourses = [...semesterCourses];
            const chkSemesterDropId = result.destination.droppableId;
            const chkSemesterNumber = parseInt(chkSemesterDropId.substring(chkSemesterDropId.lastIndexOf("-")+1));
            let chkTmpSemester: SemesterType = [...chkTmpSemesterCourses][0];
            for(let i = 0; i < semesterCourses.length; i++){

                if(semesterCourses[i].semesternum == chkSemesterNumber){
                    chkTmpSemester = chkTmpSemesterCourses[i];
                    break;
                }

            }

            let chkTmpContainer: ConcentrationContainerType = tmpConcentrationContainers[0];
            for(let i = 0; i < concentrationContainers.length; i++){ // finding container , ex: core, capstone

                if(concentrationContainers[i].name === result.source.droppableId){
                    chkTmpContainer = tmpConcentrationContainers[i];
                    break;
                }

            }

            const chkTmpConcCourses = chkTmpContainer.courses;
            const chkTmpConcCourse = chkTmpConcCourses[result.source.index];

            const insertingCourseName = chkTmpConcCourse.name;

            // got course

            
            const chkTmpSemesterCourses2 = [...chkTmpSemester.courses];

            const chkTmp2CourseNames = chkTmpSemesterCourses2.map(e => e.name);
            const chkTmp2CoursePreReqs = chkTmpSemesterCourses2.map(e => e.prereqs).flat(2);

            console.log(`chk2tmpcoursenames = ${chkTmp2CourseNames}`);
            console.log(`chktmp2CoursePrereqs = ${chkTmp2CoursePreReqs}`);

            const preReqs = chkTmpSemesterCourses2.filter(e => e.prereqs.includes(insertingCourseName)).map(e => e.name); // prereqs if you are inserting a lower level course that's a prereq to a higher level course in the semester
            const revPreReqs = chkTmp2CourseNames.filter(e => chkTmpConcCourse.prereqs.includes(e)); // prereqs if you are inserting a high level course that's a prereq for a lower level course in the semester

            console.log("PREREQS is : " + Object.values(preReqs));

            if(preReqs.length > 0){
                // ERROR -- PRE-REQUISITE ERROR
                const errorMsg = `You are trying to insert course ${insertingCourseName} when the course${preReqs.length > 1? "s": ""} ${preReqs.join(",")} has the course ${insertingCourseName} listed as a pre-requisite`;
                displayToast(errorMsg);
                return;
            } else if(revPreReqs.length > 0){
                const errorMsg = `You are trying to insert course ${insertingCourseName} when the course${preReqs.length > 1? "s": ""} ${preReqs.join(",")} has ${revPreReqs.join("")} listed as a pre-requisite`;
                displayToast(errorMsg);
                return;
            }

            



            let tmpContainer: ConcentrationContainerType = tmpConcentrationContainers[0];
            let ind1 = -1;
            for(let i = 0; i < concentrationContainers.length; i++){ // finding container , ex: core, capstone

                if(concentrationContainers[i].name === result.source.droppableId){
                    tmpContainer = tmpConcentrationContainers.splice(i,1)[0];
                    ind1 = i;
                    break;
                }

            }

            const tmpConcCourses = tmpContainer.courses;
            const tmpConcCourse = tmpConcCourses.splice(result.source.index,1)[0];
            tmpContainer.setCourses(tmpConcCourses);
            tmpConcentrationContainers.splice(ind1,0,tmpContainer)[0];
            setConcentrationContainers(tmpConcentrationContainers);
            
            // move spliced course to semester table
            // get semester number from id
            const tmpSemesterCourses = [...semesterCourses];
            const semesterDropId = result.destination.droppableId;
            const semesterNumber = parseInt(semesterDropId.substring(semesterDropId.lastIndexOf("-")+1));
            let tmpSemester: SemesterType = [...tmpSemesterCourses][0];
            let ind2 = -1;
            for(let i = 0; i < semesterCourses.length; i++){

                if(semesterCourses[i].semesternum == semesterNumber){
                    tmpSemester = tmpSemesterCourses.splice(i,1)[0];
                    ind2 = i;
                    break;
                }

            }
            
            const tmpSemesterCourses2 = [...tmpSemester.courses]; 
            if(tmpSemesterCourses2.length === 0){
                tmpSemesterCourses2.push(tmpConcCourse);
                tmpSemester.courses = tmpSemesterCourses2;
                tmpSemester.courseSetter(tmpSemesterCourses2);
                tmpSemesterCourses.splice(ind2,0,tmpSemester);
                setSemesterCourses(tmpSemesterCourses);
            } else{

                tmpSemesterCourses2.splice(result.destination.index,0,tmpConcCourse);
                tmpSemester.courses = tmpSemesterCourses2;
                tmpSemester.courseSetter(tmpSemesterCourses2);
                tmpSemesterCourses.splice(ind2,0,tmpSemester);
                setSemesterCourses(tmpSemesterCourses);

            }
        } else if(result.source.droppableId === result.destination.droppableId){

            // dropping in same table
            console.log("dropping in same table");

            if(result.source.droppableId.includes("semester-table")){
                
                console.log("within same semester table");

                const semesterNum = parseInt(result.source.droppableId.substring(result.source.droppableId.lastIndexOf("-")+1));

                const tmpSemesters: SemesterType[] = [...semesterCourses];
                
                let tmpSemester: SemesterType = tmpSemesters[0];

                let ind = 0;

                for(let i = 0; i < tmpSemesters.length; i++){

                    if(tmpSemesters[i].semesternum == semesterNum){
                        // found semester
                        tmpSemester = tmpSemesters.splice(i,1)[0];
                        ind = i;
                        break;
                    }

                }

                console.log(Object.entries(tmpSemester));

                const courses: CourseType[] = [...tmpSemester.courses];
                console.log("----before any splicing----");
                courses.forEach(e => console.log(Object.values(e)));
                const theCourse: CourseType = courses.splice(result.source.index,1)[0]; // gets 108
                console.log(`---spliced course--- : ${Object.values(theCourse)}`);
                console.log("----before----");
                courses.forEach(e => console.log(Object.values(e)));
                courses.splice(result.destination.index,0,theCourse);
                console.log("----after----");
                courses.forEach(e => console.log(Object.values(e)));
                tmpSemester.courseSetter([...courses]);
                tmpSemester.courses = [...courses];
                console.log("----after setting----");
                tmpSemester.courses.forEach(e => console.log(Object.values(e)));
                tmpSemesters.splice(ind,0,tmpSemester);
                console.log("----before setting semesters----");
                setSemesterCourses(tmpSemesters);

            }



        } else if(result.source.droppableId.includes("semester-table") && result.destination.droppableId.includes("semester-table")){

            // dropping from one semester table to the next

            console.log("semestertable --> semestertable");

            const semesterNum1Id = result.source.droppableId;
            const semesterNum2Id = result.destination.droppableId;

            //console.log(`semesterNum1Id = ${semesterNum1Id}`);
            //console.log(`semesterNum2Id = ${semesterNum2Id}`);

            const semesterNum1 = parseInt(semesterNum1Id.substring(semesterNum1Id.lastIndexOf("-")+1));

            const semesterNum2 = parseInt(semesterNum2Id.substring(semesterNum2Id.lastIndexOf("-")+1));

            // got the numbers of semester1 and semester2

            const tmpSemesters = [...semesterCourses];

            let oneFound = false;
            let twoFound = false;
            let semester1 = tmpSemesters[0];
            let semester2 = tmpSemesters[0];
            //console.log(`semester1# = ${semesterNum1}`);
            //console.log(`semester2# = ${semesterNum2}`);

            let i = 0;

            let ind1 = 0;
            let ind2 = 0;

            for(i = 0; !oneFound || !twoFound ;){

                const theSemester = tmpSemesters[i];
                if(theSemester){
                    //console.log(`the semester = ${Object.entries(theSemester)}, onefound = ${oneFound} and twofound = ${twoFound}, semesterstatus = ${theSemester === null || theSemester == undefined}`);
                } else{
                    //console.log("semester is null");
                }


                if(oneFound && twoFound){
                    break;
                } else if(!oneFound && theSemester.semesternum == semesterNum1){
                    //console.log("splicing first semester");
                    oneFound = true;
                    semester1 = tmpSemesters.splice(i,1)[0];
                    ind1 = i;
                    i = 0;
                    continue;
                } else if(!twoFound && theSemester.semesternum == semesterNum2){
                    //console.log("splicing second semester");
                    twoFound = true;
                    semester2 = tmpSemesters.splice(i,1)[0];
                    ind2 = i;
                    i = 0;
                    continue;
                } else{
                    i++;
                }
                //console.log("else");
                //console.log(Object.values(tmpSemesters));

            }

            // got both semesters

            // splice from source

            const semester1Courses: CourseType[] = [...semester1.courses];
            const sourceCourse = semester1Courses.splice(result.source.index,1)[0];
            semester1.courseSetter(semester1Courses);
            semester1.courses = [...semester1Courses];

            const semester2Courses: CourseType[] = [...semester2.courses];
            semester2Courses.splice(result.destination.index,0,sourceCourse);
            semester2.courses = [...semester2Courses];
            semester2.courseSetter([...semester2Courses]);

            tmpSemesters.splice(ind1,0,semester1);
            tmpSemesters.splice(ind2,0,semester2);
            setSemesterCourses(tmpSemesters);

        }
    } else{

        if ( result.source.droppableId.includes("semester-table") && !result.destination.droppableId.includes("semester-table") ) {
            
            const tmpSemesters: SemesterType[] = [...semesterCourses];

            const sourceId: string = result.source.droppableId;
            const semesterNum: number = parseInt(sourceId.substring(sourceId.lastIndexOf("-")));
            let tmpSemester: SemesterType = tmpSemesters[0];
            let ind = -1;

            for(let i = 0; i < tmpSemesters.length; i++){

                if(tmpSemesters[i].semesternum === semesterNum){
                    // found semester
                    tmpSemester = tmpSemesters.splice(i,1)[0];
                    ind = i;
                    break;
                }

            }

            const tmpSemesterCourses: CourseType[] = [...tmpSemester.courses];
            const theCourse: CourseType = tmpSemesterCourses.splice(result.source.index,1)[0];

            tmpSemester.courses = [...tmpSemesterCourses];
            tmpSemester.courseSetter([...tmpSemesterCourses]);

            tmpSemesters.splice(ind,0,tmpSemester);

            setSemesterCourses(tmpSemesters);

            // semester updated


            const tmpConcContainers = [...concentrationContainers];

            let tmpConcContainer: ConcentrationContainerType = tmpConcContainers[0];

            let ind2 = -1;

            for(let i = 0; i < tmpConcContainers.length; i++){

                if(tmpConcContainers[i].name === result.destination.droppableId){
                    // found concentration container
                    tmpConcContainer = tmpConcContainers.splice(i,1)[0];
                    ind2 = i;
                    break;
                }

            }

            const tmpConcContainerCourses = [...tmpConcContainer.courses];

            tmpConcContainerCourses.splice(result.destination.index,0,theCourse);

            tmpConcContainer.courses = [...tmpConcContainerCourses];
            
            tmpConcContainer.setCourses([...tmpConcContainerCourses]);

            // found concentration container

            tmpConcContainers.splice(ind2,0,tmpConcContainer);

            setConcentrationContainers(tmpConcContainers);




        } else if(result.source.droppableId !== result.destination.droppableId && !result.source.droppableId.includes("semester-table") && !result.destination.droppableId.includes("semester-table")){
            // dropping from core --> language for instance
            const tmpConcentrationContainers: ConcentrationContainerType[] = [...concentrationContainers];

            let tmpConcContainer1: ConcentrationContainerType = tmpConcentrationContainers[0];

            let tmpConcContainer2: ConcentrationContainerType = tmpConcentrationContainers[0];

            let ind1 = -1;

            let ind2 = -1;

            for(let i = 0; i < tmpConcentrationContainers.length; i++){

                if(ind1 !== -1 && ind2 !== -1){
                    break;
                } else if(tmpConcentrationContainers[i].name == result.source.droppableId){
                    tmpConcContainer1 = tmpConcentrationContainers[i];
                    ind1 = i;
                    continue;
                } else if(tmpConcentrationContainers[i].name == result.destination.droppableId){
                    tmpConcContainer2 = tmpConcentrationContainers[i];
                    ind2 = i;
                    continue;
                }

            }

            const tmpConc1Courses: CourseType[] = [...tmpConcContainer1.courses];

            const tmpConc2Courses: CourseType[] = [...tmpConcContainer2.courses];

            const tmpConc1Course: CourseType = tmpConc1Courses.splice(result.source.index,1)[0];

            tmpConcContainer1.courses = [...tmpConc1Courses];

            tmpConcContainer1.setCourses([...tmpConc1Courses]);

            tmpConc2Courses.splice(result.destination.index,0,tmpConc1Course);

            tmpConcContainer2.courses = [...tmpConc2Courses];

            tmpConcContainer2.setCourses([...tmpConc2Courses]);

            tmpConcentrationContainers.splice(ind1,0,tmpConcContainer1);

            tmpConcentrationContainers.splice(ind2,0,tmpConcContainer2);

            setConcentrationContainers([...tmpConcentrationContainers]);

        } else {

            console.log("container --> container");

            const tmpConcentrationContainers: ConcentrationContainerType[] = [...concentrationContainers];

            let tmpConcContainer: ConcentrationContainerType = tmpConcentrationContainers[0];

            let ind1 = -1;
            
            for(let i = 0; i < tmpConcentrationContainers.length; i++){

                if(tmpConcentrationContainers[i].name == result.destination.droppableId){
                    // found container
                    tmpConcContainer = tmpConcentrationContainers.splice(i,1)[0];
                    ind1 = i;
                    break;
                }

            }

            const tmpConcCourses: CourseType[] = [...tmpConcContainer.courses];

            const tmpConcCourse: CourseType = tmpConcCourses.splice(result.source.index,1)[0];

            // spliced course, now place course

            tmpConcCourses.splice(result.destination.index,0,tmpConcCourse);

            tmpConcContainer.courses = tmpConcCourses;

            tmpConcContainer.setCourses([...tmpConcCourses]);

            tmpConcentrationContainers.splice(ind1,0,tmpConcContainer);

            setConcentrationContainers(tmpConcentrationContainers);

        }

    }
};