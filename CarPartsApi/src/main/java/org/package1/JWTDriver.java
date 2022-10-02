package org.package1;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.time.Instant;
import java.util.Base64;
import java.util.Date;

public class JWTDriver {
    public static String createToken(String email, String password, String role){
        String jwtToken = Jwts.builder()
                .claim("email", email)
                .claim("password", password)
                .claim("role", role)
                .setSubject(email)
                .setIssuedAt(Date.from(Instant.now()))
//                .setExpiration(Date.from(Instant.now().plus(30, ChronoUnit.DAYS)))
                .signWith(SignatureAlgorithm.HS256, email + password)
                .compact();
        return jwtToken;
    }
    public static String decodeToken(String token){
        String[] chunks = token.split("\\.");
        Base64.Decoder decoder = Base64.getUrlDecoder();

//        String header = new String(decoder.decode(chunks[0]));
        String payload = new String(decoder.decode(chunks[1]));
        return payload;
    }
}
