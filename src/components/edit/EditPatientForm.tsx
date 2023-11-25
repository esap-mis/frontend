import React, {useState} from "react";
import {Patient} from "@/model/Patient";
import {PatientDTO} from "@/model/dto/PatientDTO";
import {Alert, Autocomplete, Button, Grid, TextField} from "@mui/material";
import HttpService from "@/service/HttpService";

interface EditPatientProps {
  patient: Patient;
}

const EditPatientForm: React.FC<EditPatientProps> = ({patient}) => {
  const [firstName, setFirstName] = useState(patient.firstName);
  const [patronymic, setPatronymic] = useState(patient.patronymic);
  const [lastName, setLastName] = useState(patient.lastName);
  const [birthDate, setBirthDate] = useState(patient.birthDate);
  const [gender, setGender] = useState(patient.gender);
  const [email, setEmail] = useState(patient.email);
  const [phoneNumber, setPhoneNumber] = useState(patient.phoneNumber);
  const [address, setAddress] = useState(patient.address);
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

  const handleBirthDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBirthDate(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(event.target.value);
  };

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updatedPatient: PatientDTO = {
      firstName,
      lastName,
      patronymic,
      birthDate,
      gender,
      email,
      phoneNumber,
      address
    };

    HttpService.updatePatient(patient.id, updatedPatient)
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
              placeholder={patient.firstName}
              value={firstName}
              onChange={handleFirstNameChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Отчество"
              placeholder={patient.patronymic}
              value={patronymic}
              onChange={handlePatronymicChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Фамилия"
              placeholder={patient.lastName}
              value={lastName}
              onChange={handleLastNameChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Дата рождения"
              placeholder={patient.birthDate}
              value={birthDate}
              onChange={handleBirthDateChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="E-mail"
              placeholder={patient.email}
              value={email}
              onChange={handleEmailChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Телефон"
              placeholder={patient.phoneNumber}
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              label="Адрес"
              placeholder={patient.address}
              value={address}
              onChange={handleAddressChange}
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

export default EditPatientForm;