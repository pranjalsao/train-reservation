package com.reservation.service;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.reservation.dao.IBookingRepository;
import com.reservation.dao.IPassengerRepository;
import com.reservation.dao.ITrainStatusRepository;
import com.reservation.dao.IWalletRepository;
import com.reservation.dto.BookingDTO;
import com.reservation.dto.CancellationResponseDTO;
import com.reservation.dto.PassengerDTO;
import com.reservation.entity.Booking;
import com.reservation.entity.Passenger;
import com.reservation.entity.TrainStatus;
import com.reservation.entity.Wallet;
import com.reservation.entity.enums.BookingStatusEnum;
import com.reservation.entity.enums.PassengerStatusEnum;
import com.reservation.exception_handler.ResourceNotFoundException;

@Service
@Transactional
public class CancellationServiceImpl implements ICancellationService {

	@Autowired
	private IBookingRepository bookingRepo;
	@Autowired
	private IWalletRepository walletRepo;
	@Autowired
	private ITrainStatusRepository trainStatusRepo;
	@Autowired
	private IPassengerRepository passengerRepo;
	@Autowired
	private ModelMapper mapper;
	
	
	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public CancellationResponseDTO cancelTicket(Long bookingId) {
		Booking booking = bookingRepo.findById(bookingId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Booking ID!"));
		if(booking.getBookingStatus() == BookingStatusEnum.CANCELLED) {
			throw new ResourceNotFoundException("Ticket Already Cancelled!");			
		}
		Wallet wallet = walletRepo.findByUser(booking.getUser())
				.orElseThrow(() -> new ResourceNotFoundException("User Not Found!"));
		TrainStatus trainStatus = trainStatusRepo
				.findByTrainTrainNoAndDateAndCoachCoachId(booking.getTrain().getTrainNo(), 
														  booking.getDepartureDate(), 
										                  booking.getCoach().getCoachId())
				.orElseThrow(() -> new ResourceNotFoundException("Train Departed!"));
		booking.setBookingStatus(BookingStatusEnum.CANCELLED);
		wallet.setWalletAmount(wallet.getWalletAmount() + booking.getTotalAmount());
		List<Passenger> passengers = passengerRepo.findByBookingBookingId(bookingId);
		deallocateSeats(trainStatus, booking, passengers);
		
		List<PassengerDTO> passengerDtos = new ArrayList<>();
		passengers.stream().forEach((passenger) -> {
			PassengerDTO passengerDto = mapper.map(passenger, PassengerDTO.class);
			passengerDto.setBookingId(bookingId);
			passengerDtos.add(passengerDto);
		});
		BookingDTO bookingDto =  mapper.map(booking, BookingDTO.class);
		bookingDto.setUserId(booking.getUser().getUserId());
		bookingDto.setTrainId(booking.getTrain().getTrainNo());
		bookingDto.setJourneyFrom(booking.getJourneyFrom().getStationId());
		bookingDto.setJourneyTo(booking.getJourneyTo().getStationId());
		bookingDto.setCoach(booking.getCoach().getCoachId());
		return new CancellationResponseDTO(passengerDtos, bookingDto);
	}
	
	private synchronized void deallocateSeats(TrainStatus trainStatus, Booking booking, List<Passenger> passengers) {
		passengers.stream().forEach((passenger) -> {
			if(passenger.getPassengerStatus() == PassengerStatusEnum.WAITING) {
				trainStatus.setSeatsWaiting(trainStatus.getSeatsWaiting() - 1);
				passenger.setPassengerStatus(PassengerStatusEnum.CANCELLED);
			}
			if(passenger.getPassengerStatus() == PassengerStatusEnum.CONFIRMED) {
				trainStatus.setSeatsBooked(trainStatus.getSeatsBooked() - 1);
				trainStatus.setSeatsAvailable(trainStatus.getSeatsAvailable() + 1);
				passenger.setPassengerStatus(PassengerStatusEnum.CANCELLED);
			}
		});
		
	}

}
