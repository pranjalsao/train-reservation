package com.reservation.controller;

import java.util.List;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.reservation.dto.ApiResponse;
import com.reservation.dto.ChangePasswordDTO;
import com.reservation.dto.RouteDTO;
import com.reservation.dto.SeatCountDTO;
import com.reservation.dto.StationDTO;
import com.reservation.dto.TrainDTO;
import com.reservation.dto.TrainScheduleDTO;
import com.reservation.dto.TrainTypeDTO;
import com.reservation.dto.UserRegResponse;
import com.reservation.dto.UserUpdateDTO;
import com.reservation.entity.Coach;
import com.reservation.entity.SeatCount;
import com.reservation.entity.Train;
import com.reservation.entity.TrainSchedule;
import com.reservation.entity.TrainType;
import com.reservation.entity.User;
import com.reservation.service.IAdminService;
import com.reservation.service.IBookingService;
import com.reservation.service.IUserService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/admin")
@Validated
@Slf4j
@CrossOrigin(origins="*")
public class AdminController {

	@Autowired
	private IAdminService adminservice;
	@Autowired
	private IBookingService bookingService;
	
	@Autowired
	private IUserService userService;

	
	@GetMapping("/usersdetails")
	public List<User> fetchAllUsersDetails() {
		return adminservice.getAllUsers();
	}

	@PostMapping("/add-train-type")
	public ResponseEntity<?> addNewTrainType(@RequestBody @Valid TrainTypeDTO traintype) {
		try {
			return ResponseEntity.status(HttpStatus.CREATED).body(adminservice.insertTrainType(traintype));
		} catch (RuntimeException e) {
			System.out.println("in add new wallet err " + e);
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(e.getMessage()));
		}
	}

	@PostMapping("/add-station")
	public ResponseEntity<?> addNewStation(@RequestBody @Valid StationDTO station) {
		try {
			return ResponseEntity.status(HttpStatus.CREATED).body(adminservice.addStation(station));
		} catch (RuntimeException e) {
			System.out.println("Error occurred while adding station | " + e);
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(e.getMessage()));
		}
	}

	@PostMapping("/add-coach-type")
	public ResponseEntity<?> addNewCoach(@RequestBody @Valid Coach coach) {
		try {
			return ResponseEntity.status(HttpStatus.CREATED).body(adminservice.addNewCoach(coach));
		} catch (RuntimeException e) {
			log.info("Error occurred while adding coach | " + e);
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(e.getMessage()));
		}
	}

	@PutMapping("/update-coach-type")
	public ResponseEntity<?> updateCoachType(@RequestBody @Valid Coach coach) {
		try {
			return ResponseEntity.status(HttpStatus.ACCEPTED).body(adminservice.updateCoachType(coach));
		} catch (RuntimeException e) {
			log.info("Error occurred while adding coach | " + e);
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(e.getMessage()));
		}		
	}

	@PostMapping("/add-train")
	public ResponseEntity<?> addNewTrain(@RequestBody @Valid TrainDTO train) {
		try {
			return ResponseEntity.status(HttpStatus.CREATED).body(adminservice.addTrain(train));
		} catch (RuntimeException e) {
			System.out.println("Error occurred while adding train | " + e);
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(e.getMessage()));
		}
	}

	@PostMapping("/scheduletrain")
	public ResponseEntity<?> scheduleTrain(@RequestBody @Valid TrainScheduleDTO schedule) {

		try {
			return ResponseEntity.status(HttpStatus.CREATED).body(adminservice.newTrainSchedule(schedule));
		} catch (RuntimeException e) {
			System.out.println("Error occurred while scheduling train | " + e);
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(e.getMessage()));
		}
	}

	@GetMapping("/show-all-trains")
	public List<Train> showTrains() {
		return adminservice.showAllTrains();
	}

	@PutMapping("/update-train-details")
	public ResponseEntity<?> updateTrain(@RequestBody @Valid TrainDTO train) {
		try {
			return ResponseEntity.status(HttpStatus.ACCEPTED).body(adminservice.updateTrainDetails(train));
		} catch (RuntimeException e) {
			System.out.println("Error occurred while updating train details | " + e);
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(e.getMessage()));
		}
	}

	@PostMapping("/add-route")
	public ResponseEntity<?> addRoute(@RequestBody @Valid RouteDTO route) {
		try {
			return ResponseEntity.status(HttpStatus.CREATED).body(adminservice.addNewRoute(route));
		} catch (RuntimeException e) {
			System.out.println("in add new schedule err " + e);
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(e.getMessage()));
		}
	}

	@DeleteMapping("/delete-route")
	public String deleteRoute(@RequestParam long trainno, @RequestParam String stationid) {
		return adminservice.deleteRouteForTrain(trainno, stationid);
	}
	
	@GetMapping("/all-bookings")
	public ResponseEntity<?> showAllBookings() {
		log.info("In Show All Bookings...");
		return ResponseEntity.ok().body(bookingService.getAllBookings());
	}

	@GetMapping("/all-bookings-by-user/{userId}")
	public ResponseEntity<?> showAllBookingsByUserId(@PathVariable @Valid @NotNull Long userId) {
		log.info("In Show All Booking By User Id : " + userId);
		return ResponseEntity.ok().body(bookingService.getAllBookingsByUserId(userId));
	}

	@GetMapping("/booking/{bookingId}")
	public ResponseEntity<?> showBookingByBookingId(@PathVariable @Valid @NotNull Long bookingId) {
		log.info("In Show All Booking By User Id : " + bookingId);
		return ResponseEntity.ok().body(bookingService.getBookingDetailsById(bookingId));
	}
	
	

	@PostMapping("/add-seat-count")
	public ResponseEntity<?> insertCoach(@RequestBody @Valid SeatCountDTO seatcount) {
		try {
			return ResponseEntity.status(HttpStatus.CREATED).body(adminservice.insertSeatNumbers(seatcount));
		} catch (RuntimeException e) {
			System.out.println("in add new coach count err " + e);
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(e.getMessage()));
		}
	}
	
	@PutMapping("/update-seat-count")
	public ResponseEntity<?> updateSeatCounts(@RequestBody @Valid SeatCountDTO count) {
		try {
			return ResponseEntity.status(HttpStatus.OK).body(adminservice.updateNoOfSeats(count));
		} catch (RuntimeException e) {
			System.out.println("in add new coach count err " + e);
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(e.getMessage()));
		}
	}
	
	@GetMapping("/show-seat-count")
	public List<SeatCount> showSeatCount() {
		return adminservice.showAllSeatNo();
	}
	
	@PutMapping("/update-fare-per-km")
	public ResponseEntity<?> updateFareperKm(@RequestBody @Valid Coach coach) {
		try {
			String coachid=coach.getCoachId();
			double fare=coach.getFarePerKm();
			return ResponseEntity.status(HttpStatus.OK).body(adminservice.updateFare(coachid, fare));
		} catch (RuntimeException e) {
			System.out.println("in add new coach count err " + e);
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(e.getMessage()));
		}
	}

	@DeleteMapping("/delete-coach")
	public String deleteCoach(@RequestParam String traintypeid, @RequestParam String coachid) {
		return adminservice.deleteCoachofTrain(traintypeid, coachid);
	}

	
	@PutMapping("/update-special-charges")
	public ResponseEntity<?> updateSpecialCharges(@RequestBody @Valid TrainTypeDTO traintype) {
		try {
			String traintypeid =traintype.getTrainTypeId();
			double charges=traintype.getSpecialCharges();
			return ResponseEntity.status(HttpStatus.OK)
					.body(adminservice.updateSpecialChargesForTrain(traintypeid, charges));
		} catch (RuntimeException e) {
			System.out.println("in add new coach count err " + e);
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(e.getMessage()));
		}
	}
	

	@GetMapping("/show-coaches")
	public List<Coach> showCoaches(){
		return adminservice.showAllCoach();
	}
	
	@GetMapping("/show-train-type")
	public List<TrainType> showType(){
		return adminservice.showTrainType();
	}
	
	@GetMapping("/all-stations")
	public ResponseEntity<?> showAllStations() {
		log.info("In Show All Stations...");
		return ResponseEntity.ok().body(adminservice.showAllStations());

	}
	
	@GetMapping("/get-details/{userId}")
	public ResponseEntity<?> getDetailsById(@PathVariable Long userId) {
		return ResponseEntity.ok().body(userService.getUserDetailsById(userId));
	}
	
	@PutMapping("/change-password/{userId}") 
	public ResponseEntity<?> changeUserPassword(@PathVariable @Valid @NotNull Long userId,@RequestBody ChangePasswordDTO changePasswordDto) {
		log.info("In change password of User ID: "+userId);
		return ResponseEntity.ok().body(userService.changeUserPassword(userId, changePasswordDto));
	}
	
	@PutMapping("/update")
	public UserRegResponse updateUserDetails(@RequestBody @Valid UserUpdateDTO user) {
		log.info("For update user ID : "+user.getUserId());
		return userService.updateUserDetails(user);
	}
	
	@PostMapping("/delete-schedule")
	public ResponseEntity<?> deleteSchedule(@RequestBody @Valid TrainScheduleDTO schedule){
		try {
			return ResponseEntity.status(HttpStatus.OK)
					.body(adminservice.removeSchedule(schedule));
		} catch (RuntimeException e) {
			System.out.println("in delete schedule err " + e);
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(e.getMessage()));
		}
	}
	
	@GetMapping("/get-schedule")
	public List<TrainSchedule> getSchedule(){
		return adminservice.scheduleList();
	}
	
	
}
