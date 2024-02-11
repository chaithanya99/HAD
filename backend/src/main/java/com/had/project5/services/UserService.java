package com.had.project5.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.had.project5.entities.User;
import com.had.project5.repositories.UserRepo;

import ch.qos.logback.core.encoder.Encoder;
@Service
public class UserService implements UserDetailsService{
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder encoder;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // TODO Auto-generated method stub
        Optional<User> u=userRepo.findById(username);
        if(u.isPresent()){
            return new UserInfoDetails(u.get());
        }
        else{
            throw new UsernameNotFoundException(" user not found");
        }
    }

    public String addUser(User u){
        Optional<User> uu=userRepo.findById(u.getUsername());
        if(!uu.isPresent()){
            u.setPassword(encoder.encode(u.getPassword()));
            userRepo.save(u);
            return "user added";
        }
        else{
            return "user exists";
        }
    }
    
}
