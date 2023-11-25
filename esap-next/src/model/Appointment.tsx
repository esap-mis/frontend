import {Patient} from "./Patient";

export interface Appointment {
  id: number;
  patient: Patient,
  date: string,
  startAppointments: string,
  endAppointments: string
}