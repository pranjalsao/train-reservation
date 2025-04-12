package com.reservation.service;


import java.util.List;

import com.reservation.dto.SearchTrainDTO;
import com.reservation.dto.SearchTrainResponseDTO;
import com.reservation.entity.Route;
import com.reservation.entity.Train;
import com.reservation.dto.CompleteTrainDetailsDTO;
import com.reservation.dto.SearchTrainDTO;
import com.reservation.dto.SearchTrainResponseDTO;


public interface ITrainService {

	SearchTrainResponseDTO searchTrain(SearchTrainDTO searchDetails);
	

//	Train getTrainDetails(long trainNo);
	
	List<Route>	 showRouteByTrainNo(long trainno);

	CompleteTrainDetailsDTO getTrainDetails(long trainNo);

}
