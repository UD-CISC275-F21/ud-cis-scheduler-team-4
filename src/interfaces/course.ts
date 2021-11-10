export interface Course{
    name:string,
    section:number
    prereqs:string[],
    coreqs:string[],
    credits:number,
    lab:boolean
}