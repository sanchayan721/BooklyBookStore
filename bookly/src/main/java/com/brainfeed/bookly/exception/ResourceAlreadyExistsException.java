package com.brainfeed.bookly.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class ResourceAlreadyExistsException extends RuntimeException{
    
    private static final long serialVersionUID = 1L;
    private String resourceName;
    private String fieldName;

    public ResourceAlreadyExistsException(String resourceName, String fieldName) {
        super(String.format("%s : %s already exists", resourceName, fieldName));
        this.resourceName = resourceName;
        this.fieldName = fieldName;
    }

    public String getResourceName() {
        return resourceName;
    }

    public String getFieldName() {
        return fieldName;
    }
}
