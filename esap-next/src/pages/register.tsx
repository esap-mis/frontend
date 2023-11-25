import React, { useState } from 'react';
import {Alert} from "@mui/material";
import {NextPage} from "next";
import AuthService from "@/service/auth/AuthService";
import {ClinicRegistrationDTO} from "@/model/dto/ClinicRegistrationDTO";
import {ClinicDTO} from "@/model/dto/ClinicDTO";
import RegistrationForm from "@/components/auth/RegistrationForm";
import ClinicRegistrationForm from "@/components/auth/ClinicRegistrationForm";
import {DoctorRegistrationDTO} from "@/model/dto/DoctorRegistrationDTO";
import {InfoLogin} from "@/model/auth/InfoLogin";

const Registration: NextPage = () => {
  const [doctorData, setDoctorData] = useState<DoctorRegistrationDTO>();
  const [response, setResponse] = useState<InfoLogin>();
  const [showClinicForm, setShowClinicForm] = useState<boolean>(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleDoctorSubmit = (data: DoctorRegistrationDTO) => {
    setDoctorData(data);
    setShowClinicForm(true);
  };

  const handleClinicSubmit = (clinicData: ClinicDTO) => {
    if (doctorData && clinicData) {
      const clinicRegistration: ClinicRegistrationDTO = {
        clinic: clinicData,
        doctor: doctorData,
      };
      AuthService.registrationClinics(clinicRegistration)
        .then((response) => {
          setRegistrationSuccess(true);
          setResponse(response);
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <div>
      {registrationSuccess && <Alert severity="success" sx={{ mt: 2 }}>Вы успешно зарегистрировались! Логин: {response?.login}, пароль {response?.password}</Alert>}
      {!showClinicForm && <RegistrationForm onSubmit={handleDoctorSubmit} />}
      {showClinicForm && <ClinicRegistrationForm onSubmit={handleClinicSubmit} />}
    </div>
  );
};

export default Registration;
