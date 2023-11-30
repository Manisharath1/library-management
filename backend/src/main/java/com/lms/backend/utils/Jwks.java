import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.util.UUID;

import com.nimbusds.jose.jwk.RSAKey;

/**
 * JSON Web Key Set providing a public and private key pair
 */
public class Jwks {
    private Jwks() {
    }

    // Method to generate an RSA JSON Web Key (JWK) pair
    public static RSAKey generateRsa() {
        // Generate an RSA key pair
        KeyPair keyPair = generateRsaKey();

        // Extract the public and private keys from the key pair
        RSAPublicKey publicKey = (RSAPublicKey) keyPair.getPublic();
        RSAPrivateKey privateKey = (RSAPrivateKey) keyPair.getPrivate();

        // Build and return an RSA JSON Web Key (JWK) using Nimbus JOSE library
        return new RSAKey.Builder(publicKey)
                .privateKey(privateKey)
                .keyID(UUID.randomUUID().toString()) // Set a unique Key ID
                .build();
    }

    // Method to generate an RSA key pair
    private static KeyPair generateRsaKey() {
        KeyPair keyPair;
        try {
            // Initialize a KeyPairGenerator for RSA with a key size of 2048 bits
            KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("RSA");
            keyPairGenerator.initialize(2048);

            // Generate the key pair
            keyPair = keyPairGenerator.generateKeyPair();
        } catch (Exception e) {
            // Wrap any exceptions in IllegalStateException for simplicity
            throw new IllegalStateException(e);
        }
        return keyPair;
    }
}
