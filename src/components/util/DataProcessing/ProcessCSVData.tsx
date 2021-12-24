

/*

Takes : string array of each row of the csv an element in the array
Returns: string array of each row within the array a semester and the rows of that row are the classes

Example:

    [["CISC108","CISC181","CISC210"],["ENGL111","MATH241"]]

*/
export const ProcessCSVData = (data: string[]): string[][] | undefined => {

    if (data.length === 1) {
        // only has headers
        return undefined;
    }

    const semesters: string[][] = [];
    let eachSemester: string[] = [];
    let currSemester = data[1].split(",")[0];
    for (const eachRow of data.slice(1)) {

        const values = eachRow.split(",");
        const semester = values[0];
        if (semester !== currSemester) {
            currSemester = semester;
            semesters.push(eachSemester);
            eachSemester = [values[1]];
        } else {
            eachSemester.push(values[1]);
        }

    }
    return semesters;

};