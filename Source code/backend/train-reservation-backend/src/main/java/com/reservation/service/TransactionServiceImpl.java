package com.reservation.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.reservation.dao.IBookingRepository;
import com.reservation.dao.ITransactionRepository;
import com.reservation.dao.IUserRepository;
import com.reservation.entity.Booking;
import com.reservation.entity.Transaction;
import com.reservation.entity.User;
import com.reservation.exception_handler.ResourceNotFoundException;

@Transactional
@Service
public class TransactionServiceImpl implements ITransactionService {

	@Autowired
	private ITransactionRepository transactionRepo;
	@Autowired
	private IUserRepository userRepo;	
	@Autowired
	private IBookingRepository bookingRepo;

	@Override
	public Transaction getTransactionDetailsById(long transactionId) {
		return transactionRepo.findById(transactionId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Transaction ID!"));
	}

	@Override
	public List<Transaction> getAllTransactionsByUserId(long userId) {		
			return transactionRepo.findByUserUserId(userId);
	}
	
	@Override
	public String createTransaction(Transaction transientTransaction, long userId, long bookingId) {
		User user = userRepo.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid User ID!"));
		Booking booking = bookingRepo.findById(bookingId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Booking ID!"));
		transientTransaction.setUser(user);
		transientTransaction.setBooking(booking);
		Transaction persistantTransaction = transactionRepo.save(transientTransaction);
		return "Transaction Successfull with Transaction ID: " + persistantTransaction.getTransactionId();
	}
}
