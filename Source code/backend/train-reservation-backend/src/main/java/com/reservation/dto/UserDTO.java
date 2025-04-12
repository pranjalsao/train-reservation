	package com.reservation.dto;

import java.time.LocalDate;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

import org.hibernate.validator.constraints.Length;
import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserDTO {


	private Long userId;
	
	@NotBlank(message = "First Name must be supplied!")
	@Length(max = 20, message = "Name must contain less than 30 characters!")
	private String firstName;
	
	@NotBlank(message = "Last Name must be supplied!")
	@Length(max = 20, message = "Name must contain less than 30 characters!")
	private String lastName;

	@ToString.Exclude
	@Pattern(regexp = "((?=.*\\d)(?=.*[a-z])(?=.*[#@$*]).{8,20})", message = "Blank or invalid password format(must contain special characters @,$,#")
	@Length(min = 8, max = 20, message = "Password must contain minimum 8 characters and maximum 20 characters")
	@JsonProperty(access = Access.WRITE_ONLY)
	private String userPassword;

	@NotBlank(message = "Mobile Number must be supplied!")
	@Length(max = 10, min = 10, message = "Mobile no. must contain 10 characters!")
	private String userMobile;

	@NotBlank(message = "Email must be supplied!")
	@Email(message = "Invalid Email Format!")
	private String userEmail;

	
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate userDob;

	@NotBlank(message = "Address must be supplied!")
	@Length(max = 50, message = "Address must contain less than 50 characters!")
	private String userAddress;

	@ToString.Exclude
	@NotBlank(message = "Security question must be selected!")
	@JsonProperty(access = Access.WRITE_ONLY)
	private String securityQues;
	
	@ToString.Exclude
	@Length(max = 30, message = "Answer must contain less than 30 characters!")
	@NotBlank(message = "Security answer must be supplied")
	@JsonProperty(access = Access.WRITE_ONLY)
	private String securityAns;
	
	
	private String role;
}
