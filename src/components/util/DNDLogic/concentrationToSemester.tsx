import { Semester } from "../../../interfaces/semester";
import { ConcentrationContainerType } from "../../../interfaces/concentrationcontainer";
import { Course as CourseType } from "../../../interfaces/course";
import { UpdateSemester } from "./UpdateSemester";

export const concentrationToSemester = (
    concContainer: ConcentrationContainerType,
    spliceInd: number,
    dropInd: number,
    droppingSemester: Semester,
    setSemesters: (semesters: Semester[]) => void,
    semesters: Semester[]
): number => {
    //console.log("in concentration --> semester [STATS], concContainer = ", concContainer, "droppingSemester = ", droppingSemester);
    const theCourse: CourseType = concContainer.courses.splice(spliceInd, 1)[0];
    // DEBUG concContainer.setCourses([...concContainer.courses]); /*  Optional line - may be able to remove  */
    droppingSemester.courses.splice(dropInd, 0, theCourse);
    UpdateSemester(droppingSemester, semesters, setSemesters);
    droppingSemester.courseSetter([...droppingSemester.courses]); /* Optional line - may be able to remove */
    return 1;
};
