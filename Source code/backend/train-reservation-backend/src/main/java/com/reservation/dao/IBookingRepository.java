package com.reservation.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.reservation.entity.Booking;

public interface IBookingRepository extends JpaRepository<Booking, Long> {

//	@Query("select b from Booking b join b.user u where u.id = ?1")
//	List<Booking> findBookingsByUserId(long userId);
	
	List<Booking> findByUserUserIdOrderByBookingDateDesc(long userId);
	
	
	
	
}
