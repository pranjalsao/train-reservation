package com.reservation.dto;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;

import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChangePasswordDTO {
	
	@NotEmpty
	@JsonProperty(access = Access.WRITE_ONLY)
	private String oldPassword;

	@Pattern(regexp = "((?=.*\\d)(?=.*[a-z])(?=.*[#@$*]).{8,20})", message = "Blank or invalid password format(must contain special characters @,$,#")
	@Length(min = 8, max = 20, message = "Password must contain minimum 8 characters and maximum 20 characters")
	@JsonProperty(access = Access.WRITE_ONLY)
	private String newPassword;
	
	@Pattern(regexp = "((?=.*\\d)(?=.*[a-z])(?=.*[#@$*]).{8,20})", message = "Blank or invalid password format(must contain special characters @,$,#")
	@Length(min = 8, max = 20, message = "Password must contain minimum 8 characters and maximum 20 characters")
	@JsonProperty(access = Access.WRITE_ONLY)
	private String confirmNewPassword;
	
	
	
}
