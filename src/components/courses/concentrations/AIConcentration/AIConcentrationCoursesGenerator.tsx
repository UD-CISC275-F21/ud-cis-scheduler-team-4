import { Course } from "../../../../interfaces/course";
import { ConcentrationContainerType } from "../../../../interfaces/concentrationcontainer";

export const updateAICourses = (AIConcentrationContainer: ConcentrationContainerType[], courses: Course[], name: string): ConcentrationContainerType[] => {

    const AIConcentrationContainerCoursesLocation = AIConcentrationContainer.findIndex(eachContainer => eachContainer.name === name);
    AIConcentrationContainer[AIConcentrationContainerCoursesLocation].courses = courses;
    return AIConcentrationContainer;

};
