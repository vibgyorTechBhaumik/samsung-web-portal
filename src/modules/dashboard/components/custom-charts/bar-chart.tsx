import React from 'react';
import ReactECharts from 'echarts-for-react';
import styled from 'styled-components';
import { EChartsOption } from 'echarts';

const ChartWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const HeaderRow = styled.div`
display: grid;
grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
gap: 24px;
padding: 16px;
`;

const ChartTitle = styled.h3`
  margin: 0;
  font-size: 20px;
  font-weight: bold;
`;

const LegendContainer = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
`;

const LegendColor = styled.span<{ color: string }>`
  display: inline-block;
  width: 12px;
  height: 12px;
  background-color: ${({ color }) => color};
  margin-right: 6px;
  border-radius: 2px;
`;

export interface ComplianceSeries {
    name: string;
    goal: string;
    color: string;
    data: number[];
}

interface ComplianceBarChartProps {
    title: string;
    series: ComplianceSeries[];
}

const ComplianceBarChart: React.FC<ComplianceBarChartProps> = ({
    title,
    series,
}) => {
    const weeks = Array.from({ length: 26 }, (_, i) => `Week ${i + 1}`);

    const option: EChartsOption = {
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'shadow' },
        },
        grid: {
            top: 20,
            left: 50,
            right: 30,
            bottom: 80,
        },
        xAxis: {
            type: 'category',
            data: weeks,
            axisLabel: {
                interval: 0,
                rotate: 90,
            },
        },
        yAxis: {
            type: 'value',
            min: 0,
            max: 100,
            axisLabel: {
                formatter: '{value}%',
            },
            splitLine: {
                lineStyle: {
                    type: 'dashed',
                },
            },
        },
        barCategoryGap: '100%',
        barGap: '0%',   
        series: series.map((s) => ({
            name: s.name,
            type: 'bar',
            data: s.data,
            barWidth: 12,
            barMaxWidth: 5,
            itemStyle: {
                color: s.color,
            },
        })),
    };

    return (
        <ChartWrapper>
            <HeaderRow>
                <ChartTitle>{title}</ChartTitle>
                <LegendContainer>
                    {series.map((s) => (
                        <LegendItem key={s.name}>
                            <LegendColor color={s.color} />
                            {s.name} (Goal: {s.goal})
                        </LegendItem>
                    ))}
                </LegendContainer>
            </HeaderRow>
            <ReactECharts option={option} style={{ height: 400 }} />
        </ChartWrapper>
    );
};

export default ComplianceBarChart;
