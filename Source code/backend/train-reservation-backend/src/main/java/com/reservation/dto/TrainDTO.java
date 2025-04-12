package com.reservation.dto;

import java.time.LocalTime;
import javax.validation.constraints.NotBlank;
import org.hibernate.validator.constraints.Length;
import org.springframework.format.annotation.DateTimeFormat;
import com.reservation.entity.TrainType;
import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class TrainDTO {


	private Long trainNo;
	
	@NotBlank(message = "Train name must be supplied!")
	private String trainName;
	
	@NotNull
	@Length(max=5,message="Train Type Id must contain less than 5 characters!")
	private String trainTypeId;
	
	@NotNull
	@Length(max=5,message="Source Id must contain less than 5 characters!")
	private String sourceId;
	
	@NotNull
	@Length(max=5,message="Destination Id must contain less than 5 characters!")
	private String destinationId;
	
	@DateTimeFormat(pattern="hh:mm")
	private LocalTime sourceDepartureTime;
	
	@DateTimeFormat(pattern="hh:mm")
	private LocalTime destinationArrivalTime;
	
}
