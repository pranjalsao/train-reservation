 package com.reservation.entity;

import java.time.LocalTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name ="trains")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Train {
	
	@Id
	@Column(name = "train_no", nullable = false, unique = true)
	private Long trainNo;
	
	@Column(name = "train_name", nullable = false, unique = true, length = 50)
	private String trainName;
	
	@ManyToOne
	@JoinColumn(name = "train_type", nullable = false)
	private TrainType trainType;
	
	@ManyToOne
	@JoinColumn(nullable = false)
	private Station source;
	
	@ManyToOne
	@JoinColumn(nullable = false)
	private Station destination;	
	
	@Column(name = "src_dept_time", nullable = false)
	private LocalTime sourceDepartureTime;
	
	@Column(name = "dest_arr_time", nullable = false)
	private LocalTime destinationArrivalTime;
	
}
