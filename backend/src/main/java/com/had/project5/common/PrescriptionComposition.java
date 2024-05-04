// package com.had.project5.common;
// import java.util.Date;
// import java.util.List;

// import org.hl7.fhir.dstu2.model.Timing.UnitsOfTime;
// // import org.hl7.fhir.r4.hapi.model.*;
// import org.hl7.fhir.r4.model.*;
// import org.hl7.fhir.r4.model.Composition.CompositionStatus;
// import org.hl7.fhir.r4.model.Composition.SectionComponent;
// import org.hl7.fhir.r4.model.MedicationRequest.MedicationRequestIntent;
// import org.hl7.fhir.r4.model.MedicationRequest.MedicationRequestStatus;
// import org.hl7.fhir.r4.model.Timing.TimingRepeatComponent;

// public class PrescriptionComposition {
//     public static Composition populatePrescriptionCompositionResource(){
//         Composition composition = new Composition();
//         //set id logical id of this artifact
//         composition.setId("composition-01");
//         //set metadata data of the resource versiuonid,, lastupdated date, profile
//         Meta meta= new Meta();
//         meta.setVersionId("1");
//         meta.addProfile("https://www.nrces.in/ndhm/fhir/r4/StructureDefinition-PrescriptionRecord.html");
//         composition.setMeta(meta);
//         //set status :preliminary | final | amended | entered-in-error
//         composition.setStatus(CompositionStatus.FINAL);
//         //set type: kind of composition
//         composition.setType(new CodeableConcept(new Coding("http://snomed.info/sct", "440545006", "Prescription record")));
//         //set subject :Who and/or what the composition/Prescription record is about
//         composition.setSubject(new Reference("patient/patient-01"));
//         //set date Composition editing time
//         composition.setDate(new Date());
//         //set Author: Who and/or what authored the composition/Presciption record
//         composition.setAuthor((List<Reference>) new Reference("Practictioner/Practinioner-1"));
//         //set title: Human Readable name/title
//         composition.setTitle("Prescription Record");

//         SectionComponent section= new SectionComponent();
//         section.setCode(new CodeableConcept(new Coding("http://snomed.info/sct", "440545006", "Prescription record")));
//         Reference reference1 = new Reference();
//         reference1.setReference("Medication/Medication-1"); //resource/resource-id
//         reference1.setType("MedicationRequest");

//         Reference reference2=new Reference();
//         reference2.setReference("Binary/Binary-1");
//         reference2.setType("Binary");

//         section.addEntry(reference1).addEntry(reference2);

//         composition.addSection(section);
//         return composition;
//     }

//     public static Patient populatePatientResource(){
//         Patient patient = new Patient();
//         patient.setId("Patient-0");
//         patient.getMeta().setVersionId("1").setLastUpdatedElement(new  )
//     }

//     public static MedicationRequest populateMedicationRequest(){
//         MedicationRequest medicationRequest = new MedicationRequest();
//         medicationRequest.setId("MedicationRequest-01");
//         medicationRequest.getMeta().addProfile("https://nrces.in/ndhm/fhir/r4/StructureDefinition/MedicationRequest");
//         medicationRequest.setStatus(MedicationRequestStatus.ACTIVE);
//         medicationRequest.setIntent(MedicationRequestIntent.ORDER);
//         medicationRequest.setMedication(new CodeableConcept(new Coding("http://snomed.info/sct","324252006","Azithromycin (as azithromycin dihygrate) 250mg oral capusule")));
//         medicationRequest.setSubject(new Reference().setReference("Patient/Patient-01").setDisplay("ABC"));
//         medicationRequest.setAuthoredOnElement(new DateTimeType("2020-07-09"));
//         medicationRequest.setRequester(new Reference().setReference("Practitioner/Practitioner-01").setDisplay("Dr ABC"));
//         medicationRequest.getReasonCode().add(new CodeableConcept(new Coding("http://snomed.info/sct", "11840006", "Traveller's Diarrhea (disorder)")));
//         medicationRequest.getReasonReference().add(new Reference().setReference("Condition/Condition-01"));
//         medicationRequest.addDosageInstruction(new Dosage().setText("One tablet at once").addAdditionalInstruction(new CodeableConcept(new Coding("http://snomed.info/sct", "311504000", "with or after food "))).setTiming(new Timing().setRepeat(new TimingRepeatComponent().setFrequency(1).setPeriod(1).setPeriodUnit(UnitsOfTime.D))).setRoute(new CodeableConcept(new Coding("http://snomed.info/act", "26643006", "oral route"))).setMethod(new CodeableConcept(new Coding("http://snomed.info/sct", "421521009", "swallow"))));

//         return medicationRequest;
//     }
// }
