package ks.sales_management.api.exception;

import java.text.MessageFormat;

public class ClientNotFoundException extends RuntimeException {

    public ClientNotFoundException(String message) {
        super(message);
    }
    public static String createClientNotFoundMessage(Long id) {
        return MessageFormat.format("Nie znaleziono klienta o ID: {0}. Upewnij się, że wprowadzasz poprawne dane!", id);
    }
}
