import React, {useEffect, useState} from "react";
import {Patient} from "@/model/Patient";
import PatientDetails from "@/components/details/PatientDetails";
import EditPatientForm from "@/components/edit/EditPatientForm";
import HttpService from "@/service/HttpService";
import {useRouter} from "next/router";

const Patient: React.FC = () => {
  const router = useRouter();
  const patientId = parseInt(router.query.id as string);
  const [patient, setPatient] = useState<Patient>();

  useEffect(() => {
    HttpService.getPatient(patientId)
      .then(response => setPatient(response))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className={"userPage"}>
      <div className={"titleContainer"}>
        <h3>Пациент</h3>
      </div>
      <div className={"userContainer"}>
        {patient && <PatientDetails patient={patient} />}
        {patient && <EditPatientForm patient={patient} />}
      </div>
    </div>
  );
};

export default Patient;