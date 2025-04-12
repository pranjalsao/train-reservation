package com.reservation.dto;


import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class TrainScheduleDTO {
	

	@NotNull(message="Train no must be supplied!")
	private long trainNo;
	
	@NotBlank(message="Day must be supplied!")
	private String day;
	
	@NotBlank(message="Train type ID must be supplied!")
	private String trainType;
	
}
