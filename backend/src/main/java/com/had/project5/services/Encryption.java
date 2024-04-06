package com.had.project5.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.crypto.Cipher;

import java.security.KeyFactory;
import java.security.PublicKey;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;
@Service
public class Encryption {
    @Autowired
    private ApiService apiService;
    private PublicKey publicKey;
    public String encryptWithPublicKey(String data) throws Exception {
        String Key=apiService.makeGetRequest("/v1/auth/cert");
        this.publicKey=getPublicKeyFromPEM(Key);
        Cipher cipher = Cipher.getInstance("RSA");
        cipher.init(Cipher.ENCRYPT_MODE, publicKey);

        byte[] encryptedBytes = cipher.doFinal(data.getBytes());

        return Base64.getEncoder().encodeToString(encryptedBytes);
    }
    private PublicKey getPublicKeyFromPEM(String publicKeyPEM) throws Exception {
        String publicKeyPEMBody = publicKeyPEM.replace("-----BEGIN PUBLIC KEY-----", "").replace("-----END PUBLIC KEY-----", "").replaceAll("\\s", "");
        byte[] keyBytes = Base64.getDecoder().decode(publicKeyPEMBody);
        KeyFactory keyFactory = KeyFactory.getInstance("RSA");
        X509EncodedKeySpec keySpec = new X509EncodedKeySpec(keyBytes);
        return keyFactory.generatePublic(keySpec);
    }
}
