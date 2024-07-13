import React, { useContext, useState } from "react";
import { login as loginApi } from "../services/api";
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
import Alert from "@mui/material/Alert";

const Login = () => {
    const { login, isLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    if (isLoggedIn()) {
        navigate('/home');
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData(e.currentTarget);
            console.log("Login response upcoming");
            const response = await loginApi(data.get('username'), data.get('password'));
            login(response.user_id, response.access); 
            navigate('/home');
        } catch (error) {
            console.error("login response: ", error);
            setError(error.message);
        }
    };

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
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
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        {error && <Alert severity='error'>{error}</Alert>}
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
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
                            control={<Checkbox value="remember" id='remember' color="primary" />}
                            label="Remember me"
                            id='remember'
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            id='signin'
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href="/signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Login;
