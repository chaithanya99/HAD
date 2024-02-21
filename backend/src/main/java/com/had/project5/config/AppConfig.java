package com.had.project5.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.had.project5.filters.JwtFilter;
import com.had.project5.services.UserService;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class AppConfig {
    @Autowired
    private JwtFilter jwtFilter;
    @Bean
    public UserDetailsService userDetailsService(){
        return new UserService();
    }
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        return http.cors().and()
                .csrf().disable() 
				.authorizeHttpRequests() 
				.requestMatchers("/auth/generateToken").permitAll() //need to add endpoints which doesnot require authentication
				.and() 
				.authorizeHttpRequests().requestMatchers("/**").authenticated() 
				.and()  
				.sessionManagement() 
				.sessionCreationPolicy(SessionCreationPolicy.STATELESS) 
				.and() 
				.authenticationProvider(authenticationProvider()) 
				.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class) 
				.build(); 
    }
    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider(); 
		authenticationProvider.setUserDetailsService(userDetailsService()); 
		authenticationProvider.setPasswordEncoder(passwordEncoder()); 
		return authenticationProvider;
    }
    @Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception { 
		return config.getAuthenticationManager(); 
	} 
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOrigin("http://localhost:3000"); // Allow requests from this origin
        configuration.addAllowedMethod("*"); // Allow all HTTP methods
        configuration.addAllowedHeader("*"); // Allow all headers
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public RestTemplate restTemplate(){
        return new RestTemplate();
    }

}
