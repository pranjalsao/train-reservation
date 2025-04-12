package com.reservation.service;

import com.reservation.dto.CancellationResponseDTO;

public interface ICancellationService {

	CancellationResponseDTO cancelTicket(Long bookingId);
}
