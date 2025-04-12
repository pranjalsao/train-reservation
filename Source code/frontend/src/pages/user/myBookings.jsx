import React from 'react'
import UserDashboard from './userDashboard';
import { useState, useEffect } from 'react';
import axios from 'axios';
import config from './../../config';
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom';

const MyBookings = () => {

    const [myBookings, setMyBookings] = useState([]);

    const navigate = useNavigate();


    useEffect(() => {
        loadMyBookings()
    }, [])


    const loadMyBookings = () => {
        axios
            .get(config.URL + '/user/all-bookings/' + sessionStorage["id"], {
                headers: { Authorization: sessionStorage['token'] }
            })
            .then((response) => {
                const result = response.data
                setMyBookings(result);
                console.log(result);
            })
            .catch((error) => {
                console.log(error);
                toast.error(error.response.data);
            })
    }

    const getBookingDetails = (bookingId) => {
        console.log(bookingId);
        axios
            .get(config.URL + '/user/booking/' + bookingId, {
                headers: { Authorization: sessionStorage['token'] }
            })
            .then((response) => {
                const result = response.data
                console.log(result);
                navigate("/user/ticket", { state: { result } })
            })
            .catch((error) => {
                console.log(error);
                toast.error(error.response.data);
            })
    }

    return (
        <>
            <UserDashboard />
            <main id='main' className='main'>
                <div className="pagetitle">
                    <h1>My Bookings</h1>
                </div>{/* End Page Title */}
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">All Booking Details</h5>
                        {/* Table with hoverable rows */}
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead >
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Booking ID</th>
                                        <th scope="col">Booking Date</th>
                                        <th scope="col">Distance</th>
                                        <th scope="col">Passengers</th>
                                        <th scope="col">Coach</th>
                                        <th scope="col">Amount</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Ticket</th>
                                    </tr>
                                </thead>
                                <tbody >
                                    {
                                        myBookings.map((booking, index) => {
                                            return (
                                                <tr>
                                                    <th scope="row">{index + 1}</th>
                                                    <td>{booking.bookingId}</td>
                                                    <td>{booking.bookingDate}</td>
                                                    <td>{booking.journeyDistance}</td>
                                                    <td>{booking.totalPassengers}</td>
                                                    <td>{booking.coach.coachId}</td>
                                                    <td>{booking.totalAmount}</td>
                                                    {booking.bookingStatus === "ACTIVE" ?
                                                        <td><span class="badge bg-success">{booking.bookingStatus}</span></td>
                                                        :
                                                        <td><span class="badge bg-danger">{booking.bookingStatus}</span></td>
                                                    }

                                                    <td>
                                                        <button className="btn btn-primary btn-sm"
                                                            onClick={() => {
                                                                getBookingDetails(booking.bookingId);
                                                            }}>View Ticket</button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                        {/* End Table with hoverable rows */}
                    </div>
                </div>
            </main>
        </>
    )
}

export default MyBookings