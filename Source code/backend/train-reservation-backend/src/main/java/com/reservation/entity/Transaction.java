package com.reservation.entity;

import java.time.LocalDate;

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

import com.reservation.entity.enums.TransactionStatusEnum;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "transactions")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Transaction {

	@TableGenerator(name = "transactionGen", 
			table = "ID_GEN", 
			pkColumnName = "GEN_ID", 
			valueColumnName = "GEN_VALUE", 
			pkColumnValue = "TRANSACTION_ID", 
			initialValue = 2022001, 
			allocationSize = 1)
	@Id
	@GeneratedValue(strategy = GenerationType.TABLE, generator = "transactionGen")
	@Column(name = "transaction_id")
	private Long transactionId;
	
	@Column(name = "transaction_date")
	private LocalDate transactionDate;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User user;
		
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "booking_id")
	private Booking booking;
	
	@Column(name = "total_amount")
	private double totalAmount;
	
	@Enumerated(EnumType.STRING)
	@Column(name = "transaction_status", length = 20)
	private TransactionStatusEnum transactionStatus;

	public Transaction(LocalDate transactionDate, User user, Booking booking, double totalAmount,
			TransactionStatusEnum transactionStatus) {
		super();
		this.transactionDate = transactionDate;
		this.user = user;
		this.booking = booking;
		this.totalAmount = totalAmount;
		this.transactionStatus = transactionStatus;
	}
	
	
}
