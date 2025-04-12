package com.reservation.entity;

import java.time.DayOfWeek;
import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Version;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="train_status")
@Getter
@Setter
@ToString
@NoArgsConstructor
public class TrainStatus {


	/*@TableGenerator(name = "statusGen", 
					table = "ID_GEN", 
					pkColumnName = "GEN_ID", 
					valueColumnName = "GEN_VALUE", 
					pkColumnValue = "STATUS_ID", 
					initialValue = 101, 
					allocationSize = 1)*/
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "train_status_id", nullable = false, unique = true)
	private Long statusId;
	
	@Version
	private Integer version;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name="train_no",nullable=false)
	private Train train;
	
	@ManyToOne
	@JoinColumn(name="coach_class",nullable=false)
	private Coach coach;
	
	@Column(name="seats_booked",columnDefinition = "int default 0")
	private int seatsBooked;
	
	@Column(name="seats_available",columnDefinition = "int default 10")
	private int seatsAvailable;
	
	@Column(name="seats_waiting",columnDefinition = "int default 0")
	private int seatsWaiting;
	
	@Column(nullable = false)
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate date;
	
	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private DayOfWeek day;
	
	@Column(name="total_seats",columnDefinition = "int default 10")
	private int totalSeats;
	
	public TrainStatus(Train train, Coach coach, int seatsBooked, int seatsAvailable, int seatsWaiting, LocalDate date,
			DayOfWeek day, int totalSeats, Integer version) {
		super();
		this.train = train;
		this.coach = coach;
		this.seatsBooked = seatsBooked;
		this.seatsAvailable = seatsAvailable;
		this.seatsWaiting = seatsWaiting;
		this.date = date;
		this.day = day;
		this.totalSeats = totalSeats;
		this.version = version;
	}
	
}
