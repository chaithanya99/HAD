//package com.had.project5.controllers;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RestController;
//import org.springframework.web.client.RestTemplate;
//import com.had.project5.repositories.ConsentRepository;
//import com.had.project5.entities.consentstuff.*;
//import com.had.project5.repositories.ConsentRequestRepository;
//import java.util.List;
//
//@RestController
//public class ConsentListController {
//
//	@Autowired
//	ConsentRepository consentRepository;
//
//	@Autowired
//	 ConsentRequestRepository consentRequestRepository;
//
//	@Autowired
//	savedata savedata;
//	 @Autowired
//	   RestTemplate restTemplate;
//
//	 @CrossOrigin(origins = "*")
//	@PostMapping("/login/all-consentlist")
//	 public List<ConsentRequest> getAll() {
//			//System.out.print(request.getRequestId());
//		 return consentRequestRepository.findAll();
//
//}
//
//	 @CrossOrigin(origins = "*")
//		@PostMapping("/doctor/patient-consentlist")
//	 public List<ConsentRequest> getAllByPatient(@RequestBody ConsentListRequest consentListRequest) {
//			//System.out.print(request.getRequestId());
//		 return consentRequestRepository.findAllByAbhaId(consentListRequest.getAbhaId());
//
//}
//
//	 @CrossOrigin(origins = "*")
//		@PostMapping("/doctor/doctor-consentlist")
//	 public List<ConsentRequest> getAllByDocotr(@RequestBody ConsentListRequest consentListRequest) {
//			//System.out.print(request.getRequestId());
//		 return consentRequestRepository.findAllByDoctorId(consentListRequest.getDoctorId());
//
//}
//	 @CrossOrigin(origins = "*")
//		@PostMapping("/doctor/patient-medicaldata")
//	 public List<MedicalRecords> getByPatientAndDate(@RequestBody ConsentListRequest consentListRequest) {
//			//System.out.print(request.getRequestId());
//		  ConsentRequest consentRequest = consentRequestRepository.findByAbhaIdAndCreatedOn(consentListRequest.getAbhaId(),consentListRequest.getCreatedOn());
//		 return savedata.findAllByConsentId(consentRequest.getConsentId());
//}
//}
//
