package com.had.project5.controllers;

import com.had.project5.entities.Appointment;
import com.had.project5.repositories.AppointmentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.had.project5.entities.RescheduleRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentRepo appointmentRepository;

    @GetMapping
    public ResponseEntity<Appointment> getAppointment(@RequestParam Long id) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow();
        return ResponseEntity.ok(appointment);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createAppointment(@RequestBody Appointment appointment) {
        // Check for appointment overlap
        if (isAppointmentOverlap(appointment)) {
            return ResponseEntity.badRequest().body("Appointment overlaps with existing appointment");
        }

        Appointment savedAppointment = appointmentRepository.save(appointment);
        return ResponseEntity.ok(savedAppointment);
    }

    @GetMapping("/doctor")
    public ResponseEntity<List<Appointment>> getAppointmentsForDoctor(@RequestParam Long doctorId) {
        List<Appointment> appointments = appointmentRepository.findByDoctorId(doctorId);
        return ResponseEntity.ok(appointments);
    }

    @DeleteMapping
    public ResponseEntity<?> deleteAppointment(@RequestParam Long id) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow();

        appointmentRepository.delete(appointment);

        return ResponseEntity.ok().build();
    }

    @PutMapping("/reschedule")
    public ResponseEntity<?> rescheduleAppointment(@RequestBody RescheduleRequest rescheduleRequest) {
        Long appointmentId = rescheduleRequest.getAppointmentId();
        Long doctorId = rescheduleRequest.getDoctorId();
        Appointment updatedAppointment = rescheduleRequest.getUpdatedAppointment();

        Appointment existingAppointment = appointmentRepository.findById(appointmentId)
                .orElseThrow();

        // Check for appointment overlap
        if (isAppointmentOverlapForUpdate(updatedAppointment, existingAppointment)) {
            return ResponseEntity.badRequest().body("Appointment overlaps with existing appointment");
        }

        // Update appointment details
        existingAppointment.setStartDateTime(updatedAppointment.getStartDateTime());
        existingAppointment.setEndDateTime(updatedAppointment.getEndDateTime());
        // You may add more fields to update

        Appointment savedAppointment = appointmentRepository.save(existingAppointment);

        return ResponseEntity.ok(savedAppointment);
    }

    // Check for appointment overlap while creating appointment
    private boolean isAppointmentOverlap(Appointment newAppointment) {
        List<Appointment> existingAppointments = appointmentRepository.findByDoctorId(newAppointment.getDoctor().getId());

        for (Appointment existingAppointment : existingAppointments) {
            // Check if new appointment start time falls between existing appointment's start and end times
            if (newAppointment.getStartDateTime().isAfter(existingAppointment.getStartDateTime()) &&
                    newAppointment.getStartDateTime().isBefore(existingAppointment.getEndDateTime())) {
                return true;
            }
            // Check if new appointment end time falls between existing appointment's start and end times
            if (newAppointment.getEndDateTime().isAfter(existingAppointment.getStartDateTime()) &&
                    newAppointment.getEndDateTime().isBefore(existingAppointment.getEndDateTime())) {
                return true;
            }
            // Check if new appointment completely overlaps with existing appointment
            if (newAppointment.getStartDateTime().isBefore(existingAppointment.getStartDateTime()) &&
                    newAppointment.getEndDateTime().isAfter(existingAppointment.getEndDateTime())) {
                return true;
            }
        }

        return false;
    }

    // Check for appointment overlap while updating appointment
    private boolean isAppointmentOverlapForUpdate(Appointment newAppointment, Appointment existingAppointment) {
        List<Appointment> existingAppointments = appointmentRepository.findByDoctorId(newAppointment.getDoctor().getId());

        for (Appointment appointment : existingAppointments) {
            // Skip the existing appointment being updated
            if (appointment.getId().equals(existingAppointment.getId())) {
                continue;
            }

            // Check if new appointment start time falls between existing appointment's start and end times
            if (newAppointment.getStartDateTime().isAfter(appointment.getStartDateTime()) &&
                    newAppointment.getStartDateTime().isBefore(appointment.getEndDateTime())) {
                return true;
            }
            // Check if new appointment end time falls between existing appointment's start and end times
            if (newAppointment.getEndDateTime().isAfter(appointment.getStartDateTime()) &&
                    newAppointment.getEndDateTime().isBefore(appointment.getEndDateTime())) {
                return true;
            }
            // Check if new appointment completely overlaps with existing appointment
            if (newAppointment.getStartDateTime().isBefore(appointment.getStartDateTime()) &&
                    newAppointment.getEndDateTime().isAfter(appointment.getEndDateTime())) {
                return true;
            }
        }
        return false;
    }
}
