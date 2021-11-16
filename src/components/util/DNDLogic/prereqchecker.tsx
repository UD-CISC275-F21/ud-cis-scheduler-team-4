import { Course as CourseType } from "../../../interfaces/course";
import { SemesterType } from "../../../interfaces/semester";

export const PreReqChecker = ( semesters: SemesterType[], placingIndex: number, courseBeingPlaced: CourseType ) => {



};


/*

["x|y", "z|w", "a|b"]

1) Make all the past semesters course titles into one giant string
2) cycle through each regex exp and try matching it to the string, if the exp does not match, that means that the prereq
is not present in the course list, and we append it to an "errors" array, which contains all of the errors 
in our current course setup, and we also set a flag denoting if an error occured, if an error occured, 
we do the step below 
3) We then pass that string back into the error toast

*/