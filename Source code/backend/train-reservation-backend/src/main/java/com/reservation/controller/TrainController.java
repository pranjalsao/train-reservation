package com.reservation.controller;

import java.util.List;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.reservation.dto.SearchTrainDTO;
import com.reservation.entity.Route;
import com.reservation.service.IAdminService;
import com.reservation.service.ITrainService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping
@Slf4j
@Validated
@CrossOrigin(origins="*")
public class TrainController {

	@Autowired
	private ITrainService trainService;
	@Autowired
	private IAdminService adminService;
	
	@PostMapping("/search-train")
	public ResponseEntity<?> searchTrain(@RequestBody @Valid SearchTrainDTO searchDetails) {
		log.info("Inside Search Train Method...");
		return ResponseEntity.ok().body(trainService.searchTrain(searchDetails));
	}
	
	@GetMapping("/train/{trainNo}") 
	public ResponseEntity<?> getTrainDetails(@PathVariable @Valid @NotNull long trainNo) {
		log.info("Inside Search Train By TrainNo Method...");
		return ResponseEntity.ok().body(trainService.getTrainDetails(trainNo));
	}
	

	@GetMapping("/show-route/{trainno}")
	public List<Route> showRoute(@PathVariable long trainno) {
		return trainService.showRouteByTrainNo(trainno);
	}
	

}


