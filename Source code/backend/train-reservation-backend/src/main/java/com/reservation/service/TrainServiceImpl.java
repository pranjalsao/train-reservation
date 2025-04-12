package com.reservation.service;

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.reservation.dao.IRouteRepository;
import com.reservation.dao.IStationRepository;
import com.reservation.dao.ITrainRepository;
import com.reservation.dao.ITrainScheduleRepository;
import com.reservation.dao.ITrainStatusRepository;
import com.reservation.dto.CompleteTrainDetailsDTO;
import com.reservation.dto.FareDTO;
import com.reservation.dto.SearchTrainDTO;
import com.reservation.dto.SearchTrainResponseDTO;
import com.reservation.entity.Coach;
import com.reservation.entity.Route;
import com.reservation.entity.Station;
import com.reservation.entity.Train;
import com.reservation.entity.TrainSchedule;
import com.reservation.entity.TrainStatus;
import com.reservation.entity.TrainType;
import com.reservation.exception_handler.ResourceNotFoundException;

@Service
@Transactional
public class TrainServiceImpl implements ITrainService {

	@Autowired
	private IStationRepository stationRepo;
	@Autowired
	private IRouteRepository routeRepo;
	@Autowired
	private ITrainStatusRepository trainStatusRepo;
	@Autowired
	private ITrainRepository trainRepo;
	@Autowired
	private ITrainScheduleRepository trainScheduleRepo;

	@Override
	public SearchTrainResponseDTO searchTrain(SearchTrainDTO searchDetails) {
		Station journeyFrom = stationRepo.findById(searchDetails.getJourneyFrom())
				.orElseThrow(() -> new ResourceNotFoundException("Invaild Boarding Station ID!"));
		Station journeyTo = stationRepo.findById(searchDetails.getJourneyTo())
				.orElseThrow(() -> new ResourceNotFoundException("Invaild Alighting Station ID!"));
		if(journeyFrom.equals(journeyTo)) {
			throw new ResourceNotFoundException("Source and Destination must be different!");			
		}
		List<Route> startOfRoute = routeRepo.findByIdStation(journeyFrom);
		List<Route> endOfRoute = routeRepo.findByIdStation(journeyTo);
		if (startOfRoute.size() == 0 || endOfRoute.size() == 0) {
			throw new ResourceNotFoundException("No train available on the specified route!");
		}
		for (Route route1 : startOfRoute) {
			for (Route route2 : endOfRoute) {
				if (route1.getId().getTrain().equals(route2.getId().getTrain()) && route2.getHours() > route1.getHours()) {
					Train trainFound = route1.getId().getTrain();
					List<TrainStatus> trainStatus = trainStatusRepo.findByTrainTrainNoAndDate(trainFound.getTrainNo(),
							searchDetails.getDepartureDate());
					if (trainStatus.size() == 0) {
						throw new ResourceNotFoundException("No train available on the specified date!");
					}
					int totalDuration = Math.abs(route2.getHours() - route1.getHours());
					LocalDateTime arrivalDateTime = searchDetails.getDepartureDate()
							.atTime(trainFound.getSourceDepartureTime())
							.plusHours(totalDuration);
					int totalDistance = Math.abs(route2.getDistanceFromSource() - route1.getDistanceFromSource());
					List<FareDTO> fares = new ArrayList<>();
					for (TrainStatus status : trainStatus) {
						fares.add(fareCalculation(status.getCoach(), trainFound.getTrainType(), totalDistance));
					}
					return new SearchTrainResponseDTO(trainFound, trainStatus, route1, route2, totalDistance,
							totalDuration, arrivalDateTime.toLocalDate(), arrivalDateTime.toLocalTime(), fares);
				}
			}
		}
		throw new ResourceNotFoundException("No train available between the specified stations!");
	}

	private FareDTO fareCalculation(Coach coach, TrainType trainType, int totalDistance) {
		double totalFare = coach.getFarePerKm() * totalDistance + trainType.getSpecialCharges();
		return new FareDTO(coach.getCoachId(), totalFare);
	}

	@Override
	public CompleteTrainDetailsDTO getTrainDetails(long trainNo) {
		Train train = trainRepo.findById(trainNo).orElseThrow(() -> new ResourceNotFoundException("Invalid Train No!"));
		List<Route> routes = routeRepo.findByIdTrainOrderByHours(train);
		List<TrainSchedule> schedule = trainScheduleRepo.findByIdTrain(train);
		List<DayOfWeek> runningOn = schedule.stream().map((sch) -> sch.getId().getWeekDay())
				.collect(Collectors.toList());
		return new CompleteTrainDetailsDTO(train, routes, runningOn);
	}

	@Override
	public List<Route> showRouteByTrainNo(long trainno) {
		trainRepo.findById(trainno).orElseThrow(() -> new ResourceNotFoundException("Invalid Train No!"));
		List<Route> route = routeRepo.findByTrainNo(trainno);
		return route;
	}

}
