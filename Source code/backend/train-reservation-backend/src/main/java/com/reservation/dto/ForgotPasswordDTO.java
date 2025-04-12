package com.reservation.dto;

import javax.validation.constraints.NotBlank;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ForgotPasswordDTO {

	@NotBlank(message="Email must be supplied!!")
	private String userEmail;
	
	@NotBlank(message="Security Question must be selected!!")
	private String securityQues;
	
	@NotBlank(message="Security Answer must be supplied!!")
	private String securityAns;
	
}
