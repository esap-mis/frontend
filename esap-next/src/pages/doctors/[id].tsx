import React, {useEffect, useState} from "react";
import {Doctor} from "@/model/Doctor";
import HttpService from "@/service/HttpService";
import DoctorDetails from "@/components/details/DoctorDetails";
import EditDoctorForm from "@/components/edit/EditDoctorForm";
import {useRouter} from "next/router";

const Doctor: React.FC = () => {
  const router = useRouter();
  const doctorId = parseInt(router.query.id as string);
  const [doctor, setDoctor] = useState<Doctor>();

  useEffect(() => {
    HttpService.getDoctor(doctorId)
      .then(response => setDoctor(response))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className={"userPage"}>
      <div className={"titleContainer"}>
        <h3>Врач</h3>
      </div>
      <div className={"userContainer"}>
        {doctor && <DoctorDetails doctor={doctor} />}
        {doctor && <EditDoctorForm doctor={doctor} />}
      </div>
    </div>
  );
};

export default Doctor;