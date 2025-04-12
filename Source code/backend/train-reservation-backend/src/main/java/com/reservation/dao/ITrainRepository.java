package com.reservation.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.reservation.entity.Train;
import com.reservation.entity.TrainType;


public interface ITrainRepository extends JpaRepository<Train, Long> {

	List<Train> findByTrainType(TrainType trainType);
}
