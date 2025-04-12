package com.reservation.dto;

import java.time.LocalDate;

import javax.validation.constraints.Future;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.Data;

@Data
public class SearchTrainDTO {
	
	@NotBlank(message = "Boarding Station must be supplied!")
	private String journeyFrom;

	@NotBlank(message = "Alighting Station must be supplied!")
	private String journeyTo;

	@NotNull(message = "Departure Date must be supplied!")
	@Future
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate departureDate;
	
//	@NotBlank(message = "Train Type must be supplied!")
//	private String trainTypeId;
//	
//	@NotBlank(message = "Train Type must be supplied!")
//	private String coachId;
}
	