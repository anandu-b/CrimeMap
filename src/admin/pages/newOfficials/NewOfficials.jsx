import React, { useState } from 'react';
import { Button, TextField, IconButton, InputAdornment } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import supabase from '../../../utilities/supabase';
import styles from './NewOfficials.module.css';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const NewOfficials = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [photo, setPhoto] = useState(null);
    const [proof, setProof] = useState(null);

    const handleTogglePassword = () => {
        setShowPassword((prev) => !prev);
    };

    const handleFileChange = (event, setFile) => {
        setFile(event.target.files[0]);
    };
    const uploadFile = async (file, folder) => {
        if (!file) return null; // Return null if no file is selected

        const filePath = `${folder}/${Date.now()}_${file.name}`; // Unique filename
        const { data, error } = await supabase.storage
            .from('CrimeMap') // Change to your actual Supabase storage bucket
            .upload(filePath, file);

        if (error) {
            console.error("File upload error:", error);
            return null;
        }

        return data.path ? `https://symbkjfonsxphhlaifvm.supabase.co/storage/v1/object/public/CrimeMap/${data.path}` : null;
    };

    const handleSubmit = async () => {
        try {
            const photoURL = await uploadFile(photo, 'Officials_Photos');
            const proofURL = await uploadFile(proof, 'Officials_Proofs');

            const { data, error: authError } = await supabase.auth.signUp({
                email: email,
                password: password,
            });

            if (authError) {
                console.error("Authentication error:", authError);
                return;
            }

            const userId = data.user?.id; // This is a UUID

            if (!userId) {
                console.error("User ID not found after sign-up");
                return;
            }

            // Insert user data into tbl_user
            const { error } = await supabase.from('tbl_officials').insert([
                {
                    auth_id: userId, // Ensure UUID is stored correctly
                    officials_name: name,
                    officials_email: email,
                    officials_password: password,
                    officials_address: address,
                    officials_proof: proofURL,
                    officials_photo: photoURL,
                    officials_status: 0,
                    officials_phone: phone,
                },
            ]);

            if (error) {
                console.error("Error inserting user into database:", error);
            } else {
                alert("User registered successfully! Please complete Email verification");
                console.log("Registerd successfully!");
            }

        } catch (err) {
            console.error("Registration failed:", err);
        }
    };

    return (
        <div className={styles.container}>
            <h1 align="center">REGISTER</h1>

            <TextField
                label="Username"
                variant="outlined"
                fullWidth
                className={styles.inp1}
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: 'gray' }, // Default border color
                        '&:hover fieldset': { borderColor: '#7e57c2' }, // Border color on hover
                        '&.Mui-focused fieldset': { borderColor: '#4a148c' }, // Border color when focused
                    },
                    '& .MuiInputLabel-root': {
                        color: 'gray', // Default label color
                        '&.Mui-focused': { color: '#4a148c' }, // Label color when focused
                    },
                }}
            />

            <TextField
                label="Email"
                variant="outlined"
                fullWidth
                className={styles.inp1}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: 'gray' }, // Default border color
                        '&:hover fieldset': { borderColor: '#7e57c2' }, // Border color on hover
                        '&.Mui-focused fieldset': { borderColor: '#4a148c' }, // Border color when focused
                    },
                    '& .MuiInputLabel-root': {
                        color: 'gray', // Default label color
                        '&.Mui-focused': { color: '#4a148c' }, // Label color when focused
                    },
                }}
            />

            <TextField
                label="Mobile"
                variant="outlined"
                fullWidth
                className={styles.inp1}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: 'gray' }, // Default border color
                        '&:hover fieldset': { borderColor: '#7e57c2' }, // Border color on hover
                        '&.Mui-focused fieldset': { borderColor: '#4a148c' }, // Border color when focused
                    },
                    '& .MuiInputLabel-root': {
                        color: 'gray', // Default label color
                        '&.Mui-focused': { color: '#4a148c' }, // Label color when focused
                    },
                }}
            />

            <TextField
                label="Password"
                variant="outlined"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                className={styles.inp1}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleTogglePassword}>
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: 'gray' }, // Default border color
                        '&:hover fieldset': { borderColor: '#7e57c2' }, // Border color on hover
                        '&.Mui-focused fieldset': { borderColor: '#4a148c' }, // Border color when focused
                    },
                    '& .MuiInputLabel-root': {
                        color: 'gray', // Default label color
                        '&.Mui-focused': { color: '#4a148c' }, // Label color when focused
                    },
                }}
            />

            <TextField
                label="Address"
                multiline
                maxRows={5}
                fullWidth
                className={styles.inp1}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: 'gray' }, // Default border color
                        '&:hover fieldset': { borderColor: '#7e57c2' }, // Border color on hover
                        '&.Mui-focused fieldset': { borderColor: '#4a148c' }, // Border color when focused
                    },
                    '& .MuiInputLabel-root': {
                        color: 'gray', // Default label color
                        '&.Mui-focused': { color: '#4a148c' }, // Label color when focused
                    },
                }}
            />

            <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
                fullWidth
                className={styles.inp1}
                sx={{ backgroundColor: '#6a1b9a' }}
            >
                Upload Proof
                <VisuallyHiddenInput type="file" accept="image/*" onChange={(e) => handleFileChange(e, setProof)} />
            </Button>

            <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
                fullWidth
                className={styles.inp1}
                sx={{ backgroundColor: '#6a1b9a' }}
            >
                Upload Photo
                <VisuallyHiddenInput type="file" accept="image/*" onChange={(e) => handleFileChange(e, setPhoto)} />
            </Button>

            <Button
                variant="contained"
                fullWidth
                className={styles.inp1}
                onClick={handleSubmit}
                sx={{ backgroundColor: '#6a1b9a' }}
            >
                Sign in
            </Button>
        </div>
    )
}

export default NewOfficials