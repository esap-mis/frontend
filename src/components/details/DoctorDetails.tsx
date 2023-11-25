import React from "react";
import {Avatar} from "@mui/material";
import WorkIcon from '@mui/icons-material/Work';
import {Doctor} from "@/model/Doctor";

interface DoctorDetailsProps {
  doctor: Doctor;
}
const DoctorDetails: React.FC<DoctorDetailsProps> = ({doctor}) => {
  return (
    <div className="show">
      <div className="top">
        <Avatar alt={`${doctor?.firstName} ${doctor?.lastName}`} />
        <div className="title">
          <span className="username">{`${doctor?.firstName} ${doctor?.patronymic} ${doctor?.lastName}`}</span>
        </div>
      </div>
      <div className="bottom">
        <span className="title">Общая информация</span>
        <div className="info">
          <WorkIcon className="icon" />
          <span className="infoTitle">{doctor?.specialization}</span>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;