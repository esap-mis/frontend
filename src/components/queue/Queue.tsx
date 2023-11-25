import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {Schedule} from '../../model/Schedule';
import HttpService from '../../service/HttpService';
import {Appointment} from "../../model/Appointment";
import {Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineOppositeContent, timelineOppositeContentClasses, TimelineSeparator} from "@mui/lab";
import {Grid, Typography} from "@mui/material";
import moment from "moment";
import {TokenStorageService} from "../../service/auth/TokenStorageService";

//TODO: Костыли с размерами
const Queue: React.FC = () => {
  const { scheduleId } = useParams<{ scheduleId: string }>();
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const tokenStorageService = new TokenStorageService();
  const roles = tokenStorageService.getRoles();
  const isDoctorOrChiefDoctor = roles.includes('ROLE_DOCTOR') || roles.includes('ROLE_CHIEF_DOCTOR');

  useEffect(() => {
    if (isDoctorOrChiefDoctor && scheduleId) {
      HttpService.getScheduleById(parseInt(scheduleId))
        .then((response) => setSchedules([response]))
        .catch((error) => console.error(error));
    } else {
      HttpService.getSchedulesByDay()
        .then((response) => setSchedules(response))
        .catch((error) => console.error(error));
    }
  }, [scheduleId, isDoctorOrChiefDoctor]);

  const groupAppointmentsByStartTime = (appointments: Appointment[]): Appointment[][] => {
    const sortedAppointments = appointments.sort((a, b) => {
      const startTimeA = moment(a.startAppointments, 'HH:mm:ss');
      const startTimeB = moment(b.startAppointments, 'HH:mm:ss');
      if (startTimeA.isBefore(startTimeB)) {
        return -1;
      } else if (startTimeA.isAfter(startTimeB)) {
        return 1;
      } else {
        return 0;
      }
    });

    const groupedAppointments: Appointment[][] = [];
    const groupedStartTime: string[] = [];

    sortedAppointments.forEach((appointment) => {
      const startTime = moment(appointment.startAppointments, 'HH:mm:ss').format('HH:mm');

      if (!groupedStartTime.includes(startTime)) {
        groupedStartTime.push(startTime);
        groupedAppointments.push([appointment]);
      } else {
        const groupIndex = groupedStartTime.indexOf(startTime);
        groupedAppointments[groupIndex].push(appointment);
      }
    });

    return groupedAppointments;
  };

  return (
    <Grid container>
      <Grid item xs={4}>
        <Typography variant="h6" sx={{ m: 2, fontSize: '18px' }}>
          Журнал за сегодня{' '}
          <Typography variant="h6" component="span" sx={{ color: 'text.secondary', fontSize: '18px' }}>
            {moment(schedules[0]?.date).locale('ru').format('D MMM. YYYY')} г.
          </Typography>
        </Typography>
        <Timeline>
          {groupAppointmentsByStartTime(
            schedules.flatMap((schedule) => schedule.appointments)
          ).flatMap((group, groupIndex) => (
            <React.Fragment key={groupIndex}>
              {group.map((appointment, index) => (
                <TimelineItem key={`${groupIndex}-${index}`}>
                  {index === 0 && (
                    <TimelineOppositeContent variant="body2" color="text.secondary" sx={{ maxWidth: '60px' }}>
                      {moment(appointment.startAppointments, 'HH:mm:ss').format('HH:mm')}
                    </TimelineOppositeContent>
                  )}
                  {index > 0 && (
                    <TimelineOppositeContent
                      variant="body2"
                      color="text.secondary"
                      sx={{ maxWidth: '64.5px', visibility: 'hidden' }}
                    >
                      {moment(appointment.startAppointments, 'HH:mm:ss').format('HH:mm')}
                    </TimelineOppositeContent>
                  )}
                  <TimelineSeparator>
                    {index === 0 && <TimelineDot variant="outlined" sx={{ margin: '0' }} />}
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent sx={{ px: 2 }}>
                    {index === 0 && (
                      <>
                        <Typography variant="h6" component="span" sx={{ fontSize: '16px', fontWeight: 'bold' }} color="primary">
                          {`${appointment.patient.lastName} ${appointment.patient.firstName}`}
                        </Typography>
                        <Link to={`/editingMedicalCard/${appointment.patient.id}`}>
                          <Typography variant="body2" color="text.secondary">
                            Мед. карта
                          </Typography>
                        </Link>
                      </>
                    )}
                    {index > 0 && (
                      <>
                        <Typography variant="h6" component="span" sx={{ fontSize: '16px', fontWeight: 'bold', marginLeft: '6px' }} color="primary">
                          {`${appointment.patient.lastName} ${appointment.patient.firstName}`}
                        </Typography>
                        <Link to={`/editingMedicalCard/${appointment.patient.id}`}>
                          <Typography variant="body2" color="text.secondary" sx={{marginLeft: '6px'}}>
                            Мед. карта
                          </Typography>
                        </Link>
                      </>
                    )}
                  </TimelineContent>
                </TimelineItem>
              ))}
            </React.Fragment>
          ))}
        </Timeline>
      </Grid>
    </Grid>
  );
};

export default Queue;