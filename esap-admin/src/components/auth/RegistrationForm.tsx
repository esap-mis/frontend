import React, {useState} from 'react';
import {Autocomplete, Avatar, Box, Button, Card, CardContent, Container, Grid, TextField, Typography} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {Link} from "react-router-dom";
import {DoctorRegistrationDTO} from "../../model/dto/DoctorRegistrationDTO";

interface RegistrationFormProps {
  onSubmit: (doctorData: DoctorRegistrationDTO) => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSubmit }) => {
  const [firstName, setFirstName] = useState('');
  const [patronymic, setPatronymic] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState(1);
  const [specialization, setSpecialization] = useState('');

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
      role: '',
      gender: gender
    };

    onSubmit(doctorData);
  };

  return (
    <Container maxWidth="sm">
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
                  Зарегистрироваться
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link to="/">
                      {"Уже есть аккаунт? Войдите"}
                    </Link>
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

export default RegistrationForm;