package com.had.project5.entities.consentstuff;

import java.util.List;

import com.had.project5.entities.Resp;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class HipOnNotify {
	
	private String requestId;
	
	// public String getRequestId() {
	// 	return requestId;
	// }

	// public void setRequestId(String requestId) {
	// 	this.requestId = requestId;
	// }

	// public String getTimestamp() {
	// 	return timestamp;
	// }

	// public void setTimestamp(String timestamp) {
	// 	this.timestamp = timestamp;
	// }

	// public Resp getResp() {
	// 	return resp;
	// }

	// public void setResp(Resp resp) {
	// 	this.resp = resp;
	// }

	// public Acknowledgement getAcknowledgement() {
	// 	return acknowledgement;
	// }

	// public void setAcknowledgement(Acknowledgement acknowledgement) {
	// 	this.acknowledgement = acknowledgement;
	// }

	private String timestamp;
	
	private List<Acknowledgement> acknowledgement;
	private Resp resp;
	
	// private Acknowledgement acknowledgement;

}
