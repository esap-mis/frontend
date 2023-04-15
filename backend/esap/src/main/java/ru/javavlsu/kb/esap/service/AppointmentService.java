package ru.javavlsu.kb.esap.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.javavlsu.kb.esap.model.Appointment;
import ru.javavlsu.kb.esap.model.Schedule;
import ru.javavlsu.kb.esap.repository.AppointmentRepository;
import ru.javavlsu.kb.esap.repository.ScheduleRepository;
import ru.javavlsu.kb.esap.util.NotCreateException;
import ru.javavlsu.kb.esap.util.NotFoundException;

import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
@Transactional(readOnly = true)
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final ScheduleRepository scheduleRepository;

    public AppointmentService(AppointmentRepository appointmentRepository, ScheduleRepository scheduleRepository) {
        this.appointmentRepository = appointmentRepository;
        this.scheduleRepository = scheduleRepository;
    }

    @Transactional
    public void create(Appointment appointment, long scheduleId) throws NotCreateException{
        Schedule schedule = scheduleRepository.findById(scheduleId).orElseThrow(() -> new NotFoundException("Schedule not found"));
        List<Appointment> appointments = appointmentRepository.findBySchedule(schedule);
        if(schedule.getMaxPatientPerDay() == appointments.size()){
            throw new NotCreateException("No free time found in the schedule");
        }else if(appointment.getStartAppointments().until(appointment.getEndAppointments(), ChronoUnit.MINUTES) != 30){
            throw new NotCreateException("Invalid time");
        }
        appointments = appointmentRepository.findByStartAppointmentsAndDateAndSchedule(appointment.getStartAppointments(), appointment.getDate(), schedule);
        if(!appointments.isEmpty()){
            throw new NotCreateException("Time is already taken");
        }
        appointment.setSchedule(schedule);
        appointmentRepository.save(appointment);
    }
}
