package com.had.project5.common;

public class DecryptionResponse {
	
	 private String decryptedData;


	    public DecryptionResponse(String decryptedData) {
	        this.decryptedData = decryptedData;
	    }

	    public String getDecryptedData() {
	        return decryptedData;
	    }

	    public void setDecryptedData(String decryptedData) {
	        this.decryptedData = decryptedData;
	    }

}