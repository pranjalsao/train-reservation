package com.reservation.controller;

import java.util.Random;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.reservation.dto.ApiResponse;
import com.reservation.dto.AuthResp;
import com.reservation.dto.ForgotPasswordDTO;
import com.reservation.dto.LoginRequestDTO;
import com.reservation.dto.UserDTO;
import com.reservation.dto.otpDTO;
import com.reservation.entity.User;
import com.reservation.jwt_utils.JwtUtils;
import com.reservation.service.IAuthenticationService;
import com.reservation.service.IUserService;

import lombok.extern.slf4j.Slf4j;

@RestController
@CrossOrigin(origins="*")
@Validated
@Slf4j
public class LoginLogoutController {

	@Autowired
	private IAuthenticationService authService;
	
	@Autowired
	private JwtUtils utils;
	
	@Autowired
	private AuthenticationManager manager;
	
	@Autowired
	private IUserService userService;
	
	@PostMapping("/login")
	public ResponseEntity<?> authenticateEmp(@RequestBody @Valid LoginRequestDTO request){
	    log.info("In auth emp : " + request);
		log.info("In auth emp : " + request);
		
		UsernamePasswordAuthenticationToken authToken=null;
		
		
		  authToken = new UsernamePasswordAuthenticationToken(request.getUserEmail(),
					request.getUserPassword());
		
			try {

				Authentication authenticatedDetails = manager.authenticate(authToken);
				log.info("auth token again {} " , authenticatedDetails);
				
				String role = userService.RoleByEmail(request.getUserEmail()).name();
				int userId = userService.idByEmail(request.getUserEmail());
				
				
				return ResponseEntity.ok(new AuthResp("Auth successful!", utils.generateJwtToken(authenticatedDetails), role, userId));
				
				} catch (BadCredentialsException e) { 
	
				System.out.println("err "+e);
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ApiResponse(e.getMessage()));
			}
		}
		
	
	@PostMapping("/forgot-password")
	public ResponseEntity<?> forgotPassword(@RequestBody @Valid ForgotPasswordDTO details){
		
		try {	
			Random random=new Random();
			int otp=random.nextInt(999999 );
			log.info("OTP "+otp);
			
			System.out.println("preparing to send mesaage...");
			String message="Hello,\n"
					+ "Your OTP: "+otp+" for password change request.Please enter the mentioned OTP"
							+ "in the OTP confirmation page to facilitate password change.\n"
							+ "\n"
							+ "\n"					
							+ "Thank You!!";
			String subject="OTP";
			String to=details.getUserEmail();
			
			return ResponseEntity.status(HttpStatus.ACCEPTED).body(authService.forgotPasswordDetails(details,message,subject,to,otp));
		} 
		catch (RuntimeException e) {
			System.out.println("in add new forgot password err " + e);
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(e.getMessage()));
		}
	}
	
	@PostMapping("/otp-confirm")
	public ResponseEntity<?> confirmOTP(@RequestBody @Valid otpDTO otp) {
		try {
			log.info("In otp  user : " + otp.getUserEmail());
			return ResponseEntity.status(HttpStatus.OK).body(authService.checkOTP(otp));
		} catch (RuntimeException e) {
			System.out.println("in add new user err " + e);
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(e.getMessage()));
		}		
		
	}
	
	@PutMapping("/reset-password")
	public ResponseEntity<?> resetPassword(@RequestBody @Valid LoginRequestDTO newPassword){
		log.info("Inside reset password...");
		
		
		return ResponseEntity.ok().body(authService.changePassword(newPassword));
	}
	
	@PostMapping("/register")
	public ResponseEntity<?> addNewUser(@RequestBody @Valid UserDTO user) {
		try {
			log.info("In add new user : " + user.getUserEmail());
			return ResponseEntity.status(HttpStatus.CREATED).body(userService.insertUserDetails(user));
		} catch (RuntimeException e) {
			System.out.println("in add new user err " + e);
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(e.getMessage()));
		}		
	}
	
	
}


