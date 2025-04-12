package com.reservation.dao;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.reservation.entity.Train;
import com.reservation.entity.TrainStatus;

public interface ITrainStatusRepository extends JpaRepository<TrainStatus, Long>{

	List<TrainStatus> findByTrainTrainNoAndDate(Long trainNo, LocalDate date);
	
	
	Optional<TrainStatus> findByTrainTrainNoAndDateAndCoachCoachId(Long trainId, LocalDate date, String coachId);


	List<TrainStatus> findByDateAndTrain(LocalDate date,Train train);
}
