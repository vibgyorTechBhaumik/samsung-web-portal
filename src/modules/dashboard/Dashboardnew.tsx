import React, { useMemo, useState } from 'react';
import styled from 'styled-components';

import { px } from 'src/styles';
import { useSelectedStudyId } from '../studies/studies.slice';
import { useDashboardList } from './dashboardList.slice';
import { useTranslation } from '../localization/useTranslation';

import SettingsModal from './SettingsModal';
import Tabs from 'src/common/components/Tabs';
import Button from 'src/common/components/Button';
import ServiceScreen from 'src/common/components/ServiceScreen';
import { ChartListLoading } from './chart-list/ChartList';
import SkeletonLoading, { SkeletonRect } from 'src/common/components/SkeletonLoading';
import CollapseSection from 'src/common/components/CollapseSection';
import { useCreateChart } from './chart-list/chartList.slice';
import { useModal } from './components/chart.utils';


import HalfDonutGauge from './components/custom-charts/half-donut-gauge';
import DonutChart from './components/custom-charts/donut-chart';
import ComplianceBarChart from './components/custom-charts/bar-chart';
import HorizontalComplianceChart from './components/custom-charts/horizontal-bar-chart';
import ParticipantTable from './components/custom-components/participant-table';
import Adherence from './components/custom-components/adherence';

const DashboardContainer = styled.div`
  margin: 0 50px;
`;

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  padding: 16px;
`;

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 300px; 
`;

const Header = styled.div`
  width:75%;
  display: flex;
  font-size: 36px;
  font-weight: bold;
  justify-content: space-between;
  padding: 15px;
  border: 3px solid #0c2340;
  margin-bottom:10px;
`;

const Dashboard = () => {
  const { t } = useTranslation();
  const studyId = useSelectedStudyId();
  const settingsModal = useModal<{ studyId: string; dashboardId: string; }>();
  const { isEditble, create } = useCreateChart();
  const { isLoading, data, error, refetch } = useDashboardList({
    fetchArgs: !!studyId && { studyId },
  });

  const [activeTabIdx, setActiveTabIdx] = useState<number>(0);
  const tabs = useMemo(() => (data || []).map(c => c.title), [data]);
  const onTabChange = (idx: number) => { setActiveTabIdx(idx) };

  const onAddChart = () => {
    if (!isEditble || !data || !data[activeTabIdx]) return;
    create({ dashboardId: data[activeTabIdx].id });
  };
  const onSettingsClick = () => {
    if (!studyId || !data || !data[activeTabIdx]) return;
    settingsModal.open({ studyId, dashboardId: data[activeTabIdx].id });
  };

  if (!isLoading && error) {
    return (
      <DashboardContainer data-testid="dashboard">
        <CollapseSection
          title={t('TITLE_DASHBOARD')}
        >
          <ServiceScreen
            type="error"
            title="Something went wrong. Please try again later."
            style={{ height: 'calc(100vh - 128px)' }}
            onReload={refetch}
          />
        </CollapseSection>
      </DashboardContainer>
    )
  };

  if (!isLoading && !data?.length) {
    return (
      <DashboardContainer data-testid="dashboard">
        <CollapseSection
          title={t('TITLE_DASHBOARD')}
        >
          <ServiceScreen
            type="empty"
            title="You need to create a dashboard first before you can create a chart."
            style={{ height: 'calc(100vh - 128px)' }}
          />
        </CollapseSection>
      </DashboardContainer>
    )
  };

  if (isLoading || !data) {
    return (
      <DashboardContainer data-testid="dashboard">
        <CollapseSection
          disabled={true}
          title={t('TITLE_DASHBOARD')}
        >
          <TabsContainer>
            <TabsLoading />
            <ButtonsLoading />
          </TabsContainer>
          <ChartListLoading />
        </CollapseSection>
      </DashboardContainer>
    )
  }

  const chartData = [
    { title: 'Watch Enrollment', value: 27, max: 50 },
  ];
  return (
    <DashboardContainer data-testid="dashboard">
      <CollapseSection
        title={t('TITLE_DASHBOARD')}
      >
        <TabsContainer>
          <Tabs items={['Overall', 'This Week', 'Adherence']} activeItemIdx={activeTabIdx} onTabChange={onTabChange} />
          <Buttons>
            <LogoutButton
              data-testid='logout-button'
              fill="solid"

            >
              Log out
            </LogoutButton>
          </Buttons>
        </TabsContainer>

        {activeTabIdx === 0 &&
          <div>
            <Header>
              MGH-BICEP Study Overall Report
            </Header>
            <GridWrapper>
              {chartData.map((item, idx) => (
                <HalfDonutGauge
                  key={idx}
                  value={item.value}
                  max={item.max}
                  title={item.title}
                />
              ))}
              <DonutChart title="Watch Arm: Sex" data={[
                { name: 'Male', value: 56 },
                { name: 'Female', value: 44 },
              ]} />
            </GridWrapper>
            <GridWrapper>
              <ComplianceBarChart title="Overall Compliance by Week" series={[
                {
                  name: 'Activity',
                  goal: '150mins/wk',
                  color: '#FF0000',
                  data: [55, 80, 70, 60, 100, 85, 87, 65, 90, 85, 100, 100, 100, 100, 100, 98, 85, 90, 92, 100, 90, 100, 95, 80, 100, 100],
                },
                {
                  name: 'BIA',
                  goal: 'Complete 1x/wk',
                  color: '#00CC00',
                  data: [95, 80, 70, 60, 100, 85, 87, 65, 90, 85, 100, 100, 100, 100, 100, 98, 85, 90, 92, 100, 90, 100, 95, 80, 100, 100],
                },
                {
                  name: 'Resistance',
                  goal: '2 days/wk',
                  color: '#3366FF',
                  data: [95, 80, 70, 60, 100, 85, 87, 65, 90, 85, 100, 100, 100, 100, 100, 98, 85, 90, 92, 100, 90, 100, 95, 80, 100, 100],
                },
                {
                  name: 'Weight',
                  goal: 'Complete 1x/wk',
                  color: '#333333',
                  data: [95, 80, 70, 60, 100, 85, 87, 65, 90, 85, 100, 100, 100, 100, 100, 98, 85, 90, 92, 100, 90, 100, 95, 80, 100, 100],
                },
              ]} />
            </GridWrapper>
            <GridWrapper>
              <HorizontalComplianceChart
                title="Overall Compliance by Category"
                categories={[
                  { name: 'Activity', value: 100, color: 'blue' },
                  { name: 'Resistance', value: 25, color: '#f44336' },
                  { name: 'Weight', value: 82, color: '#ffeb3b' },
                  { name: 'BIA', value: 100, color: '#00b44a' }
                ]}
              />
              <div></div>
            </GridWrapper>
          </div>}
        {activeTabIdx === 1 &&
          <ParticipantTable />}

        {activeTabIdx === 2 &&
          <Adherence
            participants={[
              { id: 'MGH-BICEP-001', metric: 'Has not completed 2 days of resistance, BIA, or weight' },
              { id: 'MGH-BICEP-002', metric: 'Has not completed 150mins activity' },
              { id: 'MGH-BICEP-003', metric: 'Has not completed 150mins activity' },
              { id: 'MGH-BICEP-004', metric: 'Has not completed 2 days of resistance, BIA, or weight' },
              { id: 'MGH-BICEP-005', metric: 'Has not completed 150mins activity' },
            ]
            }
          />}
        <SettingsModal
          data={settingsModal.data}
          onClose={settingsModal.close}
        />
      </CollapseSection>
    </DashboardContainer>
  );
};

export default Dashboard;

const TabsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${px(24)};
  min-height: ${px(48)};
`;

const Buttons = styled.div`
  display: flex;
  gap: ${px(10)};
`;

const LogoutButton = styled(Button)`
  width: ${px(96)};
  > div:first-child {
    > svg {
      margin-right: 0;
    }
  }
`;

const TabsLoadingContainer = styled.div`
  display: flex;
  column-gap: ${px(32)};
`;
const SkeletonContainer = styled(SkeletonLoading)`
`;

const TabsLoading = () => (
  <TabsLoadingContainer>
  </TabsLoadingContainer>
);

const ButtonsLoading = () => (
  <SkeletonContainer>
    <SkeletonRect x="0" y="0" width="164" height="48" />
    <SkeletonRect x="174" y="0" width="48" height="48" />
  </SkeletonContainer>
);
