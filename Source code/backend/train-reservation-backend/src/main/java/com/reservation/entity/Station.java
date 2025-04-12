package com.reservation.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "stations")
@NoArgsConstructor
@Getter
@Setter
public class Station {
	
	@Id
	@Column(name = "station_id", length = 5,  unique = true) 
	private String stationId; 
		
	@Column(length = 30, name = "station_name", unique = true)
	private String stationName;
	
	@Column(nullable=false)
	private int distance;
	
}
