import React, {useEffect, useState} from 'react';
import {Alert, Autocomplete, Avatar, Button, Card, CardContent, Container, Grid, TextField, Typography, Box} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {DoctorRegistrationDTO} from "../../model/dto/DoctorRegistrationDTO";
import AuthService from '../../service/auth/AuthService';
import { InfoLogin } from '../../model/auth/InfoLogin';

const DoctorRegistrationForm: React.FC = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [patronymic, setPatronymic] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [specialization, setSpecialization] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [registrationSuccess, setRegistrationSuccess] = useState<boolean>(false);
  const [response, setResponse] = useState<InfoLogin>();
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [roles, setRoles] = useState<string[]>([]);
  const [gender, setGender] = useState<number>(1);

  useEffect(() => {
    AuthService.getAllRoles()
      .then(response => setRoles(response))
      .catch(error => console.error(error));
  }, []);

  const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

  const handlePatronymicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPatronymic(event.target.value);
  };

  const handleSpecializationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpecialization(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const doctorData: DoctorRegistrationDTO = {
      firstName: firstName,
      patronymic: patronymic,
      lastName: lastName,
      specialization: specialization,
      role: selectedRole,
      gender: gender
    };

    AuthService.registrationDoctor(doctorData)
    .then(response => {
      setRegistrationSuccess(true);
      setResponse(response);
    })
    .catch(error => {
      setError(error.response.data.message);
    });
  };

  return (
    <Container maxWidth="sm">
       {registrationSuccess && <Alert severity="success" sx={{ mt: 2 }}>Вы успешно зарегистрировались! Логин: {response?.login}, пароль {response?.password}</Alert>}
      <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
        <Card>
          <CardContent>
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px'}}>
              <Avatar sx={{ m: 1, bgcolor: 'rgba(217,2,2,0.92)' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5" sx={{fontWeight: "700"}}>
                Регистрация
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="Имя"
                      autoFocus
                      value={firstName}
                      onChange={handleFirstNameChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="patronymic"
                      label="Отчество"
                      name="patronymic"
                      autoComplete="patronymic"
                      value={patronymic}
                      onChange={handlePatronymicChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Фамилия"
                      name="lastName"
                      autoComplete="family-name"
                      value={lastName}
                      onChange={handleLastNameChange}
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
                      renderInput={(params) => (
                        <TextField {...params} label="Пол" />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Autocomplete
                      options={roles}
                      noOptionsText="Нет ролей"
                      getOptionLabel={(option) => option}
                      value={roles.find((role) => role === selectedRole) || null}
                      onChange={(event, newValue) => {
                        if (newValue) {
                          setSelectedRole(newValue);
                        } else {
                          setSelectedRole('');
                        }
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Роль"
                          fullWidth
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="specialization"
                      label="Специализация"
                      id="specialization"
                      autoComplete="specialization"
                      value={specialization}
                      onChange={handleSpecializationChange}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={firstName === "" || lastName === "" || patronymic === "" || specialization === ""}
                >
                  Зарегистрировать
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default DoctorRegistrationForm;