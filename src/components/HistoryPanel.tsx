import React from "react";
import { List, ListItemButton, ListItemText } from "@mui/material";
import { TestResult } from "../types/types";

interface ConnectionsProps {
  onSelectTest: (test: TestResult) => void;
}

const Connections = ({ onSelectTest }: ConnectionsProps) => {
    const sampleTests: TestResult[] = [

      ];
      
  return (
    <List>
      {sampleTests.map((test) => (
        <ListItemButton key={test.TestId} onClick={() => onSelectTest(test)}>
          <ListItemText primary={test.Name} />
        </ListItemButton>
      ))}
    </List>
  );
};

export default Connections;
