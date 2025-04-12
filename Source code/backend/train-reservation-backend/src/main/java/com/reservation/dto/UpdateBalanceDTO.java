package com.reservation.dto;

import javax.validation.constraints.DecimalMax;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateBalanceDTO {
	
	@JsonProperty(access = Access.WRITE_ONLY)
	@NotBlank(message = "CVV must be supplied!")
	@Size(min = 3, max = 3, message = "Invalid CVV Number Length!")
	@Pattern(regexp = "\\d{3}")
	private String cvv;
	
	@NotNull(message = "Amount cannot be blank!")
	@DecimalMax(value = "100000.00")
	@DecimalMin(value = "1.00")
	private double amount;	
	
}
