package com.had.project5;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.had.project5.entities.User;
import com.had.project5.repositories.UserRepo;
import com.had.project5.services.UserService;
@Component
public class Runner implements CommandLineRunner{
    @Autowired
    private UserService userService;

    @Autowired
    private UserRepo userRepo;
    @Override
    public void run(String... args) throws Exception {
       Optional<User> u=userRepo.findById("admin");

       if(!u.isPresent()){
        userService.addUser(new User("admin","admin","ROLE_ADMIN"));
       }
    }
    
}
