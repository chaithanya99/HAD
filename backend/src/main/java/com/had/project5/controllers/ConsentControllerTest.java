package com.had.project5.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.had.project5.common.AbdmEncryption;
import com.had.project5.common.DecryptionHandle;
import com.had.project5.entities.Patient;
import com.had.project5.entities.consentstuff.Consent;
import com.had.project5.entities.consentstuff.ConsentInitRequest;
import com.had.project5.entities.consentstuff.ConsentRequest;
import com.had.project5.entities.consentstuff.Hiu;
// import com.had.project5.repositories.ConsentRepository;
import com.had.project5.repositories.ConsentRequestRepository;
import com.had.project5.services.ApiService;
import com.had.project5.services.PatientService;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;
@RestController
public class ConsentControllerTest{

	// @Autowired
	// ConsentRepository consentRepository;

    @Autowired
    private PatientService patientService;

	@Autowired
	private RestTemplate restTemplate;

    @Autowired
    private ApiService apiService;

	@Autowired
	private AbdmEncryption abdmEncryption;

	@Autowired
	private ConsentRequestRepository consentRequestRepository;

	@Autowired
	private DecryptionHandle decryptionHandle;
	private String HipId = "IN0610089593";
	private String HipName = "had_hospital";
    
	@CrossOrigin(origins = "*")
	@PostMapping("/doctor/init-consent")
	public Object careContext(@RequestBody Consent req) {
        System.out.println(req);
        System.out.println(req.getRequester().getIdentifier().getValue());
        String accessToken=apiService.getToken();
		ConsentInitRequest request = new ConsentInitRequest();
		Hiu hiu= new Hiu();
		hiu.setId(HipId);
		Consent conset=req;
		conset.setHiu(hiu);
		request.setConsent(conset);
        // return req;

	   UUID uuid = UUID.randomUUID();
       String randomUUIDString = uuid.toString();
       TimeZone timeZone=TimeZone.getTimeZone("UTC");
       DateFormat dateFormat = new SimpleDateFormat("YYYY-MM-dd'T'HH:mm:ss.SSSSSS");
       dateFormat.setTimeZone(timeZone);
       String asISO= dateFormat.format(new Date());
       request.setRequestId(randomUUIDString);
       request.setTimestamp(asISO);

		String reqbody="";
		try {
			reqbody = new ObjectMapper().writeValueAsString(request);
		} catch (JsonProcessingException e) {

			e.printStackTrace();
		}

       HttpHeaders header = new HttpHeaders();
       header.setContentType(MediaType.APPLICATION_JSON);
       header.setAccept(Collections.singletonList(MediaType.ALL));
       header.add("X-CM-ID","sbx");
       header.add("Authorization", "Bearer " + accessToken);
       HttpEntity<String> httpentity = new HttpEntity<>(reqbody, header);
		 ResponseEntity<Object> objectResponseEntity=restTemplate.exchange("https://dev.abdm.gov.in/gateway/v0.5/consent-requests/init", HttpMethod.POST, httpentity,Object.class);

		 DateFormat dateFormat1 = new SimpleDateFormat("YYYY-MM-dd'T'HH:mm:ss.SSSSSS");
		 dateFormat1.setTimeZone(timeZone);
		 ConsentRequest consentRequest=new ConsentRequest();
		 consentRequest.setAbhaId("TEST@SBX");
		 consentRequest.setCreatedOn(asISO.substring(10));
		 consentRequest.setDoctorId(request.getConsent().getRequester().getIdentifier().getValue());
         Optional<Patient> pp=patientService.getPatientById(patientService.getId(request.getConsent().getPatient().getId()));
         String patientName=pp.get().getName();
		 consentRequest.setPatientName(patientName);
		 consentRequest.setRequestStatus("Request Initialted");
		 consentRequest.setRequestId(randomUUIDString);
		 consentRequestRepository.save(consentRequest);

		return objectResponseEntity.getBody();
	}
}

	// @CrossOrigin(origins = "*")
	// @PostMapping("/v0.5/consent-requests/on-init")
	// public void getreq(@RequestBody ConsentResponse object) {

	// 	System.out.print(object.getRequestId());

	// 	ConsentRequest consentRequest=	consentRequestRepository.findByRequestId(object.getResp().getRequestId());

	// 	consentRequest.setConsentId(object.getConsentRequest().getId());
	// 	 consentRequestRepository.save(consentRequest);
	// }

