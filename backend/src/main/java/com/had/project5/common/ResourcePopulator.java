package com.had.project5.common;
// import org.hl7.fhir.dstu2.model.Narrative.NarrativeStatus;
import org.hl7.fhir.r4.model.*;
import org.hl7.fhir.r4.model.ContactPoint.ContactPointSystem;
import org.hl7.fhir.r4.model.ContactPoint.ContactPointUse;
import org.hl7.fhir.r4.model.Enumerations.AdministrativeGender;
import org.hl7.fhir.r4.model.MedicationRequest.MedicationRequestIntent;
import org.hl7.fhir.r4.model.MedicationRequest.MedicationRequestStatus;
import org.hl7.fhir.r4.model.Narrative.NarrativeStatus;
import org.hl7.fhir.r4.model.Timing.TimingRepeatComponent;
import org.hl7.fhir.r4.model.Timing.UnitsOfTime;

public class ResourcePopulator 
{
    public static Binary populateBinaryResource(){
        Binary binary = new Binary();
        binary.setId("Binary-01");
        binary.getMeta().addProfile("https://nrces.in/ndhm/fhir/r4/StructureDefinition/Binary");
        binary.setContentType("application/pdf");
        binary.setDataElement(new Base64BinaryType("dfghbsdfdfghdghfghb"));
        return binary;
    }
    public static MedicationRequest populateMedicationRequest(){
        MedicationRequest medicationRequest = new MedicationRequest();
        medicationRequest.setId("MedicationRequest-01");
        medicationRequest.getMeta().addProfile("https://nrces.in/ndhm/fhir/r4/StructureDefinition/MedicationRequest");
        medicationRequest.setStatus(MedicationRequestStatus.ACTIVE);
        medicationRequest.setIntent(MedicationRequestIntent.ORDER);
        medicationRequest.setMedication(new CodeableConcept(new Coding("http://snomed.info/sct","324252006","Azithromycin (as azithromycin dihygrate) 250mg oral capusule")));
        medicationRequest.setSubject(new Reference().setReference("Patient/Patient-01").setDisplay("ABC"));
        medicationRequest.setAuthoredOnElement(new DateTimeType("2020-07-09"));
        medicationRequest.setRequester(new Reference().setReference("Practitioner/Practitioner-01").setDisplay("Dr ABC"));
        medicationRequest.getReasonCode().add(new CodeableConcept(new Coding("http://snomed.info/sct", "11840006", "Traveller's Diarrhea (disorder)")));
        medicationRequest.getReasonReference().add(new Reference().setReference("Condition/Condition-01"));
        medicationRequest.addDosageInstruction(new Dosage().setText("One tablet at once").addAdditionalInstruction(new CodeableConcept(new Coding("http://snomed.info/sct", "311504000", "with or after food "))).setTiming(new Timing().setRepeat(new TimingRepeatComponent().setFrequency(1).setPeriod(1).setPeriodUnit(UnitsOfTime.D))).setRoute(new CodeableConcept(new Coding("http://snomed.info/act", "26643006", "oral route"))).setMethod(new CodeableConcept(new Coding("http://snomed.info/sct", "421521009", "swallow"))));

        return medicationRequest;
    }

    public static Patient populatePatientResource(){
        Patient patient = new Patient();
        patient.setId("Patient-01");
        patient.getMeta().setVersionId("1").setLastUpdatedElement(new InstantType("2020-07-09T14:58:58.181+05:30")).addProfile("https://nrces.in/ndhm/fhir/r4/StructureDefinition/Patient");
        patient.getText().setStatus(NarrativeStatus.GENERATED).setDivAsString("<div xmlns=\"http://www.w3.org/1999/xhtml\">ABC,41 year,Male</div>");
        patient.addIdentifier().setType(new CodeableConcept(new Coding("http://terminology.hl7.org/CodeSystem/v2-0203","MR","Medical record number"))).setSystem("https://ndhm.in/SwasthID").setValue("1234");
        patient.addName().setText("ABC");
        patient.addTelecom().setSystem(ContactPointSystem.PHONE).setValue("+91981851260").setUse(ContactPointUse.MOBILE);
        patient.setGender(AdministrativeGender.MALE).setBirthDateElement(new DateType("1981-01-12"));


        return patient;
    }

    public static Practitioner populatePractionerResource(){
        Practitioner practitioner= new Practitioner();
        practitioner.setId("Practitioner-01");
        practitioner.getMeta().setVersionId("1").setLastUpdatedElement(new InstantType("2020-07-09T14:58:58.181+05:30")).addProfile("https://nrces.in/ndhm/fhir/r4/StructureDefinition/Practitioner");
        practitioner.getText().setStatus(NarrativeStatus.GENERATED).setDivAsString("<div xmlns=\"http://www.w3.org/1999/xhtml\">Dr. DEF, MD (Medicine)</div>");
        practitioner.addIdentifier().setType(new CodeableConcept(new Coding("http://terminology.hl7.org/CodeSystem/v2-0203","MD","Medical License Number"))).setSystem("https://ndhm.in/DigiDoc").setValue("7601003178999");
        practitioner.addName().setText("Dr. DEF");
        return practitioner;

    }

}
