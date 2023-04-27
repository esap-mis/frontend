package ru.javavlsu.kb.esap.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ru.javavlsu.kb.esap.model.Doctor;
import ru.javavlsu.kb.esap.model.Schedule;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    List<Schedule> findAllByDoctorId(Long id);

    List<Schedule> findAllByDoctor(Doctor doctor);

    Optional<Schedule> findByDateAndDoctor(LocalDate date, Doctor doctor);

    @Query("SELECT s FROM Schedule s JOIN FETCH s.appointments a WHERE s.doctor = :doctor AND s.id = :id ORDER BY a.startAppointments ASC")
    Optional<Schedule> findByIdAndDoctorOrderByAppointmentStartAppointmentsAsc(@Param("id") Long id, @Param("doctor") Doctor doctor);

    void deleteScheduleByDateBefore(LocalDate date);
}
