import {ClinicDTO} from "./ClinicDTO";
import {DoctorRegistrationDTO} from "./DoctorRegistrationDTO";

export interface ClinicRegistrationDTO {
    clinic: ClinicDTO;
    doctor: DoctorRegistrationDTO;
}