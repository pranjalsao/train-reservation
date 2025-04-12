package com.reservation.entity;

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
import javax.persistence.UniqueConstraint;

import com.reservation.entity.enums.GenderEnum;
import com.reservation.entity.enums.PassengerIdCardTypeEnum;
import com.reservation.entity.enums.PassengerStatusEnum;

import lombok.Data;

@Entity
@Table(name = "passengers", uniqueConstraints = { @UniqueConstraint(columnNames = { "pass_id", "booking_id" }) })
@Data
public class Passenger {

	@TableGenerator(name = "passengerGen", table = "ID_GEN", pkColumnName = "GEN_ID", valueColumnName = "GEN_VALUE", pkColumnValue = "PASSENGER_ID", initialValue = 1001, allocationSize = 1)
	@Id
	@GeneratedValue(strategy = GenerationType.TABLE, generator = "passengerGen")
	@Column(name = "pass_id")
	private Long passengerId;

	@Column(name = "pass_idcard_no", length = 10)
	private String passengerIdCardNumber;

	@Enumerated(EnumType.STRING)
	@Column(name = "pass_idcard_type", length = 10)
	private PassengerIdCardTypeEnum passengerIdCardType;

	@Column(name = "pass_name", length = 20)
	private String passengerName;

	@Enumerated(EnumType.STRING)
	@Column(name = "pass_gender", length = 10)
	private GenderEnum passengerGender;

	@Column(name = "pass_age")
	private int passengerAge;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "booking_id")
	private Booking booking;

	@Column(name = "pass_seat", length = 8)
	private String passengerSeat;

	@Enumerated(EnumType.STRING)
	@Column(name = "pass_status", length = 20)
	private PassengerStatusEnum passengerStatus;
	
	@Column(name = "pass_fare")
	private int passengerFare;

}
