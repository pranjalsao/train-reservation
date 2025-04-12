package com.reservation.service;


import java.util.List;

import com.reservation.entity.Booking;
import com.reservation.entity.Passenger;

public interface IPdfService  {

	public List<Passenger> listBooking(long id);
	Booking getBooking(long id);
}
