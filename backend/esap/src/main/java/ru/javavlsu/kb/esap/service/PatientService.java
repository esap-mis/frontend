package ru.javavlsu.kb.esap.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.javavlsu.kb.esap.dto.PatientRequestDTO;
import ru.javavlsu.kb.esap.dto.PatientStatisticsByAgeDTO;
import ru.javavlsu.kb.esap.dto.PatientStatisticsByGenderDTO;
import ru.javavlsu.kb.esap.dto.ScheduleResponseDTO.PatientResponseDTO;
import ru.javavlsu.kb.esap.mapper.PatientMapper;
import ru.javavlsu.kb.esap.model.Clinic;
import ru.javavlsu.kb.esap.model.MedicalCard;
import ru.javavlsu.kb.esap.model.Patient;
import ru.javavlsu.kb.esap.repository.MedicalCardRepository;
import ru.javavlsu.kb.esap.repository.PatientRepository;
import ru.javavlsu.kb.esap.exception.NotFoundException;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class PatientService {

    private final PatientRepository patientRepository;
    private final MedicalCardRepository medicalCardRepository;
    private final PatientMapper patientMapper;

    public PatientService(PatientRepository patientRepository, MedicalCardRepository medicalCardRepository, PatientMapper patientMapper) {
        this.medicalCardRepository = medicalCardRepository;
        this.patientMapper = patientMapper;
        this.patientRepository = patientRepository;
    }

    public List<PatientResponseDTO> getAll() {
        List<Patient> patients = patientRepository.findAll();
        return patientMapper.toPatientResponseDTOList(patients);
    }

    public int getPatientCountByClinic(Clinic clinic) {
        return patientRepository.countPatientByClinic(clinic);
    }

    public List<PatientResponseDTO> getLatestPatients(Integer count, Clinic clinic) {
        Pageable pageable = PageRequest.of(0, count);
        List<Patient> patients = patientRepository.findAllByClinicOrderByIdDesc(clinic, pageable).stream().toList();
        return patientMapper.toPatientResponseDTOList(patients);
    }

    public Page<PatientResponseDTO> getByClinic(String firstName, String patronymic, String lastName, Clinic clinic, int page) {
        Page<Patient> patients = patientRepository.findAllByFullNameContainingIgnoreCaseAndClinicOrderByIdAsc(
                firstName != null ? firstName : "",
                patronymic != null ? patronymic : "",
                lastName != null ? lastName : "",
                clinic,
                PageRequest.of(page, 10)
        );
        return patientMapper.toPatientResponseDTOPage(patients);
    }

    @Transactional(readOnly = true)
    public Patient getById(long id) {
        return patientRepository.findById(id).orElseThrow(() -> new NotFoundException("Patient not found"));
    }

    @Transactional
    public Patient create(PatientRequestDTO patientRequestDTO, Clinic clinic) {
        Patient patient = patientMapper.toPatient(patientRequestDTO);
        patient.setClinic(clinic);
        patient.setMedicalCard(new MedicalCard(patient));
        return patientRepository.save(patient);
    }

    @Transactional
    public Patient update(Long patientId, PatientRequestDTO patientRequestDTO) {
        Patient patient = patientRepository.findById(patientId)
                        .orElseThrow(() -> new NotFoundException("Patient with id=" + patientId + " not found"));
        patient.setFirstName(patientRequestDTO.getFirstName());
        patient.setPatronymic(patientRequestDTO.getPatronymic());
        patient.setLastName(patientRequestDTO.getLastName());
        patient.setBirthDate(patientRequestDTO.getBirthDate());
        patient.setGender(patientRequestDTO.getGender());
        patient.setAddress(patientRequestDTO.getAddress());
        patient.setPhoneNumber(patientRequestDTO.getPhoneNumber());
        patient.setEmail(patientRequestDTO.getEmail());
        return patientRepository.save(patient);
    }

    @Transactional(readOnly = true)
    public PatientStatisticsByGenderDTO getPatientsStatisticsByGender(Clinic clinic) {
        int malePatients = patientRepository.getPatientsCountByGenderAndClinic(1, clinic);
        int femalePatients = patientRepository.getPatientsCountByGenderAndClinic(2, clinic);

        PatientStatisticsByGenderDTO statistics = new PatientStatisticsByGenderDTO();
        statistics.setMale(malePatients);
        statistics.setFemale(femalePatients);

        return statistics;
    }

    @Transactional(readOnly = true)
    public PatientStatisticsByAgeDTO getPatientsStatisticsByAge(Clinic clinic) {
        int childCount = patientRepository.countPatientsByAgeRangeAndClinic(0, 18, clinic);
        int adultCount = patientRepository.countPatientsByAgeRangeAndClinic(19, 59, clinic);
        int elderlyCount = patientRepository.countPatientsByAgeRangeAndClinic(60, 100, clinic);

        PatientStatisticsByAgeDTO statistics = new PatientStatisticsByAgeDTO();
        statistics.setChild(childCount);
        statistics.setAdult(adultCount);
        statistics.setElderly(elderlyCount);

        return statistics;
    }
}
