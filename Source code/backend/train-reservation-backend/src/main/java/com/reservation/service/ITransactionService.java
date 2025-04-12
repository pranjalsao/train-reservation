package com.reservation.service;

import java.util.List;

import com.reservation.entity.Transaction;

public interface ITransactionService {
	
	Transaction getTransactionDetailsById(long transactionId);
	
	List<Transaction> getAllTransactionsByUserId(long userId);
	
	String createTransaction(Transaction transientTransaction, long userId, long bookingId);
}
