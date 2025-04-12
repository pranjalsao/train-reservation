	package com.reservation.dto;

import java.time.LocalDate;

import javax.validation.constraints.DecimalMax;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.Future;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import com.reservation.entity.User;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class WalletDTO {
	
	@NotNull(message = "User cannot be null!")
	private Long userId;
	
	private Long walletId;
	
	@NotNull(message = "Amount cannot be blank!")
	@DecimalMax(value = "100000.00")
	@DecimalMin(value = "100.00")
	private double walletAmount;	
	
	@NotBlank(message = "Card Number must be supplied!")
	@Size(min = 14, max = 14, message = "Invalid Card Number Length!")
	@Pattern(regexp = "^\\d{4}-\\d{4}-\\d{4}$")
	private String debitCardNo;
		
	@NotNull(message = "Valid-Thru Date must be supplied!")
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@Future(message = "Valid-Thru Date must be in future!")
	private LocalDate validThru;
	
	@JsonProperty(access = Access.WRITE_ONLY)
	@NotBlank(message = "CVV must be supplied!")
	@Size(min = 3, max = 3, message = "Invalid CVV Number Length!")
	@Pattern(regexp = "\\d{3}")
	private String cvv;
	
}
