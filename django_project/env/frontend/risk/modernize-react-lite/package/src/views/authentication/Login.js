import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
//import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logoImage from '../../assets/images/PricewaterhouseCoopers_Logo.svg.png';
import { Link as RouterLink } from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://www.pwc.com/gx/en/about/corporate-governance/network-structure.html">
        PwC. All rights reserved
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

function SignInPage() {
  const location = useLocation();  // Step 1: Use location to get URL params
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('confirmed') === 'true') {
      setShowConfirmation(true);  // Step 2: Set the confirmation state
    }
  }, [location]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
      <img 
          src={logoImage} 
          alt="PwC Logo" 
          style={{
            position: 'absolute', // Positioning to the top left corner
            top: '30px',  // Adjust top margin as needed
            left: '30px', // Adjust left margin as needed
            width: '110px', // Set desired width
            height: 'auto', // Maintain aspect ratio
            zIndex: 1000  // Ensure it stays on top
          }} 
        />
        <CssBaseline />
        <Box
          sx={{
            marginTop: 15,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#f2f2f2',
            padding: 2,
            borderRadius: 2,
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
          }}
        >
          {showConfirmation && (  // Step 3: Display the confirmation message
            <Box sx={{ backgroundColor: '#e6ffed', padding: 2, borderRadius: 1, marginBottom: 2 }}>
              <Typography variant="body1" color="green">
                Congratulations! Your email has been confirmed. You can now log in.
              </Typography>
            </Box>
          )}
          <Avatar sx={{ m: 1, bgcolor: '#dc6900' }}>
            {//<LockOutlinedIcon />
            }
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
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
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link component={RouterLink} to="/sign-up" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <div className="footer-band"></div>
        {/* Orange bar at the bottom */}
        <Box sx={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '55px', backgroundColor: '#dc6900' }} />
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

export default SignInPage;
