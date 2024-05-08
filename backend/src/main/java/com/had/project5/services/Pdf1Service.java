package com.had.project5.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Base64;
import java.util.List;

import com.had.project5.entities.healthrecordstuff.Pdf1;
import com.had.project5.repositories.PdfRepo;

@Service
public class Pdf1Service {
    @Autowired
    private PdfRepo pdfRepo;

    public Pdf1 addPdf(String patientAbhaAddress,String data){
        byte[] d=Base64.getDecoder().decode(data);
        Pdf1 p=new Pdf1();
        p.setPatientAbhaAddress(patientAbhaAddress);
        p.setPdf(d);
        pdfRepo.save(p);
        return p;
    }

    public List<Pdf1> getAllPdfs(String patientAbhaAddress){
        return pdfRepo.findByPatientAbhaAddress(patientAbhaAddress);
    }
}
