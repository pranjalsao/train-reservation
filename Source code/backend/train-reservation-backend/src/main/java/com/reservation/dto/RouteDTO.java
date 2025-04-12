package com.reservation.dto;

import java.time.LocalTime;
import javax.validation.constraints.NotNull;
import org.springframework.format.annotation.DateTimeFormat;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class RouteDTO {

	@NotNull(message="Train no. must be supplied!")
	private long trainNo;
	
	@NotNull(message="Station Id must be supplied!")
	private String stationId;
	
	
	@DateTimeFormat(pattern="hh:mm")
	@NotNull(message="Time Duartion must be supplied!")
	private int timeDuration;
}
