package com.reservation.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import javax.persistence.Column;
import javax.validation.constraints.Future;
import javax.validation.constraints.Max;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PastOrPresent;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Data;

@Data
public class BookingDTO {

	@JsonProperty(access = Access.READ_ONLY)
	private Long bookingId;

	@NotNull(message = "User ID must be supplied!")
	private Long userId;
	
	@NotNull(message = "Train ID must be supplied!")
	private Long trainId;

	@NotNull(message = "Booking Date must be supplied!")
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@PastOrPresent(message = "Booking date must be today's date!")
	private LocalDate bookingDate;

	@NotNull(message = "Departure Date  must be supplied!")
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@Future(message = "Departure date must be a future date!")
	private LocalDate departureDate;
	
	@NotNull(message = "Departure Time must be supplied!")
	@DateTimeFormat(pattern = "hh:mm")
	@NotNull(message = "Arrival Time must be supplied!")
	private LocalTime departureTime;

	@NotNull(message = "Arrival Date must be supplied!")
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@Future(message = "Arrival date must be a future date!")
	private LocalDate arrivalDate;

	@NotNull(message = "Arrival Time must be supplied!")
	@DateTimeFormat(pattern = "hh:mm")
	private LocalTime arrivalTime;

	@NotBlank(message = "Boarding Station must be supplied!")
	private String journeyFrom;

	@NotBlank(message = "Alighting Station must be supplied!")
	private String journeyTo;

	@NotNull(message = "Journey Station must be supplied!")
	private int journeyDistance;

	@NotNull(message = "Total Amount must be supplied!")
	private double totalAmount;

	@NotNull(message = "Total Passengers must be supplied!")
	private int totalPassengers;
	

	private String bookingStatus;
	
	@NotBlank(message = "Coach must be supplied!")
	@Max(value = 3, message = "Coach Length - Out of Range!")
	private String coach;
	
	@JsonProperty(access = Access.READ_ONLY)
	private String trainName;
}
