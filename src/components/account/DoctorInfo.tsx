import {Avatar, Box, Typography} from '@mui/material';
import React from "react";
import {Doctor} from "../../model/Doctor";

interface DoctorInfoProps {
  doctor: Doctor;
}

const DoctorInfo: React.FC<DoctorInfoProps> = ({ doctor }) => {
  return (
    <Box display="flex" alignItems="center">
      <Box marginLeft={1} textAlign="right">
        <Typography fontSize={15} component="div" lineHeight={0.8} color={"white"}>
          <span>{`${doctor.lastName} ${doctor.firstName}`}</span>
        </Typography>
        <Typography fontSize={13} component="div" lineHeight={1.2} color={"white"} fontWeight={"bold"}>
          <span>{doctor.specialization}</span>
        </Typography>
      </Box>
    </Box>
  );
};

export default DoctorInfo;