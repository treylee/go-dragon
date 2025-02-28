import React, { useState, useEffect } from "react";
import { TestResult } from "../types/types";
import axios from "axios";
import { Box, Tabs, Tab } from "@mui/material";
import LiveTestView from "./LiveTestView";
import DeadTestView from "./DeadTestView";

interface ViewProps {
  tabs: TestResult[];
  selectedTabId: number;
  onChangeTab: (tabId: number) => void;
}

const View = ({ tabs, selectedTabId, onChangeTab }: ViewProps) => {
  const [testStates, setTestStates] = useState<boolean[]>([]);
  const [testIds, setTestIds] = useState<Map<number, string>>(new Map());

  useEffect(() => {
    const updatedStates = tabs.map((test) => test.TestCompleted);
    setTestStates(updatedStates);
  }, [tabs]);

  useEffect(() => {
    const selectedTest = tabs[selectedTabId];

    if (selectedTest && !selectedTest.TestCompleted && !testIds.has(selectedTabId)) {
      const startTest = async () => {
        const payload = {
          testName: selectedTest.Name,
          requestPerSecond: selectedTest.RequestsPerSecond,
          url: selectedTest.Url,
          duration: selectedTest.TestDuration,
        };

        try {
          const response = await axios.post("http://localhost:8080/start", payload);
          const newTestId = response.data.testID;

          setTestIds((prevTestIds) => {
            const updatedTestIds = new Map(prevTestIds);
            updatedTestIds.set(selectedTabId, newTestId);
            return updatedTestIds;
          });

          sessionStorage.setItem(`testId-${selectedTest.Name}`, newTestId);
        } catch (error) {
          console.error("API Error:", error);
        }
      };

      startTest();
    } else {
      const storedTestId = sessionStorage.getItem(`testId-${selectedTest.Name}`);
      if (storedTestId && !testIds.has(selectedTabId)) {
        setTestIds((prevTestIds) => {
          const updatedTestIds = new Map(prevTestIds);
          updatedTestIds.set(selectedTabId, storedTestId);
          return updatedTestIds;
        });
      } else {
        console.error("Test ID not found in sessionStorage.");
      }
    }
  }, [selectedTabId, tabs, testIds]);

  const currentTestId = testIds.get(selectedTabId) || "";

  return (
    <Box sx={{ flex: 1, overflow: "auto", padding: 2 }}>
      <Box
        sx={{
          overflowX: "auto",
          whiteSpace: "nowrap",
          scrollbarWidth: "thin", // For Firefox
          "&::-webkit-scrollbar": {
            height: "6px", 
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#888",
            borderRadius: "5px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#555",
          },
        }}
      >
        <Tabs
          value={selectedTabId}
          onChange={(e, newValue) => onChangeTab(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            backgroundColor: "#f5f5f5",
            borderRadius: "8px",
            padding: "5px",
            display: "inline-flex",
            gap: "5px",
          }}
        >
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              label={tab.Name}
              sx={{
                textTransform: "none",
                fontWeight: selectedTabId === index ? "bold" : "normal",
                backgroundColor: selectedTabId === index ? "white" : "#ddd",
                color: selectedTabId === index ? "black" : "#666",
                borderRadius: "8px",
                margin: "5px",
                transition: "background-color 0.2s, color 0.2s",
                "&:hover": {
                  backgroundColor: selectedTabId === index ? "#fff" : "#bbb",
                },
              }}
            />
          ))}
        </Tabs>
      </Box>

      {tabs[selectedTabId] ? (
        testStates[selectedTabId] ? (
          <DeadTestView test={tabs[selectedTabId]} />
        ) : (
          <LiveTestView test={tabs[selectedTabId]} testId={currentTestId} />
        )
      ) : (
        <p>No test selected.</p>
      )}
    </Box>
  );
};

export default View;
