package com.reservation.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class TrainTypeDTO {

	@NotBlank(message = "Train Type ID must be supplied!")
	@Length(max = 5, message = "TrainTypeId Length - Out of Range!")
	private String trainTypeId;

	@NotBlank(message = "Train name must be supplied!")
	@Length(max = 20, message = "TrainTypeName Length - Out of Range!")
	private String trainTypeName;	

	@NotNull(message = "Special Charges must be supplied!")
	private double specialCharges;

}
