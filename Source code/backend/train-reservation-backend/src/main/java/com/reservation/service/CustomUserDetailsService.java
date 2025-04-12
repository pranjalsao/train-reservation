package com.reservation.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.reservation.dao.IUserRepository;
import com.reservation.entity.User;

@Service 
@Transactional

public class CustomUserDetailsService implements UserDetailsService {
	
	@Autowired
	private IUserRepository userRepo;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		System.out.println("in load by user nm " + email);
		
		User user = userRepo.
				findByUserEmail(email).
				orElseThrow(() -> new UsernameNotFoundException("Invalid Email ID "));
		System.out.println("lifted user dtls from db "+user);
		
		return new CustomUserDetails(user);
	}

}
