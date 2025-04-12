package com.reservation.dao;


import java.awt.Color;
import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import com.lowagie.text.Document;
import com.lowagie.text.DocumentException;
import com.lowagie.text.Font;
import com.lowagie.text.FontFactory;
import com.lowagie.text.PageSize;
import com.lowagie.text.Paragraph;
import com.lowagie.text.Phrase;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import com.reservation.entity.Booking;
import com.reservation.entity.Passenger;
 
 
public class UserPDFExporter {
    private List<Passenger> bookList;
    private Booking booking;
     
    public UserPDFExporter(List<Passenger> bookList,Booking booking) {
        this.bookList = bookList;
        this.booking=booking;
    }
 
    private void writeTableHeader(PdfPTable table) {
        PdfPCell cell = new PdfPCell();
        cell.setBackgroundColor(Color.BLUE);
        cell.setPadding(5);
         
        Font font = FontFactory.getFont(FontFactory.HELVETICA);
        font.setColor(Color.WHITE);
         
        cell.setPhrase(new Phrase("Booking ID", font));
         
        table.addCell(cell);
         
        cell.setPhrase(new Phrase("Booking Date", font));
        table.addCell(cell);
        
        cell.setPhrase(new Phrase("Passenger ID", font));
        table.addCell(cell);
         
        cell.setPhrase(new Phrase("Name", font));
        table.addCell(cell);
        
        cell.setPhrase(new Phrase("Age", font));
        table.addCell(cell);
        
        cell.setPhrase(new Phrase("Gender", font));
        table.addCell(cell);
           
        
        cell.setPhrase(new Phrase("Passenger Seat No.", font));
        table.addCell(cell); 
        
        
        cell.setPhrase(new Phrase("Booking Status", font));
        table.addCell(cell); 
    }
     
    private void writeTableData(PdfPTable table) {
       
    		for(Passenger book:bookList) {
            table.addCell(String.valueOf(book.getBooking().getBookingId()));
            table.addCell(booking.getBookingDate().toString());
            table.addCell(String.valueOf(book.getPassengerId()));
            table.addCell(String.valueOf(book.getPassengerName()));
            table.addCell((String.valueOf(book.getPassengerAge())));
            table.addCell((String.valueOf(book.getPassengerGender())));
           
            table.addCell(String.valueOf(book.getPassengerSeat()));
           
            table.addCell(booking.getBookingStatus().toString());
    		} 
    }
     
    public void export(HttpServletResponse response) throws DocumentException, IOException {
        Document document = new Document(PageSize.A4);
        PdfWriter.getInstance(document, response.getOutputStream());
         
        document.open();
        Font font = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
        font.setSize(30);
        font.setColor(Color.BLUE);
        
        Font font1 = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
        font.setSize(10);
        font.setColor(Color.BLUE);
         
        Paragraph p = new Paragraph("TRAIN RESERVATION TICKET", font);
        
       
        
          
        Paragraph p2 = new Paragraph("Train Name: "+booking.getTrain().getTrainName()+ 
"                                           "
+ "                           Journey From: "+booking.getJourneyFrom().getStationName()	, font1);
 
  
        
        
        Paragraph p6 =  new Paragraph("Departure date: "+booking.getDepartureDate().toString()+ 
        		"                                           "
        		+ "                             Journey To: "+booking.getJourneyTo().getStationName()	, font1);
        		
        		
        Paragraph p7 =  new Paragraph("Departure time: "+booking.getDepartureTime().toString()+ 
        		"                                           "
        		+ "                           Journey Distance: "+booking.getJourneyDistance()+"Km"	, font1);		
        		
        Paragraph p8 =  new Paragraph("Arrival date: "+booking.getArrivalDate().toString()+ 
        		"                                           "
        		+ "                           Total Amount: Rs."+booking.getTotalAmount()	, font1);				
      
        
        
        Paragraph p9 =  new Paragraph("Arrival date: "+booking.getArrivalTime().toString()
        		+"                                                                           "
        		+ "                   Train No: "+booking.getTrain().getTrainNo(), font1);				
      
        
        Paragraph p1=new Paragraph("   ",font);
        Paragraph p4=new Paragraph("   ",font);
        Paragraph p3=new Paragraph("   ",font);
        
        p.setAlignment(Paragraph.ALIGN_CENTER);
        p2.setAlignment(Paragraph.ALIGN_LEFT);
        p6.setAlignment(Paragraph.ALIGN_LEFT);
        p7.setAlignment(Paragraph.ALIGN_LEFT);
        p8.setAlignment(Paragraph.ALIGN_LEFT);
        p9.setAlignment(Paragraph.ALIGN_LEFT);
     
        document.add(p);
        document.add(p4);
        document.add(p2);
        document.add(p6);
        document.add(p7);
        document.add(p8);
        document.add(p9);
        document.add(p1);
        document.add(p3);
        document.add(p4);
      
        PdfPTable table = new PdfPTable(8);
        table.setWidthPercentage(100f);
        table.setWidths(new float[] {2.5f, 3.5f, 3.0f, 3.0f, 2.5f,2.5f, 3.5f, 3.0f});
        table.setSpacingBefore(10);
         
        writeTableHeader(table);
        writeTableData(table);
         
        document.add(table);
         
        document.close();
         
    }
}