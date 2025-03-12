import React, { useEffect, useState } from 'react'
import supabase from '../../../utilities/supabase';
import style from './CrimeDetails.module.css'
import { Button, TextField } from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';

const CrimeDetails = () => {
  const [details, setDetails] = useState("");
  const [subjcet, setSubject] = useState("");
  const [crimeData, setCrimeData] = useState([]);
  const [typedata, setTypeData] = useState("");

  const handleAddLocation = async () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      const newLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      const crimeData = {

        crime_lan: newLocation.lat.toString(),
        crime_log: newLocation.lng.toString(),
        crime_details: details,
        crime_subject: subjcet,
        crime_user_id: sessionStorage.getItem('uid'),
        crime_type_id: typedata
      }
      try {
        const { error } = await supabase
          .from("tbl_crime")
          .insert([crimeData]);

        if (error) {
          console.error("Supabase Insert Error:", error.message);
        } else {
          console.log("Location added to database successfully.");
          alert("Crime added to database Successfully!");
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      }
    });
  };

  const [type, setType] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchType = async () => {
    const { data, error } = await supabase.from("tbl_type").select();
    if (error) {
      console.error("Error fetching crime data:", error);
    } else {
      console.log(data);
      setType(data);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchType()
  }, [])





  return (
    <div className={style.main}>
      <h1 align='center'>CRIME DETAILS</h1>
      <div className={style.detailsbox}>
        <div className={style.inp1}>
          <TextField id="outlined-basic" label="Summary" variant="outlined" onChange={(e) => setSubject(e.target.value)} />
        </div>
        <div className={style.inp1}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={typedata}
              label="Type"
              onChange={(e) => setTypeData(e.target.value)}
              sx={{
                width: 225

              }}
            >
              {type.map((type) => (
                <MenuItem value={type.id} >{type.type_name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className={style.inp1}>
          <TextField
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={4}
            onChange={(e) => setDetails(e.target.value)}
          />
        </div>
        <div className={style.inp1}>
          <Button variant="contained" onClick={handleAddLocation}>Submit</Button>
        </div>
      </div>
    </div>
  )
}

export default CrimeDetails