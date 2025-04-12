package com.reservation.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SeatCountDTO {

	@NotBlank(message = "Train type Id must be supplied!!")
	private String trainTypeId;
	
	@NotBlank(message = "Coach Id must be supplied!!")
	private String coachId;
	
	@NotNull(message="Seat Count must be supplied!!")
	private int seatCount;
}
