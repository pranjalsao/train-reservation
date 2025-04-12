package com.reservation.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class StationDTO {

	@NotBlank(message = "Station ID must be supplied!")	
	@Length(max = 5, message = "Station Id Length - Out of Range!")
	private String stationId;

	@NotBlank(message = "Station Name must be supplied!")
	@Length(max = 30, message = "Station Name Length - Out of Range!")
	private String stationName;
	
	@NotNull(message="Distance must be supplied!")
	private double distance;

}
