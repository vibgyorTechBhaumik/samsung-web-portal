import React from 'react';
import ReactECharts from 'echarts-for-react';
import styled from 'styled-components';
import { EChartsOption } from 'echarts';

const ChartWrapper = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
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


interface HalfDonutGaugeProps {
  value: number;
  max?: number;
  title?: string;
}

const HalfDonutGauge: React.FC<HalfDonutGaugeProps> = ({
  value,
  title = '',
  max = 100,
}) => {
  const option: EChartsOption = {
    series: [
      {
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: max,
        splitNumber: 1,
        radius: '100%',
        progress: {
          show: true,
          width: 20,
          itemStyle: {
            color: '#4285F4',
          },
        },
        axisLine: {
          lineStyle: {
            width: 20,
            color: [[1, '#ccc']],
          },
        },
        pointer: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: false, // Hide default labels
        },
        detail: {
          valueAnimation: true,
          fontSize: 28,
          offsetCenter: [0, '10%'],
          formatter: '{value}',
        },
        data: [
          {
            value,
          },
        ],
      },
    ],
    graphic: [
      {
        type: 'text',
        left: '20%',
        top: '55%',
        style: {
          text: '0',
          fontSize: 12,
          fill: '#333',
        },
      },
      {
        type: 'text',
        right: '20%',
        top: '55%',
        style: {
          text: String(max),
          fontSize: 12,
          fill: '#333',
        },
      },
    ],
  };


  return (
    <ChartWrapper>
      {title && <ChartTitle>{title}</ChartTitle>}
      <ReactECharts option={option} style={{ height: 250 }} />
    </ChartWrapper>
  );
};

export default HalfDonutGauge;
