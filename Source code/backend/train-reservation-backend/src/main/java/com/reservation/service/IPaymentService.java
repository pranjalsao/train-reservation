package com.reservation.service;

import com.reservation.dto.PaymentDTO;

public interface IPaymentService {

	PaymentDTO makePayment(PaymentDTO paymentRequest);
}
