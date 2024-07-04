import React, { useState } from 'react';

/** --- MATERIAL UI --- */
import { Box, Button, TextField, FormControl, InputLabel, Select as MuiSelect, MenuItem, Modal, CircularProgress } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

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
            const response = await fetch('http://localhost:4000/api/userLG/signup', {
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
            <Box className="max-w-md w-full mx-auto p-10 bg-gray-800 rounded-lg shadow-md">
                <div className="flex items-center justify-center mb-6">
                    <img
                        src={process.env.PUBLIC_URL + '/logo.png'}
                        alt="logo"
                        className="image-xl mt-3 rounded cursor-pointer"
                    />
                    <h2 className="font-bold text-3xl text-center text-[#f4f5fd] mt-3 ml-3">Chromagen</h2>
                </div>
                <h2 className='text-3x1 text-center text-blue-200 font-bold mb-6'>CREATE NEW USER</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-4' onChange={(e) => setName(e.target.value)} value={name} name="fullName">
                        <label className="block text-white text-sm font-semibold mb-2" htmlFor="fullName">Full Name</label>
                        <input placeholder="Juan Dela Cruz" className="w-full px-3 text-white py-2 border rounded-lg bg-gray-800 focus:outline-none focus:border-blue-500" required type="text"></input>

                    </div>
                    <div className='mb-4' onChange={(e) => setEmail(e.target.value)} value={email} name="email" >
                        <label className="block text-white text-sm font-semibold mb-2" htmlFor="email">Email</label>
                        <input placeholder="bakaaaa@example.com" className="w-full px-3 text-white py-2 border rounded-lg bg-gray-800 focus:outline-none focus:border-blue-500" required type="text"></input>
                    </div>
                    
                    <div className='mb-4'>
                        <label className="block text-white text-sm font-semibold mb-2" 
                        type={showPassword ? "text" : "password"}
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        name="password"
                        htmlFor="password">Password</label>
                        <input placeholder="Enter unique password" className="w-full px-3 text-white py-2 border rounded-lg bg-gray-800 focus:outline-none focus:border-blue-500" 
                         type={showPassword ? "text" : "password"}
                         onChange={(e) => setPassword(e.target.value)}
                         value={password}
                         name="password"
                         required></input>
                    </div>
                    
                    
                        <FormControl fullWidth variant="outlined" required>
                        <div className='mb-9' >
                    <label className="block text-white text-sm font-semibold mb-2" htmlFor="select-role">Select Role</label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg bg-gray-800 text-white focus:outline-none focus:border-blue-500"
                        aria-label="Select Role"
                    >
                        <option className="" value="" disabled>Select One</option>
                        {roles.map((role) => (
                        <option key={role.value} value={role.value}>{role.label}</option>
                        ))}
                    </select>
                    </div>
                        <br></br>
                    </FormControl>
                    
                    
                    <div className='flex justify-center'>
                    <button type="submit" className='bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-rose-600 focus:outline-white'                             
                    disabled={loading}>{loading ? <CircularProgress size={24} /> : "Add New User"}</button>
                    </div>
                        
                    {error && <div className="text-red-500 mt-2 text-center">{error}</div>}
                </form>
            

            <Modal
                open={loading}
                aria-labelledby="loading-modal-title"
                aria-describedby="loading-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '56%',
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
                    <div style={{ fontSize: '20px', marginTop: '10px' }}>Saving, please wait...</div>
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
                        left: '56%',
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