package com.reservation.dto;

import java.util.List;

import com.reservation.entity.Booking;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CancellationResponseDTO {
	
	private List<PassengerDTO> passengersDetails;
	
	private BookingDTO bookingDetails;
	
}
