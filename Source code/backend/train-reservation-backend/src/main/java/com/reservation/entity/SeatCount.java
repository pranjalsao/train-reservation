package com.reservation.entity;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "coach_counts")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SeatCount {

	@EmbeddedId
	private SeatCountId id;

//	@Column(name = "coach_count")
//	private int coachCount;
		
	@Column(name = "seat_count")
	private int totalSeats;
	
}
