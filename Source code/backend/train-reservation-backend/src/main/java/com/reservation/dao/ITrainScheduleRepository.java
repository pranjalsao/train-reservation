package com.reservation.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.reservation.entity.Train;
import com.reservation.entity.TrainSchedule;
import com.reservation.entity.TrainScheduleId;

public interface ITrainScheduleRepository extends JpaRepository<TrainSchedule,TrainScheduleId> {

	List<TrainSchedule> findByIdTrain(Train train);
	
	
}
