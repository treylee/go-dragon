import React from "react";
import { TestResult } from "../types/types";
import useWebSocket from "../hooks/useWebsocket";

interface LiveTestViewProps {
  test: TestResult;
  testId: string; 
}

const LiveTestView = ({ test, testId }: LiveTestViewProps) => {
  const metrics = useWebSocket(testId); 
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", backgroundColor: "white", padding: "16px" }}>
      <h3>Metrics for {test?.Name || "Unknown Test"}</h3>
      <pre>{metrics ? JSON.stringify(metrics, null, 2) : "No metrics yet"}</pre>
    </div>
  );
};

export default LiveTestView;
