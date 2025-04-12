package com.reservation.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.reservation.entity.Coach;

public interface ICoachRepository extends JpaRepository<Coach, String> {

	@Modifying
	@Query("update Coach c set c.farePerKm=?2 where c.coachId=?1")
	int updateFare(String coachid,double fare);
}
