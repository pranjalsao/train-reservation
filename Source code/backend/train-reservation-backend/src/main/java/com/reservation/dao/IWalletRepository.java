package com.reservation.dao;

import java.time.LocalDate;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.reservation.entity.User;
import com.reservation.entity.Wallet;

public interface IWalletRepository extends JpaRepository<Wallet,Long> {

	@Modifying
	@Query("update Wallet w set w.debitCardNo=?1,w.cvv=?2,w.validThru=?3, w.walletAmount=?4 where w.id=?5")
	int updateWalletInfo(String debitCardNo,String cvv,LocalDate validThru, Double walletAmount,Long id);
	
	@Modifying
	@Query("update Wallet w set w.walletAmount=w.walletAmount+?1 where id=?2")
	int updateWalletBalance(double amount,long id);

	Optional<Wallet> findByUserUserId(Long userId);
	
	Optional<Wallet> findByUser(User user);
	
	Optional<Wallet> findByUserUserIdAndId(Long userId, Long walletId);
	
	
	
}
