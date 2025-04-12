package com.reservation.service;

import java.util.List;

import com.reservation.dto.ApiResponse;
import com.reservation.dto.RouteDTO;
import com.reservation.dto.SeatCountDTO;
import com.reservation.dto.StationDTO;
import com.reservation.dto.TrainDTO;
import com.reservation.dto.TrainScheduleDTO;
import com.reservation.dto.TrainTypeDTO;
import com.reservation.entity.Coach;
import com.reservation.entity.SeatCount;
import com.reservation.entity.Station;
import com.reservation.entity.Train;
import com.reservation.entity.TrainSchedule;
import com.reservation.entity.TrainType;
import com.reservation.entity.User;

public interface IAdminService {

	List<User> getAllUsers();
	ApiResponse insertTrainType(TrainTypeDTO traintype);
	ApiResponse addStation(StationDTO station);
	ApiResponse addTrain(TrainDTO train);
	ApiResponse newTrainSchedule(TrainScheduleDTO schedule);
	List<Train> showAllTrains();
	ApiResponse updateTrainDetails(TrainDTO train);
	ApiResponse addNewRoute(RouteDTO route);
	List<Station> showAllStations();
	ApiResponse addNewCoach(Coach coach);
	ApiResponse updateCoachType(Coach coach);
	String deleteRouteForTrain(long trainno,String stationid);
	ApiResponse insertSeatNumbers(SeatCountDTO seatcount);
	ApiResponse updateFare(String coachid,double fare);
	ApiResponse updateSpecialChargesForTrain(String traintypeid,double charges);
	String deleteCoachofTrain(String traintypeid,String coachid);
	List<SeatCount> showAllSeatNo();
	ApiResponse updateNoOfSeats(SeatCountDTO count);
	List<Coach> showAllCoach();
	List<TrainType> showTrainType();
	ApiResponse removeSchedule(TrainScheduleDTO schedule);
	List<TrainSchedule> scheduleList();
}
