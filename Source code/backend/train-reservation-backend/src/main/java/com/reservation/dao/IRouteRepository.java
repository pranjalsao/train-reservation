package com.reservation.dao;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.reservation.entity.Route;
import com.reservation.entity.RouteId;
import com.reservation.entity.Station;
import com.reservation.entity.Train;

public interface IRouteRepository extends JpaRepository<Route, RouteId> {
	
//	Train findRouteByStations(String stn1, String stn2);
	
	List<Route> findByIdStation(Station station);
	
	@Query("select r from Route r where r.id.train.trainNo=?1 order by r.hours")
	List<Route> findByTrainNo(long trainNo);
	
	
	@Modifying
	@Query("delete from Route r where r.id.train.trainNo=?1 and r.id.station.stationId=?2")
	void deleteByTrainNoAndStationId(long trainNo,String stationId);
	

	List<Route> findByIdTrainOrderByHours(Train train);
}
