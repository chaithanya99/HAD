package com.had.project5.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.had.project5.entities.healthrecordstuff.Pdf;
import com.had.project5.repositories.PdfUploadRepo;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;

@Service
public class PdfService {

    @Autowired
    private PdfUploadRepo pdfUploadRepo;

    public List<Pdf> getPdfsUsingTime(Long doctorId,Long patientId,String fromTime,String toTime) throws ParseException{
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSSSS");
        DateFormat iso8601Format = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
        iso8601Format.setTimeZone(TimeZone.getTimeZone("Asia/Kolkata"));
        dateFormat.setTimeZone(TimeZone.getTimeZone("UTC"));
        Date fromDate;
       
        fromDate = iso8601Format.parse(fromTime);
        
        Date toDate = iso8601Format.parse(toTime);

       
        List<Pdf> pdfs = pdfUploadRepo.findByPatientIdAndDoctorId(patientId, doctorId);
        List<Pdf> pdfsInRange = new ArrayList<>();
        for (Pdf pdf : pdfs) {
            Date pdfTime = dateFormat.parse(pdf.getTime()); 
            if (pdfTime.after(fromDate) && pdfTime.before(toDate)) {
                pdfsInRange.add(pdf);
            }
        }
        return pdfsInRange;
        
    }
}
