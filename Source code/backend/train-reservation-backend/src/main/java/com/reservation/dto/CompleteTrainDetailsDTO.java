package com.reservation.dto;

import java.time.DayOfWeek;
import java.util.List;

import com.reservation.entity.Route;
import com.reservation.entity.Train;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CompleteTrainDetailsDTO {

	private Train train;
	
	private List<Route> routes;
	
	private List<DayOfWeek> schedule; 
}
