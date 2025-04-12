package com.reservation.service;

import java.time.LocalDate;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.reservation.dao.IBookingRepository;
import com.reservation.dao.ICoachRepository;
import com.reservation.dao.IPassengerRepository;
import com.reservation.dao.ITrainStatusRepository;
import com.reservation.dto.PassengerDTO;
import com.reservation.entity.Booking;
import com.reservation.entity.Coach;
import com.reservation.entity.Passenger;
import com.reservation.entity.Train;
import com.reservation.entity.TrainStatus;
import com.reservation.entity.enums.PassengerStatusEnum;
import com.reservation.exception_handler.ResourceNotFoundException;

@Service
@Transactional
public class PassengerServiceImpl implements IPassengerService {

	@Autowired
	private IPassengerRepository passengerRepo;
	@Autowired
	private ModelMapper mapper;
	@Autowired
	private IBookingRepository bookingRepo;
	@Autowired
	private ICoachRepository coachRepo;
	@Autowired
	private ITrainStatusRepository trainStatusRepo;

	@Override
	public List<Passenger> getAllPassengersByBookingId(long bookingId) {
		return passengerRepo.findByBookingBookingId(bookingId);
	}

	@Override
	@Transactional(propagation = Propagation.MANDATORY, rollbackFor = Exception.class)
	public PassengerDTO addPassenger(PassengerDTO passenger, Booking booking) {
		Passenger transientPassenger = mapper.map(passenger, Passenger.class);
		transientPassenger.setPassengerIdCardType(passenger.getPassengerIdCardType());
		transientPassenger.setPassengerGender(passenger.getPassengerGender());
//		transientPassenger.setPassengerStatus(PassengerStatusEnum.valueOf(passenger.getPassengerStatus()));
//		Booking booking = bookingRepo.findById(passenger.getBookingId())
//				.orElseThrow(() -> new ResourceNotFoundException("Invalid Booking ID!"));	
		transientPassenger.setBooking(booking);
		
		allocateSeat(transientPassenger, booking.getTrain().getTrainNo(), booking.getDepartureDate(), booking.getCoach().getCoachId());
		
		Passenger persistentPassenger =  passengerRepo.save(transientPassenger);
		
		passenger.setBookingId(booking.getBookingId());
		passenger.setPassengerId(persistentPassenger.getPassengerId());
		passenger.setPassengerStatus(persistentPassenger.getPassengerStatus());
		passenger.setPassengerSeat(persistentPassenger.getPassengerSeat());
		
		return passenger;
	}

	private synchronized void allocateSeat(Passenger transientPassenger, Long trainNo, LocalDate departureDate, String coachId) {
		TrainStatus trainStatus = trainStatusRepo.findByTrainTrainNoAndDateAndCoachCoachId(trainNo, departureDate, coachId)
				.orElseThrow(() -> new ResourceNotFoundException("Seat Allocation Failed!"));
		if(trainStatus.getSeatsAvailable() > 0) {
			transientPassenger.setPassengerStatus(PassengerStatusEnum.CONFIRMED);
			trainStatus.setSeatsBooked(trainStatus.getSeatsBooked() + 1);
			trainStatus.setSeatsAvailable(trainStatus.getSeatsAvailable() - 1);
			transientPassenger.setPassengerSeat(coachId + "-" +trainStatus.getSeatsBooked());
		} else {
			transientPassenger.setPassengerStatus(PassengerStatusEnum.WAITING);
			trainStatus.setSeatsWaiting(trainStatus.getSeatsWaiting() + 1);
		}
		
	}
	
	
	@Override
	public String addPassenger(Passenger passenger) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	@Transactional(propagation = Propagation.MANDATORY, rollbackFor = Exception.class)
	public List<PassengerDTO> addMultiplePassengers(List<PassengerDTO> passengersList, Booking booking) {
		passengersList.stream().forEach((passenger) -> this.addPassenger(passenger, booking));
		return passengersList;
	}
}
