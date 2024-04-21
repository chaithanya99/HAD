package com.had.project5.repositories;

import com.had.project5.entities.consentstuff.ConsentMapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

@Component
public interface ConsentRepository
    extends JpaRepository<ConsentMapping, Integer> {

	ConsentMapping findByConsentId(String requestId);
	
	
}

