import React, { useState } from 'react';

/** --- MATERIAL UI --- */
import { Box, Button, TextField } from "@mui/material";
import { FormControl, InputLabel, Select as MuiSelect, MenuItem, Modal, CircularProgress } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

/** --- IMPORT CHART DESIGN --- */
import Header from '../Chart/Header';

/** --- IMPORT CONTEXT --- */
import { useUsersContext } from "../../hooks/useUsersContext";
import { useAuthContext } from "../../hooks/useAuthContext";

const AddUser = () => {
    const { dispatch } = useUsersContext();
    const { userLG } = useAuthContext();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [openSuccessModal, setOpenSuccessModal] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    /** --- USER INFO --- */
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userLG) {
            setError('You must be logged in');
            return;
        }

        const user = { name, email, password, role };

        setLoading(true); // Set loading to true when submitting the form

        try {
            const response = await fetch('/api/userLG/signup', {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userLG.token}`
                }
            });

            const json = await response.json();

            if (!response.ok) {
                setError(json.error);
            } else {
                setError(null);
                setName('');
                setEmail('');
                setPassword('');
                setRole('');
                dispatch({ type: 'CREATE_USER', payload: json });
                setOpenSuccessModal(true); // Open success modal when user is created successfully
            }
        } catch (error) {
            setError('Something went wrong');
            console.error('Error creating user:', error);
        } finally {
            setLoading(false); // Set loading to false after form submission
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    /** --- FOR SELECTION --- */
    const roles = [
        { value: 'Lead Generation', label: 'Lead Generation' },
        { value: 'Telemarketer', label: 'Telemarketer' },
        { value: 'Team Leader', label: 'Team Leader' },
    ];

    const handleCloseSuccessModal = () => {
        setOpenSuccessModal(false);
    };

    return (
        <Box m="20px" width="1950px">
            <Header title="CREATE USER" subtitle="Create a New User Profile" />

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                >
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Full Name"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        name="fullName"
                        sx={{ gridColumn: "span 4", backgroundColor: "#c2c2c2" }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        name="email"
                        sx={{ gridColumn: "span 4", backgroundColor: "#c2c2c2" }}
                    />
                    <Box sx={{ position: 'relative', gridColumn: 'span 4' }}>
                        <TextField
                            fullWidth
                            variant="filled"
                            type={showPassword ? "text" : "password"}
                            label="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            name="password"
                            sx={{ backgroundColor: "#c2c2c2" }}
                        />
                        <img
                            src={process.env.PUBLIC_URL + '/eye.svg'}
                            alt="eye"
                            className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer"
                            onClick={togglePasswordVisibility} // Toggle password visibility on click
                        />
                    </Box>

                    <FormControl variant="outlined" fullWidth sx={{ gridColumn: "span 4", backgroundColor: "#c2c2c2" }}>
                        <InputLabel id="role">Select Role</InputLabel>
                        <MuiSelect
                            label="Select Role"
                            labelId="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <MenuItem value="">None</MenuItem>
                            {
                                roles.map(
                                    role => (<MenuItem key={role.value} value={role.value}>{role.label}</MenuItem>)
                                )
                            }
                        </MuiSelect>
                    </FormControl>
                </Box>

                <Box display="flex" justifyContent="end" mt="30px">
                    <Button type="submit" sx={{ backgroundColor: '#9c1c1c' }} variant="contained">
                        {loading ? <CircularProgress size={24} /> : "Create New User"}
                    </Button>
                </Box>
                {error && <div>{error}</div>}
            </Box>

            <Modal
                open={loading}
                aria-labelledby="loading-modal-title"
                aria-describedby="loading-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: '#f1f1f1',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                        textAlign: 'center',
                        borderRadius: '30px'
                    }}
                >
                    <CircularProgress sx={{ fontSize: 60 }} />
                    <div style={{ fontSize: '20px', marginTop: '10px' }}>Adding user, please wait...</div>
                </Box>
            </Modal>

            <Modal
                open={openSuccessModal}
                onClose={handleCloseSuccessModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: '#f1f1f1',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                        textAlign: 'center',
                        borderRadius: '30px'
                    }}
                >
                    <CheckCircleIcon sx={{ color: '#94e2cd', fontSize: 60 }} />
                    <div style={{ fontSize: '20px', marginTop: '10px' }}>New User Added Successfully!</div>
                </Box>
            </Modal>
        </Box>
    );
};

export default AddUser;