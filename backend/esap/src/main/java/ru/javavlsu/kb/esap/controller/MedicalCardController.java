package ru.javavlsu.kb.esap.controller;


import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ru.javavlsu.kb.esap.dto.MedicalCardDTO.MedicalCardResponseDTO;
import ru.javavlsu.kb.esap.dto.MedicalCardDTO.MedicalRecordRequestDTO;
import ru.javavlsu.kb.esap.mapper.MedicalCardMapper;
import ru.javavlsu.kb.esap.model.MedicalCard;
import ru.javavlsu.kb.esap.service.MedicalCardService;
import ru.javavlsu.kb.esap.service.PatientService;
import ru.javavlsu.kb.esap.exception.NotCreateException;
import ru.javavlsu.kb.esap.exception.ResponseMessageError;
import ru.javavlsu.kb.esap.util.DoctorUtils;

@RestController
@CrossOrigin
@RequestMapping("/api/medicalCard")
public class MedicalCardController {
    private final MedicalCardService medicalCardService;
    private final MedicalCardMapper medicalCardMapper;
    private final PatientService patientService;
    private final DoctorUtils doctorUtils;

    public MedicalCardController(MedicalCardService medicalCardService, MedicalCardMapper medicalCardMapper, PatientService patientService, DoctorUtils doctorUtils) {
        this.medicalCardService = medicalCardService;
        this.medicalCardMapper = medicalCardMapper;
        this.patientService = patientService;
        this.doctorUtils = doctorUtils;
    }

    @GetMapping("/patient/{id}")
    public MedicalCardResponseDTO getMedicalCard(@PathVariable("id") Long id, @RequestParam(required = false) String specializationDoctor) {
        MedicalCard medicalCard = medicalCardService
                .getMedicalCardByPatientAndMedicalRecordSpecializationDoctor(patientService.getById(id), specializationDoctor);
//        medicalCard.setMedicalRecord(medicalCardService.getMedicalRecordByMedicalCard(medicalCard));
//        medicalCard.getMedicalRecord().sort(MedicalRecord::sortByDateDesc);
        return medicalCardMapper.toMedicalCard(medicalCard);
    }

    @PostMapping("/patient/{id}")
    public ResponseEntity<HttpStatus> saveMedicalRecord(@PathVariable("id") Long id,
                                                        @Valid @RequestBody MedicalRecordRequestDTO medicalRecordRequestDTO,
                                                        BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new NotCreateException(ResponseMessageError.createErrorMsg(bindingResult.getFieldErrors()));
        }
        medicalCardService.createMedicalRecord(medicalCardMapper.toMedicalRecordRequestDTO(medicalRecordRequestDTO),
                medicalCardService.getMedicalCardByPatient(patientService.getById(id)), doctorUtils.getDoctorDetails().getDoctor());
        return ResponseEntity.ok(HttpStatus.OK);
    }
}
