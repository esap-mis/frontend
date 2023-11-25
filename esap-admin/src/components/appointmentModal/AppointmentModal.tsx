import React, {useEffect, useState} from "react";
import {Alert, Autocomplete, Box, Button, IconButton, Modal, TextField, Typography} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {Doctor} from "../../model/Doctor";
import moment from "moment/moment";
import HttpService from "../../service/HttpService";
import {Patient} from "../../model/Patient";
import {AppointmentDTO} from "../../model/dto/AppointmentDTO";

interface AppointmentModalProps {
  open: boolean,
  onClose: () => void,
  scheduleId: number,
  date: string,
  time: string,
  doctor: Doctor;
}

const AppointmentModal: React.FC<AppointmentModalProps> = ({ open, onClose, scheduleId, date, time, doctor }) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const formattedDate = moment(date).format("D MMMM, dddd");
  const [selectedPatient, setSelectedPatient] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    HttpService.getPatientList()
      .then(response => setPatients(response.content))
      .catch(error => console.error(error));
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedPatient != 0) {
      const appointment: AppointmentDTO = {
        patientId: selectedPatient,
        date: date,
        startAppointments: time
      };

      HttpService.addDoctorAppointment(scheduleId, appointment)
        .then(response => {
          setSuccess(true);
        })
        .catch(error => {
          setSuccess(error.response.data.message);
        });
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box
        sx={{
          margin: "auto", padding: 3,
          width: "30%", height: success || error ? "55%" : "45%",
          bgcolor: "background.paper", borderRadius: "5px", overflow: "hidden", marginTop: "60px"
        }}
      >
        <Typography align="center" style={{marginBottom: "12px", display: 'flex', alignItems: 'center'}}>
          <span style={{flex: 1, fontSize: '18px'}}>Запись на прием</span>
          <IconButton size="small" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Typography>
        {success && <Alert severity="success" sx={{ my: 2 }}>Пациент успешно записан на прием!</Alert>}
        {error && <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>}
        <Typography gutterBottom>
          <span><b>Врач: </b></span>
          <span>{doctor.firstName} {doctor.patronymic} {doctor.lastName}</span>
        </Typography>
        <Typography gutterBottom>
          <span><b>Дата записи:</b></span>
          <span> {formattedDate}, {time}</span>
        </Typography>
        <Typography gutterBottom>
          <b>Пациент:</b>
        </Typography>
        <Autocomplete
          options={patients}
          noOptionsText="Нет пациентов"
          getOptionLabel={(option) =>
            `${option.firstName} ${option.patronymic} ${option.lastName}`
          }
          value={patients.find((patient) => patient.id === selectedPatient) || null}
          onChange={(event, newValue) => {
            if (newValue) {
              setSelectedPatient(newValue.id);
            } else {
              setSelectedPatient(0);
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Выберите пациента"
              margin="normal"
              fullWidth
            />
          )}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3 }}
          disabled={!selectedPatient}
          onClick={handleSubmit}
        >
          Записать
        </Button>
      </Box>
    </Modal>
  );
};

export default AppointmentModal;