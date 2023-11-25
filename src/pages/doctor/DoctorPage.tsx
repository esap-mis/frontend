import React, {useEffect, useState} from "react";
import HttpService from "../../service/HttpService";
import {useParams} from "react-router-dom";
import {Doctor} from "../../model/Doctor";
import DoctorDetails from "../../components/details/DoctorDetails";
import EditDoctorForm from "../../components/editDoctorForm/EditDoctorForm";

const DoctorPage: React.FC = () => {
  const { doctorId } = useParams();
  const doctorIdInt = parseInt(doctorId!);
  const [doctor, setDoctor] = useState<Doctor>();

  useEffect(() => {
    HttpService.getDoctor(doctorIdInt)
      .then(response => setDoctor(response))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className='userPage'>
      <div className="titleContainer">
        <h3>Врач</h3>
      </div>
      <div className="userContainer">
        {doctor && <DoctorDetails doctor={doctor} />}
        {doctor && <EditDoctorForm doctor={doctor} />}
      </div>
    </div>
  );
};

export default DoctorPage;