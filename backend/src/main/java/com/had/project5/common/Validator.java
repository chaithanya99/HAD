// package com.had.project5.common;

// import java.util.Scanner;

// import org.hl7.fhir.common.hapi.validation.support.CachingValidationSupport;
// import org.hl7.fhir.common.hapi.validation.support.CommonCodeSystemsTerminologyService;
// import org.hl7.fhir.common.hapi.validation.support.InMemoryTerminologyServerValidationSupport;
// import org.hl7.fhir.common.hapi.validation.support.NpmPackageValidationSupport;
// import org.hl7.fhir.common.hapi.validation.support.SnapshotGeneratingValidationSupport;
// import org.hl7.fhir.common.hapi.validation.support.ValidationSupportChain;
// import org.hl7.fhir.common.hapi.validation.validator.FhirInstanceValidator;
// import org.hl7.fhir.instance.model.api.IBaseResource;

// import ca.uhn.fhir.context.FhirContext;
// import ca.uhn.fhir.context.support.DefaultProfileValidationSupport;
// import ca.uhn.fhir.validation.FhirValidator;
// import ca.uhn.fhir.validation.SingleValidationMessage;
// import ca.uhn.fhir.validation.ValidationResult;

// public class Validator {
//     static FhirContext ctx= FhirContext.forR4();
//     public static void main(String[] args) {
//         NpmPackageValidationSupport npmPackageValidationSupport= new NpmPackageValidationSupport(ctx);
//         npmPackageValidationSupport.loadPackageFromClasspath("classpath:package.tgz");
//         ValidationSupportChain validationSupportChain=new ValidationSupportChain(
//             npmPackageValidationSupport,
//             new DefaultProfileValidationSupport(ctx),
//             new CommonCodeSystemsTerminologyService(ctx),
//             new InMemoryTerminologyServerValidationSupport(ctx),
//             new SnapshotGeneratingValidationSupport(ctx)
//         );
//         CachingValidationSupport validation = new CachingValidationSupport(validationSupportChain);
//         FhirValidator validator = ctx.newValidator();
//         FhirInstanceValidator instanceValidator = new FhirInstanceValidator(validationSupportChain);
//         validator.registerValidationModule(instanceValidator);
//         ValidationResult outCome = validator.validateWithResult(PrescriptionBundleDocument.populatePrescriptionBundle());
//         for(SingleValidationMessage next:outCome.getMessages()){
//             System.out.println(next.getSeverity()+"-"+next.getLocationString()+"-"+next.getMessage());
//         }
//     }   

//     public static void validateFromFile() throws Exception{
//         System.out.println("Enter the file path");
//         Scanner sc = new Scanner(System.in);
//         String path = sc.next();
//         Iparser parser = ctx.newJsonParser();
//         IBaseResource resource = parser.parseResource(new FileReader(new File(path)));
//         validation(resource);
//     }
// }
