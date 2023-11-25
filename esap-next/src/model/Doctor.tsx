import {Schedule} from "./Schedule";
import {ClinicDTO} from "./dto/ClinicDTO";

export interface Doctor {
    id: number;
    firstName: string;
    patronymic: string;
    lastName: string;
    specialization: string;
    clinic: ClinicDTO;
    schedules: Schedule[];
    gender: number;
}