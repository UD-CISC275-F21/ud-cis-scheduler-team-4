import { SemesterType } from "../../../interfaces/semester";
import { ConcentrationContainerType } from "../../../interfaces/concentrationcontainer";
import { Course as CourseType } from "../../../interfaces/course";

export const concentrationToSemester = (
    concContainer: ConcentrationContainerType,
    spliceInd: number,
    dropInd: number,
    droppingSemester: SemesterType,
): number => {
    console.log("in concentration --> semester");
    const theCourse: CourseType = concContainer.courses.splice(spliceInd, 1)[0];
    concContainer.setCourses([...concContainer.courses]); /*  Optional line - may be able to remove  */
    droppingSemester.courses.splice(dropInd, 0, theCourse);
    droppingSemester.courseSetter([...droppingSemester.courses]); /* Optional line - may be able to remove */
    return 1;
};
