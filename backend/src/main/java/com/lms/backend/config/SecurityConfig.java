package com.lms.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import org.springframework.security.web.SecurityFilterChain;

import com.lms.backend.repository.UserRepository;
import com.lms.backend.utils.Jwks;
import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.proc.SecurityContext;

import lombok.RequiredArgsConstructor;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final UserRepository userRepository;
    private RSAKey rsaKey;

    // Bean definition for UserDetailsService
    @Bean
    UserDetailsService userDetails() {
        return (username) -> {
            return userRepository.findByReferenceNumber(username)
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        };
    }

    // Bean definition for AuthenticationManager
    @Bean
    AuthenticationManager authenticationManager() {
        var provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetails());
        provider.setPasswordEncoder(passwordEncoder());

        return new ProviderManager(provider);
    }

    // Bean definition for PasswordEncoder
    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Bean definition for SecurityFilterChain
    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.cors(Customizer.withDefaults()).csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(requests -> requests
                        // Permit access to Swagger UI and API documentation
                        .requestMatchers("/swagger-ui.html", "/swagger-ui/**", "/v1/library-management-api-docs/**")
                        .permitAll()
                        // Permit certain public endpoints
                        .requestMatchers("/api/v1/user/create/**", "/api/v1/login").permitAll()
                        .requestMatchers("/api/v1/batch/active").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/v1/*/*/image/**").permitAll()
                        // Authorization rules for specific endpoints based on user roles
                        .requestMatchers("/api/v1/user/**").hasAnyAuthority("SCOPE_ADMIN", "SCOPE_USER")
                        .requestMatchers(HttpMethod.POST, "/api/v1/**").hasAuthority("SCOPE_ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/v1/**").hasAuthority("SCOPE_ADMIN")
                        .requestMatchers(HttpMethod.PATCH, "/api/v1/**").hasAuthority("SCOPE_ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/v1/**").hasAuthority("SCOPE_ADMIN")
                        // All other requests must be authenticated
                        .anyRequest().authenticated())
                // Configure session management to be stateless
                .sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                // Configure OAuth2 resource server with JWT handling
                .oauth2ResourceServer(oauth2 -> oauth2.jwt(Customizer.withDefaults()))
                // Disable logout and enable HTTP basic authentication
                .logout(logout -> logout.disable())
                .httpBasic(Customizer.withDefaults());

        return http.build();
    }

    // Bean definition for JWKSource
    @Bean
    JWKSource<SecurityContext> jwkSource() {
        rsaKey = Jwks.generateRsa();
        JWKSet jwkSet = new JWKSet(rsaKey);
        return (jwkSelector, SecurityContext) -> jwkSelector.select(jwkSet);
    }

    // Bean definition for JwtEncoder
    @Bean
    JwtEncoder jwtEncoder(JWKSource<SecurityContext> jwkSource) {
        return new NimbusJwtEncoder(jwkSource);
    }

    // Bean definition for JwtDecoder
    @Bean
    JwtDecoder jwtDecoder() throws JOSEException {
        return NimbusJwtDecoder.withPublicKey(rsaKey.toRSAPublicKey()).build();
    }
}

