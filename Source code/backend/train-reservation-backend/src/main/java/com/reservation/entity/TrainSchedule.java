package com.reservation.entity;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "train_schedule",uniqueConstraints = { @UniqueConstraint(columnNames = { "schedule_date", "train_no" })})
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TrainSchedule {
	
	
	@EmbeddedId
	private TrainScheduleId id;
	
		
	@Column(name="schedule_date",nullable=false)
	private LocalDate scheduleDate;
	
	
}
