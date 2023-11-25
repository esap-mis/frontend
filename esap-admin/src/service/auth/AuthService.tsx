import {InfoLogin} from "../../model/auth/InfoLogin";
import {AuthInfo} from "../../model/auth/AuthInfo";
import {ClinicRegistrationDTO} from "../../model/dto/ClinicRegistrationDTO";
import {DoctorRegistrationDTO} from "../../model/dto/DoctorRegistrationDTO";
import Api from "./Api";
import {BASE_URL} from "../../util/Constants";

class AuthService {
  private static AUTH_URL = BASE_URL + "/api/auth";

  public static async attemptAuth(credentials: InfoLogin) {
    return await Api.post<AuthInfo>(this.AUTH_URL + "/login", credentials)
      .then((res) => res.data)
      .catch((error) => {throw error});
  }

  public static async resetPassword(credentials: InfoLogin) {
    return await Api.post<InfoLogin>(this.AUTH_URL + "/password/reset", credentials)
      .then((res) => res.data)
      .catch((error) => {throw error});
  }

  public static async registrationClinics(body: ClinicRegistrationDTO) {
    return await Api.post<InfoLogin>(this.AUTH_URL + "/registration/clinic", body)
      .then((res) => res.data)
      .catch((error) => {
        console.log(error.request)
        throw error;
      });
  }

  public static async registrationDoctor(doctor: DoctorRegistrationDTO) {
    return await Api.post<InfoLogin>(this.AUTH_URL + "/registration/doctor", doctor)
      .then((res) => res.data)
      .catch((error) => {throw error});
  }

  public static async getAllRoles() {
    return await Api.get<string[]>(this.AUTH_URL + "/roles")
      .then((res) => res.data)
      .catch((error) => {throw error});
  }
}

export default AuthService;
