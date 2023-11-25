import React, {useState} from "react";
import {Typography} from "@mui/material";
import {Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip} from "recharts";
import {PatientStatisticsByAgeDTO} from "../../model/dto/PatientStatisticsByAgeDTO";
import {PatientStatisticsByGenderDTO} from "../../model/dto/PatientStatisticsByGenderDTO";

interface CircleChartProps {
  title: string;
  legend: string[];
  statistics: PatientStatisticsByAgeDTO | PatientStatisticsByGenderDTO;
  colors: string[];
}

const CircleChart: React.FC<CircleChartProps> = ({ title, legend, statistics, colors }: CircleChartProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const handlePieClick = (data: any, index: number) => {
    setActiveIndex(index);
  };

  const renderChart = () => {
    if (!statistics) {
      return null;
    }

    const data = Object.values(statistics).map((value, index) => ({ name: legend[index], value }));

    return (
      <ResponsiveContainer width={290} height={185}>
        <PieChart>
          <Pie
            data={data}
            cx={140}
            cy={80}
            innerRadius={50}
            outerRadius={70}
            paddingAngle={1}
            dataKey="value"
            onClick={handlePieClick}
            onMouseEnter={handlePieClick}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
                strokeWidth={activeIndex === index ? 4 : 1}
              />
            ))}
          </Pie>
          <Legend />
          <Tooltip formatter={(value: number) => [value, 'Количество']} />
        </PieChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="chart">
      <Typography variant="h6" sx={{ marginBottom: '18px' }}>
        {title}
      </Typography>
      {renderChart()}
    </div>
  );
};

export default CircleChart;