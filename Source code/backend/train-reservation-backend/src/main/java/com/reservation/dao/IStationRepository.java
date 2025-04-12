package com.reservation.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.reservation.entity.Station;


public interface IStationRepository extends JpaRepository<Station, String> {

	Optional<Station> findBystationId(String id);
}
