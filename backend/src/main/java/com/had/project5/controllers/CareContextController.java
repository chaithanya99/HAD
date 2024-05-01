package com.had.project5.controllers;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TimeZone;
import java.util.UUID;

// import org.hibernate.mapping.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.had.project5.entities.AuthModes;
import com.had.project5.entities.FetchAuthInit;
import com.had.project5.entities.Patient;
import com.had.project5.entities.Query;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.had.project5.entities.AuthConfirmRes;
import com.had.project5.entities.RequestTransactionMap;
import com.had.project5.entities.careContextStuff.AddContextReq;
import com.had.project5.entities.careContextStuff.AuthConfirm;
import com.had.project5.entities.careContextStuff.AuthOnInitRes;
import com.had.project5.entities.careContextStuff.CareContext;
import com.had.project5.entities.careContextStuff.Cred;
import com.had.project5.entities.careContextStuff.Link;
import com.had.project5.entities.careContextStuff.OnConfirmRes;
import com.had.project5.entities.careContextStuff.Patient1;
import com.had.project5.repositories.RequestTransactionRepo;
import com.had.project5.services.ApiService;
import com.had.project5.services.PatientService;

import org.springframework.http.*;
@RestController
public class CareContextController {

    @Autowired
    private PatientService patientService;

    @Autowired
	private RestTemplate restTemplate;

    @Autowired
    private ApiService apiService;

    @Autowired
    private RequestTransactionRepo requestTransactionRepo;
    
    @CrossOrigin(origins = "*")
    @PostMapping("/v0.5/users/auth/on-init")
    public void onFetchModes(@RequestBody AuthOnInitRes req){
        String requestId=req.getResp().getRequestId();

        RequestTransactionMap r=requestTransactionRepo.findByRequestId(requestId);
        if(r==null)
            return;
        System.out.println(req.getAuth().getTransactionId());
        r.setTransactionId(req.getAuth().getTransactionId());
        // r.setRequestId(req.getResp().getRequestId());
        requestTransactionRepo.save(r);
    }

    @PostMapping("/v0.5/users/auth/confirm")
    public ResponseEntity<String> authConfirm(@RequestBody AuthConfirmRes req){
        RequestTransactionMap r=requestTransactionRepo.findByRequestId(req.getRequestId());
        if(r==null){
            return ResponseEntity.status(404).body("requestId not found");
        }

        AuthConfirm a= new AuthConfirm();


         TimeZone timeZone1=TimeZone.getTimeZone("UTC");
       DateFormat dateFormat1 = new SimpleDateFormat("YYYY-MM-dd'T'HH:mm:ss.SSSSSS");
       dateFormat1.setTimeZone(timeZone1);
       String asISO1= dateFormat1.format(new Date());
        UUID uuid = UUID.randomUUID();
        a.setRequestId(uuid.toString());
        a.setTimestamp(asISO1);
        a.setTransactionId(r.getTransactionId());
        Cred c= new Cred();
        c.setAuthCode(req.getOtp());
        a.setCredential(c);

        String reqbody1="";
		try {
			reqbody1 = new ObjectMapper().writeValueAsString(a);
		} catch (JsonProcessingException e) {

			e.printStackTrace();
		}

       HttpHeaders header1 = new HttpHeaders();
       header1.setContentType(MediaType.APPLICATION_JSON);
       header1.setAccept(Collections.singletonList(MediaType.ALL));
       header1.add("X-CM-ID","sbx");
       header1.add("Authorization", "Bearer " + apiService.getToken());
       HttpEntity<String> httpentity1 = new HttpEntity<>(reqbody1, header1);
	    ResponseEntity<Object> objectResponseEntity1=restTemplate.exchange("https://dev.abdm.gov.in/gateway/v0.5/users/auth/confirm", HttpMethod.POST, httpentity1,Object.class);
        
        r.setRequestId(a.getRequestId());
        r.setDisplay(req.getDisplay());
        requestTransactionRepo.save(r);

        return ResponseEntity.ok().body("linked");

    }

    @CrossOrigin(origins = "*")
    @PostMapping("/v0.5/users/auth/on-confirm")
    public void authOnConfirm(@RequestBody OnConfirmRes req){

        RequestTransactionMap rt=requestTransactionRepo.findByRequestId(req.getResp().getRequestId());

        AddContextReq ar=new AddContextReq();
        TimeZone timeZone1=TimeZone.getTimeZone("UTC");
       DateFormat dateFormat1 = new SimpleDateFormat("YYYY-MM-dd'T'HH:mm:ss.SSSSSS");
       dateFormat1.setTimeZone(timeZone1);
       String asISO1= dateFormat1.format(new Date());
        UUID uuid = UUID.randomUUID();
        ar.setRequestId(uuid.toString());
        ar.setTimestamp(asISO1);
        Link l = new Link();
        l.setAccessToken(req.getAuth().getAccessToken());
        Patient1 p= new Patient1();
        Patient pp=patientService.getPatientByAbhaAddress(req.getAuth().getPatient().getId());
        p.setReferenceNumber(pp.getAbhaNumber());
        p.setDisplay(req.getAuth().getPatient().getName());
        CareContext c= new CareContext();
        c.setDisplay(rt.getDisplay());
        c.setReferenceNumber(String.valueOf(rt.getHealthRecordId()));
        CareContext[] li=new CareContext[1];
        li[0]=c;
        p.setCareContexts(li);
        l.setPatient(p);
        ar.setLink(l);

        String reqbody1="";
		try {
			reqbody1 = new ObjectMapper().writeValueAsString(ar);
		} catch (JsonProcessingException e) {

			e.printStackTrace();
		}

        HttpHeaders header1 = new HttpHeaders();
       header1.setContentType(MediaType.APPLICATION_JSON);
       header1.setAccept(Collections.singletonList(MediaType.ALL));
       header1.add("X-CM-ID","sbx");
       header1.add("Authorization", "Bearer " + apiService.getToken());
       HttpEntity<String> httpentity1 = new HttpEntity<>(reqbody1, header1);
	    ResponseEntity<Object> objectResponseEntity1=restTemplate.exchange("https://dev.abdm.gov.in/gateway/v0.5/links/link/add-contexts", HttpMethod.POST, httpentity1,Object.class);
       
    }
}
