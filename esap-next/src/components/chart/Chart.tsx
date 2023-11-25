import {LineChart, Line, XAxis, CartesianGrid, Tooltip, ResponsiveContainer, YAxis} from 'recharts';
import React, {useEffect, useState} from "react";
import moment from "moment";
import {Typography} from "@mui/material";
import {AppointmentsCountByDayDTO} from "@/model/dto/AppointmentsCountByDayDTO";
import HttpService from "@/service/HttpService";

interface ChartProps {
  title: string;
  grid?: boolean;
}

const Chart: React.FC<ChartProps> = ({ title, grid }: ChartProps) => {
  const [appointmentCount, setAppointmentCount] = useState<AppointmentsCountByDayDTO[]>([]);

  useEffect(() => {
    HttpService.getAppointmentCountByDay()
      .then(response => setAppointmentCount(response))
      .catch(error => console.error(error));
  }, []);

  const formatXAxisTick = (tick: any) => {
    return moment(tick).format('DD MMM');
  };

  return (
    <div className='chart' style={{marginRight: '21px'}}>
      <Typography variant="h5" sx={{marginBottom: '18px'}}>
        {title}
      </Typography>
      <ResponsiveContainer width={900} height={400}>
        <LineChart
          data={appointmentCount}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          {grid && <CartesianGrid strokeDasharray='3 3' />}
          <XAxis dataKey='date' tickFormatter={formatXAxisTick} />
          <YAxis />
          <Tooltip labelFormatter={(value: string) => `Дата: ${value}`} />
          <Line type='monotone' name='Кол-во пациентов' dataKey='count' stroke='#0057ed' strokeWidth={2} activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
