package com.reservation.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.reservation.entity.User;

public interface ILoginRequestRepository extends JpaRepository<User,Long> {

	Optional<User> findByUserEmailAndUserPassword(String userEmail,String userPassword);

}
