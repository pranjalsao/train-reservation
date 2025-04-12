package com.reservation.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.reservation.entity.SeatCount;
import com.reservation.entity.SeatCountId;
import com.reservation.entity.TrainType;

public interface ISeatCountRepository extends JpaRepository<SeatCount, SeatCountId> {

	@Modifying
	@Query("delete from SeatCount s where s.id.trainType.trainTypeId=?1 and s.id.coach.coachId=?2")
	int deleteCoach(String traintypeid,String coachid);
	
	@Query("select s from SeatCount s where s.id.trainType=?1")
	List<SeatCount> findByTrainType(TrainType trainType);
	
//	@Query("select s.id.trainType.trainTypeId,s.id.coach.coachId,s.totalSeats from SeatCount s")
//	List<SeatCount> findAllSeatCounts();
	
	@Modifying
	@Query("update SeatCount s set s.totalSeats=?3 where s.id.trainType.trainTypeId=?1 and s.id.coach.coachId=?2")
	int updateSeatCount(String traintypeid,String coachid,int count);
	
}
