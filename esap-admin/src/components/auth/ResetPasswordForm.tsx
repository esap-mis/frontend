import React, {useState} from 'react';
import {Alert, Box, Button, Card, CardContent, Container, Grid, IconButton, InputAdornment, TextField, Typography} from '@mui/material';
import {Link} from "react-router-dom";
import AuthService from "../../service/auth/AuthService";
import {InfoLogin} from "../../model/auth/InfoLogin";
import {Visibility, VisibilityOff} from "@mui/icons-material";

const ResetPasswordForm: React.FC = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }
    const infoLogin: InfoLogin = {
      login: login,
      password: password
    };
    AuthService.resetPassword(infoLogin)
      .then(response => {
        setSuccess(true);
      })
      .catch(error => {
        setError(error.response.data.message);
      });
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
        <Card>
          <CardContent sx={{padding: '40px'}}>
            <Typography component="h1" variant="h5" align="center" sx={{fontWeight: "700"}}>
              Сброс пароля
            </Typography>
            {success && <Alert severity="success" sx={{ mt: 2 }}>Пароль успешно изменен!</Alert>}
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              {error && <Alert severity="error">{error}</Alert>}
              <TextField
                margin="normal"
                required
                fullWidth
                id="login"
                label="Логин"
                name="login"
                autoComplete="login"
                autoFocus
                value={login}
                onChange={handleLoginChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                label="Новый пароль"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                autoFocus
                value={password}
                onChange={handlePasswordChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Подтвердите пароль"
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={login === "" || password === "" || confirmPassword === ""}
              >
                Сбросить пароль
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="/">
                    Назад
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default ResetPasswordForm;