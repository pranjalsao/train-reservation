package com.reservation.exception_handler;


import java.util.stream.Collectors;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.reservation.dto.ApiResponse;

import lombok.extern.slf4j.Slf4j;

@RestControllerAdvice 
@Slf4j
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

	@Override
	protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
			HttpHeaders headers, HttpStatus status, WebRequest request) {
		log.error("VALIDATION ERROR OCCURRED | " + ex);
		return new ResponseEntity<>(ex.getBindingResult()
										.getFieldErrors()   // List<FieldError>
										.stream()  			// Stream<FieldError>
										.collect(Collectors.toMap(FieldError::getField, FieldError::getDefaultMessage)),
									HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<?> handleResourceNotFoundException(ResourceNotFoundException rnfe) {
		 log.error("Failed to find the requested resource | " + rnfe);
		 return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(rnfe.getMessage()));
	}
	
	@ExceptionHandler(Exception.class) 
	public ResponseEntity<?> handleAllUncaughtException(Exception e) {
		log.error("UNKNOWN ERROR OCCURED | " + e);
		return ResponseEntity.internalServerError().body(new ApiResponse(e.getMessage()));
	}
	
}
