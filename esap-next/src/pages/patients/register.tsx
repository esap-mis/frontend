import React, {useState} from "react";
import {Alert, Autocomplete, Button, Grid, TextField} from "@mui/material";
import HttpService from "@/service/HttpService";
import {PatientDTO} from "@/model/dto/PatientDTO";

const NewPatient: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [patronymic, setPatronymic] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState(1);
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
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
    const newPatient: PatientDTO = {
      firstName,
      lastName,
      patronymic,
      birthDate,
      gender,
      email,
      phoneNumber,
      address
    };

    HttpService.addPatient(newPatient)
      .then((response) => setSuccess(true))
      .catch((error) => console.log(error));
  };

  return (
    <div className={"newPatientPage"}>
      <h5 className="title">Новый пациент</h5>
      {error && <Alert severity="error" sx={{marginBottom: 2}}>{error}</Alert>}
      {success && <Alert severity="success" sx={{marginBottom: 2}}>Пациент успешно добавлен!</Alert>}
      <form onSubmit={handleFormSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Имя"
              placeholder="Имя"
              value={firstName}
              onChange={handleFirstNameChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Отчество"
              placeholder="Отчество"
              value={patronymic}
              onChange={handlePatronymicChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Фамилия"
              placeholder="Фамилия"
              value={lastName}
              onChange={handleLastNameChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Дата рождения"
              placeholder="Дата рождения"
              value={birthDate}
              onChange={handleBirthDateChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="E-mail"
              placeholder="E-mail"
              value={email}
              onChange={handleEmailChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Телефон"
              placeholder="Телефон"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              label="Адрес"
              placeholder="Адрес"
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
              Добавить
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default NewPatient;