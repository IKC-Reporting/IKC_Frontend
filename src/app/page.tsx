"use client";

import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";

type EmployeeHour = {
  employeeName: string;
  hoursPerMonth1: number;
  hoursPerMonth2: number;
  hoursPerMonth3: number;
  totalHours: number;
  hourly: number;
  total: number;
};

type OtherContribution = {
  item: string;
  date: string | null;
  details: string | null;
  value: number | null;
};

export const GET_EMPLOYEE_HOURS = gql`
  query GetEmployeeHours {
    employeeHours {
      employeeName
      hoursPerMonth1
      hoursPerMonth2
      hoursPerMonth3
      totalHours
      hourly
      total
    }
  }
`;

export const GET_OTHER_CONTRIBUTIONS = gql`
  query GetOtherContributions {
    otherContributions {
      item
      date
      details
      value
    }
  }
`;

export default function Home() {
  const { loading: loadingHours, error: errorHours, data: dataHours } = useQuery<{ employeeHours: EmployeeHour[] }>(GET_EMPLOYEE_HOURS);
  const { loading: loadingContributions, error: errorContributions, data: dataContributions } = useQuery<{ otherContributions: OtherContribution[] }>(GET_OTHER_CONTRIBUTIONS);

  useEffect(() => {
    if (dataHours) {
      console.log("Employee Hours Data:", dataHours);
    }
    if (dataContributions) {
      console.log("Other Contributions Data:", dataContributions);
    }
  }, [dataHours, dataContributions]);

  if (loadingHours || loadingContributions) return <p>Loading...</p>;
  if (errorHours || errorContributions) return <p>Error :(</p>;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Home</h1>
      <div>
        <h2>Employee Hours</h2>
        {dataHours?.employeeHours.map((employee: EmployeeHour) => (
          <div key={employee.employeeName}>
            <p><strong>Name:</strong> {employee.employeeName}</p>
            <p><strong>Hours in Month 1:</strong> {employee.hoursPerMonth1}</p>
            <p><strong>Hours in Month 2:</strong> {employee.hoursPerMonth2}</p>
            <p><strong>Hours in Month 3:</strong> {employee.hoursPerMonth3}</p>
            <p><strong>Total Hours:</strong> {employee.totalHours}</p>
            <p><strong>Hourly Rate:</strong> {employee.hourly}</p>
            <p><strong>Total:</strong> {employee.total}</p>
          </div>
        ))}
      </div>
      <div>
        <h2>Other Contributions</h2>
        {dataContributions?.otherContributions.map((contribution: OtherContribution, index: number) => (
          <div key={index}>
            <p><strong>Item:</strong> {contribution.item}</p>
            <p><strong>Date:</strong> {contribution.date ?? "N/A"}</p>
            <p><strong>Details:</strong> {contribution.details ?? "N/A"}</p>
            <p><strong>Value:</strong> {contribution.value ?? "N/A"}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
