package com.had.project5.controllers;
import org.apache.http.HttpResponse;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
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
import com.had.project5.entities.consentstuff.DateRange;
import com.had.project5.entities.consentstuff.Frequency;
import com.had.project5.entities.consentstuff.HipOnNotify;
import com.had.project5.entities.consentstuff.Hiu;
// import com.had.project5.repositories.ConsentRepository;
import com.had.project5.repositories.ConsentRequestRepository;
import com.had.project5.services.ApiService;
import com.had.project5.services.BundlingService;
import com.had.project5.services.DoctorService;
import com.had.project5.services.PatientService;

import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;
@RestController
public class ConsentControllerTest{

	// @Autowired
	// ConsentRepository consentRepository;

	@Autowired
	private BundlingService bundlingService;

	@Autowired
	private DoctorService doctorService;

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


	@GetMapping("/getConsents/{PatientId}")
	public ResponseEntity<List<ConsentRequest>> getConsents(@PathVariable Long PatientId){
		Long docterId=doctorService.getMyId();
		Optional<Patient> p = patientService.getPatientById(PatientId);
		if(!p.isPresent()){
			return (ResponseEntity<List<ConsentRequest>>) ResponseEntity.notFound();
		}
		Patient pp = p.get();
		List<ConsentRequest> lc= consentRequestRepository.findByDoctorIdAndAbhaId(String.valueOf(docterId),pp.getAbhaAddress());
		return ResponseEntity.ok().body(lc);
	}
	@GetMapping("/getAllConsents")
	public ResponseEntity<List<ConsentRequest>> getAllConsents(){
		Long doctorId=doctorService.getMyId();
		List<ConsentRequest> lc=consentRequestRepository.findAllByDoctorId(String.valueOf(doctorId));
		return ResponseEntity.ok().body(lc);
	}
    
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
		//  DateFormat iso8601Format = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
        //  iso8601Format.setTimeZone(TimeZone.getTimeZone("Asia/Kolkata"));
		 consentRequest.setFromTime(req.getPermission().getDateRange().getFrom());
		 consentRequest.setToTime(req.getPermission().getDateRange().getTo());
		 consentRequest.setAbhaId(p.getAbhaAddress());
		 consentRequest.setCreatedOn(asISO);
		 consentRequest.setDoctorId(request.getConsent().getRequester().getIdentifier().getValue());
        //  Optional<Patient> pp=patientService.getPatientById(patientService.getId(request.getConsent().getPatient().getId()));
         String patientName=p.getName();
		 consentRequest.setPatientName(patientName);
		 consentRequest.setRequestStatus("Initialised");
		 consentRequest.setRequestId(randomUUIDString);
		 consentRequest.setExpiryOn(req.getPermission().getDataEraseAt());
		 consentRequestRepository.save(consentRequest);

		return objectResponseEntity.getBody();
	}


	@CrossOrigin(origins = "*")
	@PostMapping("/v0.5/consent-requests/on-init")
	public void getreq(@RequestBody ConsentResponse object) {

		System.out.println("on-init-1");
		System.out.print(object.getRequestId());

		ConsentRequest consentRequest=	consentRequestRepository.findByRequestId(object.getResp().getRequestId());

		consentRequest.setConsentId(object.getConsentRequest().getId());
		System.out.println("on-init-2");
		System.out.println(consentRequest.getConsentId());
		consentRequestRepository.save(consentRequest);
	}

	
	@CrossOrigin(origins = "*")
	@PostMapping("/v0.5/consents/hiu/notify")
	public void getHIUNotify(@RequestBody ConsentNotifyResponse object) {
		System.out.println("hiu notify 1");
		System.out.print(object.getRequestId());
		ConsentRequest bean = consentRequestRepository.findByConsentId(object.getNotification().getConsentRequestId());
		if(object.getNotification().getStatus().equalsIgnoreCase("GRANTED"))
		{
			DateFormat dateFormat1 = new SimpleDateFormat("YYYY-MM-dd'T'HH:mm:ss.SSSSSS");
		   TimeZone timeZone=TimeZone.getTimeZone("UTC");
           dateFormat1.setTimeZone(timeZone);
			String asISO=dateFormat1.format(new Date());

			bean.setGrantedOn(asISO);
			bean.setRequestStatus("Granted");

			//need to call the other hospital will get the records the from the other hospital call the 


			String webhookUrl = "https://webhook.site/32de52fb-994a-4eef-83f5-e6226391d5e6/getFiles";

        // Create an instance of Permission object

        // Serialize the object to JSON
        Gson gson = new Gson();
        String jsonPayload = gson.toJson(bean);

        try (CloseableHttpClient httpClient = HttpClients.createDefault()) {
            // Create HTTP POST request
            HttpPost httpPost = new HttpPost(webhookUrl);

            // Set headers
            httpPost.setHeader("Content-Type", "application/json");

            // Set JSON payload
            StringEntity entity = new StringEntity(jsonPayload);
            httpPost.setEntity(entity);

            // Execute the request
            HttpResponse response = httpClient.execute(httpPost);

            // Print the response status code
            System.out.println("Response Status Code: " + response.getStatusLine().getStatusCode());

            // Handle the response entity if needed
            org.apache.http.HttpEntity responseEntity = response.getEntity();
            if (responseEntity != null) {
                String responseBody = EntityUtils.toString(responseEntity);
                System.out.println("Response Body: " + responseBody);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }







		}
		else
		{
			bean.setGrantedOn("-");
			bean.setRequestStatus("Denied");

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
