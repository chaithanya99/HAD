package com.had.project5.controllers;

import java.io.IOException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.hl7.fhir.r4.model.Bundle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.had.project5.entities.Doctor;
import com.had.project5.entities.Patient;
import com.had.project5.entities.consentstuff.ConsentRequest;
import com.had.project5.services.BundlingService;
import com.had.project5.services.DoctorService;
import com.had.project5.services.GsonService;
import com.had.project5.services.PatientService;



@RestController
public class SendingDataController {

    @Autowired
    private BundlingService bundlingService;

    @Autowired
    private PatientService patientService;

    @Autowired
    private DoctorService doctorService;

    @Autowired
    private GsonService gsonService;

    @PostMapping("/getFiles")
    public void getFiles(@RequestBody ConsentRequest req) throws ParseException, IOException{
        Patient p = patientService.getPatientByAbhaAddress(req.getAbhaId());
        Optional<Doctor> d = doctorService.getDoctorById(Long.parseLong(req.getDoctorId()));
        Doctor dd = d.get();
        
        List<String> li=bundlingService.createBundles(p, dd, req.getFromTime(), req.getToTime());
        System.out.println("in hte get files");
        System.out.println(p.getId());
        System.out.println(li.size());
        String webhookUrl = "https://webhook.site/08541934-6f39-461e-a1d6-4a941fa262e3/sendFiles";

        // Create a list of Bundle objects (assuming Bundle is a custom class)
        
        // Add more bundles as needed

        // Serialize the list to JSON
        Gson customGson = gsonService.createCustomGson();
        String jsonPayload = customGson.toJson(li);
        // Gson gson = new Gson();
        // String jsonPayload = gson.toJson(li);

        try (CloseableHttpClient httpClient = HttpClients.createDefault()) {
            // Create HTTP POST request
            HttpPost httpPost = new HttpPost(webhookUrl);

            // Set headers
            httpPost.setHeader("Content-Type", "application/json");

            // Set JSON payload
            StringEntity entity = new StringEntity(jsonPayload);
            httpPost.setEntity(entity);

            // Execute the request
            CloseableHttpResponse response = httpClient.execute(httpPost);

            // Print the response status code
            System.out.println("Response Status Code: " + response.getStatusLine().getStatusCode());

            // Handle the response entity if needed
            HttpEntity responseEntity = response.getEntity();
            if (responseEntity != null) {
                String responseBody = EntityUtils.toString(responseEntity);
                System.out.println("Response Body: " + responseBody);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

    }
}
