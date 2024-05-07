package com.had.project5.services;

import java.io.IOException;
import java.util.List;
import java.util.TimeZone;
import java.util.Date;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.had.project5.entities.healthrecordstuff.Pdf;
import com.had.project5.repositories.PdfUploadRepo;
import java.text.DateFormat;
import java.text.SimpleDateFormat;

@Service
public class FileUploadService {
    @Autowired
    private PdfUploadRepo pdfUploadRepo;

    public String uploadPDF(MultipartFile file,Long doctorId,Long patientId) throws IOException{
        Pdf pdf=new Pdf();
        pdf.setDoctorId(doctorId);
        pdf.setPatientId(patientId);
        pdf.setPdf(file.getBytes());
        pdf.setType(file.getContentType());
        pdf.setName(file.getOriginalFilename());
        // Date currentDate = new Date(); // Get the current date and time

        // // Create a date formatter with the desired format
        // DateFormat customFormat = new SimpleDateFormat("yyyy-MM-dd-HH-mm-ss.SSS");

        // // Format the date to a string using the custom format
        // String dateString = customFormat.format(currentDate);

        // pdf.setTime(dateString);
        DateFormat iso8601Format = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
        Date date = new Date();
        iso8601Format.setTimeZone(TimeZone.getTimeZone("Asia/Kolkata")); // Set the desired timezone

        // Format the date to a string using the ISO 8601 format
        String iso8601String = iso8601Format.format(date);
        pdf.setTime(iso8601String);
        pdf=pdfUploadRepo.save(pdf);
        if(pdf!=null){
            return "file uploaded successfully";
        }
        return "file not uploaded";
    }

    public List<Pdf> getPdfsByPatientId(Long patientId){
        return pdfUploadRepo.findByPatientId(patientId);
    }

    public List<Pdf> getPdfsByPatientIdAndDoctorId(Long patientId,Long doctorId){
        return pdfUploadRepo.findByPatientIdAndDoctorId(patientId, doctorId);
    }

}
