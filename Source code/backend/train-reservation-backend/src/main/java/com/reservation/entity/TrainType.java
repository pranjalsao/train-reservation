package com.reservation.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;


import lombok.Data;


@Entity
@Table(name = "train_type")
@Data
public class TrainType {
	
	@Id 
	@Column(length = 5, name = "train_type_id", nullable = false, unique = true)
	private String trainTypeId;
	
	@Column(length = 20, name = "train_type_name", nullable = false, unique = true)
	private String trainTypeName;
	
	@Column(name = "special_charges", nullable = false)
	private double specialCharges;

}
