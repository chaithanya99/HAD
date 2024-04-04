package com.had.project5.repositories;

import java.util.List;
import java.util.function.Function;

import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.FluentQuery.FetchableFluentQuery;
import org.springframework.stereotype.Repository;

import com.had.project5.entities.Doctor;
import com.had.project5.entities.User;

/**
 * UserRepo
 */
@Repository
public interface UserRepo extends JpaRepository<User,String>{
    User findByUsername(String name);
    
}
