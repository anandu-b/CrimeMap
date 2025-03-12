import { Typography, Container, Box } from "@mui/material";
import React from "react";

const CrimeRadar = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
        background: "linear-gradient(to bottom, #d1c4e9, #b39ddb)",
        color: "white",
        textAlign: "left",
        padding: "20px",
      }}
    >
      <Container maxWidth="sm">
        <Typography
          variant="h2"
          sx={{
            color: "white",
            fontWeight: "bold",
            letterSpacing: "2px",
            marginBottom: "20px",
          }}
        >
          Crime Radar
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: "18px",
            lineHeight: "1.6",
            opacity: 0.9,
          }}
        >
          Crime Radar is a real-time crime mapping platform designed to enhance public safety by providing up-to-date crime reports.
          Our interactive map highlights crime hotspots, allowing users to stay informed and take necessary precautions.
          Verified users can report crimes instantly, where the officials can view the crime in real time and act accordingly.
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: "18px",
            lineHeight: "1.6",
            opacity: 0.9,
            marginTop:"10px"
          }}
        >
          Our main aim is to create a safe and secure environment for peaceful life.
          Stay aware, stay safe, and help make your community a better place.
        </Typography>
      </Container>
    </Box>
  );
};

export default CrimeRadar;