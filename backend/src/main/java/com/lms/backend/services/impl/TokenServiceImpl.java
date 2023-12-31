package com.lms.backend.services.impl;

import java.util.stream.Collectors;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import com.lms.backend.services.TokenService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TokenServiceImpl implements TokenService {

    private final JwtEncoder encoder;

    @Override
    public String generateToken(Authentication authentication) {
        var scope = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(" "));

        var claim = JwtClaimsSet.builder()
                .issuer("self")
                .subject(authentication.getName())
                .claim("scope", scope)
                .build();

        return encoder.encode(JwtEncoderParameters.from(claim)).getTokenValue();
    }

}
