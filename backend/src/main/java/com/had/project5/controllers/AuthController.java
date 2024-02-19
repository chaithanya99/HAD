package com.had.project5.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.had.project5.entities.AuthenticationRequest;
import com.had.project5.entities.User;
import com.had.project5.services.JwtService;
import com.had.project5.services.UserService;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private UserService service;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private AuthenticationManager authenticationManager;
    @GetMapping("/admin")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public String Admin(){
        return "hello admin";
    }
    @PostMapping("/addNewUser") 
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public String addNewUser(@RequestBody User userInfo) { 
		return service.addUser(userInfo); 
	} 
    @GetMapping("/user")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public String user(){
        return "hello user";
    }
    @PostMapping("/generateToken")
    public String generateToken(@RequestBody AuthenticationRequest auth){
        System.out.println(auth);
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(auth.getUsername(), auth.getPassword())); 
		if (authentication.isAuthenticated()) { 
			return jwtService.generateToken(auth.getUsername()); 
		} else { 
			throw new UsernameNotFoundException("invalid user"); 
		} 
    }
}
