package com.had.project5.entities.consentstuff;

import com.had.project5.entities.ConsentRequest;
import com.had.project5.entities.Resp;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class ConsentResponse {
    private String requestId;
	
	private String timestamp;
	
	private Resp resp;
	
	private String error;
	
	private ConsentRequest consentRequest;

}
