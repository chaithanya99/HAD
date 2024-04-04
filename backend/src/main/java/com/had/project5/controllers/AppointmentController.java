package com.had.project5.controllers;

import com.had.project5.entities.Appointment;
import com.had.project5.entities.CreateAppointmentRequest;
import com.had.project5.entities.Doctor;
import com.had.project5.entities.Patient;
import com.had.project5.repositories.AppointmentRepo;
import com.had.project5.services.DoctorService;
import com.had.project5.services.PatientService;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Iterator;
import java.util.List;
import java.util.Optional;

import com.had.project5.entities.RescheduleRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/appointments")
public class AppointmentController {
    @Autowired
    private DoctorService doctorService;

    @Autowired
    private AppointmentRepo appointmentRepository;

    @Autowired
    private PatientService patientService;

    @GetMapping("/{id}")
    public ResponseEntity<Appointment> getAppointment(@PathVariable Long id) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow();
        return ResponseEntity.ok(appointment);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createAppointment(@RequestBody CreateAppointmentRequest appointmentRequest) {
        
        long doctorId=appointmentRequest.getDoctorId();
        long patientId=appointmentRequest.getPatientId();
        Optional<Doctor> d= doctorService.getDoctorById(doctorId);
        Optional<Patient> p = patientService.getPatientById(patientId);
        if(!p.isPresent() || !d.isPresent()){
            return ResponseEntity.status(400).body("error");
        }
        Patient pp=p.get();
        Doctor dd = d.get();
        System.out.println(dd.getName());
        System.out.println(pp.getMobile());
        Appointment ap=new Appointment();
        ap.setDoctor(dd);
        ap.setPatient(pp);
        ap.setStartDateTime(appointmentRequest.getStartDateTime());
        ap.setEndDateTime(appointmentRequest.getEndDateTime());
       

        if (isAppointmentOverlap(ap)) {
            return ResponseEntity.badRequest().body("Appointment overlaps with existing appointment");
        }
        Appointment savedAppointment = appointmentRepository.save(ap);
        return ResponseEntity.ok(savedAppointment);
    }

    

    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<Appointment>> getAppointmentsForDoctor(@PathVariable Long doctorId) {
        List<Appointment> appointments = appointmentRepository.findByDoctorId(doctorId);
        return ResponseEntity.ok(appointments);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteAppointment(@PathVariable Long id) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow();

        appointmentRepository.delete(appointment);

        return ResponseEntity.ok().build();
    }

    @PutMapping("/reschedule")
    public ResponseEntity<?> rescheduleAppointment(@RequestBody RescheduleRequest rescheduleRequest) {
        Long appointmentId = rescheduleRequest.getAppointmentId();
        Long doctorId = rescheduleRequest.getDoctorId();
        // Appointment updatedAppointment = rescheduleRequest.getUpdatedAppointment();

        Appointment existingAppointment = appointmentRepository.findById(appointmentId)
                .orElseThrow();

        // Check for appointment overlap
        if (isAppointmentOverlapForUpdate(rescheduleRequest, existingAppointment)) {
            return ResponseEntity.badRequest().body("Appointment overlaps with existing appointment");
        }

        // Update appointment details
        existingAppointment.setStartDateTime(rescheduleRequest.getStartDateTime());
        existingAppointment.setEndDateTime(rescheduleRequest.getEndDateTime());
        // You may add more fields to update

        Appointment savedAppointment = appointmentRepository.save(existingAppointment);

        return ResponseEntity.ok(savedAppointment);
    }

    // Check for appointment overlap while creating appointment
    private boolean isAppointmentOverlap(Appointment newAppointment) {
        
        List<Appointment> existingAppointments = appointmentRepository.findByDoctorId(newAppointment.getDoctor().getId());

        for (Appointment existingAppointment : existingAppointments) {
            // Check if new appointment start time is between existing appointment's start and end times (inclusive)
            if ((newAppointment.getStartDateTime().isAfter(existingAppointment.getStartDateTime()) ||
                    newAppointment.getStartDateTime().isEqual(existingAppointment.getStartDateTime())) &&
                    (newAppointment.getStartDateTime().isBefore(existingAppointment.getEndDateTime()) ||
                    newAppointment.getStartDateTime().isEqual(existingAppointment.getEndDateTime()))) {
                return true;
            }
            // Check if new appointment end time is between existing appointment's start and end times (inclusive)
            if ((newAppointment.getEndDateTime().isAfter(existingAppointment.getStartDateTime()) ||
                    newAppointment.getEndDateTime().isEqual(existingAppointment.getStartDateTime())) &&
                    (newAppointment.getEndDateTime().isBefore(existingAppointment.getEndDateTime()) ||
                    newAppointment.getEndDateTime().isEqual(existingAppointment.getEndDateTime()))) {
                return true;
            }
            // Check if new appointment completely overlaps with existing appointment (inclusive)
            if (newAppointment.getStartDateTime().isBefore(existingAppointment.getStartDateTime()) &&
                    newAppointment.getEndDateTime().isAfter(existingAppointment.getEndDateTime())) {
                return true;
            }
        }

        return false;
    }

    // Check for appointment overlap while updating appointment
    private boolean isAppointmentOverlapForUpdate(RescheduleRequest rescheduleRequest, Appointment oldAppointment) {
        List<Appointment> existingAppointments = appointmentRepository.findByDoctorId(rescheduleRequest.getDoctorId());
        for (Iterator<Appointment> iterator = existingAppointments.iterator(); iterator.hasNext();) {
            Appointment appointment = iterator.next();
    
            
            if (appointment.getId().equals(oldAppointment.getId())) {
                iterator.remove(); 
                break;
            }
    
            
        }
        for (Appointment existingAppointment : existingAppointments) {
            // Check if new appointment start time is between existing appointment's start and end times (inclusive)
            if ((rescheduleRequest.getStartDateTime().isAfter(existingAppointment.getStartDateTime()) ||
                    rescheduleRequest.getStartDateTime().isEqual(existingAppointment.getStartDateTime())) &&
                    (rescheduleRequest.getStartDateTime().isBefore(existingAppointment.getEndDateTime()) ||
                    rescheduleRequest.getStartDateTime().isEqual(existingAppointment.getEndDateTime()))) {
                return true;
            }
            // Check if new appointment end time is between existing appointment's start and end times (inclusive)
            if ((rescheduleRequest.getEndDateTime().isAfter(existingAppointment.getStartDateTime()) ||
                    rescheduleRequest.getEndDateTime().isEqual(existingAppointment.getStartDateTime())) &&
                    (rescheduleRequest.getEndDateTime().isBefore(existingAppointment.getEndDateTime()) ||
                    rescheduleRequest.getEndDateTime().isEqual(existingAppointment.getEndDateTime()))) {
                return true;
            }
            // Check if new appointment completely overlaps with existing appointment (inclusive)
            if (rescheduleRequest.getStartDateTime().isBefore(existingAppointment.getStartDateTime()) &&
            rescheduleRequest.getEndDateTime().isAfter(existingAppointment.getEndDateTime())) {
                return true;
            }
        }
        return false;
    }
}
