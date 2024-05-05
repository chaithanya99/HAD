// package com.had.project5.common;
// import java.util.List;

// import org.hl7.fhir.r4.formats.IParser;
// import org.hl7.fhir.r4.model.*;
// import org.hl7.fhir.r4.model.Bundle.BundleEntryComponent;
// import org.hl7.fhir.r4.model.Bundle.BundleType;

// import ca.uhn.fhir.context.FhirContext;
// public class PrescriptionBundleDocument {
//     public static Bundle populatePrescriptionBundle(){
//         Bundle prescriptionBundle=new Bundle();
//         prescriptionBundle.setId("prescription-bundle-01");
//         Meta meta = prescriptionBundle.getMeta();
//         meta.setVersionId("1");
//         meta.setLastUpdatedElement(new InstantType("2020-07-09T15:32:26.605+05:30"));
//         meta.addProfile("https://nrces.in/ndhm/fhir/r4/StructureDefinition/DocumentBundle");
//         meta.addSecurity(new Coding("http://terminology.hl7.org/CodeSystem/v3-Confidentiality","v","very restricted"));
//         Identifier identifier=prescriptionBundle.getIdentifier();
//         identifier.setValue("blkdfjskljsdklfjklsdfjkl");
//         identifier.setSystem("http://hip.in");;
//         prescriptionBundle.setType(BundleType.DOCUMENT);
//         prescriptionBundle.setTimestampElement(new InstantType("2020-07-09T15:32:26.605+05:30"));
//         List<BundleEntryComponent> listBundleEntries=prescriptionBundle.getEntry();
//         BundleEntryComponent bundleEntryl= new BundleEntryComponent();
//         bundleEntryl.setFullUrl("Composition/Composition-01");
//         bundleEntryl.setResource(PrescriptionComposition.populatePrescriptionCompositionResource());
//         BundleEntryComponent bundleEntry2=new BundleEntryComponent();
//         bundleEntry2.setFullUrl("Patient/Patient-01");
//         bundleEntry2.setResource(ResourcePopulator.populatePatientResource());
//         BundleEntryComponent bundleEntry3 = new BundleEntryComponent();
//         bundleEntry3.setFullUrl("Practioner/Practitioner-01");
//         bundleEntry3.setResource(ResourcePopulator.populatePractionerResource());
//         BundleEntryComponent bundleEntry4 = new BundleEntryComponent();
//         bundleEntry4.setFullUrl("MedicationRequest/MedicationRequest-01");
//         bundleEntry4.setResource(ResourcePopulator.populateMedicationRequest());

//         BundleEntryComponent bundleEntry5= new BundleEntryComponent();
//         bundleEntry5.setFullUrl("Binary/Binary-01");
//         bundleEntry5.setResource(ResourcePopulator.populateBinaryResource());
//         listBundleEntries.add(bundleEntryl);
//         listBundleEntries.add(bundleEntry2);
//         listBundleEntries.add(bundleEntry3);
//         listBundleEntries.add(bundleEntry4);
//         listBundleEntries.add(bundleEntry5);

//         return prescriptionBundle;
//     }

//     static FhirContext ctx = FhirContext.forR4();
//     public static void main(String[] args) {
//         ca.uhn.fhir.parser.IParser parser= ctx.newJsonParser().setPrettyPrint(true);
//         String str=parser.encodeResourceToString(PrescriptionBundleDocument.populatePrescriptionBundle());

//     }

// }
