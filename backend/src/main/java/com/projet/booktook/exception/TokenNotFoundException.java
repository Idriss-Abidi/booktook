package com.projet.booktook.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class TokenNotFoundException extends ResponseStatusException {

    public TokenNotFoundException(String message) {
        super(HttpStatus.NOT_FOUND, message);
    }


}