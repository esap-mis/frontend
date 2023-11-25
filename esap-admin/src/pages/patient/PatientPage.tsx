import React, {useEffect, useState} from "react";
import HttpService from "../../service/HttpService";
import {Patient} from "../../model/Patient";
import EditPatientForm from "../../components/editPatient/EditPatientForm";
import {useParams} from "react-router-dom";
import PatientDetails from "../../components/details/PatientDetails";

const PatientPage: React.FC = () => {
  const { patientId } = useParams();
  const patientIdInt = parseInt(patientId!);
  const [patient, setPatient] = useState<Patient>();

  useEffect(() => {
    HttpService.getPatient(patientIdInt)
      .then(response => setPatient(response))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className='userPage'>
      <div className="titleContainer">
        <h3>Пациент</h3>
      </div>
      <div className="userContainer">
        {patient && <PatientDetails patient={patient} />}
        {patient && <EditPatientForm patient={patient} />}
      </div>
    </div>
  );
};

export default PatientPage;