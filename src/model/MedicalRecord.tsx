import { Analysis } from "./Analysis";

export interface MedicalRecord {
    id: number,
    record: string,
    fioAndSpecializationDoctor: string,
    date: string,
    analyzes: Analysis[]
}