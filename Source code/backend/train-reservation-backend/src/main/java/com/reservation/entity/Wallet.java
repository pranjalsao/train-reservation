package com.reservation.entity;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.TableGenerator;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "wallets")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Wallet {

	@TableGenerator(name = "walletGen",
			table = "ID_GEN", 
			pkColumnName = "GEN_ID", 
			valueColumnName = "GEN_VALUE", 
			pkColumnValue = "WALLET_ID", 
			initialValue = 30001,
			allocationSize = 1)
	@Id
	@GeneratedValue(strategy = GenerationType.TABLE, generator = "walletGen")
	@Column(name = "wallet_id", nullable = false, unique = true)
	private Long id;
	
	@OneToOne
	@JoinColumn(name = "user_id", nullable = false, unique = true)
	private User user;
	
//	@MapsId
//	@OneToOne(fetch = FetchType.LAZY)
//	@JoinColumn(name = "wallet_id", nullable = false)
//	private User user;
	
	@Column(name = "wallet_amt", nullable = false)
	private double walletAmount;

	@Column(length = 14, name = "debit_card_no", nullable = false, unique = true)
	private String debitCardNo;

	@Column(name = "valid_thru", nullable = false)
	private LocalDate validThru;

	@JsonProperty(access = Access.WRITE_ONLY)
	@Column(length = 200, nullable = false)
	@ToString.Exclude
	private String cvv;
}
