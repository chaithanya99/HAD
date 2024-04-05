package com.had.project5.controllers;
import com.had.project5.repositories.DiagnosticReportRepo;
import com.had.project5.repositories.DischargeSummaryRepo;
import com.had.project5.repositories.GeneralReportRepo;
import com.had.project5.repositories.HealthRecordRepo;
import com.had.project5.repositories.ImmunizationRecordRepo;
import com.had.project5.repositories.OPconsultRepo;
import com.had.project5.repositories.PrescriptionRepo;
import com.had.project5.repositories.WellnessRecordRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.method.P;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.had.project5.entities.DiagnosticReport;
import com.had.project5.entities.DischargeSummary;
import com.had.project5.entities.GeneralReport;
import com.had.project5.entities.HealthRecord;
import com.had.project5.entities.Healthrec;
import com.had.project5.entities.ImmunizationRecord;
import com.had.project5.entities.OPconsult;
import com.had.project5.entities.Prescription;
import com.had.project5.entities.WellnessRecord;

@RestController
@CrossOrigin(origins = "*") // Specify the allowed origin(s)
@RequestMapping("/HealthRecord")
public class HealthRecordController {

    @Autowired
    private HealthRecordRepo healthrecordrepo;

    @Autowired
    private DiagnosticReportRepo diagnosticreportrepo;

    @Autowired
    private DischargeSummaryRepo dischargesummaryrepo;

    @Autowired
    private GeneralReportRepo generalreportrepo;

    @Autowired
    private ImmunizationRecordRepo immunizationrecordrepo;

    @Autowired
    private OPconsultRepo opconsultrepo;

    @Autowired
    private PrescriptionRepo prescriptionrepo;

    @Autowired
    private WellnessRecordRepo wellnessrecordrepo;

    @PostMapping("/createhealthrecord")
    public HealthRecord createHealthRecord(@RequestBody Healthrec healthrec)
    {
        HealthRecord newHealthRecord = new HealthRecord();
        newHealthRecord.setType(healthrec.getType());
        newHealthRecord.setExpiry(healthrec.getExpiry());
        newHealthRecord.setPatientId(healthrec.getPatientId());
        newHealthRecord.setDoctorId(healthrec.getDoctorId());

        // Save the new HealthRecord to the repository
        healthrecordrepo.save(newHealthRecord);

        if ("Diagnostic Report".equals(healthrec.getType())) {
            // Create a new HealthRecord instance with only required fields
            DiagnosticReport newrecord = new DiagnosticReport();
            newrecord.setId(newHealthRecord.getId());
            newrecord.setType(healthrec.getType());
            newrecord.setExpiry(healthrec.getExpiry());
            newrecord.setPatientId(healthrec.getPatientId());
            newrecord.setDoctorId(healthrec.getDoctorId());
            newrecord.setDiagnosis(healthrec.getDiagnosis());
            diagnosticreportrepo.save(newrecord);
        }
        else if ("Discharge Summary".equals(healthrec.getType())) {
            // Create a new HealthRecord instance with only required fields
            DischargeSummary newrecord = new DischargeSummary();
            newrecord.setId(newHealthRecord.getId());
            newrecord.setType(healthrec.getType());
            newrecord.setExpiry(healthrec.getExpiry());
            newrecord.setPatientId(healthrec.getPatientId());
            newrecord.setDoctorId(healthrec.getDoctorId());
            newrecord.setComplaints(healthrec.getComplaints());
            newrecord.setPhysical_examination(healthrec.getPhysical_examination());
            newrecord.setAllergies(healthrec.getAllergies());
            newrecord.setMedical_history(healthrec.getMedical_history());
            newrecord.setFamily_history(healthrec.getFamily_history());
            newrecord.setLabs_and_imaging(healthrec.getLabs_and_imaging());
            newrecord.setMedicalprocedure(healthrec.getMedicalprocedure());
            newrecord.setCareplan(healthrec.getCareplan());
            newrecord.setMedication(healthrec.getMedication());
            dischargesummaryrepo.save(newrecord);
        }

        else if ("General health report".equals(healthrec.getType())) {
            // Create a new HealthRecord instance with only required fields
            GeneralReport newrecord = new GeneralReport();
            newrecord.setId(newHealthRecord.getId());
            newrecord.setType(healthrec.getType());
            newrecord.setExpiry(healthrec.getExpiry());
            newrecord.setPatientId(healthrec.getPatientId());
            newrecord.setDoctorId(healthrec.getDoctorId());
            newrecord.setHealth_report(healthrec.getHealth_report());
            generalreportrepo.save(newrecord);
        }


        else if ("Immunization Record".equals(healthrec.getType())) {
            // Create a new HealthRecord instance with only required fields
            ImmunizationRecord newrecord = new ImmunizationRecord();
            newrecord.setId(newHealthRecord.getId());
            newrecord.setType(healthrec.getType());
            newrecord.setExpiry(healthrec.getExpiry());
            newrecord.setPatientId(healthrec.getPatientId());
            newrecord.setDoctorId(healthrec.getDoctorId());
            newrecord.setImmunization_details(healthrec.getImmunization_details());
            newrecord.setImmunization_recommendation(healthrec.getImmunization_recommendation());
            immunizationrecordrepo.save(newrecord);
        }

        else if ("OP consult".equals(healthrec.getType())) {
            // Create a new HealthRecord instance with only required fields
            OPconsult newrecord = new OPconsult();
            newrecord.setId(newHealthRecord.getId());
            newrecord.setType(healthrec.getType());
            newrecord.setExpiry(healthrec.getExpiry());
            newrecord.setPatientId(healthrec.getPatientId());
            newrecord.setDoctorId(healthrec.getDoctorId());
            newrecord.setMedicalcondition(healthrec.getMedicalcondition());
            newrecord.setPhysical_examination(healthrec.getPhysical_examination());
            newrecord.setAllergies(healthrec.getAllergies());
            newrecord.setMedical_history(healthrec.getMedical_history());
            newrecord.setFamily_history(healthrec.getFamily_history());
            newrecord.setMedicalprocedure(healthrec.getMedicalprocedure());
            newrecord.setMedication(healthrec.getMedication());            
            opconsultrepo.save(newrecord);
        }

        else if ("Prescription".equals(healthrec.getType())) {
            // Create a new HealthRecord instance with only required fields
            Prescription newrecord = new Prescription();
            newrecord.setId(newHealthRecord.getId());
            newrecord.setType(healthrec.getType());
            newrecord.setExpiry(healthrec.getExpiry());
            newrecord.setPatientId(healthrec.getPatientId());
            newrecord.setDoctorId(healthrec.getDoctorId());
            newrecord.setMedication(healthrec.getMedication());            
            prescriptionrepo.save(newrecord);
        }

        else if ("Wellness Record".equals(healthrec.getType())) {
            // Create a new HealthRecord instance with only required fields
            WellnessRecord newrecord = new WellnessRecord();
            newrecord.setId(newHealthRecord.getId());
            newrecord.setType(healthrec.getType());
            newrecord.setExpiry(healthrec.getExpiry());
            newrecord.setPatientId(healthrec.getPatientId());
            newrecord.setDoctorId(healthrec.getDoctorId());
            newrecord.setHeart_rate(healthrec.getHeart_rate());
            newrecord.setRespiratory_rate(healthrec.getRespiratory_rate());
            newrecord.setTemperature(healthrec.getTemperature());
            newrecord.setBlood_pressure(healthrec.getBlood_pressure());
            newrecord.setWeight(healthrec.getWeight());
            newrecord.setHeight(healthrec.getHeight());
            newrecord.setGeneral_assessment(healthrec.getGeneral_assessment());
            newrecord.setLifestyle(healthrec.getLifestyle());
            wellnessrecordrepo.save(newrecord);
        }

        return newHealthRecord;
    }
}
