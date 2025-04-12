package com.reservation.dto;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import com.reservation.entity.Route;
import com.reservation.entity.Train;
import com.reservation.entity.TrainStatus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SearchTrainResponseDTO {
	
	private Train trainFound;
	
	private List<TrainStatus> trainStatus;
	
	private Route route1;
	
	private Route route2;
	
	private int distance;
	
	private int duration;
	
	private LocalDate arrivalDate;
	private LocalTime arrivalTime;
	
	private List<FareDTO> fares;
}
