import {Routes, Route, Navigate} from 'react-router-dom';
import Home from './pages/home/Home';
import NewPatient from './pages/newPatient/NewPatient';
import PatientList from './pages/patientList/PatientList';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainLayout from "./layout/MainLayout";
import LoginForm from "./components/auth/LoginForm";
import React from "react";
import RegistrationPage from "./pages/registration/Registration";
import Queue from "./components/queue/Queue";
import DoctorList from "./pages/doctorList/DoctorList";
import MedicalCard from './pages/medicalCard/PatientMedicalCard';
import {TokenStorageService} from './service/auth/TokenStorageService';
import ResetPasswordForm from "./components/auth/ResetPasswordForm";
import EditingMedicalRecord from './pages/editingMedicalRecord/EditingMedicalRecord';
import DoctorRegistrationForm from './components/auth/DoctorRegistrationForm';
import PatientPage from "./pages/patient/PatientPage";
import DoctorPage from "./pages/doctor/DoctorPage";

const App: React.FC = () => {
  const tokenStorageService = new TokenStorageService();
  const isAuthenticated = Boolean(tokenStorageService.getToken());

  return (
    <Routes>
      {isAuthenticated ? (
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<DoctorList />} />
          <Route path="/doctor/:doctorId" element={<DoctorPage />} />
          <Route path="/patients" element={<PatientList />} />
          <Route path="/patient/:patientId" element={<PatientPage />} />
          <Route path="/medicalCard/:patientId" element={<MedicalCard />} />
          <Route path="/editingMedicalCard/:patientId" element={<EditingMedicalRecord />} />
          <Route path="/patient/new" element={<NewPatient />} />
          <Route path="/queue/:scheduleId" element={<Queue />} />
          <Route path="/register/doctor" element={<DoctorRegistrationForm />} />
        </Route>
      ) : (
        <Route path="*" element={<Navigate to="/" />} />
      )}
      <Route path="/" element={<LoginForm />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/password/reset" element={<ResetPasswordForm />} />
    </Routes>
  );
};

export default App;
