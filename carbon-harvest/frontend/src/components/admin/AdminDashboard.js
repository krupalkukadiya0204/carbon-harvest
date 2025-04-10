import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Button, TextField, Select, MenuItem, FormControl, InputLabel, Stack, Pagination, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, CheckCircle as VerifyIcon } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import UserEditDialog from './UserEditDialog';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState('');
    const [userType, setUserType] = useState('');
    const [verificationStatus, setVerificationStatus] = useState('');
    const [editUser, setEditUser] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const { enqueueSnackbar } = useSnackbar();

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams({
                page,
                limit: 10,
                ...(search && { search }),
                ...(userType && { userType }),
                ...(verificationStatus && { verified: verificationStatus })
            });

            const response = await axios.get(`/api/admin/users?${params}`);
            setUsers(response.data.users);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            enqueueSnackbar('Error fetching users', { variant: 'error' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [page, search, userType, verificationStatus]);

    const handleVerifyUser = async (userId) => {
        try {
            await axios.post(`/api/admin/users/${userId}/verify`);
            fetchUsers();
            enqueueSnackbar('User verified successfully', { variant: 'success' });
        } catch (error) {
            enqueueSnackbar('Error verifying user', { variant: 'error' });
        }
    };

    const handleDeleteUser = async () => {
        try {
            await axios.delete(`/api/admin/users/${userToDelete._id}`);
            setDeleteDialogOpen(false);
            fetchUsers();
            enqueueSnackbar('User deleted successfully', { variant: 'success' });
        } catch (error) {
            enqueueSnackbar('Error deleting user', { variant: 'error' });
        }
    };

    const handleSearch = (event) => {
        setSearch(event.target.value);
        setPage(1);
    };

    return (
        <Container maxWidth="xl">
            <Box sx={{ mt: 4, mb: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    User Management
                </Typography>

                <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                    <TextField
                        label="Search users"
                        variant="outlined"
                        value={search}
                        onChange={handleSearch}
                        size="small"
                    />
                    <FormControl size="small" sx={{ minWidth: 120 }}>
                        <InputLabel>User Type</InputLabel>
                        <Select
                            value={userType}
                            label="User Type"
                            onChange={(e) => setUserType(e.target.value)}
                        >
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value="Farmer">Farmer</MenuItem>
                            <MenuItem value="Industry">Industry</MenuItem>
                            <MenuItem value="Regulator">Regulator</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl size="small" sx={{ minWidth: 120 }}>
                        <InputLabel>Verification</InputLabel>
                        <Select
                            value={verificationStatus}
                            label="Verification"
                            onChange={(e) => setVerificationStatus(e.target.value)}
                        >
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value="true">Verified</MenuItem>
                            <MenuItem value="false">Unverified</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Organization</TableCell>
                                <TableCell>User Type</TableCell>
                                <TableCell>Verification Status</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={6} align="center">
                                        Loading...
                                    </TableCell>
                                </TableRow>
                            ) : users.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} align="center">
                                        No users found
                                    </TableCell>
                                </TableRow>
                            ) : users.map((user) => (
                                <TableRow key={user._id}>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.organization}</TableCell>
                                    <TableCell>{user.userType}</TableCell>
                                    <TableCell>
                                        {user.verified ? 'Verified' : 'Unverified'}
                                    </TableCell>
                                    <TableCell>
                                        <IconButton
                                            onClick={() => setEditUser(user)}
                                            size="small"
                                            color="primary"
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            onClick={() => {
                                                setUserToDelete(user);
                                                setDeleteDialogOpen(true);
                                            }}
                                            size="small"
                                            color="error"
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                        {!user.verified && (
                                            <IconButton
                                                onClick={() => handleVerifyUser(user._id)}
                                                size="small"
                                                color="success"
                                            >
                                                <VerifyIcon />
                                            </IconButton>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={(e, value) => setPage(value)}
                        color="primary"
                    />
                </Box>
            </Box>

            {editUser && (
                <UserEditDialog
                    user={editUser}
                    onClose={() => setEditUser(null)}
                    onSave={() => {
                        setEditUser(null);
                        fetchUsers();
                    }}
                />
            )}

            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete {userToDelete?.name}?
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleDeleteUser} color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default AdminDashboard;
