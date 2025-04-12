package com.reservation.service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;

import com.reservation.dao.ICoachRepository;
import com.reservation.dao.IRouteRepository;
import com.reservation.dao.ISeatCountRepository;
import com.reservation.dao.IStationRepository;
import com.reservation.dao.ITrainRepository;
import com.reservation.dao.ITrainScheduleRepository;
import com.reservation.dao.ITrainStatusRepository;
import com.reservation.dao.ITrainTypeRepository;
import com.reservation.dao.IUserRepository;
import com.reservation.dto.ApiResponse;
import com.reservation.dto.RouteDTO;
import com.reservation.dto.SeatCountDTO;
import com.reservation.dto.StationDTO;
import com.reservation.dto.TrainDTO;
import com.reservation.dto.TrainScheduleDTO;
import com.reservation.dto.TrainTypeDTO;
import com.reservation.entity.Coach;
import com.reservation.entity.Route;
import com.reservation.entity.RouteId;
import com.reservation.entity.SeatCount;
import com.reservation.entity.SeatCountId;
import com.reservation.entity.Station;
import com.reservation.entity.Train;
import com.reservation.entity.TrainSchedule;
import com.reservation.entity.TrainScheduleId;
import com.reservation.entity.TrainStatus;
import com.reservation.entity.TrainType;
import com.reservation.entity.User;
import com.reservation.exception_handler.ResourceNotFoundException;

@Service
@Transactional
public class AdminServiceImpl implements IAdminService {

	@Autowired
	private IUserRepository userRepo;

	@Autowired
	private ITrainTypeRepository typeRepo;

	@Autowired
	private ModelMapper mapper;

	@Autowired
	private IStationRepository stationRepo;

	@Autowired
	private ITrainRepository trainRepo;

	@Autowired
	private ITrainScheduleRepository scheduleRepo;

	@Autowired
	private IRouteRepository routeRepo;

	@Autowired
	private ICoachRepository coachRepo;

	@Autowired
	private ISeatCountRepository countRepo;

	@Autowired
	private ITrainStatusRepository statusRepo;

	@Override
	public List<User> getAllUsers() {

		return userRepo.findAll();
	}

	@Override
	public ApiResponse insertTrainType(TrainTypeDTO traintype) {
		TrainType type = mapper.map(traintype, TrainType.class);
		if (typeRepo.existsById(type.getTrainTypeId())) {
			throw new ResourceNotFoundException("Duplicate Entry, Train Type already exist!");
		}
		typeRepo.save(type);

		return new ApiResponse("New Train type ID " + type.getTrainTypeId() + " added successfully!!");
	}

	@Override
	public ApiResponse addStation(StationDTO station) {
		Station stationentity = mapper.map(station, Station.class);
		if (stationRepo.existsById(stationentity.getStationId())) {
			throw new ResourceNotFoundException("Duplicate Entry, Station already exist!");
		}
		stationRepo.save(stationentity);

		return new ApiResponse("New Station ID : " + stationentity.getStationId() + " added successfully!!");
	}

	@Override
	public List<Station> showAllStations() {
		return stationRepo.findAll();
	}

	@Override
	public ApiResponse addTrain(TrainDTO train) {
		TrainType traintype = typeRepo.findById(train.getTrainTypeId())
				.orElseThrow(() -> new ResourceNotFoundException("Invaild Train type ID!"));

		Station source = stationRepo.findById(train.getSourceId())
				.orElseThrow(() -> new ResourceNotFoundException("Invaild Source Station ID!"));

		Station destination = stationRepo.findById(train.getDestinationId())
				.orElseThrow(() -> new ResourceNotFoundException("Invaild Destination Station ID!"));

		Train trainentity = mapper.map(train, Train.class);
		trainentity.setDestination(destination);
		trainentity.setSource(source);
		trainentity.setTrainType(traintype);
		trainRepo.save(trainentity);

		return new ApiResponse("Train no : " + trainentity.getTrainNo() + " successfully added!!");
	}

	@Override
	public ApiResponse newTrainSchedule(TrainScheduleDTO schedule) {
		Train train = trainRepo.findById(schedule.getTrainNo())
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Train No!!!"));
		DayOfWeek day = DayOfWeek.valueOf(schedule.getDay());
		TrainType type = typeRepo.findById(schedule.getTrainType())
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Train Type!!!"));
		int scheduleday = day.ordinal();
		LocalDate curDate = LocalDate.now();
		int curDay = curDate.getDayOfWeek().ordinal();
		int diff = scheduleday - curDay;
		if (diff < 0)
			diff += 7;
		LocalDate scheduleDate = curDate.plusDays(diff);
		TrainSchedule trainschedule = mapper.map(schedule, TrainSchedule.class);
		trainschedule.setId(new TrainScheduleId(train, day, type));
		trainschedule.setScheduleDate(scheduleDate);
		scheduleRepo.saveAndFlush(trainschedule);

		List<SeatCount> seatcountlist = countRepo.findByTrainType(type);
		for (SeatCount count : seatcountlist) {
			statusRepo.save(new TrainStatus(train, count.getId().getCoach(), 0, count.getTotalSeats(), 0, scheduleDate,
					day, count.getTotalSeats(), 0));
		}

		return new ApiResponse("New schedule of train No : " + train.getTrainNo() + " inserted!!");

	}

	@Override
	public List<Train> showAllTrains() {
		return trainRepo.findAll();
	}

	@Override
	public ApiResponse updateTrainDetails(TrainDTO train) {
		TrainType traintype = typeRepo.findById(train.getTrainTypeId())
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Train Type!"));

		Station source = stationRepo.findById(train.getSourceId())
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Source Station!"));

		Station destination = stationRepo.findById(train.getDestinationId())
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Destination Station!"));

		Train trainentity = mapper.map(train, Train.class);
		trainentity.setDestination(destination);
		trainentity.setSource(source);
		trainentity.setTrainType(traintype);
		trainRepo.save(trainentity);

		return new ApiResponse("Train No: " + trainentity.getTrainNo() + " details updated successfully.");
	}

	@Override
	public ApiResponse addNewRoute(RouteDTO route) {

		String stationId = route.getStationId();
		Station station = stationRepo.findBystationId(stationId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid station ID!!!"));
		Train train = trainRepo.findById(route.getTrainNo())
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Train No!!!"));
		Route routeEntity = mapper.map(route, Route.class);
		routeEntity.setDistanceFromSource(Math.abs(train.getSource().getDistance() - station.getDistance()));
		routeEntity.setId(new RouteId(train, station));
		if (routeRepo.existsById(routeEntity.getId())) {
			return new ApiResponse("This station is already a part of Train No. " + route.getTrainNo() + " route!");
		}
		routeEntity.setHours(route.getTimeDuration());
		routeRepo.save(routeEntity);

		return new ApiResponse("New Route Inserted for train no: " + route.getTrainNo());

	}

	@Override
	public ApiResponse addNewCoach(Coach coach) {
		if (coachRepo.existsById(coach.getCoachId())) {
			throw new ResourceNotFoundException("Duplicate Entry, Coach already exist!");
		}
		coachRepo.save(coach);
		return new ApiResponse("New Coach Added With ID: " + coach.getCoachId());
	}

	@Override
	public ApiResponse updateCoachType(Coach coach) {
		Coach persistentCoach = coachRepo.findById(coach.getCoachId())
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Coach ID!"));
		persistentCoach.setFarePerKm(coach.getFarePerKm());
		return new ApiResponse("Coach Details Updated with new Fare/Km: " + persistentCoach.getFarePerKm());
	}

	@Override
	public String deleteRouteForTrain(long trainNo, String stationid) {
		String mesg = "No such route exists!!";
		Train train = trainRepo.findById(trainNo)
				.orElseThrow(() -> new ResourceNotFoundException("Invaild Train No!!!"));
		Station station = stationRepo.findById(stationid)
				.orElseThrow(() -> new ResourceNotFoundException("Invaild Station ID!!!"));

		if (routeRepo.existsById(new RouteId(train, station))) {
			routeRepo.deleteByTrainNoAndStationId(trainNo, stationid);
			mesg = "Selected Route of Train No :" + trainNo + " deleted successfully!!";
		}

		return mesg;
	}

	@PostMapping
	public ApiResponse insertSeatNumbers(SeatCountDTO seatcount) {
		Coach coach = coachRepo.findById(seatcount.getCoachId())
				.orElseThrow(() -> new ResourceNotFoundException("Invaild Coach Id!!!"));
		TrainType type = typeRepo.findById(seatcount.getTrainTypeId())
				.orElseThrow(() -> new ResourceNotFoundException("Invaild Train Type Id!!!"));
		SeatCount seat = mapper.map(seatcount, SeatCount.class);
		seat.setId(new SeatCountId(type, coach));
		seat.setTotalSeats(seatcount.getSeatCount());
		countRepo.save(seat);

		return new ApiResponse("New Coach and No. of seats added for train type. Id " + seatcount.getTrainTypeId());

	}

	@Override
	public ApiResponse updateFare(String coachid, double fare) {
		String mesg = "Updation failed!!";
		if (coachRepo.updateFare(coachid, fare) > 0)
			mesg = "Fare of coach Id: " + coachid + " updated successfully!!";

		return new ApiResponse(mesg);
	}

	@Override
	public ApiResponse updateSpecialChargesForTrain(String traintypeid, double charges) {
		String mesg = "Updation failed!!";
		if (typeRepo.updateCharges(traintypeid, charges) > 0)
			mesg = "Charges of Train Type Id: " + traintypeid + " updated successfully!!";

		return new ApiResponse(mesg);
	}

	@Override
	public String deleteCoachofTrain(String traintypeid, String coachid) {

		if (countRepo.deleteCoach(traintypeid, coachid) == 0) {
			return "Deletion Failed!";
		}
		return "Coach " + coachid + " for train type " + traintypeid + " deleted successfully!";
	}

	@Override
	public List<SeatCount> showAllSeatNo() {
		return countRepo.findAll();
	}

	@Override
	public ApiResponse updateNoOfSeats(SeatCountDTO count) {
		String coachid = count.getCoachId();
		String traintypeid = count.getTrainTypeId();
		int seatCount = count.getSeatCount();
		countRepo.updateSeatCount(traintypeid, coachid, seatCount);

		return new ApiResponse("Seat count updated for train type id: " + traintypeid);
	}

	@Override
	public List<Coach> showAllCoach() {
		return coachRepo.findAll();
	}

	@Override
	public List<TrainType> showTrainType() {
		return typeRepo.findAll();
	}

	@Scheduled(cron = "0 15 10 ? * MON")
	public void updateTrainSchedule() {
		List<TrainStatus> statuslist = statusRepo.findAll();
		for (TrainStatus status : statuslist) {
			LocalDate actualdate = status.getDate();
			LocalDate scheduleDate = actualdate.plusDays(7);
			Train train = status.getTrain();
			TrainType type = train.getTrainType();
			List<SeatCount> countList = countRepo.findByTrainType(type);
			List<TrainStatus> dateList = statusRepo.findByDateAndTrain(scheduleDate, train);
			if (dateList.size() == 0) {
				for (SeatCount count : countList) {
					statusRepo.save(new TrainStatus(train, count.getId().getCoach(), 0, count.getTotalSeats(), 0, scheduleDate,
							status.getDay(), count.getTotalSeats(), 0));
				}
			}
		}
	}

	@Override
	public ApiResponse removeSchedule(TrainScheduleDTO schedule) {
		Train train=trainRepo.findById(schedule.getTrainNo()).orElseThrow(() -> new ResourceNotFoundException("Invaild Train No.!!!"));
		TrainType type=typeRepo.findById(schedule.getTrainType()).orElseThrow(() -> new ResourceNotFoundException("Invaild Train Type.!!!"));
		TrainSchedule trainSchedule = scheduleRepo.findById(new TrainScheduleId(train, 
		DayOfWeek.valueOf(schedule.getDay()), type)).
		orElseThrow(() -> new ResourceNotFoundException("Schedule Not Found!!!"));
		
		scheduleRepo.delete(trainSchedule);
		return new ApiResponse("Schedule removed successfully!!");
	}

	@Override
	public List<TrainSchedule> scheduleList() {
		return scheduleRepo.findAll();
	}
	
//	@Scheduled(fixedRate = 2000)
//	public void DoSomethingNonsense() {
//		System.out.println("running...");
//	}

}
