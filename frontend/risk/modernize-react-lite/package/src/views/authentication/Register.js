import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logoImage from '../../assets/images/PricewaterhouseCoopers_Logo.svg.png';
import { Link as RouterLink } from 'react-router-dom';
import $ from 'jquery';

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

function SignUpPage() {
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const payload = {
      email: data.get('email'),
      first_name: data.get('firstName'),
      last_name: data.get('lastName'),
      password: data.get('password'),
    };

    $.ajax({
      url: 'http://127.0.0.1:8000/accounts/signup/',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(payload),
      success: function (response) {
        alert('Sign up successful!');
        console.log('Response:', response);
      },
      error: function (xhr, status, error) {
        alert('Sign up failed. Please try again.');
        console.error('Error:', error);
      },
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
            zIndex: 1000,  // Ensure it stays on top
            cursor: 'pointer'
          }} 
          onClick={() => navigate('/dashboard')}
           
          />
        <CssBaseline />
        <Box
          sx={{
            marginTop: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#f2f2f2',
            padding: 2,
            borderRadius: 2,
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#dc6900' }}>
            {//<LockOutlinedIcon />
            }
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
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
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link component={RouterLink} to="/auth/login" variant="body2">
                  {"Already have an account? Sign in"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <div className="footer-band"></div>
        
        <Copyright sx={{ mt: 8, mb: 4 }} />
        {/* Orange bar at the bottom */}
        <Box sx={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '55px', backgroundColor: '#dc6900' }} />
      </Container>
    </ThemeProvider>
    
  );
}

export default SignUpPage;
