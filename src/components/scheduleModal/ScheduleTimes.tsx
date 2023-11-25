import React, {useState} from "react";
import './schedule.scss';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import moment from "moment";
import {Schedule} from "../../model/Schedule";
import AppointmentModal from "../appointmentModal/AppointmentModal";
import {Doctor} from "../../model/Doctor";

interface ScheduleTimesProps {
  date: string,
  times: string[],
  doctor: Doctor,
  schedule: Schedule;
}

const ScheduleTimes: React.FC<ScheduleTimesProps> = ({ date, times, doctor, schedule }) => {
  const [open, setOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const hasAppointment = (time: string) => {
    const currentTime = moment(time, "HH:mm");
    if (currentTime.isBefore(moment(schedule.startDoctorAppointment, "HH:mm")) || currentTime.isAfter(moment(schedule.endDoctorAppointment, "HH:mm"))) {
      return 'schedule_time';
    } else if (
      currentTime.isBetween(moment(schedule.startDoctorAppointment, "HH:mm"), moment(schedule.endDoctorAppointment, "HH:mm"), null, "[]") &&
      schedule.appointments.some(
        appointment =>
          appointment.date === date &&
          appointment.startAppointments === moment(time, "HH:mm").format("HH:mm:ss")
      )) {
      return 'schedule_time schedule_time-disable';
    }
    return 'schedule_time schedule_time-active';
  };

  const handleOpen = (time: string) => {
    if (hasAppointment(time) !== 'schedule_time schedule_time-active') {
      return;
    }
    setSelectedTime(time);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <div className="schedule_times">
      {schedule.date === date ? (
        times.map((time) => (
          <div
            className={`${hasAppointment(time)}`}
            key={time}
            onClick={() => handleOpen(time)}
          >
            {time}
          </div>
        ))
      ) : (
        <div className='schedule_times-empty'>
          <DoNotDisturbIcon style={{color: '#aaaaaa', fontSize: '16px'}} />
          <div className='schedule_times-empty-text'>
            В этот день приема нет
          </div>
        </div>
      )}
      {selectedTime && (
        <AppointmentModal
          onClose={handleClose}
          open={open}
          scheduleId={schedule.id}
          date={date}
          doctor={doctor}
          time={selectedTime}
        />
      )}
    </div>
  );
};

export default ScheduleTimes;