export interface Course{
    name:string,
    title: string,
    description: string
    section:number
    prereqs:string[],
    coreqs:string[],
    credits:number,
    lab:boolean,
    fromIndex: number,
    fromContainerIndex: number
}