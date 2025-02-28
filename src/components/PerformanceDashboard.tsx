import React, { useState } from "react";
import Connections from "./HistoryPanel";
import View from "./View";
import WelcomeScreen from "./WelcomeScreen";
import { TestResult } from "../types/types";
import { Button, Box, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TestForm from "./TestForm";

const PerformanceDashboard = () => {
  const [tabs, setTabs] = useState<TestResult[]>([]);
  const [selectedTabId, setSelectedTabId] = useState<number>(0);
  const [isTestFormOpen, setIsTestFormOpen] = useState<boolean>(false);

  const handleAddTab = () => {
    setIsTestFormOpen(true);
  };

  const handleFormSubmit = (testData: { testName: string; url: string; requestsPerSecond: number; duration: number }) => {
    const newTest = new TestResult(testData);
    setTabs((prevTabs) => {
      const updatedTabs = [...prevTabs, newTest];
      setSelectedTabId(updatedTabs.length - 1);
      return updatedTabs;
    });
    setIsTestFormOpen(false);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", backgroundColor: "#f0f0f0", padding: 0, margin: 0, overflow: "hidden" }}>
      <Box sx={{ display: "flex", flex: 1, gap: "20px", height: "100%" }}>
        {/* Left Panel */}
        <Box sx={{ width: "25%", display: "flex", flexDirection: "column", gap: "15px", height: "100%" }}>
          <Box sx={{ backgroundColor: "white", display: "flex", alignItems: "center", justifyContent: "space-between", borderRadius: "12px", padding: "10px", boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", flexShrink: 0 }}>
            <Typography variant="body1" sx={{ color: "gray", fontWeight: "bold" }}>Initiate New Test</Typography>
            <Button variant="contained" sx={{ minWidth: "40px", width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "white", color: "#2c8dab" }} onClick={handleAddTab}>
              <AddIcon />
            </Button>
          </Box>
          <Box sx={{ flex: 1, backgroundColor: "white", padding: "10px", borderRadius: "12px", boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", overflowY: "auto" }}>
            <Connections onSelectTest={(test) => setSelectedTabId(tabs.indexOf(test))} />
          </Box>
        </Box>

        {/* Right Panel */}
        <Box sx={{ width: "75%", backgroundColor: "white", borderRadius: "12px", boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", display: "flex", flexDirection: "column", height: "100%", padding: 0, overflow: "hidden" }}>
          {tabs.length === 0 ? <WelcomeScreen /> : <View tabs={tabs} selectedTabId={selectedTabId} onChangeTab={setSelectedTabId} />}
        </Box>
      </Box>

      {isTestFormOpen && <TestForm open={isTestFormOpen} onSubmit={handleFormSubmit} onClose={() => setIsTestFormOpen(false)} />}
    </Box>
  );
};

export default PerformanceDashboard;
