package com.reservation.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "coaches")
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@Setter
public class Coach {

	@Id
	@Column(length = 5, name = "coach_id")
	private String coachId;

	@Column(name = "fare_per_km")
	private double farePerKm;

}
