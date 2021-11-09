export interface Course{
    name:string,
    section:number,
    prereqs:Course[],
    coreqs:Course[],
    credits:number,
    lab:boolean
}