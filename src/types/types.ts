export class TestResult {
  TestId: string | null = null;
  Name: string;
  Url: string;
  RequestsPerSecond: number;
  TestDuration: number;
  Requests: number;
  ResponseTime: number;
  AvgResponseTime: number;
  ErrorRate: number;
  ConcurrentUsers: number;
  FailedRequests: number;
  ResponseTimes: number[];
  P50ResponseTime: number;
  P95ResponseTime: number;
  P99ResponseTime: number;
  TestCompleted: boolean;
  CpuUsage: number;
  MemoryUsage: number;
  Date: string;

  constructor(testData: { testName: string; url: string; requestsPerSecond: number; duration: number }) {
    this.TestId = null; 
    this.Name = testData.testName;
    this.Url = testData.url;
    this.RequestsPerSecond = testData.requestsPerSecond;
    this.TestDuration = testData.duration;
    this.Requests = 0;
    this.ResponseTime = 0;
    this.AvgResponseTime = 0;
    this.ErrorRate = 0;
    this.ConcurrentUsers = 0;
    this.FailedRequests = 0;
    this.ResponseTimes = [];
    this.P50ResponseTime = 0;
    this.P95ResponseTime = 0;
    this.P99ResponseTime = 0;
    this.CpuUsage = 0;
    this.MemoryUsage = 0;
    this.TestCompleted = false;
    this.Date = new Date().toISOString()
  }
}

