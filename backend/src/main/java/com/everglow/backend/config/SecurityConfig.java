package com.everglow.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
<<<<<<< HEAD
import org.springframework.security.web.SecurityFilterChain;

@Configuration
=======
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

/**
 * Security configuration.
 * IMPORTANT: Replace this file with your existing SecurityConfig.java content
 * and just ADD the PasswordEncoder bean + permit the /api/users/** endpoints.
 */
@Configuration
@EnableWebSecurity
>>>>>>> f5b2fbfde505d405c49893dff97eeff236feb6a9
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
<<<<<<< HEAD

        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().permitAll()
                );

        return http.build();
    }
}
=======
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                // Public endpoints — no auth required
                .requestMatchers(
                    "/api/users/register",
                    "/api/users/login"
                ).permitAll()
                // All other requests are permitted for now (add role guards later)
                .anyRequest().permitAll()
            );
        return http.build();
    }

    /**
     * BCrypt password encoder bean.
     * Injected into UserService via constructor injection.
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
>>>>>>> f5b2fbfde505d405c49893dff97eeff236feb6a9
