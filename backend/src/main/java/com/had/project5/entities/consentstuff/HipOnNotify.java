package com.had.project5.entities.consentstuff;

import com.had.project5.entities.Resp;


public class HipOnNotify {
	
	private String requestId;
	
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

	public Resp getResp() {
		return resp;
	}

	public void setResp(Resp resp) {
		this.resp = resp;
	}

	public Acknowledgement getAcknowledgement() {
		return acknowledgement;
	}

	public void setAcknowledgement(Acknowledgement acknowledgement) {
		this.acknowledgement = acknowledgement;
	}

	private String timestamp;
	
	private Resp resp;
	
	private Acknowledgement acknowledgement;

}
