import {Doctor} from "../../model/Doctor";
import React, {useState} from "react";
import {Alert, Box, Button, IconButton, Modal, TextField, Typography} from "@mui/material";
import {ScheduleDTO} from "../../model/dto/ScheduleDTO";
import HttpService from "../../service/HttpService";

interface NewScheduleModalProps {
  open: boolean,
  onClose: () => void,
  doctor: Doctor;
}

const NewScheduleModal: React.FC<NewScheduleModalProps> = ({ open, onClose, doctor }) => {
  const [date, setDate] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const schedule: ScheduleDTO = {
      doctorId: doctor.id,
      date: date,
      startDoctorAppointment: startTime,
      endDoctorAppointment: endTime,
    };

    HttpService.addDoctorSchedule(schedule)
      .then(response => {
        setSuccess(true);
      })
      .catch(error => {
        setError(error.response.data.message);
      });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
              margin: "auto", padding: 3, width: "30%",
              height: success || error ? "65%" : "55%", bgcolor: "background.paper",
              borderRadius: "5px", overflow: "hidden", marginTop: "60px"
            }}
      >
        <Typography align="center" style={{marginBottom: "12px", display: 'flex', alignItems: 'center'}}>
          <span style={{flex: 1, fontSize: '18px'}}>Новое расписание</span>
        </Typography>
        {success && <Alert severity="success" sx={{ my: 2 }}>Расписание успешно добавлено!</Alert>}
        {error && <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            required
            fullWidth
            type="date"
            label="Дата"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            margin="normal"
          />
          <TextField
            required
            fullWidth
            type="time"
            label="Начало рабочего дня"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            margin="normal"
          />
          <TextField
            required
            fullWidth
            type="time"
            label="Конец рабочего дня"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            margin="normal"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
            color="primary"
            disabled={date === "" || startTime === "" || endTime === ""}
          >
            Добавить
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default NewScheduleModal;