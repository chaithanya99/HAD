package com.had.project5.controllers;
import com.had.project5.services.ApiService;
import org.springframework.beans.factory.annotation.Autowired;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.had.project5.entities.AuthModes;
import com.had.project5.entities.consentstuff.HipOnRequest;
import com.had.project5.entities.consentstuff.HnRequest;
import com.had.project5.entities.consentstuff.CmRequest;
import com.had.project5.entities.Resp;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.util.UUID;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "*") // Specify the allowed origin(s)

public class CallBackController{
    @Autowired
    private ApiService apiService;
    @PostMapping("v0.5/users/auth/on-fetch-modes")
    public void on_fetch_modes(@RequestBody AuthModes object) {
        try{
            List<String> modes_list = object.getAuth().getModes();
            System.out.print(object.getRequestId());
            System.out.println("\n");
            System.out.println("Available Login modes are: ");
            for(String i : modes_list){
                System.out.println(i);
            }
        }
        catch(Exception e){
            throw new RuntimeException(e);

        }
    }

    @PostMapping("v0.5/health-information/hip/request")
    public void hipRequest(@RequestBody CmRequest object) throws Exception {
        System.out.println("Callback Received!!");
        System.out.println(object.toString());
        UUID uuid = UUID.randomUUID();
        String randomUUIDString = uuid.toString();
        TimeZone timeZone=TimeZone.getTimeZone("UTC");
        DateFormat dateFormat = new SimpleDateFormat("YYYY-MM-dd'T'HH:mm:ss.SSSSSS");
        dateFormat.setTimeZone(timeZone);
        String asISO= dateFormat.format(new Date());
        HipOnRequest hipOnRequest=new HipOnRequest();
        HnRequest hiOnRequest=new HnRequest();
        hipOnRequest.setRequestId(randomUUIDString);
        hipOnRequest.setTimestamp(asISO);
        hiOnRequest.setTransactionId(object.getTransactionId());
        hiOnRequest.setSessionStatus("ACKNOWLEDGED");
        hipOnRequest.setHiRequest(hiOnRequest);
        Resp resp=new Resp();
        resp.setRequestId(object.getRequestId());
        hipOnRequest.setResp(resp);

        String reqbody1="";
        try {
            reqbody1 = new ObjectMapper().writeValueAsString(hipOnRequest);
        } catch (JsonProcessingException e) {

            e.printStackTrace();
        }
//        String res = apiService.catfact();
//        System.out.println(res);
        String res=apiService.makeSpecialRequest("https://dev.ndhm.gov.in/gateway/v0.5/health-information/hip/on-request",reqbody1);
    }
}
