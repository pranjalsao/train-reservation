package com.reservation.service;

import java.util.Properties;

import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.reservation.dao.IUserRepository;
import com.reservation.dto.ApiResponse;
import com.reservation.dto.ForgotPasswordDTO;
import com.reservation.dto.LoginRequestDTO;
import com.reservation.dto.otpDTO;
import com.reservation.entity.User;
import com.reservation.exception_handler.ResourceNotFoundException;

@Transactional
@Service
public class AuthenticationServiceImpl implements IAuthenticationService {

	@Autowired
	private ModelMapper mapper;

	@Autowired
	private IUserRepository userRepo;
	@Autowired
	private PasswordEncoder encoder;

	@Override
	public User authenticateUser(LoginRequestDTO request) {

		User userEntity = userRepo.findByUserEmail(request.getUserEmail()).orElseThrow(() -> new UsernameNotFoundException("Invalid Email ID "));
		String password = userEntity.getUserPassword();
		if (!encoder.matches(request.getUserPassword(), password))
			throw new ResourceNotFoundException("Invaild Credentials!!!");

		return userEntity;
	}

	@Override
	public ApiResponse forgotPasswordDetails(ForgotPasswordDTO forgot, String mesg, String sub, String to,int otp) {
		String email = forgot.getUserEmail();
		String securityQues = forgot.getSecurityQues();
		String securityAns = forgot.getSecurityAns();
		User user=userRepo.findByEmailAndSecurityInfo(email, securityQues, securityAns)
				.orElseThrow(() -> new ResourceNotFoundException("Invaild Credentials!!!"));
		
		user.setOtp(otp);
		
		String from = "pranjalsao_sur@srmuniv.edu.in";
		String host = "smtp.gmail.com";

		Properties prop = System.getProperties();
		System.out.println("Properties " + prop);

		prop.put("mail.smtp.host", host);
		prop.put("mail.smtp.port", 465);
		prop.put("mail.smtp.ssl.enable", "true");
		prop.put("mail.smtp.auth", "true");

		Session session = Session.getInstance(prop, new Authenticator() {

			@Override
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication("pranjalsao_sur@srmuniv.edu.in", "pranjalsao1997");
			}
		});

		session.setDebug(true);

		MimeMessage message = new MimeMessage(session);

		try {
			message.setFrom(from);
			message.addRecipient(Message.RecipientType.TO, new InternetAddress(to));
			message.setSubject(sub);
			message.setText(mesg);

			Transport.send(message);
			System.out.println("message sent.... ");
		} catch (Exception e) {
			e.printStackTrace();
		}

		return new ApiResponse("OTP sent to email ID : " + email);
	}

	@Override
	public String checkOTP(otpDTO otp) {
		
		userRepo.findByUserEmailAndOtp(otp.getUserEmail(), otp.getOtp()).
		orElseThrow(() -> new ResourceNotFoundException("OTP doesn't match.Please Try again!!!"));
		
		return "OTP matches!Please eneter new login password";
	}

	@Override
	public ApiResponse changePassword(LoginRequestDTO password) {
		
	User user=userRepo.findByUserEmail(password.getUserEmail()).orElseThrow(() -> new UsernameNotFoundException("Invalid Email ID "));
	user.setUserPassword(encoder.encode(password.getUserPassword()));
	
	return new ApiResponse("Password changed successfully!!");
	}
	
	

}
