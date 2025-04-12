package com.reservation.dto;

import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class otpDTO {

	private String userEmail;
	
	@NotNull(message="OTP MUST BE SUPPLIED!")
	private int otp;
}
