import * as React from "react";
import { useState } from "react";
import { ThemeProvider } from "@emotion/react";
import { Avatar, CssBaseline, Grid,
    Paper, Typography,
    TextField,
    FormControlLabel,
    Checkbox,
    Button,
    Link, 
    Box,
    Snackbar, } from "@mui/material";

import { createTheme } from '@mui/material/styles';
import { FaUserLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import MuiAlert from '@mui/material/Alert';


const theme = createTheme();


const  SidebySideloginpage = () => {
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const[openAlert , setOpenALert] = useState(false);
    let navigate = useNavigate();

    const handleSubmit = () => {

        if(isValidEmail(email) && isValidPassword(password)){
          navigate('/MainPage');
        } else {
        setOpenALert(true);
        }
    };

    const isValidEmail = (email) => {
      return email === 'cred@email.com';
    }

    const isValidPassword = (password) => {
      return password === 'pass@1234';
    }

    return(
        <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: 'url(https://img.freepik.com/free-photo/blue-smoky-art-abstract-background_53876-110800.jpg?size=626&ext=jpg&ga=GA1.1.465589850.1702201498&semt=ais)',
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar>
              <FaUserLock />
              </Avatar>
              <Typography component="div" variant="h5">
                Sign In
              </Typography>
  
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Snackbar open={openAlert} onClose={() => setOpenALert(false)}>
              <MuiAlert elevation={6} variant="filled" onClose={() => setOpenALert(false)} severity='error'>
                 You are not a Valid User!
              </MuiAlert>
        </Snackbar>
      </ThemeProvider>

    );
  };
    
export default SidebySideloginpage;