package com.had.project5.services;

import java.io.IOException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;

import org.hl7.fhir.r4.model.Bundle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.had.project5.common.PrescriptionBundleDocument;
import com.had.project5.common.Validator;
import com.had.project5.entities.Doctor;
import com.had.project5.entities.Patient;
import com.had.project5.entities.healthrecordstuff.Pdf;

@Service
public class BundlingService {

    @Autowired
    private PdfService pdfService;

    public List<String> createBundles(Patient p, Doctor d,String fromTime,String toTime) throws ParseException, IOException{
        List<Pdf> pdfs=pdfService.getPdfsUsingTime(d.getId(),p.getId(), fromTime, toTime);
        System.out.println(pdfs.size());
        // List<Bundle> bundles=new ArrayList<>();
        List<String> bundles = new ArrayList<>();
        for(Pdf pdf:pdfs){
            // Bundle bundle=PrescriptionBundleDocument.populatePrescriptionBundle(p, d, pdf);
            String str=PrescriptionBundleDocument.helper(p, d, pdf);
            Validator.helper(p,d,pdf);
            // bundles.add(bundle);
            bundles.add(str);
        }
        
        return bundles;
        
    }
}
