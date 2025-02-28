import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";

interface TestFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (testData: { testName: string; url: string; requestsPerSecond: number; duration: number }) => void;
}

const TestForm: React.FC<TestFormProps> = ({ open, onClose, onSubmit }) => {
  const [testName, setTestName] = useState("");
  const [url, setUrl] = useState("");
  const [requestsPerSecond, setRequestsPerSecond] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState<string>("");

  const handleSubmit = () => {
    if (!testName || !url || !requestsPerSecond || !duration) {
      setError("All fields are required!");
      return;
    }

    const testData = {
      testName,
      url,
      requestsPerSecond,
      duration,
    };
    onSubmit(testData); 

    setTestName("");
    setUrl("");
    setRequestsPerSecond(0);
    setDuration(0);
    setError(""); // Clear any error messages
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Start New Test</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Test Name"
          type="text"
          fullWidth
          variant="outlined"
          value={testName}
          onChange={(e) => setTestName(e.target.value)}
          required 
          error={!!error}
          helperText={error && "This field is required"}
        />
        <TextField
          margin="dense"
          label="URL"
          type="text"
          fullWidth
          variant="outlined"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required 
          error={!!error}
          helperText={error && "This field is required"}
        />
        <TextField
          margin="dense"
          label="Requests per Second"
          type="number"
          fullWidth
          variant="outlined"
          value={requestsPerSecond}
          onChange={(e) => setRequestsPerSecond(Number(e.target.value))}
          required 
          error={!!error}
          helperText={error && "This field is required"}
        />
        <TextField
          margin="dense"
          label="Duration (seconds)"
          type="number"
          fullWidth
          variant="outlined"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          required 
          error={!!error}
          helperText={error && "This field is required"}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TestForm;
