package com.reservation.service;

import java.time.LocalDate;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.reservation.dao.IUserRepository;
import com.reservation.dao.IWalletRepository;
import com.reservation.dto.ApiResponse;
import com.reservation.dto.ChangePasswordDTO;
import com.reservation.dto.UpdateBalanceDTO;
import com.reservation.dto.UserDTO;
import com.reservation.dto.UserRegResponse;
import com.reservation.dto.UserUpdateDTO;
import com.reservation.dto.WalletDTO;
import com.reservation.entity.User;
import com.reservation.entity.Wallet;
import com.reservation.entity.enums.RoleEnum;
import com.reservation.exception_handler.ResourceNotFoundException;

@Service
@Transactional
public class UserServiceImpl implements IUserService {

	@Autowired
	private IUserRepository userRepo;
	@Autowired
	private PasswordEncoder encoder;

	@Autowired
	private ModelMapper mapper;

	@Autowired
	private IWalletRepository walletRepo;

	@Override
	public UserRegResponse insertUserDetails(UserDTO user) {
		User userentity = mapper.map(user, User.class);
		userentity.setUserPassword(encoder.encode(userentity.getUserPassword()));
		User persistentuser = userRepo.save(userentity);

		return new UserRegResponse("WOHOO!! You are successfully registered with ID :" + persistentuser.getUserId());
	}

	@Override
	public UserRegResponse updateUserDetails(UserUpdateDTO detacheduser) {

		User user = userRepo.findById(detacheduser.getUserId())
				.orElseThrow(() -> new ResourceNotFoundException("Invalid User ID!"));
			String firstName=detacheduser.getFirstName();
			String lastName=detacheduser.getLastName();
			LocalDate date=detacheduser.getUserDob();
			String address	=detacheduser.getUserAddress();
			String mobile=detacheduser.getUserMobile();
			String email=detacheduser.getUserEmail();
			long id=detacheduser.getUserId();
			userRepo.updateProfile(firstName, lastName, email, date, mobile, address, id);
	
		
		return new UserRegResponse("Details of the user having ID :" + user.getUserId() + " updated successfully.");
	}

	@Override
	public Wallet insertWalletDetails(WalletDTO wallet) {

		User user = userRepo.findById(wallet.getUserId())
				.orElseThrow(() -> new ResourceNotFoundException("Invaild User ID!!!"));
		if (walletRepo.findByUserUserId(wallet.getUserId()).isPresent()) {
			throw new ResourceNotFoundException("Wallet already exist for User ID: " + wallet.getUserId());
		}

		Wallet walletentity = mapper.map(wallet, Wallet.class);
		walletentity.setCvv(encoder.encode(walletentity.getCvv()));
		walletentity.setUser(user);

		return walletRepo.save(walletentity);
	}

	@Override
	public Wallet showWalletBalance(Long walletid) {
		Wallet wallet = walletRepo.findById(walletid)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Wallet ID!!!"));
		return wallet;
	}

	@Override
	public String updateWalletDetails(WalletDTO wallet) {
		walletRepo.findByUserUserIdAndId(wallet.getUserId(), wallet.getWalletId())
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Wallet Credentials!"));

		String hashedCvv = encoder.encode(wallet.getCvv());
		walletRepo.updateWalletInfo(wallet.getDebitCardNo(), 
									hashedCvv, 
									wallet.getValidThru(),
									wallet.getWalletAmount(),
									wallet.getWalletId());

		return "Wallet details of ID :" + wallet.getWalletId() + " updated!!";
	}

	@Override
	public String updateBalance(UpdateBalanceDTO updateBalanceDto, long id) {
		Wallet wallet = walletRepo.findById(id)
				  .orElseThrow(() -> new ResourceNotFoundException("Invalid Wallet ID!!!"));
		
		if(!encoder.matches(updateBalanceDto.getCvv(), wallet.getCvv())) {
			throw new ResourceNotFoundException("Invalid CVV!");			
		}
		
		walletRepo.updateWalletBalance(updateBalanceDto.getAmount(), id);

		return "Amount : Rs " + updateBalanceDto.getAmount() + " added successfully in wallet ID " + id;

	}

	@Override
	public RoleEnum RoleByEmail(String email) {
		return userRepo.getRoleofUser(email);
	}



	public int idByEmail(String email) {
		return userRepo.getIdByEmail(email);
	}

	@Override
	public UserDTO getUserDetailsById(long userId) {
		User user = userRepo.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid User ID!"));
		return mapper.map(user, UserDTO.class);
	}

	@Override
	public WalletDTO getWalletDetailsByUserId(Long userId) {
		Wallet wallet = walletRepo.findByUserUserId(userId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid User ID!"));
		WalletDTO walletDto = mapper.map(wallet, WalletDTO.class);
		walletDto.setUserId(userId);
		walletDto.setWalletId(wallet.getId());
		return walletDto;
	}

	@Override
	public ApiResponse changeUserPassword(Long userId, ChangePasswordDTO changePasswordDto) {
		User user = userRepo.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid User ID!"));
		

		if(!encoder.matches(changePasswordDto.getOldPassword(), user.getUserPassword())) {
			throw new ResourceNotFoundException("Current Password failed to match!");			
		}

		
		if(!changePasswordDto.getNewPassword().equals(changePasswordDto.getConfirmNewPassword())) {
			throw new ResourceNotFoundException("New Password and Confirm New Password must match!");
		}
		user.setUserPassword(encoder.encode(changePasswordDto.getNewPassword()));
		return new ApiResponse("Password for User ID: "+userId+" has updated successfully!");
	}

	@Override
	public Wallet showWalletBalanceByUserId(Long userId) {
		Wallet wallet = walletRepo.findByUserUserId(userId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Wallet ID!!!"));
		return wallet;
	}

	

}
