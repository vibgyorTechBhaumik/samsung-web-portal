import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import ParticipantDetails from './participant-details';
import HorizontalComplianceChart from '../custom-charts/horizontal-bar-chart';
import { executeLocalQuery } from '../../chart-editor/sourceModal.slice';
import { useSelectedStudyId } from '../../../studies/studies.slice';

type Participant = {
    id: string;
    name: string;
    age: number;
    sex: 'Male' | 'Female';
    arm: 'Watch' | 'Control';
    deviceId: string;
    week: string;
    duration: string;
    resistanceDays: string;
    biaStatus: string;
    weight: string;
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
  grid-template-columns: 1.5fr 1fr 2fr 2fr 2fr 1fr;
  background-color: #a7c7f0;
  padding: 10px;
  font-weight: bold;
  align-items: center;
`;

const DataRow = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr 2fr 2fr 2fr 1fr;
  padding: 10px;
  align-items: center;
  font-weight: normal;
`;

const Highlight = styled.div`
  padding: 8px;
  text-align: center;
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
    color: grey;
  }
`;

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TabTitle = styled.h3`
  font-size: 36px;
  font-weight: bold;
  margin: 0px;
`;

const TabSubTitle = styled.h3`
  font-size: 24px;
  font-weight: bold;
  margin: 0px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px;
  border: 3px solid #0c2340;
  margin-bottom:10px;
`;

const InfoBlock = styled.div`
  font-size: 1.2em;
  line-height: 1.5;
`;

const BackButton = styled.button`
  background-color: #a7c7f0;
  border: 3px solid #0c2340;
  font-weight: bold;
  padding: 5px 10px;
  cursor: pointer;
  margin-bottom: 15px;

  &:hover {
    background-color: #89b2e0;
  }
`;

const HeaderCell = styled.div`
  text-align: center
`;


const ParticipantTable: React.FC = () => {
    const studyId = useSelectedStudyId();
    const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);
    const [data, setData] = useState<any>();

    const sumExerciseDataByID = (data:any) => {
        return _(data)
          .groupBy('subjectid')
          .map((entries, subjectid) => {
            return {
              subjectid,
              totalCalorie: _.sumBy(entries, 'calorie'),
              totalDuration: _.sumBy(entries, 'duration'),
              totalDistance: _.sumBy(entries, 'distance')
            };
          })
          .value();
      }

    const fetchData = async () => {
      if (studyId){
        const response: any = await executeLocalQuery(studyId, {
          database: `study_${studyId}`,
          query: 'select * from exercise',
        });
        const formattedData = sumExerciseDataByID(response.data)
        setData(formattedData);
      }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <Header>
                {selectedParticipant ?
                    <InfoBlock>
                        <BackButton onClick={() => setSelectedParticipant(null)}>← Back to Weekly View</BackButton>
                        <TabTitle>
                            {selectedParticipant.id}
                        </TabTitle>
                        <TabSubTitle>
                            {selectedParticipant.name}
                        </TabSubTitle>
                        <TabSubTitle>
                            {selectedParticipant.sex}, {selectedParticipant.age} years old
                        </TabSubTitle>
                        <TabSubTitle>
                            ARM: {selectedParticipant.arm} (ID: {selectedParticipant.deviceId})
                        </TabSubTitle>
                    </InfoBlock> :
                    (<TitleSection>
                        <TabTitle>
                            MGH-BICEP Study Weekly Report
                        </TabTitle>
                        <TabTitle>
                            97 Active Participants
                        </TabTitle>
                    </TitleSection>)}
                <HorizontalComplianceChart
                    categories={[
                        { name: 'Activity', value: 100, color: '#00b44a' },
                        { name: 'Resistance', value: 25, color: '#f44336' },
                        { name: 'Weight', value: 82, color: '#ffeb3b' },
                        { name: 'BIA', value: 100, color: '#00b44a' }
                    ]}
                />
            </Header>
            {selectedParticipant ? (
                <ParticipantDetails
                    logs={[
                        { week: 'Week 12', duration: '20 mins', resistance: '0 days', bia: 'Not Completed', weight: '75.1kg' },
                        { week: 'Week 11', duration: '130 mins', resistance: '1 day', bia: 'Completed', weight: 'Not completed' },
                        { week: 'Week 1', duration: '220 mins', resistance: '3 days', bia: 'Completed', weight: '76.1kg' },
                    ]}
                />
            ) : (
                <TableContainer>
                    <HeaderRow>
                        <HeaderCell>Subject ID</HeaderCell>
                        <HeaderCell>Week</HeaderCell>
                        <HeaderCell>Duration of Moderate - <br/>Intensity Exercise</HeaderCell>
                        <HeaderCell>Days of Resistance Training</HeaderCell>
                        <HeaderCell>BIA Completed?</HeaderCell>
                        <HeaderCell>Weight</HeaderCell>
                    </HeaderRow>

                    {data?.map((p: any) => (
                        <DataRow key={p._id}>
                            <UnderlinedButton onClick={() => setSelectedParticipant(p)}>
                                {p.subjectid}
                            </UnderlinedButton>
                            <Highlight>Week 1</Highlight>
                            <Highlight>{Number(p.totalDuration/ 60000).toFixed(0)} mins</Highlight>
                            <Highlight>0 days</Highlight>
                            <Highlight>Not Completed</Highlight>
                            <Highlight>75 kg</Highlight>
                        </DataRow>
                    ))}
                </TableContainer>
            )}
        </div>
    );
};

export default ParticipantTable;
