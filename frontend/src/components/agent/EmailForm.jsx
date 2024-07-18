import { useState, useEffect } from 'react';

/** --- MATERIAL UI --- */
import { Box, Button, Typography, TextField, CircularProgress, Modal, Grid } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

/** --- IMPORT CONTEXT --- */
import { useEmailsContext } from "../../hooks/useEmailsContext";
import { useAuthContext } from "../../hooks/useAuthContext";

const EmailForm = ({ unassignedId, email, onLeadUpdate }) => {
    const { dispatch } = useEmailsContext();
    const { userLG } = useAuthContext();

    const [emailData, setEmailData] = useState({
        from: userLG.email || '',
        to: email || '',
        subject: '',
        text: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);
    const [openSuccessModal, setOpenSuccessModal] = useState(false);

    useEffect(() => {
        setEmailData((prevData) => ({
            ...prevData,
            from: userLG.email || '',
            to: email || ''
        }));
    }, [email, userLG.email]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmailData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!userLG) {
            setError('You must be logged in');
            setLoading(false);
            return;
        }

        const response = await fetch('http://localhost:4000/api/emails/', {
            method: 'POST',
            body: JSON.stringify(emailData),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userLG.token}`
            }
        });

        const json = await response.json();
        setLoading(false);

        if (!response.ok) {
            setError(json.error);
            setEmptyFields(json.emptyFields || []);
        } else {
            setError(null);
            setEmailData({
                from: '',
                to: '',
                subject: '',
                text: ''
            });
            setEmptyFields([]);
            setOpenSuccessModal(true);
            dispatch({ type: 'CREATE_EMAIL', payload: json });
            setTimeout(() => {
                setOpenSuccessModal(false);
                onLeadUpdate();
            }, 2000);
        }
    };

    const handleCloseSuccessModal = () => {
        setOpenSuccessModal(false);
    };

    return (
        <Box
            sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 900,
                bgcolor: '#f1f1f1',
                border: '2px solid #f1f1f1',
                boxShadow: 24,
                p: 5,
                borderRadius: '30px'
            }}
        >
            <form onSubmit={handleSubmit}>
                <div className="text-[#D22B2B] text-2xl mb-3 font-medium">Send An Email</div>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="From"
                            name="from"
                            value={emailData.from}
                            onChange={handleChange}
                            margin="normal"
                            error={emptyFields.includes('from')}
                            helperText={emptyFields.includes('from') && 'This field is required'}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="To"
                            name="to"
                            value={emailData.to}
                            onChange={handleChange}
                            margin="normal"
                            error={emptyFields.includes('to')}
                            helperText={emptyFields.includes('to') && 'This field is required'}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Subject"
                            name="subject"
                            value={emailData.subject}
                            onChange={handleChange}
                            margin="normal"
                            error={emptyFields.includes('subject')}
                            helperText={emptyFields.includes('subject') && 'This field is required'}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            multiline
                            rows={5}
                            label="Text"
                            name="text"
                            value={emailData.text}
                            onChange={handleChange}
                            margin="normal"
                            error={emptyFields.includes('text')}
                            helperText={emptyFields.includes('text') && 'This field is required'}
                            InputProps={{
                                sx: {
                                    padding: '0.5rem 1rem', // Adjust padding to align text properly
                                    lineHeight: '4rem' // Adjust line height if necessary
                                }
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Box mt={2}>
                            <Button variant="contained" type="submit" fullWidth sx={{ backgroundColor: '#3e4396' }}>
                                {loading ? <CircularProgress size={24} /> : "Submit"}
                            </Button>
                        </Box>
                    </Grid>
                    {error && <Grid item xs={12}><div className="error">{error}</div></Grid>}
                </Grid>
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
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: '#f1f1f1',
                        border: '2px solid #f1f1f1',
                        boxShadow: 24,
                        p: 4,
                        textAlign: 'center',
                        borderRadius: '30px'
                    }}
                >
                    <CircularProgress sx={{ fontSize: 60 }} />
                    <Typography variant="h6" sx={{ mt: 2 }}>Sending, please wait...</Typography>
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
                        border: '2px solid #f1f1f1',
                        boxShadow: 24,
                        p: 4,
                        textAlign: 'center',
                        borderRadius: '30px'
                    }}
                >
                    <CheckCircleIcon sx={{ color: '#94e2cd', fontSize: 60 }} />
                    <Typography variant="h6" sx={{ mt: 2 }}>New email sent!</Typography>
                </Box>
            </Modal>
        </Box>
    );
};

export default EmailForm;