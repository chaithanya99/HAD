package com.had.project5.controllers;
import com.had.project5.repositories.healthrecordrepos.DiagnosticReportRepo;
import com.had.project5.repositories.healthrecordrepos.DischargeSummaryRepo;
import com.had.project5.repositories.healthrecordrepos.GeneralReportRepo;
import com.had.project5.repositories.healthrecordrepos.HealthRecordRepo;
import com.had.project5.repositories.healthrecordrepos.ImmunizationRecordRepo;
import com.had.project5.repositories.healthrecordrepos.OPconsultRepo;
import com.had.project5.repositories.healthrecordrepos.PrescriptionRepo;
import com.had.project5.repositories.healthrecordrepos.WellnessRecordRepo;
import com.had.project5.services.DoctorService;
import com.had.project5.services.FileUploadService;
import com.had.project5.services.PatientService;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.had.project5.entities.healthrecordstuff.Pdf;
import com.had.project5.entities.healthrecordstuff.DiagnosticReport;
import com.had.project5.entities.healthrecordstuff.DischargeSummary;
import com.had.project5.entities.healthrecordstuff.GeneralReport;
import com.had.project5.entities.healthrecordstuff.HealthRecord;
import com.had.project5.entities.healthrecordstuff.Healthrec;
import com.had.project5.entities.healthrecordstuff.ImmunizationRecord;
import com.had.project5.entities.healthrecordstuff.OPconsult;
import com.had.project5.entities.healthrecordstuff.Prescription;
import com.had.project5.entities.healthrecordstuff.WellnessRecord;

@RestController
@CrossOrigin(origins = "*") // Specify the allowed origin(s)
@RequestMapping("/HealthRecord")
public class HealthRecordController {

    @Autowired
    private PatientService patientService;

    @Autowired
    private FileUploadService fileUploadService;

    @Autowired
    private DoctorService doctorService;

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
        System.out.println(healthrec.getPatientId());
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

    @PostMapping("/upload")
    public ResponseEntity<String> uploadPdf(@RequestParam("pdf")MultipartFile file,@RequestParam("AbhaNumber") String AbhaNumber) throws IOException{

        Long doctorId=doctorService.getMyId();
        Long patientId=patientService.getId(AbhaNumber);
        String upload=fileUploadService.uploadPDF(file, doctorId, patientId);
        return ResponseEntity.status(HttpStatus.OK).body(upload);

    }

    @GetMapping("/getRecords/{AbhaNumber}")
    public ResponseEntity<List<Pdf>> getPdfOfPatient(@PathVariable String AbhaNumber){
        
        Long patientId=patientService.getId(AbhaNumber);
        return ResponseEntity.ok().body(fileUploadService.getPdfsByPatientId(patientId)); 

        
    }

    @GetMapping("/getallRecords")
    public List<HealthRecord> getAllRecords() {
        return healthrecordrepo.findAll();
    }

    @GetMapping("/getDiagnosticReport/{id}")
    public Optional<DiagnosticReport> getDiagnosticReport(@PathVariable long id) {
        return diagnosticreportrepo.findById(id);
    }

    @GetMapping("/getOPConsultReport/{id}")
    public Optional<OPconsult> getOPConsult(@PathVariable long id) {
        return opconsultrepo.findById(id);
    }

    @GetMapping("/getDischargeSummaryReport/{id}")
    public Optional<DischargeSummary> getDischargeSummary(@PathVariable long id) {
        return dischargesummaryrepo.findById(id);
    }

    @GetMapping("/getGeneralReport/{id}")
    public Optional<GeneralReport> getGeneralReport(@PathVariable long id) {
        return generalreportrepo.findById(id);
    }

    @GetMapping("/getImmunizationRecord/{id}")
    public Optional<ImmunizationRecord> getImmunizationRecord(@PathVariable long id) {
        return immunizationrecordrepo.findById(id);
    }

    @GetMapping("/getPrescription/{id}")
    public Optional<Prescription> getPrescription(@PathVariable long id) {
        return prescriptionrepo.findById(id);
    }

    @GetMapping("/getWellnessRecord/{id}")
    public Optional<WellnessRecord> getWellnessRecord(@PathVariable long id) {
        return wellnessrecordrepo.findById(id);
    }
    


}
