package com.had.project5.common;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

// import org.hl7.fhir.dstu2.model.Timing.UnitsOfTime;
import org.hl7.fhir.r4.model.*;
// import org.hl7.fhir.r4.model.*;
// import org.hl7.fhir.r4.model.Composition.CompositionStatus;
// import org.hl7.fhir.r4.model.Composition.SectionComponent;
// import org.hl7.fhir.r4.model.MedicationRequest.MedicationRequestIntent;
// import org.hl7.fhir.r4.model.MedicationRequest.MedicationRequestStatus;
// import org.hl7.fhir.r4.model.Timing.TimingRepeatComponent;
import org.hl7.fhir.r4.model.Composition.CompositionStatus;
import org.hl7.fhir.r4.model.Composition.SectionComponent;

public class PrescriptionComposition {
    public static Composition populatePrescriptionCompositionResource(){
        Composition composition = new Composition();
        //set id logical id of this artifact
        composition.setId("composition-01");
        //set metadata data of the resource versiuonid,, lastupdated date, profile
        Meta meta= new Meta();
        meta.setVersionId("1");
        meta.addProfile("https://nrces.in/ndhm/fhir/r4/StructureDefinition/PrescriptionRecord");
        composition.setMeta(meta);
        //set status :preliminary | final | amended | entered-in-error
        composition.setStatus(CompositionStatus.FINAL);
        //set type: kind of composition
        composition.setType(new CodeableConcept(new Coding("http://snomed.info/sct", "440545006", "Prescription record")));
        //set subject :Who and/or what the composition/Prescription record is about
        composition.setSubject(new Reference("patient/patient-01")); //patient id
        //set date Composition editing time
        composition.setDate(new Date());
        //set Author: Who and/or what authored the composition/Presciption record
        Reference authorReference= new Reference("Practitioner/Practitioner-01"); //doctor id
        List<Reference> authorList=new ArrayList<>();
        authorList.add(authorReference);
        composition.setAuthor(authorList);
        // composition.setAuthor((List<Reference>) new Reference("Practictioner/Practinioner-1"));
        // composition.setAuthor(new Reference("Practictioner/Practinioner-1"));
        //set title: Human Readable name/title
        composition.setTitle("Prescription Record");

        SectionComponent section= new SectionComponent();
        section.setCode(new CodeableConcept(new Coding("http://snomed.info/sct", "440545006", "Prescription record")));
        // Reference reference1 = new Reference();
        // reference1.setReference("MedicationRequest/MedicationRequest-01"); //resource/resource-id
        // reference1.setType("MedicationRequest");

        Reference reference2=new Reference();
        reference2.setReference("Binary/Binary-01");
        reference2.setType("Binary");

        // section.addEntry(reference1).addEntry(reference2);
        section.addEntry(reference2);

        composition.addSection(section);
        return composition;
    }



    

    

}
