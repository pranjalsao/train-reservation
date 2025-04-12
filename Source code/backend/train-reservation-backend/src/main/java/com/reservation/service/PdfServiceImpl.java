package com.reservation.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.reservation.dao.IBookingRepository;
import com.reservation.dao.IPassengerRepository;
import com.reservation.entity.Booking;
import com.reservation.entity.Passenger;
import com.reservation.exception_handler.ResourceNotFoundException;


	@Service
	@Transactional
	public class PdfServiceImpl implements IPdfService {
	   
	
	@Autowired
	private IBookingRepository bookingRepo;
	@Autowired
	private IPassengerRepository passengerRepo;

	@Override
	public List<Passenger> listBooking(long id) {
		
		List<Passenger> passengers=passengerRepo.findByBookingBookingId(id);
		
		return passengers;
	}

	@Override
	public Booking getBooking(long id) {
	Booking bookEntity = bookingRepo.findById(id).
			orElseThrow(()->new ResourceNotFoundException("Not Found!"));
		
		return bookEntity;
	}
	
	
	}

