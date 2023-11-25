import { Doctor } from "./Doctor";
import {Appointment} from "./Appointment";

export interface Schedule {
  id: number,
  doctor: Doctor,
  date: string,
  startDoctorAppointment: string,
  endDoctorAppointment: string,
  appointments: Appointment[]
}