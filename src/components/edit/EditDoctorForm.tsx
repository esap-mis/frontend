import React, {useState} from "react";
import {Alert, Autocomplete, Button, Grid, TextField} from "@mui/material";
import {Doctor} from "@/model/Doctor";
import {DoctorDTO} from "@/model/dto/DoctorDTO";
import HttpService from "@/service/HttpService";

interface EditDoctorProps {
  doctor: Doctor;
}

const EditDoctorForm: React.FC<EditDoctorProps> = ({doctor}) => {
  const [firstName, setFirstName] = useState(doctor.firstName);
  const [patronymic, setPatronymic] = useState(doctor.patronymic);
  const [lastName, setLastName] = useState(doctor.lastName);
  const [specialization, setSpecialization] = useState(doctor.specialization);
  const [gender, setGender] = useState(doctor.gender);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value);
  };

  const handlePatronymicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPatronymic(event.target.value);
  };

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

  const handleSpecializationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpecialization(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updatedDoctor: DoctorDTO = {
      firstName,
      lastName,
      patronymic,
      specialization,
      gender
    };

    HttpService.updateDoctor(doctor.id, updatedDoctor)
      .then((response) => setSuccess(true))
      .catch((error) => setError(error));
  };

  return (
    <div className="update">
      <h5 className="title">Редактировать</h5>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">Пациент успешно обновлен!</Alert>}
      <form onSubmit={handleFormSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Имя"
              placeholder={doctor.firstName}
              value={firstName}
              onChange={handleFirstNameChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Отчество"
              placeholder={doctor.patronymic}
              value={patronymic}
              onChange={handlePatronymicChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Фамилия"
              placeholder={doctor.lastName}
              value={lastName}
              onChange={handleLastNameChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Специальность"
              placeholder={doctor.specialization}
              value={specialization}
              onChange={handleSpecializationChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              value={gender === 1 ? { value: 1, label: 'Мужской' } : { value: 2, label: 'Женский' }}
              onChange={(event, newValue) => {
                if (newValue) {
                  setGender(newValue.value);
                }
              }}
              options={[
                { value: 1, label: 'Мужской' },
                { value: 2, label: 'Женский' },
              ]}
              getOptionLabel={(option) => option.label}
              renderInput={(params) => <TextField {...params} label="Пол" />}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Изменить
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default EditDoctorForm;