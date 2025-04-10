
import React, { useState } from 'react';
import {
    Container,
    Paper,
    Box,
    Typography,
    TextField,
    Button,
    Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import axios from 'axios';

const AdminLogin = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await axios.post('/api/auth/login', formData);
            const { token, user } = response.data;

            // Check if the user is a Regulator
            if (user.userType !== 'Regulator') {
                setError('Access denied. Admin privileges required.');
                return;
            }

            // Store the token and user info
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            // Set the default Authorization header for future requests
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            enqueueSnackbar('Login successful', { variant: 'success' });
            navigate('/admin/dashboard');
        } catch (error) {
            setError(error.response?.data?.message || 'Login failed');
            enqueueSnackbar('Login failed', { variant: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 8, mb: 4 }}>
                <Paper elevation={3} sx={{ p: 4 }}>
                    <Typography variant="h4" component="h1" align="center" gutterBottom>
                        Admin Login
                    </Typography>
                    <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
                        Please login with your admin credentials
                    </Typography>

                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}

                    <form onSubmit={handleSubmit}>
                        <TextField
                            name="email"
                            label="Email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            fullWidth
                            required
                            margin="normal"
                        />
                        <TextField
                            name="password"
                            label="Password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            fullWidth
                            required
                            margin="normal"
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            size="large"
                            disabled={loading}
                            sx={{ mt: 3 }}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </Button>
                    </form>
                </Paper>
            </Box>
        </Container>
    );
};

export default AdminLogin;
