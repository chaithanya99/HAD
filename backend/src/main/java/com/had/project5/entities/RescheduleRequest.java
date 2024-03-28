package com.had.project5.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class RescheduleRequest {
    private Long appointmentId;
    private Long doctorId;
    private Appointment updatedAppointment;
}
