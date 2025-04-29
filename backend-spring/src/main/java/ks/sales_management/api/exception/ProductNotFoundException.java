package ks.sales_management.api.exception;

import java.text.MessageFormat;

public class ProductNotFoundException extends RuntimeException {
    public ProductNotFoundException(String message) {
        super(message);
    }
    public static String createProductNotFoundMessage(Long id) {
        return MessageFormat.format("Nie znaleziono produktu o ID: {0}. Upewnij się, że wprowadzasz poprawne i istniejące dane!", id);
    }
}
