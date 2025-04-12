package com.reservation.entity;

import java.io.Serializable;
import java.time.DayOfWeek;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TrainScheduleId implements Serializable {
	 
	private static final long serialVersionUID = 1L;
	
	@ManyToOne
	@JoinColumn(name = "train_no")
	private Train train;
	
	@Enumerated(EnumType.STRING)
	@Column(name = "weekday", length = 10)
	private DayOfWeek weekDay;
	
	@ManyToOne
	@JoinColumn(name="train_type_id")
	private TrainType trainType;
}
