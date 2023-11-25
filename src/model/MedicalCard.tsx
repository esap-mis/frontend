import { MedicalRecord } from "./MedicalRecord";
import { Patient } from "./Patient";

export interface MedicalCard {
  id: number,
  medicalRecord: MedicalRecord[],
  patient: Patient
}