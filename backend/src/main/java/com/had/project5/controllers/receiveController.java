package com.had.project5.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.had.project5.entities.ListString;
import com.had.project5.services.Pdf1Service;

import java.util.List;

@RestController
public class receiveController {

    @Autowired
    private Pdf1Service pdf1Service;

    @PostMapping("/sendFiles")
    public void addFiles(@RequestBody List<String> strings) throws JsonMappingException, JsonProcessingException {

        // List<String> strings=req.getStrings();
        System.out.println("in the send files receive controller" + strings.size());
        // Gson gson=new Gson();
        ObjectMapper objectMapper = new ObjectMapper();
        for (String s : strings) {
            JsonNode jsonNode = objectMapper.readTree(s).get("entry").get(3).get("resource").get("data");
            String data = jsonNode.asText();
            JsonNode jsonNode1=objectMapper.readTree(s).get("entry").get(1).get("resource").get("id");
            String patientAbhaAddress=jsonNode1.asText();
            System.out.println(data);
            System.out.println(patientAbhaAddress);
            pdf1Service.addPdf(patientAbhaAddress, data);
            // JsonObject jsonObject = gson.fromJson(s, JsonObject.class);
            // String ss=jsonObject.get("entry").get(3).get("resource").get("data");
        }

    }

}
