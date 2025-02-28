import React from "react";
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
import { TestResult } from "../types/types";

interface DeadTestViewProps {
  test: TestResult;
}

const DeadTestView = ({ test }: DeadTestViewProps) => {
  return (
    <Box sx={{ padding: "16px" }}>
      <Card sx={{ boxShadow: 3, borderRadius: "8px" }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "#2c8dab" }}>
            {test.Name}
          </Typography>
          <Grid container spacing={2} sx={{ marginTop: "16px" }}>
            <Grid item xs={6}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Request Per Second:
              </Typography>
              <Typography variant="body2">{test.RequestsPerSecond}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Duration:
              </Typography>
              <Typography variant="body2">{test.TestDuration} second(s)</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Error rate:
              </Typography>
              <Typography variant="body2">{test.ErrorRate}%</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Avg. Response Time:
              </Typography>
              <Typography variant="body2">{test.AvgResponseTime} ms</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Total Response Times:
              </Typography>
              <Typography variant="body2">{test.ResponseTime} ms</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                P50 Response Time:
              </Typography>
              <Typography variant="body2">{test.P50ResponseTime} ms</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                P95 Response Time:
              </Typography>
              <Typography variant="body2">{test.P95ResponseTime} ms</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                P99 Response Time:
              </Typography>
              <Typography variant="body2">{test.P99ResponseTime} ms</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                CPU Usage:
              </Typography>
              <Typography variant="body2">{}%</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Memory Usage:
              </Typography>
              <Typography variant="body2">{}%</Typography>
            </Grid>
          </Grid>

          <Box sx={{ marginTop: "16px", textAlign: "center" }}>
            <Typography variant="body2" sx={{ fontStyle: "italic", color: "gray" }}>
              Test completed at: {test.Date}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DeadTestView;
