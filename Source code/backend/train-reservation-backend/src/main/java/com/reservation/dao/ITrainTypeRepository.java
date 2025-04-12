package com.reservation.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.reservation.entity.TrainType;

public interface ITrainTypeRepository extends JpaRepository<TrainType,String> {

	@Modifying
	@Query("update TrainType t set t.specialCharges=?2 where t.trainTypeId=?1")
	int updateCharges(String traintypeid,double charges);
}
