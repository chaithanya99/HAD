package com.had.project5.repositories;

import java.util.List;

import com.had.project5.entities.consentstuff.ConsentRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

@Component

public interface ConsentRequestRepository extends JpaRepository<ConsentRequest, Integer> {
	
	
	List<ConsentRequest> findAllByAbhaId(String requestId);
	
	ConsentRequest findByRequestId(String id);

	ConsentRequest findByConsentId(String consentRequestId);
	
	ConsentRequest findByAbhaIdAndCreatedOn(String consentRequestId,String createdOn);
	
	ConsentRequest findByAbhaId(String consentRequestId);
	
	List<ConsentRequest> findAllByDoctorId(String requestId);
	
	
	ConsentRequest findByTransactionId(String transactionId);
	
	List<ConsentRequest> findByDoctorIdAndAbhaId(String doctorId,String abhaId);
	
	
	
}

