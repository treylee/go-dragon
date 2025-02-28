import React from "react";
import { Box, Typography, Button } from "@mui/material";

const WelcomeScreen = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <Typography variant="h4" color="primary" gutterBottom>
        Welcome to the Performance Testing Dashboard
      </Typography>
      <Typography variant="body1" color="textSecondary" paragraph>
        Select a test from the list to view detailed performance data or create
        a new test to monitor.
      </Typography>
      <Button variant="contained" color="primary" onClick={() => alert("Start a new test!")}>
        Start a New Test
      </Button>
    </Box>
  );
};

export default WelcomeScreen;
