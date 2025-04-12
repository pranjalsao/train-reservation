package com.reservation.service;

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

public interface IUserService {

	UserRegResponse insertUserDetails(UserDTO user);
	UserRegResponse updateUserDetails(UserUpdateDTO detacheduser);
	Wallet showWalletBalance(Long walletid);
	Wallet insertWalletDetails(WalletDTO wallet);
	String updateWalletDetails(WalletDTO wallet);
	String updateBalance(UpdateBalanceDTO updateBalanceDto,long id);
	RoleEnum RoleByEmail(String email);
	int idByEmail(String email);
	UserDTO getUserDetailsById(long userId);
	
	WalletDTO getWalletDetailsByUserId(Long userId);
	
	ApiResponse changeUserPassword(Long userId, ChangePasswordDTO changePasswordDto);
	
	Wallet showWalletBalanceByUserId(Long userId);
}
