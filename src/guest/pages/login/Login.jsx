import { Button, TextField, IconButton, InputAdornment } from '@mui/material';
import React, { useState } from 'react';
import styles from './Login.module.css';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import supabase from '../../../utilities/supabase'; // Ensure correct import

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        console.error("Login error:", error);
        alert("Login failed! Please check your credentials.");
        return;
      }

      console.log("User logged in:", data.user);

      // Fetch user details from `tbl_user` based on `auth_id`
      const { data: userData, error: userError } = await supabase
        .from('tbl_user')
        .select('id')
        .eq('auth_id', data.user.id)
        .eq('user_status', 1)
        .single();



      const { data: officialsData, error: officialsError } = await supabase
        .from('tbl_officials')
        .select('id')
        .eq('auth_id', data.user.id)
        .single();


      const { data: adminData, error: adminError } = await supabase
        .from('tbl_admin')
        .select('id')
        .eq('auth_id', data.user.id)
        .single();

      // if (userError || officialsError || adminError) {
      //   // if (userError) {
      //   //   console.error("User fetch error:", userError);
      //   //   alert("User not found!");
      //   //   return;
      //   //         
      // // }
        
      //     console.error("User fetch error:", adminError);
      //     alert("Admin not found!");
      //     return;
        
      // }

      // if (officialsError) {
      //   console.error("User fetch error:", userError);
      //   alert("User not found!");
      //   return;
      // }

      // if (adminError) {
      //   console.error("User fetch error:", userError);
      //   alert("Admin not found!");
      //   return;
      // }

      // Redirect based on `user_status`
      if (userData) {
        sessionStorage.setItem('uid', userData.id)
        navigate("/User");
      }
      else if (officialsData) {
        sessionStorage.setItem('uid', officialsData.id)
        navigate("/officials");
      }
      else if (adminData) {
        sessionStorage.setItem('uid', adminData.id)
        navigate("/Admin");
      }

      if (userError && officialsError && adminError) {
      //   if (userError) {
      //     console.error("User fetch error:", userError);
      //     alert("User not found!");
      //     return;
                
      // }
        
          console.error("User fetch error:", userError);
          console.error("Admin fetch error:", adminError);
          console.error("Officials fetch error:", officialsError);
          alert("Invalid Credentials!")
          return;
        
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  // const handleLogin = async () => {
  //   try {
  //     const { data, error } = await supabase.auth.signInWithPassword({
  //       email,
  //       password,
  //     });

  //     if (error) {
  //       console.error("Login error:", error);
  //       alert("Login failed! Please check your credentials.");
  //       return;
  //     }

  //     console.log("User logged in:", data.user);

  //     // Fetch user details from `tbl_user`
  //     const { data: userData } = await supabase
  //       .from("tbl_user")
  //       .select("id")
  //       .eq("auth_id", data.user.id)
  //       .eq("user_status", 1)
  //       .single();

  //     const { data: adminData } = await supabase
  //       .from("tbl_admin")
  //       .select("id")
  //       .eq("admin_auth_id", data.user.id)
  //       .single();

  //     // Redirect based on user type
  //     if (userData) {
  //       sessionStorage.setItem("uid", userData.id);
  //       navigate("/User");
  //     } else if (adminData) {
  //       sessionStorage.setItem("uid", adminData.id);
  //       navigate("/Admin");
  //     } else {
  //       alert("User not found or unauthorized!");
  //     }
  //   } catch (err) {
  //     console.error("Unexpected error:", err);
  //     alert("Something went wrong. Please try again.");
  //   }
  // };


  return (
    <div className={styles.container}>
      <h1 align="center">LOGIN</h1>
      <div className={styles.inp1}>
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'gray' },
              '&:hover fieldset': { borderColor: '#7e57c2' },
              '&.Mui-focused fieldset': { borderColor: '#4a148c' },
            },
            '& .MuiInputLabel-root': {
              color: 'gray',
              '&.Mui-focused': { color: '#4a148c' },
            },
          }}
        />
      </div>
      <div className={styles.inp1}>
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={showPassword ? 'text' : 'password'}
          fullWidth
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'gray' },
              '&:hover fieldset': { borderColor: '#7e57c2' },
              '&.Mui-focused fieldset': { borderColor: '#4a148c' },
            },
            '& .MuiInputLabel-root': {
              color: 'gray',
              '&.Mui-focused': { color: '#4a148c' },
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleTogglePassword} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div className={styles.inp1}>
        <Button variant="contained" fullWidth sx={{ backgroundColor: '#6a1b9a' }} onClick={handleLogin}>
          Log In
        </Button>
      </div>
    </div>
  );
};

export default Login;
