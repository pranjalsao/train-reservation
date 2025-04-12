package com.reservation.service;

import java.util.List;

import com.reservation.dto.BookingDTO;
import com.reservation.dto.PaymentDTO;
import com.reservation.entity.Booking;

public interface IBookingService {

	Booking getBookingDetailsById(long bookingId);
	
	List<Booking> getAllBookingsByUserId(long userId);
	
	List<Booking> getAllBookings();
	
	Booking createBooking(BookingDTO booking);
	
	PaymentDTO getCompleteBookingDetailsById(long bookingId);
}
