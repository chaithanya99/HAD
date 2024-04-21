package com.had.project5.entities.consentstuff;

public class ConsentInitRequest {
	private String requestId;
	private String timestamp;
	
	private Consent consent;

	public String getRequestId() {
		return requestId;
	}

	public void setRequestId(String requestId) {
		this.requestId = requestId;
	}

	public String getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(String timestamp) {
		this.timestamp = timestamp;
	}

	public Consent getConsent() {
		return consent;
	}

	public void setConsent(Consent consent) {
		this.consent = consent;
	}

}
