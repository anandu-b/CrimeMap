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

const CrimeList = () => {
  const [crimeData, setCrimeData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch crime data
  const fetchCrime = async () => {
    const { data, error } = await supabase.from("tbl_crime").select();
    if (error) {
      console.error("Error fetching crime data:", error);
    } else {
      setCrimeData(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCrime();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (crimeData.length === 0) return <p>No crime data available.</p>;

  // Function to update crime status
  const updateCrimeStatus = async (id, status) => {
    const { error } = await supabase
      .from("tbl_crime")
      .update({ crime_status: status })
      .eq("id", id);

    if (error) {
      console.error("Error updating status:", error);
    } else {
      
      // Refresh data after updating
      alert(status === 1 ? "Crime Accepted" : "Crime Rejected");
      fetchCrime();
    }
  };

  return (
    <div>
      <h1 align="center">RECENT CRIMES</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="crime table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Details</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>Verification</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {crimeData.map((crime) => (
              <TableRow key={crime.id}>
                <TableCell>{crime.id}</TableCell>
                <TableCell>{crime.crime_subject}</TableCell>
                <TableCell>{crime.crime_details || "No details"}</TableCell>
                <TableCell>{crime.crime_status === '1' ? "Accepted" : crime.crime_status === '2' ? "Rejected" : "Unknown"}</TableCell>
                <TableCell>
                  <Link to={`/officials/showmap/${crime.id}`}>View In Map</Link>
                </TableCell>
                <TableCell>
                  <Stack direction="row" gap={2}>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => updateCrimeStatus(crime.id, 1)}
                    >
                      Accept
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => updateCrimeStatus(crime.id, 2)}
                    >
                      Reject
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

export default CrimeList;
