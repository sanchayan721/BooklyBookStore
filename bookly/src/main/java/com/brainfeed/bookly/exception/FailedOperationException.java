package com.brainfeed.bookly.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.EXPECTATION_FAILED)
public class FailedOperationException extends RuntimeException{
    private static final long serialVersionUID = 1L;

    String operationName;

    public FailedOperationException(String operationName) {
        super(String.format("Operation : %s failed, please try again!", operationName));
        this.operationName = operationName;
    }

    public String getOperationName() {
        return operationName;
    }

    public void setOperationName(String operationName) {
        this.operationName = operationName;
    }
    
}
