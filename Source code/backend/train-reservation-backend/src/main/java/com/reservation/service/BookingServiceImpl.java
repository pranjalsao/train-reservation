package com.reservation.service;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.reservation.dao.IBookingRepository;
import com.reservation.dao.ICoachRepository;
import com.reservation.dao.IStationRepository;
import com.reservation.dao.ITrainRepository;
import com.reservation.dao.IUserRepository;
import com.reservation.dto.BookingDTO;
import com.reservation.dto.PassengerDTO;
import com.reservation.dto.PaymentDTO;
import com.reservation.entity.Booking;
import com.reservation.entity.Coach;
import com.reservation.entity.Passenger;
import com.reservation.entity.Station;
import com.reservation.entity.Train;
import com.reservation.entity.User;
import com.reservation.entity.enums.BookingStatusEnum;
import com.reservation.exception_handler.ResourceNotFoundException;

@Service
@Transactional
public class BookingServiceImpl implements IBookingService {

	@Autowired
	private ITrainRepository trainRepo;
	@Autowired
	private IUserRepository userRepo;
	@Autowired
	private IBookingRepository bookingRepo;
	@Autowired
	private IStationRepository stationRepo;
	@Autowired
	private ICoachRepository coachRepo;
	@Autowired
	private IPassengerService passengerService;
	@Autowired
	private ModelMapper mapper;
	
	@Override
	public Booking getBookingDetailsById(long bookingId) {
		return bookingRepo.findById(bookingId)
				.orElseThrow(() -> new ResourceNotFoundException("Invaild Booking ID!"));
	}
	
	

	@Override
	public List<Booking> getAllBookingsByUserId(long userId) {
		userRepo.findById(userId)
			.orElseThrow(() -> new ResourceNotFoundException("Invaild User ID!"));			
		return bookingRepo.findByUserUserIdOrderByBookingDateDesc(userId);
	}
	
	@Override
	public List<Booking> getAllBookings() {
		return bookingRepo.findAll();
	}

	@Override
	@Transactional(propagation = Propagation.MANDATORY, rollbackFor = Exception.class)
	public Booking createBooking(BookingDTO booking) {
		Booking transientBooking = mapper.map(booking, Booking.class);
		User user = userRepo.findById(booking.getUserId())
							.orElseThrow(() -> new ResourceNotFoundException("Invaild User ID!"));
		Train train = trainRepo.findById(booking.getTrainId())
							   .orElseThrow(() -> new ResourceNotFoundException("Invaild Train No.!"));
		Station journeyFrom = stationRepo.findById(booking.getJourneyFrom())
										 .orElseThrow(() -> new ResourceNotFoundException("Invalid Boarding Station ID!"));
		Station journeyTo = stationRepo.findById(booking.getJourneyTo())
									   .orElseThrow(() -> new ResourceNotFoundException("Invalid Alighting Station ID!"));
		Coach coach = coachRepo.findById(booking.getCoach())
						.orElseThrow(() -> new ResourceNotFoundException("Invalid Coach ID!"));
		transientBooking.setUser(user);
		transientBooking.setTrain(train);
		transientBooking.setJourneyFrom(journeyFrom);
		transientBooking.setJourneyTo(journeyTo);
		transientBooking.setCoach(coach);
		transientBooking.setBookingStatus(BookingStatusEnum.ACTIVE);

		Booking persistentBooking = bookingRepo.save(transientBooking); 
		return persistentBooking;
	}



	@Override
	public PaymentDTO getCompleteBookingDetailsById(long bookingId) {
		Booking booking = bookingRepo.findById(bookingId)
			.orElseThrow(() -> new ResourceNotFoundException("Invaild Booking ID!"));
		List<Passenger> passengersList = passengerService.getAllPassengersByBookingId(bookingId);
		BookingDTO bookingDto = mapper.map(booking, BookingDTO.class);
		bookingDto.setUserId(booking.getUser().getUserId());
		bookingDto.setTrainId(booking.getTrain().getTrainNo());
		bookingDto.setTrainName(booking.getTrain().getTrainName());
		bookingDto.setJourneyFrom(booking.getJourneyFrom().getStationName());
		bookingDto.setJourneyTo(booking.getJourneyTo().getStationName());
		bookingDto.setCoach(booking.getCoach().getCoachId());
		List<PassengerDTO> passengersDto = new ArrayList<PassengerDTO>();
		passengersList.stream().forEach((passenger) -> {
			passengersDto.add(mapper.map(passenger, PassengerDTO.class));
		});
		return new PaymentDTO(passengersDto, bookingDto);
	}
	
	
	
}
