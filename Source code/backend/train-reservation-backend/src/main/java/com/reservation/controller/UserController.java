package com.reservation.controller;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Range;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.reservation.dto.ApiResponse;
import com.reservation.dto.ChangePasswordDTO;
import com.reservation.dto.PaymentDTO;
import com.reservation.dto.UpdateBalanceDTO;
import com.reservation.dto.UserRegResponse;
import com.reservation.dto.UserUpdateDTO;
import com.reservation.dto.WalletDTO;
import com.reservation.service.IAdminService;
import com.reservation.service.IBookingService;
import com.reservation.service.ICancellationService;
import com.reservation.service.IPaymentService;
import com.reservation.service.IUserService;

import lombok.extern.slf4j.Slf4j;


@RestController
@RequestMapping("/user")
@Slf4j
@Validated
@CrossOrigin(origins="*")
public class UserController {

	@Autowired
	private IUserService userService;
	@Autowired
	private IPaymentService paymentService;
	@Autowired
	private ICancellationService cancellationService; 
	@Autowired
	private IBookingService bookingService;
	@Autowired
	private IAdminService adminService;
	
	
	@PutMapping("/update")
	public UserRegResponse updateUserDetails(@RequestBody @Valid UserUpdateDTO user) {
		log.info("For update user ID : "+user.getUserId());
		return userService.updateUserDetails(user);
	}
	
	
	
	@PostMapping("/add-wallet")
	public ResponseEntity<?> addNewWallet(@RequestBody @Valid WalletDTO wallet){
		try {	
			return ResponseEntity.status(HttpStatus.CREATED).body(userService.insertWalletDetails(wallet));
		} 
		catch (RuntimeException e) {
			System.out.println("in add new wallet err " + e);
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(e.getMessage()));
		}
	}
	
	@GetMapping("/wallet-balance/{walletid}")
	public ResponseEntity<?> showWalletBalance(@PathVariable Long walletid){
		try {	
			log.info("in show wallet balance of ID : "+walletid);
			return ResponseEntity
					.ok()
					.body((userService.showWalletBalance(walletid).getWalletAmount()));
		} 
		catch(RuntimeException e) {
			System.out.println("in show wallet balance err " + e);
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(e.getMessage()));
		}
	}
	
	
	@PutMapping("/update-wallet-details")
	public String updateWallet(@RequestBody @Valid WalletDTO wallet) {
		log.info("in update wallet details of user id "+wallet.getUserId());
		return userService.updateWalletDetails(wallet);
	}
	
//	@PutMapping("/update-balance/{id}")
//	public String updateWalletBalance(@RequestParam @Valid @NotNull @Range(min=50) double amount,@PathVariable @Valid @NotNull long id) {
//		log.info("in update balance of id "+id);
//		return userService.updateBalance(amount, id);
//	}
	
	@PutMapping("/update-balance/{id}")
	public String updateWalletBalance(@PathVariable @Valid @NotNull long id, @RequestBody @Valid UpdateBalanceDTO updateBalanceDto) {
		log.info("in update balance of id "+id);
		return userService.updateBalance(updateBalanceDto, id);
	}
	

	@PostMapping("/pay")
	public ResponseEntity<?> makePayment(@RequestBody PaymentDTO paymentDetails) {
		log.info("In Payment...");
		return ResponseEntity.ok().body(paymentService.makePayment(paymentDetails));
	}
	
	@GetMapping("/cancel/{bookingId}")
	public ResponseEntity<?> cancelTicket(@PathVariable Long bookingId) {
		return ResponseEntity.ok().body(cancellationService.cancelTicket(bookingId));
	}


	@GetMapping("/get-details/{userId}")
	public ResponseEntity<?> getDetailsById(@PathVariable Long userId) {
		return ResponseEntity.ok().body(userService.getUserDetailsById(userId));
	}
	
	
	
	@GetMapping("/get-wallet-details/{userId}")
	public ResponseEntity<?> updateWallet(@PathVariable Long userId) {
		log.info("In Get Wallet Details By UserID: "+userId);
		return ResponseEntity.ok().body(userService.getWalletDetailsByUserId(userId));
	}
	
	
	@GetMapping("/all-bookings/{userId}")
	public ResponseEntity<?> showAllBookingsByUserId(@PathVariable @Valid @NotNull Long userId) {
		log.info("In Show All Booking By User Id : " + userId);
		return ResponseEntity.ok().body(bookingService.getAllBookingsByUserId(userId));
	}
	
	@GetMapping("/booking/{bookingId}")
	public ResponseEntity<?> showBookingByBookingId(@PathVariable @Valid @NotNull Long bookingId) {
		log.info("In Show All Booking By User Id : " + bookingId);
		return ResponseEntity.ok().body(bookingService.getCompleteBookingDetailsById(bookingId));
	}
	
	@PutMapping("/change-password/{userId}") 
	public ResponseEntity<?> changeUserPassword(@PathVariable @Valid @NotNull Long userId,@RequestBody ChangePasswordDTO changePasswordDto) {
		log.info("In change password of User ID: "+userId);
		return ResponseEntity.ok().body(userService.changeUserPassword(userId, changePasswordDto));
	}
	
	@GetMapping("/all-stations")
	public ResponseEntity<?> showAllStations() {
		log.info("In Show All Stations...");
		return ResponseEntity.ok().body(adminService.showAllStations());
	}
	
	
	@GetMapping("/wallet-balance-user/{userId}")
	public ResponseEntity<?> showWalletBalanceByUserId(@PathVariable Long userId){
		try {	
			log.info("in show wallet balance of User ID : "+userId);
			return ResponseEntity
					.ok()
					.body((userService.showWalletBalanceByUserId(userId).getWalletAmount()));
		} 
		catch(RuntimeException e) {
			System.out.println("in show wallet balance err " + e);
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(e.getMessage()));
		}
	}
}
