package com.reservation.dto;

import java.time.LocalDate;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import org.hibernate.validator.constraints.Length;
import org.springframework.format.annotation.DateTimeFormat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserUpdateDTO {
	
private Long userId;
	
	@NotBlank(message = "First Name must be supplied!")
	@Length(max = 20, message = "Name must contain less than 30 characters!")
	private String firstName;
	
	@NotBlank(message = "Last Name must be supplied!")
	@Length(max = 20, message = "Name must contain less than 30 characters!")
	private String lastName;

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

}
