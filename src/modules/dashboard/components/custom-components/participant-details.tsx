import React from 'react';
import styled from 'styled-components';

type WeeklyLog = {
  week: string;
  duration: string;
  resistance: string;
  bia: string;
  weight: string;
};

type ParticipantDetailsProps = {
  logs: WeeklyLog[];
};

const Container = styled.div`
  background-color: #4a90e2;
  padding: 20px;
  border: 5px solid #0c2340;
  font-family: sans-serif;
  color: black;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 2fr 2fr 1fr;
  background-color: #a7c7f0;
  padding: 10px;
  font-weight: bold;
  border-top: 3px solid #0c2340;
  border-bottom: 3px solid #0c2340;
  margin-top: 20px;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 2fr 2fr 1fr;
  background-color: #f9ff4f;
  padding: 10px;
  margin: 5px 0;
  border: 3px solid #0c2340;
`;

const ScrollContainer = styled.div`
  max-height: 300px;
  overflow-y: auto;
  margin-top: 10px;
`;

const ParticipantDetails: React.FC<ParticipantDetailsProps> = ({
  logs,
}) => {
  return (
    <Container>
      <TableHeader>
        <div>Week</div>
        <div>Duration of Moderate-Intensity Exercise</div>
        <div>Days of Resistance Training</div>
        <div>BIA Completed?</div>
        <div>Weight</div>
      </TableHeader>

      <ScrollContainer>
        {logs.map((log, idx) => (
          <TableRow key={idx}>
            <div>{log.week}</div>
            <div>{log.duration}</div>
            <div>{log.resistance}</div>
            <div>{log.bia}</div>
            <div>{log.weight}</div>
          </TableRow>
        ))}
      </ScrollContainer>
    </Container>
  );
};

export default ParticipantDetails;
