package com.reservation.entity;

import java.time.LocalDate;
import java.time.LocalTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.TableGenerator;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.reservation.entity.enums.BookingStatusEnum;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "bookings")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Booking {

	@TableGenerator(name = "bookingGen", 
			table = "ID_GEN", 
			pkColumnName = "GEN_ID", 
			valueColumnName = "GEN_VALUE", 
			pkColumnValue = "BOOKING_ID", 
			initialValue = 123123, 
			allocationSize = 1)
	@Id
	@GeneratedValue(strategy = GenerationType.TABLE, generator = "bookingGen")
	@Column(name = "booking_id")
	private Long bookingId;

	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;

	@Column(name = "booking_date")
	private LocalDate bookingDate;
	

	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "train_no")
	private Train train;
	
	@Column(name = "departure_date")
	private LocalDate departureDate;

	@Column(name = "departure_time")
	private LocalTime departureTime;

	@Column(name = "arrival_date")
	private LocalDate arrivalDate;

	@Column(name = "arrival_time")
	private LocalTime arrivalTime;

	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "journey_from")
	private Station journeyFrom;

	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "journey_to")
	private Station journeyTo;

	@Column(name = "journey_distance")
	private int journeyDistance;

	@Column(name = "total_amount")
	private double totalAmount;

	@Column(name = "total_passengers")
	private int totalPassengers;

	@Builder.Default
	@Enumerated(EnumType.STRING)
	@Column(name = "booking_status", columnDefinition="varchar(20) default 'ACTIVE'", nullable = false)
	private BookingStatusEnum bookingStatus = BookingStatusEnum.ACTIVE;
	
	
	@NotNull(message = "Coach must be supplied!")
	@ManyToOne
	private Coach coach;

}
