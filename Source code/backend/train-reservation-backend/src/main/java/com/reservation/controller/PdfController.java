package com.reservation.controller;

import java.io.IOException;
import java.sql.Date;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.lowagie.text.DocumentException;
import com.reservation.dao.UserPDFExporter;
import com.reservation.entity.Booking;
import com.reservation.entity.Passenger;
import com.reservation.service.IPdfService;

@RestController
@RequestMapping("/ticket-pdf")
@Validated
@CrossOrigin(origins="*")
public class PdfController  {

	 @Autowired
	    private IPdfService pdfGenerateService;

	 @GetMapping
	    public void exportToPDF(HttpServletResponse response,@RequestParam long bookingid) throws DocumentException, IOException {
	        response.setContentType("application/pdf");
	        DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
	        String currentDateTime = dateFormatter.format(new Date(10,9,2022));
	         
	        String headerKey = "Content-Disposition";
	        String headerValue = "attachment; filename=ticket_" + currentDateTime + ".pdf";
	        response.setHeader(headerKey, headerValue);
	         
	        List<Passenger> listBooking=pdfGenerateService.listBooking(bookingid);
	        Booking booking=pdfGenerateService.getBooking(bookingid);
	         
	        UserPDFExporter exporter = new UserPDFExporter(listBooking,booking);
	        exporter.export(response);
	         
	    }
}
