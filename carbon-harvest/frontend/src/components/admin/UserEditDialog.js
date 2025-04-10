import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Stack,
    FormControlLabel,
    Switch
} from '@mui/material';
import { useSnackbar } from 'notistack';
import axios from 'axios';

const UserEditDialog = ({ user, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        organization: user?.organization || '',
        userType: user?.userType || 'Farmer',
        verified: user?.verified || false,
        phone: user?.phone || ''
    });
    const [loading, setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const handleChange = (event) => {
        const { name, value, checked } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'verified' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await axios.put(`/api/admin/users/${user?._id}`, formData);
            enqueueSnackbar('User updated successfully', { variant: 'success' });
            onSave();
        } catch (error) {
            enqueueSnackbar('Error updating user', { variant: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
            <form onSubmit={handleSubmit}>
                <DialogTitle>Edit User</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} sx={{ mt: 1 }}>
                        <TextField
                            name="name"
                            label="Name"
                            value={formData.name}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                        <TextField
                            name="email"
                            label="Email"
                            value={formData.email}
                            onChange={handleChange}
                            fullWidth
                            required
                            type="email"
                        />
                        <TextField
                            name="organization"
                            label="Organization"
                            value={formData.organization}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            name="phone"
                            label="Phone"
                            value={formData.phone}
                            onChange={handleChange}
                            fullWidth
                        />
                        <FormControl fullWidth>
                            <InputLabel>User Type</InputLabel>
                            <Select
                                name="userType"
                                value={formData.userType}
                                onChange={handleChange}
                                label="User Type"
                                required
                            >
                                <MenuItem value="Farmer">Farmer</MenuItem>
                                <MenuItem value="Industry">Industry</MenuItem>
                                <MenuItem value="Regulator">Regulator</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControlLabel
                            control={
                                <Switch
                                    name="verified"
                                    checked={formData.verified}
                                    onChange={handleChange}
                                />
                            }
                            label="Verified"
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={loading}
                    >
                        Save Changes
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

// Define prop types for the component
UserEditDialog.propTypes = {
    user: PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        email: PropTypes.string,
        organization: PropTypes.string,
        userType: PropTypes.oneOf(['Farmer', 'Industry', 'Regulator']),
        verified: PropTypes.bool,
        phone: PropTypes.string
    }),
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired
};

// Define default props
UserEditDialog.defaultProps = {
    user: {
        name: '',
        email: '',
        organization: '',
        userType: 'Farmer',
        verified: false,
        phone: ''
    }
};

export default UserEditDialog;
