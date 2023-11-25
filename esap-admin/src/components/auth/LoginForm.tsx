import React, {useState} from "react";
import {InfoLogin} from "../../model/auth/InfoLogin";
import AuthService from "../../service/auth/AuthService";
import {TokenStorageService} from "../../service/auth/TokenStorageService";
import {Alert, Avatar, Box, Button, Card, CardContent, Checkbox, Container, FormControlLabel, Grid, IconButton, InputAdornment, TextField, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {Visibility, VisibilityOff} from "@mui/icons-material";

const LoginForm: React.FC = () => {
  const [tokenStorageService] = useState<TokenStorageService>(new TokenStorageService());
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleRememberMeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(event.target.checked);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const infoLogin: InfoLogin = {
      login: login,
      password: password
    };
    AuthService.attemptAuth(infoLogin)
      .then(response => {
        tokenStorageService.saveToken(response.jwt);
        tokenStorageService.saveLogin(login);
        tokenStorageService.saveRoles(response.roles)
        setSuccess(true);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch(error => {
        setError(error.response.data.message);
      });
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
                Вход в систему
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                {error && <Alert severity="error">{error}</Alert>}
                {success && <Alert severity="success">Вы успешно вошли в систему!</Alert>}
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
                  name="password"
                  label="Пароль"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="current-password"
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
                <FormControlLabel
                  control={<Checkbox checked={rememberMe} onChange={handleRememberMeChange} value="remember" color="primary" />}
                  label="Запомнить"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={login === "" || password === ""}
                >
                  Войти
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link to="/password/reset">
                      Забыли пароль?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link to="/register">
                      {"Нет аккаунта? Зарегистрируйтесь"}
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

export default LoginForm;