package com.had.project5.controllers;
import com.had.project5.repositories.HealthRecordRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.had.project5.entities.HealthRecord;

@RestController
@CrossOrigin(origins = "*") // Specify the allowed origin(s)
@RequestMapping("/HealthRecord")
public class HealthRecordController {

    @Autowired
    private HealthRecordRepo healthrecordrepo;


    @PostMapping("/createhealthrecord")
    public HealthRecord createHealthRecord(@RequestBody HealthRecord healthrec)
    {
        return healthrecordrepo.save(healthrec);
    }
}

