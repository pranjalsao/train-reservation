package com.reservation.service;

import java.util.List;

import com.reservation.dto.PassengerDTO;
import com.reservation.entity.Booking;
import com.reservation.entity.Passenger;

public interface IPassengerService {

	List<Passenger> getAllPassengersByBookingId(long bookingId);

	PassengerDTO addPassenger(PassengerDTO passenger, Booking booking);

	String addPassenger(Passenger passenger);

	List<PassengerDTO> addMultiplePassengers(List<PassengerDTO> passengersList, Booking booking);
}
