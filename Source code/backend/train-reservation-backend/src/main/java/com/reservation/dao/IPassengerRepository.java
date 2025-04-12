package com.reservation.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.reservation.dto.PassengerDTO;
import com.reservation.entity.Passenger;

public interface IPassengerRepository extends JpaRepository<Passenger, Long> {

	List<Passenger> findByBookingBookingId(long bookingId);
	
	
}
