import {Doctor} from "../model/Doctor";
import {MedicalCard} from "../model/MedicalCard";
import {Patient} from "../model/Patient";
import {Schedule} from "../model/Schedule";
import Api from "./auth/Api";
import {AppointmentDTO} from "../model/dto/AppointmentDTO";
import { MedicalRecord } from "../model/MedicalRecord";
import {ScheduleDTO} from "../model/dto/ScheduleDTO";
import {Appointment} from "../model/Appointment";
import {AppointmentsCountByDayDTO} from "../model/dto/AppointmentsCountByDayDTO";
import {PatientStatisticsByGenderDTO} from "../model/dto/PatientStatisticsByGenderDTO";
import {PatientStatisticsByAgeDTO} from "../model/dto/PatientStatisticsByAgeDTO";
import {PatientDTO} from "../model/dto/PatientDTO";
import {Page} from "./util/Page";
import {DoctorDTO} from "../model/dto/DoctorDTO";
import {BASE_URL} from "../util/Constants";

class HttpService {
  private static API_PATIENT = "/api/patient";
  private static API_DOCTOR = "/api/doctor";
  private static API_MEDICAL_CARD = "/api/medicalCard";
  private static API_SCHEDULE = "/api/schedule";

  public static async getPatientList(page?: number) {
    return await Api.get<Page<Patient[]>>(BASE_URL + this.API_PATIENT, {
      params: { page: page },
    })
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  }

  public static async getLatestPatients() {
    return await Api.get<Patient[]>(BASE_URL + this.API_PATIENT + "/latest")
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  }

  public static async getPatientCount() {
    return await Api.get<number>(BASE_URL + this.API_PATIENT + "/count")
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  }

  public static async getPatientsStatisticsByGender() {
    return await Api.get<PatientStatisticsByGenderDTO>(BASE_URL + this.API_PATIENT + "/statistics/by-gender")
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  }

  public static async getPatientsStatisticsByAge() {
    return await Api.get<PatientStatisticsByAgeDTO>(BASE_URL + this.API_PATIENT + "/statistics/by-age")
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  }

  public static async searchPatientList(firstName: string, patronymic: string, lastName: string) {
    return await Api.get<Page<Patient[]>>(BASE_URL + this.API_PATIENT, {
      params: {
        firstName: firstName,
        patronymic: patronymic,
        lastName: lastName
      }
    })
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  }

  public static async getDoctorList(page: number) {
    return await Api.get<Page<Doctor[]>>(BASE_URL + this.API_DOCTOR,{
      params: { page: page },
    })
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  }

  public static async getDoctorCount() {
    return await Api.get<number>(BASE_URL + this.API_DOCTOR + "/count")
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  }

  public static async getMedicalCard(id: number) {
    return await Api.get<MedicalCard>(BASE_URL + this.API_MEDICAL_CARD + `/patient/${id}`)
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  }

  public static async saveMedicalRecord(id: number, body: MedicalRecord) {
    return await Api.post<MedicalCard>(BASE_URL + this.API_MEDICAL_CARD + `/patient/${id}`, body)
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  }

  public static async getPatient(id: number) {
    return await Api.get<Patient>(BASE_URL + this.API_PATIENT + `/${id}`)
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  }

  public static async getSchedulesByDay(date?: string) {
    const params = date ? { date: date } : undefined;
    return await Api.get<Schedule[]>(BASE_URL + this.API_SCHEDULE + "/day", {
      params: params,
    })
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  }

  public static async getHomeDoctor() {
    return await Api.get<Doctor>(BASE_URL + this.API_DOCTOR + "/home")
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  }

  public static async getDoctor(id: number) {
    return await Api.get<Doctor>(BASE_URL + this.API_DOCTOR + `/${id}`)
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  }

  public static async getScheduleById(id: number) {
    return await Api.get<Schedule>(BASE_URL + this.API_SCHEDULE + `/${id}`)
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  }

  public static async addDoctorSchedule(body: ScheduleDTO) {
    return await Api.post<AppointmentDTO>(BASE_URL + this.API_SCHEDULE, body)
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  }

  public static async addDoctorAppointment(id: number, body: AppointmentDTO) {
    return await Api.post<AppointmentDTO>(BASE_URL + this.API_SCHEDULE + `/${id}/appointment`, body)
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  }

  public static async getLatestDoctorAppointments() {
    return await Api.get<Appointment[]>(BASE_URL + this.API_SCHEDULE + "/appointment/latest")
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  }

  public static async getAppointmentCountByDay() {
    return await Api.get<AppointmentsCountByDayDTO[]>(BASE_URL + this.API_SCHEDULE + "/appointment/count-by-day")
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  }

  public static async updatePatient(id: number, body: PatientDTO) {
    return await Api.post<PatientDTO>(BASE_URL + this.API_PATIENT + `/${id}/update`, body)
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  }

  public static async addPatient(body: PatientDTO) {
    return await Api.post<PatientDTO>(BASE_URL + this.API_PATIENT, body)
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  }

  public static async updateDoctor(id: number, body: DoctorDTO) {
    return await Api.post<DoctorDTO>(BASE_URL + this.API_DOCTOR + `/${id}/update`, body)
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  }
}

export default HttpService;
