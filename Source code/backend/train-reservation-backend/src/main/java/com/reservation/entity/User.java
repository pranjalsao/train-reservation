package com.reservation.entity;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.TableGenerator;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import com.reservation.entity.enums.RoleEnum;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "users")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class User {

	@TableGenerator(name = "userGen", 
					table = "ID_GEN", 
					pkColumnName = "GEN_ID", 
					valueColumnName = "GEN_VALUE", 
					pkColumnValue = "USER_ID", 
					initialValue = 10001, 
					allocationSize = 1)
	@Id
	@GeneratedValue(strategy = GenerationType.TABLE, generator = "userGen")
	@Column(name = "user_id")
	private Long userId;

	@Column(name = "first_name", length = 30)
	private String firstName;

	@Column(name = "last_name", length = 30)
	private String lastName;

	@JsonProperty(access = Access.WRITE_ONLY)
	@Column(name = "user_password", length = 200)
	@ToString.Exclude
	private String userPassword;

	@Column(name = "user_mobile", length = 10)
	private String userMobile;

	@Column(name = "user_email", length = 50, unique = true)
	private String userEmail;

	@Column(name = "user_dob", nullable = false)
	private LocalDate userDob;

	@Column(name = "user_addr", length = 50)
	private String userAddress;

	@Builder.Default
	@Enumerated(EnumType.STRING)
	@Column(columnDefinition="varchar(10) default 'USER'")
	private RoleEnum Role = RoleEnum.USER;

	@Column(name = "security_ques")
	@JsonIgnore
	@ToString.Exclude
	private String securityQues;

	
	@JsonIgnore
	@Column(name = "security_ans", length = 30)
	private String securityAns;

	@Column
	@JsonIgnore
	private Integer otp;

}
