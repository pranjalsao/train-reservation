package com.reservation.dto;

import javax.validation.constraints.Max;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import com.reservation.entity.enums.GenderEnum;
import com.reservation.entity.enums.PassengerIdCardTypeEnum;
import com.reservation.entity.enums.PassengerStatusEnum;

import lombok.Data;

@Data
public class PassengerDTO {

	@JsonProperty(access = Access.READ_ONLY)
	private Long passengerId;
	
	private String passengerIdCardNumber;

	@NotNull(message = "Passenger ID Card Type must be supplied!")
	@Max(value = 10, message = "Passenger ID Card Type Length - Out of Range!")
	private PassengerIdCardTypeEnum passengerIdCardType;

	@NotBlank(message = "Passenger ID Card Type must be supplied!")
	@Max(value = 20, message = "Passenger Name Length - Out of Range!")
	private String passengerName;

	@NotNull(message = "Passenger Gender must be supplied!")
	@Max(value = 6, message = "Passenger Gender Length - Out of Range!")
	private GenderEnum passengerGender;

	@NotNull(message = "Passenger Age must be supplied!")
	private int passengerAge;
	
//	@NotNull(message = "Passenger Mobile must be supplied!")
//	private String passengerMobile;

	private Long bookingId;

	private String passengerSeat;

	private PassengerStatusEnum passengerStatus;
	
	@NotNull(message = "Passenger Fare must be supplied!")
	private double passengerFare;
}
