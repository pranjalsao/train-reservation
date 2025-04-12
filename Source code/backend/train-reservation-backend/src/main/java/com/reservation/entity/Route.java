package com.reservation.entity;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "routes")	
@Data
@NoArgsConstructor
public class Route {
	
	@EmbeddedId
	private RouteId id;
	
//	@ManyToOne(fetch = FetchType.LAZY)
//	@JoinColumn(name = "train_no")
//	private Train train;
//	
//	@ManyToOne(fetch = FetchType.LAZY)
//	@JoinColumn(name = "station_id")
//	private Station station;
	
	@Column(name = "dist_from_src")
	private int distanceFromSource;
	
	@Column(name = "time_duration")
	private int hours;
}
