package com.reservation.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.reservation.entity.User;

public interface IAdminRepository extends JpaRepository<User,Long> {

}
