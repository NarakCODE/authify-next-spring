package in.narakcode.authify.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component
public class JwtUtil {

  // 1. Using a Base64-encoded secret is much more secure
  @Value("${jwt.secret.key}")
  private String SECRET_KEY;

  // 2. Expiration time is now configurable from properties
  @Value("${jwt.expiration.ms}")
  private long jwtExpirationMs;

  /**
   * Extracts the username (subject) from the token.
   */
  public String extractUsername(String token) {
    return extractClaim(token, Claims::getSubject);
  }

  /**
   * Extracts a specific claim from the token.
   */
  public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
    final Claims claims = extractAllClaims(token);
    return claimsResolver.apply(claims);
  }

  /**
   * Generates a token for a given UserDetails.
   */
  public String generateToken(UserDetails userDetails) {
    return generateToken(new HashMap<>(), userDetails);
  }

  /**
   * Generates a token with extra claims.
   */
  public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {
    return buildToken(extraClaims, userDetails.getUsername(), jwtExpirationMs);
  }

  /**
   * Checks if the token is valid for the given UserDetails.
   */
  public boolean validateToken(String token, UserDetails userDetails) {
    final String username = extractUsername(token);
    return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
  }

  private boolean isTokenExpired(String token) {
    return extractExpiration(token).before(new Date());
  }

  private Date extractExpiration(String token) {
    return extractClaim(token, Claims::getExpiration);
  }

  // --- Private Helper Methods ---

  private String buildToken(Map<String, Object> extraClaims, String subject, long expiration) {
    return Jwts.builder().setClaims(extraClaims).setSubject(subject)
        .setIssuedAt(new Date(System.currentTimeMillis()))
        .setExpiration(new Date(System.currentTimeMillis() + expiration))
        // 3. This is the new, secure way to sign the token
        .signWith(getSignInKey(), SignatureAlgorithm.HS256).compact();
  }

  /**
   * Parses the token to extract all claims.
   */
  private Claims extractAllClaims(String token) {
    return Jwts.parserBuilder().setSigningKey(getSignInKey()).build().parseClaimsJws(token)
        .getBody();
  }

  /**
   * 4. Decodes the Base64 secret key into a secure Key object.
   */
  private Key getSignInKey() {
    byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
    return Keys.hmacShaKeyFor(keyBytes);
  }
}