package ks.sales_management.api.exception;

import java.text.MessageFormat;

public class OrderNotFoundException extends RuntimeException {
    public OrderNotFoundException(String message) {
        super(message);
    }
    public static String createOrderNotFoundMessage(Long id) {
        return MessageFormat.format("Nie znaleziono zamówienia o ID: {0}. Upewnij się, że wprowadzasz poprawne i istniejące dane!", id);
    }
}
