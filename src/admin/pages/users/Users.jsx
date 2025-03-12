import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import supabase from "../../../utilities/supabase";
import { Link } from "react-router-dom";
import { Button, Stack } from "@mui/material";
import { Padding } from "@mui/icons-material";

const User = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch crime data
  const fetchUser = async () => {
    const { data, error } = await supabase.from("tbl_user").select();
    if (error) {
      console.error("Error fetching crime data:", error);
    } else {
      setUserData(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);


  const handleAccept = async(id) => {
    const { error } = await supabase
  .from('tbl_user')
  .update({ user_status: 1 })
  .eq('id', id)

    if(error) {
      console.error("Supabase Update Error:", error.message);
    } else {
      console.log("Supabase database updated successfully.");
      fetchUser()
    }

  }

  const handleReject = async(id) => {
    const { error } = await supabase
  .from('tbl_user')
  .update({ user_status: 0 })
  .eq('id', id)

    if(error) {
      console.error("Supabase Update Error:", error.message);
    } else {
      console.log("Supabase database updated successfully.");
      fetchUser()
    }

  }

  if (loading) return <p>Loading...</p>;
  if (userData.length === 0) return <p>No user data available.</p>;

  return (
    <div >
      <h1 align="center">Users Database</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650, Padding:"10px" }} size="small" aria-label="crime table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Proof</TableCell>
              <TableCell>Photo</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Verification</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.user_name}</TableCell>
                <TableCell>{user.user_email}</TableCell>
                <TableCell>{user.user_phone}</TableCell>
                <TableCell>{user.user_address}</TableCell>
                <TableCell><img src={user.user_photo}  width={100}/></TableCell>
                <TableCell>
                <img src={user.user_proof}  width={100}/>
                </TableCell>
                <TableCell>
                  {user.user_status}
                </TableCell>
                <TableCell>
                  <Stack direction="row" gap={2}>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleAccept(user.id)}
                    >
                      Accept User
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleReject(user.id)}
                    >
                      Reject User
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default User;
