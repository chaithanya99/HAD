package com.had.project5.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.had.project5.common.AbdmEncryption;
import com.had.project5.common.DecryptionHandle;
import com.had.project5.entities.Patient;
import com.had.project5.entities.Resp;
import com.had.project5.entities.consentstuff.Acknowledgement;
import com.had.project5.entities.consentstuff.Consent;
import com.had.project5.entities.consentstuff.ConsentArtefacts;
import com.had.project5.entities.consentstuff.ConsentInitRequest;
import com.had.project5.entities.consentstuff.ConsentNotifyResponse;
import com.had.project5.entities.consentstuff.ConsentRequest;
import com.had.project5.entities.consentstuff.ConsentResponse;
import com.had.project5.entities.consentstuff.HipOnNotify;
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
		 Patient p = patientService.getPatientByAbhaAddress(req.getPatient().getId());
		 consentRequest.setAbhaId(p.getAbhaAddress());
		 consentRequest.setCreatedOn(asISO.substring(10));
		 consentRequest.setDoctorId(request.getConsent().getRequester().getIdentifier().getValue());
        //  Optional<Patient> pp=patientService.getPatientById(patientService.getId(request.getConsent().getPatient().getId()));
         String patientName=p.getName();
		 consentRequest.setPatientName(patientName);
		 consentRequest.setRequestStatus("Request Initialted");
		 consentRequest.setRequestId(randomUUIDString);
		 consentRequestRepository.save(consentRequest);

		return objectResponseEntity.getBody();
	}


	@CrossOrigin(origins = "*")
	@PostMapping("/v0.5/consent-requests/on-init")
	public void getreq(@RequestBody ConsentResponse object) {

		System.out.print(object.getRequestId());

		ConsentRequest consentRequest=	consentRequestRepository.findByRequestId(object.getResp().getRequestId());

		consentRequest.setConsentId(object.getConsentRequest().getId());
		consentRequestRepository.save(consentRequest);
	}

	
	@CrossOrigin(origins = "*")
	@PostMapping("/v0.5/consents/hiu/notify")
	public void getHIUNotify(@RequestBody ConsentNotifyResponse object) {

		System.out.print(object.getRequestId());
		ConsentRequest bean = consentRequestRepository.findByConsentId(object.getNotification().getConsentRequestId());
		if(object.getNotification().getStatus().equalsIgnoreCase("Granted"))
		{
			DateFormat dateFormat1 = new SimpleDateFormat("YYYY-MM-dd'T'HH:mm:ss.SSSSSS");
		   TimeZone timeZone=TimeZone.getTimeZone("UTC");
           dateFormat1.setTimeZone(timeZone);
			String asISO=dateFormat1.format(new Date());

			bean.setGrantedOn(asISO.substring(10));
			bean.setRequestStatus("Consent Granted");

		}
		else
		{
			bean.setGrantedOn("-");
			bean.setRequestStatus("Consent Denied");

		}
		bean.setConsentId(object.getNotification().getConsentArtefacts().get(0).getId());
		consentRequestRepository.save(bean);
		List<ConsentArtefacts> consentArt=object.getNotification().getConsentArtefacts();
		String consentArtString="";
		String accessToken=apiService.getToken();
		 HttpHeaders header = new HttpHeaders();
	        header.setContentType(MediaType.APPLICATION_JSON);
	        header.setAccept(Collections.singletonList(MediaType.ALL));
	        header.add("X-CM-ID","sbx");
	        header.add("Authorization", "Bearer " + accessToken);

	        HipOnNotify hipOnNotify =new HipOnNotify();
			Acknowledgement ack=new Acknowledgement();
			Resp resp=new Resp();
			UUID uuid = UUID.randomUUID();
	        String randomUUIDString = uuid.toString();
	        TimeZone timeZone=TimeZone.getTimeZone("UTC");
	        DateFormat dateFormat = new SimpleDateFormat("YYYY-MM-dd'T'HH:mm:ss.SSSSSS");
	        dateFormat.setTimeZone(timeZone);
	        String asISO= dateFormat.format(new Date());
	        ack.setStatus("OK");
	        ack.setConsentId(object.getNotification().getConsentArtefacts().get(0).getId());
	        resp.setRequestId(object.getRequestId());
	        hipOnNotify.setRequestId(randomUUIDString);
	        hipOnNotify.setTimestamp(asISO);
			List<Acknowledgement> Lack=new ArrayList<>();;
			Lack.add(ack);
	        hipOnNotify.setAcknowledgement(Lack);
	        hipOnNotify.setResp(resp);
	      String reqbody="";
			try {
				reqbody = new ObjectMapper().writeValueAsString(hipOnNotify);
			} catch (JsonProcessingException e) {
				System.out.println("error here in the catch block");
				e.printStackTrace();
			}

	        HttpEntity<String> httpentity = new HttpEntity<>(reqbody, header);
			System.out.println(httpentity.getHeaders());
			System.out.println(httpentity.getBody());
			try {
				
				restTemplate.exchange("https://dev.abdm.gov.in/gateway/v0.5/consents/hiu/on-notify", HttpMethod.POST, httpentity,Object.class);
			} catch (Exception e) {
				// TODO: handle exception
				System.out.println(e);
				System.out.println("error in the catcch block");
			}


		// for(int i=0;i<consentArt.size();i++)
		// {
		// 	consentArtString.concat(consentArt.get(i).getId());
		// 	if(i!=(consentArt.size()-1))
		// 	{
		// 	consentArtString.concat("^");
		// 	}

		// 	 UUID uuid1 = UUID.randomUUID();
	    //     String randomUUIDString1 = uuid.toString();
	    //      TimeZone timeZone1=TimeZone.getTimeZone("UTC");
	    //     DateFormat dateFormat1 = new SimpleDateFormat("YYYY-MM-dd'T'HH:mm:ss.SSSSSS");
	    //     dateFormat1.setTimeZone(timeZone1);
	    //      String asISO1= dateFormat.format(new Date());
		// 	FetchConsent fetchConsent=new FetchConsent();
		// 	fetchConsent.setRequestId(randomUUIDString1);
		// 	fetchConsent.setTimestamp(asISO1);
		// 	fetchConsent.setConsentId(consentArt.get(i).getId());
		// 	 String reqbody1="";
		// 		try {
		// 			reqbody1 = new ObjectMapper().writeValueAsString(fetchConsent);
		// 		} catch (JsonProcessingException e) {

		// 			e.printStackTrace();
		// 		}
		// 		String accessToken1=utility.accessToken();
		// 		 HttpHeaders header1 = new HttpHeaders();
		// 	        header1.setContentType(MediaType.APPLICATION_JSON);
		// 	        header1.setAccept(Collections.singletonList(MediaType.ALL));
		// 	        header1.add("X-CM-ID","sbx");
		// 	        header1.add("Authorization", "Bearer " + accessToken1);
		//         HttpEntity<String> httpentity1 = new HttpEntity<>(reqbody1, header1);
		// 		 ResponseEntity<Object> objectResponseEntity1=restTemplate.exchange("https://dev.abdm.gov.in/gateway/v0.5/consents/fetch", HttpMethod.POST, httpentity1,Object.class);

		// }
	}





}
