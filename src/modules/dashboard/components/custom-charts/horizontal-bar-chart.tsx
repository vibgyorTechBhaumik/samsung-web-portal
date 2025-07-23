import React from 'react';
import ReactECharts from 'echarts-for-react';
import styled from 'styled-components';
import { EChartsOption } from 'echarts';

const ChartWrapper = styled.div`
  width: 100%;
  height: 100%;
  max-width: 800px;
  margin: 0 auto;
`;

const ChartTitle = styled.h3`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
`;

export interface ComplianceCategory {
    name: string;
    value: number;
    color: string;
}

interface HorizontalComplianceChartProps {
    title?: string;
    categories: ComplianceCategory[];
}

const HorizontalComplianceChart: React.FC<HorizontalComplianceChartProps> = ({
    title,
    categories,
}) => {
    const option: EChartsOption = {
        legend: {
            show: false,
        },
        grid: {
            left: 120,
            right: 30,
            top: 60,
            bottom: 30,
        },
        xAxis: {
            type: 'value',
            position: 'top',
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
        yAxis: {
            type: 'category',
            data: categories.map((c) => c.name), // ['Activity', 'Resistance', ...]
            axisLabel: {
                fontSize: 16,
                fontWeight: 'bold',
            },
        },
        series: [
            {
                type: 'bar',
                data: categories.map((c) => ({
                    value: c.value,
                    itemStyle: {
                        color: c.color,
                    },
                    label: {
                        show: true,
                        position: 'inside',
                        formatter: `{c}%`,
                        fontWeight: 'bold',
                    },
                })),
                barHeight: 30,
            } as any, // For TS fix
        ],
    };


    return (
        <ChartWrapper>
            <ChartTitle>{title}</ChartTitle>
            <ReactECharts option={option} />
        </ChartWrapper>
    );
};

export default HorizontalComplianceChart;
