package com.had.project5.common;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;

import org.hl7.fhir.common.hapi.validation.support.CachingValidationSupport;
import org.hl7.fhir.common.hapi.validation.support.CommonCodeSystemsTerminologyService;
import org.hl7.fhir.common.hapi.validation.support.InMemoryTerminologyServerValidationSupport;
import org.hl7.fhir.common.hapi.validation.support.NpmPackageValidationSupport;
import org.hl7.fhir.common.hapi.validation.support.SnapshotGeneratingValidationSupport;
import org.hl7.fhir.common.hapi.validation.support.ValidationSupportChain;
import org.hl7.fhir.common.hapi.validation.validator.FhirInstanceValidator;

import com.had.project5.entities.Doctor;
import com.had.project5.entities.Patient;
import com.had.project5.entities.healthrecordstuff.Pdf;

import ca.uhn.fhir.context.FhirContext;
import ca.uhn.fhir.context.support.DefaultProfileValidationSupport;
import ca.uhn.fhir.validation.FhirValidator;
import ca.uhn.fhir.validation.SingleValidationMessage;
import ca.uhn.fhir.validation.ValidationResult;

public class Validator {
    static FhirContext ctx = FhirContext.forR4();
    public static void helper(Patient p,Doctor d,Pdf pdf) throws IOException{
        NpmPackageValidationSupport npmPackageValidationSupport = new NpmPackageValidationSupport(ctx);
        npmPackageValidationSupport.loadPackageFromClasspath("classpath:package.tgz");
        
        // create a validation support chain
        ValidationSupportChain validationSupportChain = new ValidationSupportChain(
            npmPackageValidationSupport,
            new DefaultProfileValidationSupport(ctx),
            new CommonCodeSystemsTerminologyService(ctx),
            new InMemoryTerminologyServerValidationSupport(ctx),
            new SnapshotGeneratingValidationSupport(ctx)
        );
        
        // ArrayList<String> reference = new ArrayList<>(Arrays.asList("1", "2", "3"));
        // ArrayList<String> data = new ArrayList<>(Arrays.asList("JVBERi0xL", "Arya", "Rakshit"));
        
        CachingValidationSupport validationSupport = new CachingValidationSupport(validationSupportChain);

        FhirValidator validator = ctx.newValidator();
        FhirInstanceValidator instanceValidator = new FhirInstanceValidator(validationSupport);

        validator.registerValidatorModule(instanceValidator);
        
        ValidationResult outCome = validator.validateWithResult(PrescriptionBundleDocument.populatePrescriptionBundle(p,d,pdf));

        for(SingleValidationMessage next : outCome.getMessages()) {
            System.out.println(next.getSeverity() + "-" + next.getLocationString() + "-" + next.getMessage());
        }
    }

    // public static void main(String[] args) throws IOException {
    //     NpmPackageValidationSupport npmPackageValidationSupport = new NpmPackageValidationSupport(ctx);
    //     npmPackageValidationSupport.loadPackageFromClasspath("classpath:package.tgz");
        
    //     // create a validation support chain
    //     ValidationSupportChain validationSupportChain = new ValidationSupportChain(
    //         npmPackageValidationSupport,
    //         new DefaultProfileValidationSupport(ctx),
    //         new CommonCodeSystemsTerminologyService(ctx),
    //         new InMemoryTerminologyServerValidationSupport(ctx),
    //         new SnapshotGeneratingValidationSupport(ctx)
    //     );
        
    //     // ArrayList<String> reference = new ArrayList<>(Arrays.asList("1", "2", "3"));
    //     // ArrayList<String> data = new ArrayList<>(Arrays.asList("JVBERi0xL", "Arya", "Rakshit"));
        
    //     CachingValidationSupport validationSupport = new CachingValidationSupport(validationSupportChain);

    //     FhirValidator validator = ctx.newValidator();
    //     FhirInstanceValidator instanceValidator = new FhirInstanceValidator(validationSupport);

    //     validator.registerValidatorModule(instanceValidator);
        
    //     ValidationResult outCome = validator.validateWithResult(PrescriptionBundleDocument.populatePrescriptionBundle());

    //     for(SingleValidationMessage next : outCome.getMessages()) {
    //         System.out.println(next.getSeverity() + "-" + next.getLocationString() + "-" + next.getMessage());
    //     }
    // }
}




















// package com.example;
// import java.io.File;
// import java.io.FileReader;
// import java.util.Scanner;

// import org.hl7.fhir.common.hapi.validation.support.CachingValidationSupport;
// import org.hl7.fhir.common.hapi.validation.support.CommonCodeSystemsTerminologyService;
// import org.hl7.fhir.common.hapi.validation.support.InMemoryTerminologyServerValidationSupport;
// import org.hl7.fhir.common.hapi.validation.support.NpmPackageValidationSupport;
// import org.hl7.fhir.common.hapi.validation.support.SnapshotGeneratingValidationSupport;
// import org.hl7.fhir.common.hapi.validation.support.ValidationSupportChain;
// import org.hl7.fhir.common.hapi.validation.validator.FhirInstanceValidator;
// import org.hl7.fhir.instance.model.api.IBaseResource;
// import org.hl7.fhir.r4.formats.IParser;

// import ca.uhn.fhir.context.FhirContext;
// import ca.uhn.fhir.context.support.DefaultProfileValidationSupport;
// import ca.uhn.fhir.validation.FhirValidator;
// import ca.uhn.fhir.validation.SingleValidationMessage;
// import ca.uhn.fhir.validation.ValidationResult;

// public class Validator {
//     static FhirContext ctx= FhirContext.forR4();
//     public static void validation(IBaseResource resource) throws Exception {
//         NpmPackageValidationSupport npmPackageValidationSupport= new NpmPackageValidationSupport(ctx);
//         npmPackageValidationSupport.loadPackageFromClasspath("package.tgz");
//         ValidationSupportChain validationSupportChain=new ValidationSupportChain(
//             npmPackageValidationSupport,
//             new DefaultProfileValidationSupport(ctx),
//             new CommonCodeSystemsTerminologyService(ctx),
//             new InMemoryTerminologyServerValidationSupport(ctx),
//             new SnapshotGeneratingValidationSupport(ctx)
//         );
//         CachingValidationSupport validationSupport = new CachingValidationSupport(validationSupportChain);
//         FhirValidator validator = ctx.newValidator();
//         FhirInstanceValidator fhirInstanceValidator = new FhirInstanceValidator(validationSupport);
//         validator.registerValidatorModule(fhirInstanceValidator);
//         ValidationResult outCome = validator.validateWithResult(resource);
//         System.out.println(outCome);
//         for(SingleValidationMessage next:outCome.getMessages()){
//             System.out.println(next.getSeverity()+"-"+next.getLocationString()+"-"+next.getMessage());
//         }
//     }   

//     public static void validateFromFile() throws Exception{
//         System.out.println("Enter the file path");
//         Scanner sc = new Scanner(System.in);
//         String path = sc.next();
//         ca.uhn.fhir.parser.IParser parser = ctx.newJsonParser();
//         IBaseResource resource = parser.parseResource(new FileReader(new File(path)));
//         validation(resource);
//     }
//     public static void main(String[] args) throws Exception{
//         validation(PrescriptionBundleDocument.populatePrescriptionBundle());
//         ca.uhn.fhir.parser.IParser parser=ctx.newJsonParser();
//         String str=parser.encodeResourceToString(PrescriptionBundleDocument.populatePrescriptionBundle());
//         System.out.println(str);
//         // validateFromFile();
    
//     }
// }
