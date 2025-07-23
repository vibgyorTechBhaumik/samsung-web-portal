import React from 'react';
import styled from 'styled-components';

type Participant = {
  id: string;
  metric: string;
};


const TableContainer = styled.div`
  padding: 10px;
  border: 5px solid #0c2340;
  border-radius: 5px;
  font-family: sans-serif;
  color: black;
`;

const HeaderRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 10fr;
  background-color: #a7c7f0;
  padding: 10px;
  font-weight: bold;
`;

const DataRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 10fr;
  padding: 10px;
  align-items: center;
`;


const UnderlinedButton = styled.button`
  background: none;
  border: none;
  font-weight: bold;
  text-decoration: underline;
  cursor: pointer;
  font-size: 1em;
  padding: 0;
  
  &:hover {
    color:grey;
  }
`;

const TabTitle = styled.h3`
  font-size: 36px;
  font-weight: bold;
  margin: 0px;
`;


const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px;
  border: 3px solid #0c2340;
  margin-bottom:10px;
`;

interface ParticipantTableProps {
  participants: Participant[];
}

const Adherence: React.FC<ParticipantTableProps> = ({ participants }) => {

  return (
    <div>
      <Header>
        <TabTitle>
          MGH-BICEP Study Protocol Adherence Report
        </TabTitle>
        <TabTitle>
          5 Participants Not Meeting Goals
        </TabTitle>
      </Header>
      <TableContainer>
        <HeaderRow>
          <div>Participant ID</div>
          <div>Metric</div>
        </HeaderRow>

        {participants.map((p) => (
          <DataRow key={p.id}>
            <UnderlinedButton>
              {p.id}
            </UnderlinedButton>
            <div>{p.metric}</div>
          </DataRow>
        ))}
      </TableContainer>
    </div>
  );
};

export default Adherence;
