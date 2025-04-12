package com.reservation.service;

import com.reservation.dto.ApiResponse;
import com.reservation.dto.ForgotPasswordDTO;
import com.reservation.dto.LoginRequestDTO;
import com.reservation.dto.otpDTO;
import com.reservation.entity.User;

public interface IAuthenticationService {

	User authenticateUser(LoginRequestDTO request);
	ApiResponse forgotPasswordDetails(ForgotPasswordDTO forgot,String mesg,String sub,String to,int otp);
	String checkOTP(otpDTO otp);
	ApiResponse changePassword(LoginRequestDTO password);
}
