package com.reservation.dao;

import java.time.LocalDate;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.reservation.entity.User;
import com.reservation.entity.enums.RoleEnum;

public interface IUserRepository extends JpaRepository<User,Long> {

	Optional<User> findByUserEmailAndUserPassword(String userEmail,String userPassword);

	
	Optional<User> findByUserEmail(String userEmail);
	
	@Query("select u from User u where u.userEmail=?1 and u.securityQues=?2 and u.securityAns=?3")
	Optional<User> findByEmailAndSecurityInfo(String email,String securityQ,String securityAns);

	Optional<User> findByUserEmailAndOtp(String userEmail,int otp);
	
	@Query("select u.Role from User u where u.userEmail=?1")
	RoleEnum getRoleofUser(String email);
	
	@Query("select u.userId from User u where u.userEmail = ?1")
	int getIdByEmail(String email);
	
	@Modifying
	@Query("update User u set u.firstName=?1,u.lastName=?2,u.userEmail=?3,u.userDob=?4,u.userMobile=?5,u.userAddress=?6 where u.userId=?7 ")
	int updateProfile(String firstname,String lastname,String email,LocalDate date,String mobile,String address,long id);
	
}
