package ks.sales_management.api.exception;

public class JwtNotValidException extends RuntimeException {
    public JwtNotValidException(String message) {
        super(message);
    }
}
