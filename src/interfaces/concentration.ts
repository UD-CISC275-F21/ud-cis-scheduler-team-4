export interface Concentration{
    name:string,
    core:string[],
    capstone:string[],
    lab:string[],
    writing: string[],
    conc:{      /* Represents concentration-specific courses (general courses, stat courses, systems courses) */
        general:string[],
        stats:string[],
        systems:string[],
        elective:string[],
        ochem:string[],
        data:string[],
        cybersecurity:string[],
        track:string[]
    }
}
