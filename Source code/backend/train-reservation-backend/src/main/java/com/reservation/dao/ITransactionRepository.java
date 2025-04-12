package com.reservation.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.reservation.entity.Transaction;
import com.reservation.entity.User;

public interface ITransactionRepository extends JpaRepository<Transaction, Long> {

	List<Transaction> findByUserUserId(long userId);
}
