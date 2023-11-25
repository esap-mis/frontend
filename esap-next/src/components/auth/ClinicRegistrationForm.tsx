import React, { useState } from "react";
import { ClinicDTO } from "@/model/dto/ClinicDTO";
import {Avatar, Box, Button, Card, CardContent, Container, Grid, TextField, Typography} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Link from "next/link";

interface ClinicRegistrationFormProps {
  onSubmit: (clinicData: ClinicDTO) => void;
}

const ClinicRegistrationForm: React.FC<ClinicRegistrationFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };

  const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const clinicData: ClinicDTO = {
      name: name,
      address: address,
      phoneNumber: phoneNumber
    };

    onSubmit(clinicData);
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
                Регистрация поликлиники
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="given-name"
                      name="name"
                      required
                      fullWidth
                      id="name"
                      label="Название"
                      autoFocus
                      value={name}
                      onChange={handleNameChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="address"
                      label="Адрес"
                      name="address"
                      value={address}
                      onChange={handleAddressChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="phoneNumber"
                      label="Номер телефона"
                      name="phoneNumber"
                      value={phoneNumber}
                      onChange={handlePhoneNumberChange}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={name === "" || address === ""}
                >
                  Зарегистрироваться
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href={"/login"}>
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

export default ClinicRegistrationForm;
