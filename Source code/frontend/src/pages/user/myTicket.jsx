import React from 'react'
import UserDashboard from './userDashboard';
import { useEffect } from 'react';
import axios from 'axios';
import config from '../../config';
import { toast } from 'react-toastify'
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { saveAs } from 'file-saver'

const MyTicket = () => {

    // const [bookingDetails, setBookingDetails] = useState({});

    const { state } = useLocation();
    console.log(state.result);
    const bookingDetails = state.result;

    const navigate = useNavigate();

    // useEffect(()=>{
    //     if(!sessionStorage['token'])
    //     navigate('/error403')

    //  },[])

    async function printTickets() {
        const { data } = await downloadTicket()
        const blob = new Blob([data], { type: 'application/pdf' })
        saveAs(blob, "ticket.pdf")
        toast.success("Ticket downloaded successfully!!")
      }

    const downloadTicket=()=>{
      return axios.get(config.URL+'/ticket-pdf?bookingid='+
        bookingDetails.bookingDetails.bookingId,
        {
            headers: {
             Authorization: sessionStorage['token'],
              'Content-Type': 'multipart/form-data'
            },
            responseType: 'arraybuffer'
          })    
    }

    const cancelTicket = () => {
        axios
            .get(config.URL + '/user/cancel/' + bookingDetails.bookingDetails.bookingId, {
                headers: { Authorization: sessionStorage['token'] }
            })
            .then((response) => {
                const result = response.data
                console.log(result);
                toast.success("Ticket Cancelled")
                navigate("/user/my-booking");
            })
            .catch((error) => {
                // console.log(error.response.data);
                toast.error(error.response.data);
                toast.error("Ticket Cancellation Failed!")
            })
    }

    return (
        <>
            <UserDashboard />
            <div className="main" id="main">
                <div className="pagetitle">
                    <h1>Ticket</h1>
                </div>
                <div className="card">
                    <div className="card-body">
                        <div className="card-body">
                            <div className="tab-content pt-2">
                                <div className="tab-pane fade show active profile-overview" id="profile-overview">
                                    <div className='d-flex justify-content-between'>
                                        <h5 className="card-title">Train Details</h5>
                                        <h5 className="card-title">Booking ID: {bookingDetails.bookingDetails.bookingId}</h5>

                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <div className="row">
                                                <div className="col-6 label fw-semibold">Train No.</div>
                                                <div className="col-6 ">{bookingDetails.bookingDetails.trainId}</div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="row">
                                                <div className="col-6 label fw-semibold">Train Name:</div>
                                                <div className="col-6">{bookingDetails.bookingDetails.trainName}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <div className="row">
                                                <div className="col-6 label fw-semibold">Boarding Station:</div>
                                                <div className="col-6 ">{bookingDetails.bookingDetails.journeyFrom}</div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="row">
                                                <div className="col-6 label fw-semibold">Alighting Station:</div>
                                                <div className="col-6 ">{bookingDetails.bookingDetails.journeyTo}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <div className="row">
                                                <div className="col-6 label fw-semibold">Departure Date:</div>
                                                <div className="col-6 ">{bookingDetails.bookingDetails.departureDate}</div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="row">
                                                <div className="col-6 label fw-semibold">Arrival Date:</div>
                                                <div className="col-6 ">{bookingDetails.bookingDetails.arrivalDate}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <div className="row">
                                                <div className="col-6 label fw-semibold">Departure Time:</div>
                                                <div className="col-6 ">{bookingDetails.bookingDetails.departureTime}</div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="row">
                                                <div className="col-6 label fw-semibold">Arrival Time:</div>
                                                <div className="col-6 ">{bookingDetails.bookingDetails.arrivalTime}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <div className="row">
                                                <div className="col-6 label fw-semibold">Coach:</div>
                                                <div className="col-6 ">{bookingDetails.bookingDetails.coach}</div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="row">
                                                <div className="col-6 label fw-semibold">Total Passengers:</div>
                                                <div className="col-6 ">{bookingDetails.bookingDetails.totalPassengers}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <div className="row">
                                                <div className="col-6 label fw-semibold">Booking Date:</div>
                                                <div className="col-6 ">{bookingDetails.bookingDetails.bookingDate}</div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="row">
                                                <div className="col-6 label fw-semibold">Total Amount:</div>
                                                <div className="col-6 ">{bookingDetails.bookingDetails.totalAmount}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <div className="row">
                                                <div className="col-3 label fw-semibold">Booking Status:</div>
                                                <div className="col-3 ">{bookingDetails.bookingDetails.bookingStatus}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">Passenger Details</h5>
                            {/* Table with hoverable rows */}
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Gender</th>
                                        <th scope="col">Age</th>
                                        <th scope="col">ID Card Type</th>
                                        <th scope="col">ID Card Number</th>
                                        <th scope="col">Seat No</th>
                                        <th scope="col">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        bookingDetails.passengersDetails.map((pass, index) => {
                                            return <tr>
                                                <th scope="row">{index + 1}</th>
                                                <td>{pass.passengerName}</td>
                                                <td>{pass.passengerGender}</td>
                                                <td>{pass.passengerAge}</td>
                                                <td>{pass.passengerIdCardType}</td>
                                                <td>{pass.passengerIdCardNumber}</td>
                                                <td>{pass.passengerSeat}</td>

                                                {(pass.passengerStatus == "CONFIRMED") && <td><span class="badge bg-success">{pass.passengerStatus}</span></td>}
                                                {(pass.passengerStatus == "WAITING") && <td><span class="badge bg-warning">{pass.passengerStatus}</span></td>}
                                                {(pass.passengerStatus == "CANCELLED") && <td><span class="badge bg-danger">{pass.passengerStatus}</span></td>}
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                            {/* End Table with hoverable rows */}
                        </div>
                          
                        {/*      */}
                        {/* <div className="col-12 text-center">
                            <button className="btn btn-success" type="submit"><i className="bi bi-credit-card"></i> Make Payment</button>
                        </div> */}
                        
                         
                       
                        {
                            bookingDetails.bookingDetails.bookingStatus !== "CANCELLED" && <div className="text-center">
                               
                               <button type="submit" className="btn btn-primary"
                                 onClick={printTickets}>Download Ticket</button>
                                 &nbsp;&nbsp;

                                <button type="submit" className="btn btn-danger"
                                    onClick={cancelTicket}>Cancel Ticket</button>
                            </div>
                        }

                    </div>
                </div>
            </div>
        </>
    )
}

export default MyTicket