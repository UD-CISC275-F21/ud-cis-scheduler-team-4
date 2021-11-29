import { Semester } from "../../../interfaces/semester";
import { ConcentrationContainerType } from "../../../interfaces/concentrationcontainer";
import { Course as CourseType } from "../../../interfaces/course";

export const concentrationToSemester = (
    concContainer: ConcentrationContainerType,
    spliceInd: number,
    dropInd: number,
    droppingSemester: Semester,
): number => {
    console.log("in concentration --> semester [STATS], concContainer = ", concContainer, "droppingSemester = ", droppingSemester);
    const theCourse: CourseType = concContainer.courses.splice(spliceInd, 1)[0];
    concContainer.setCourses([...concContainer.courses]); /*  Optional line - may be able to remove  */
    droppingSemester.courses.splice(dropInd, 0, theCourse);
    droppingSemester.courseSetter([...droppingSemester.courses]); /* Optional line - may be able to remove */
    return 1;
};
