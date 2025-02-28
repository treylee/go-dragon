import { useEffect, useState } from "react";
import { TestResult } from "../types/types"; 

const useWebSocket = (testId: string | null): TestResult | null => {
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    if (!testId) return; 

    const socketUrl = `ws://localhost:3001/ws?testid=${testId}`;
    const ws = new WebSocket(socketUrl);

    ws.onopen = () => {
      console.log(`WebSocket connected for testId: ${testId}`);
    };

    ws.onmessage = (event: MessageEvent) => {
      const data: TestResult = JSON.parse(event.data);
      console.log("Received data:", data);

      setTestResult((prevTestResult) => ({
        ...prevTestResult,
        ...data,
      }));

      if (data.TestCompleted) {
        console.log("Test Completed. Closing WebSocket...");
        ws.close();
      }
    };

    ws.onerror = (error: Event) => {
      console.error(`WebSocket Error [testId: ${testId}]:`, error);
    };

    ws.onclose = (event) => {
      console.log(`WebSocket closed for testId: ${testId}, Code: ${event.code}`);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [testId]); // Reconnect WebSocket when testId changes

  return testResult;
};

export default useWebSocket;
