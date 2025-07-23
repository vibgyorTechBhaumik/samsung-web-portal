import React from 'react';
import ReactECharts from 'echarts-for-react';
import styled from 'styled-components';
import { EChartsOption } from 'echarts';

const ChartWrapper = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const ChartTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 12px;
  text-align: center;
  padding-left: 8px;
`;

export interface DonutChartData {
    name: string;
    value: number;
}

interface DonutChartProps {
    title: string;
    data: DonutChartData[];
    colors?: string[];
}

const DonutChart: React.FC<DonutChartProps> = ({ title, data, colors }) => {
    const option: EChartsOption = {
        tooltip: {
            trigger: 'item',
            formatter: '{b}: {d}%',
        },
        legend: {
            orient: 'horizontal',
            top: 'bottom',
            textStyle: {
                fontSize: 12,
            },
        },
        color: colors || ['#4285F4', '#FB923C'], // default blue & orange
        series: [
            {
                type: 'pie',
                center: ['50%', '35%'],
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    show: true,
                    position: 'inside',
                    formatter: '{d}%',
                    fontSize: 14,
                },
                labelLine: {
                    show: false,
                },
                data,
            },
        ],
    };

    return (
        <ChartWrapper>
            <ChartTitle>{title}</ChartTitle>
            <ReactECharts option={option} style={{ height: 250 }} />
        </ChartWrapper>
    );
};

export default DonutChart;
