package com.had.project5.common;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;

import org.hl7.fhir.r4.formats.IParser;
import org.hl7.fhir.r4.model.*;
import org.hl7.fhir.r4.model.Bundle.BundleEntryComponent;
import org.hl7.fhir.r4.model.Bundle.BundleType;

import com.had.project5.entities.Doctor;
import com.had.project5.entities.Patient;
import com.had.project5.entities.healthrecordstuff.Pdf;

import ca.uhn.fhir.context.FhirContext;
public class PrescriptionBundleDocument {
    public static Bundle populatePrescriptionBundle(Patient p,Doctor d,Pdf pdf){
        Bundle prescriptionBundle=new Bundle();
        // prescriptionBundle.setId("prescription-bundle-01"); //need to make random generation
        prescriptionBundle.setId(String.valueOf(pdf.getId()));
        Meta meta = prescriptionBundle.getMeta();
        meta.setVersionId("1");

        // TimeZone timeZone1=TimeZone.getTimeZone("UTC");
        // DateFormat dateFormat1 = new SimpleDateFormat("YYYY-MM-dd'T'HH:mm:ss.SSSSSS");
        // dateFormat1.setTimeZone(timeZone1);
        // String asISO1= dateFormat1.format(new Date());

        meta.setLastUpdatedElement(new InstantType(new Date()));
        // meta.setLastUpdatedElement(new InstantType("2020-07-09T15:32:26.605+05:30")); //add time stamp 
        meta.addProfile("https://nrces.in/ndhm/fhir/r4/StructureDefinition/DocumentBundle");
        meta.addSecurity(new Coding("http://terminology.hl7.org/CodeSystem/v3-Confidentiality","V","very restricted")); // wont be there
        Identifier identifier=prescriptionBundle.getIdentifier();
        identifier.setValue("blkdfjskljsdklfjklsdfjkl"); // need to check
        identifier.setSystem("http://hip.in");;
        prescriptionBundle.setType(BundleType.DOCUMENT);
        prescriptionBundle.setTimestampElement(new InstantType(pdf.getTime())); //lil sus
        // prescriptionBundle.setTimestampElement(new InstantType("2020-07-09T15:32:26.605+05:30")); //pres generated value
        List<BundleEntryComponent> listBundleEntries=prescriptionBundle.getEntry();
        BundleEntryComponent bundleEntryl= new BundleEntryComponent();
        bundleEntryl.setFullUrl("Composition/Composition-01");//composition id
        bundleEntryl.setResource(PrescriptionComposition.populatePrescriptionCompositionResource());
        BundleEntryComponent bundleEntry2=new BundleEntryComponent();
        bundleEntry2.setFullUrl("patient/patient-01");
        bundleEntry2.setResource(ResourcePopulator.populatePatientResource(p));
        BundleEntryComponent bundleEntry3 = new BundleEntryComponent();
        bundleEntry3.setFullUrl("Practitioner/Practitioner-01");
        bundleEntry3.setResource(ResourcePopulator.populatePractionerResource(d));
        // BundleEntryComponent bundleEntry4 = new BundleEntryComponent();
        // bundleEntry4.setFullUrl("MedicationRequest/MedicationRequest-01");
        // bundleEntry4.setResource(ResourcePopulator.populateMedicationRequest());

        BundleEntryComponent bundleEntry5= new BundleEntryComponent();
        bundleEntry5.setFullUrl("Binary/Binary-01");
        bundleEntry5.setResource(ResourcePopulator.populateBinaryResource(pdf));
        listBundleEntries.add(bundleEntryl);
        listBundleEntries.add(bundleEntry2);
        listBundleEntries.add(bundleEntry3);
        // listBundleEntries.add(bundleEntry4);
        listBundleEntries.add(bundleEntry5);

        return prescriptionBundle;
    }

    static FhirContext ctx = FhirContext.forR4();

    public static String helper(Patient p, Doctor d,Pdf pdf){
        ca.uhn.fhir.parser.IParser parser= ctx.newJsonParser().setPrettyPrint(true);
        String str=parser.encodeResourceToString(PrescriptionBundleDocument.populatePrescriptionBundle(p,d,pdf));
        System.out.println("came here");
        System.out.println(str);
        return str;
    }


    // static FhirContext ctx = FhirContext.forR4();
    // public static void main(String[] args) {
    //     ca.uhn.fhir.parser.IParser parser= ctx.newJsonParser().setPrettyPrint(true);
    //     String str=parser.encodeResourceToString(PrescriptionBundleDocument.populatePrescriptionBundle());
    //     System.out.println(str);
    // }

}
