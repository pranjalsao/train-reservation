package com.reservation.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.reservation.dao.ITrainRepository;
import com.reservation.dao.ITransactionRepository;
import com.reservation.dao.IUserRepository;
import com.reservation.dao.IWalletRepository;
import com.reservation.dto.BookingDTO;
import com.reservation.dto.PassengerDTO;
import com.reservation.dto.PaymentDTO;
import com.reservation.entity.Booking;
import com.reservation.entity.Train;
import com.reservation.entity.Transaction;
import com.reservation.entity.Wallet;
import com.reservation.entity.enums.TransactionStatusEnum;
import com.reservation.exception_handler.ResourceNotFoundException;

@Service
@Transactional
public class PaymentServiceImpl implements IPaymentService {

	@Autowired
	private IWalletRepository walletRepo;
	@Autowired
	private ITransactionRepository transactionRepo;
	@Autowired
	private IBookingService bookingService;
	@Autowired
	private IUserRepository userRepo;
	@Autowired
	private IPassengerService passengerService;
	@Autowired 
	private ITrainRepository trainRepo;
	
	
	@Override
	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
	public PaymentDTO makePayment(PaymentDTO paymentRequest) {
		
		List<PassengerDTO> passengersDetails = paymentRequest.getPassengersDetails();
		BookingDTO bookingDetails = paymentRequest.getBookingDetails();
		
		Wallet wallet = walletRepo.findByUserUserId(bookingDetails.getUserId())
				.orElseThrow(() -> new ResourceNotFoundException("Invalid User ID!"));
		if(wallet.getWalletAmount() < bookingDetails.getTotalAmount()) {
			throw new ResourceNotFoundException("Insufficient Balance - Transaction Failed!");
		} 
		wallet.setWalletAmount(wallet.getWalletAmount() - bookingDetails.getTotalAmount());
		Booking booking = bookingService.createBooking(bookingDetails);
		Transaction txn = new Transaction(booking.getDepartureDate(), 
											booking.getUser(), 
											booking, 
											bookingDetails.getTotalAmount(), 
											TransactionStatusEnum.SUCCESS);
		transactionRepo.save(txn);
		
		passengerService.addMultiplePassengers(passengersDetails, booking);
		
		bookingDetails.setBookingId(booking.getBookingId());
		bookingDetails.setBookingStatus(booking.getBookingStatus().name());
		Train train = trainRepo.findById(bookingDetails.getTrainId())
						.orElseThrow(() -> new ResourceNotFoundException("Invalid Train ID!"));
		bookingDetails.setTrainName(train.getTrainName());
		
		return paymentRequest;
	}
}
