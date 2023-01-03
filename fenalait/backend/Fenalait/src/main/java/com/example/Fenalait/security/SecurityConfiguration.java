package com.example.Fenalait.security;

import javax.servlet.http.HttpServletResponse;



import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.context.annotation.*;

import org.springframework.security.authentication.AuthenticationManager;

import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.core.userdetails.*;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.security.web.SecurityFilterChain;

import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.example.Fenalait.repository.UserRepository;
import com.example.Fenalait.token.JwtTokenFilter;


@EnableWebSecurity
@EnableGlobalMethodSecurity(
		prePostEnabled = false,
		securedEnabled = false,
		jsr250Enabled = true
		)
public class SecurityConfiguration {

    @Autowired private UserRepository userRepo; 

    @Autowired private JwtTokenFilter jwtTokenFilter;

    @Bean
    public UserDetailsService userDetailsService() {

        return new UserDetailsService() {

            @Override

            public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

                return userRepo.findByEmail(username)

                        .orElseThrow(

                                () -> new UsernameNotFoundException("User " + username + " not found"));

            }

        };

    }

    @Bean
    public PasswordEncoder passwordEncoder() {

        return new BCryptPasswordEncoder();

    }
    
    @Bean
    public AuthenticationManager authenticationManager(

            AuthenticationConfiguration authConfig) throws Exception {

        return authConfig.getAuthenticationManager();

    }
    
    @Bean
    public SecurityFilterChain configure(HttpSecurity http) throws Exception {
    	
    	http.cors();

        http.csrf().disable();

        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        http.authorizeRequests()

                .antMatchers("/auth/**", "/docs/**", "/users").permitAll()

                .anyRequest().authenticated();

            http.exceptionHandling()

                    .authenticationEntryPoint(

                        (request, response, ex) -> {

                            response.sendError(

                                HttpServletResponse.SC_UNAUTHORIZED,

                                ex.getMessage()

                            );

                        }

                );

         

        http.addFilterBefore(jwtTokenFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
	}

}
