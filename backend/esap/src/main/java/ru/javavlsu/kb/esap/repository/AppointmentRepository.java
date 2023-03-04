package ru.javavlsu.kb.esap.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.javavlsu.kb.esap.model.Appointment;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
}
