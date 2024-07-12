import React, { useState, useContext } from "react";
import { signup } from "../services/api";
import { useNavigate } from 'react-router-dom';
import AuthContext from "../contexts/AuthContext";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import background from '../traveltracker.webp';

const Signup = () => {
    const { user, login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    if (user) {
        navigate('/home');
    }

    const validateFormData = (e) => {
        const data = new FormData(e.currentTarget);
        setPasswordsMatch(data.get('password') === data.get('confirm password'));
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData(e.currentTarget);
            // add in country to login
            const response = await signup(data.get('username'), data.get('password'));
            login(response.user_id, response.access);
            navigate('/home');
        } catch (error) {
            console.error('Signup failed', error);
        }
    };

  return (
    <Grid container component='main' sx={{ height: '100vh' }}>
        <Grid item xs={12} sm={8} md={5} compoonent={Paper} elevation={6} square>
            <Box
                sx={{
                    my: 8,
                    mx: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component='h1' variant='h5'>
                    Create a TalkBox account
                </Typography>
                <Box component="form" noValidate onChange={validateFormData} onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin='normal'
                        fullWidth
                        id='username'
                        label='Username'
                        name='username'
                        autoComplete='username'
                        autoFocus
                    />
                    
                    <TextField
                        margin='normal'
                        required
                        fullWidth
                        name='password'
                        label='Password'
                        type='password'
                        id='password'
                        autoComplete='current-password'
                    />
                    <TextField
                        margin='normal'
                        required
                        fullWidth
                        name='confirm password'
                        label='Confirm Password'
                        type='password'
                        id='confirm password'
                        autoComplete='current-password'
                        helperText={passwordsMatch ? '' : "Passwords do not match"}
                        error={!passwordsMatch}
                    />
                    
                    <FormControlLabel
                        control={<Checkbox value='remember' color='primary' />}
                        label='Remember me'
                    />
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Start Chatting Now
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href='/login' variant='body2'>
                                Already have an account?
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Grid>
        <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
                backgroundImage: `url(${background})`,
                backgroundColor: (t) =>
                    t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        />
    </Grid>
  )
}

export default Signup;