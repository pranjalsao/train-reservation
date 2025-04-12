import React from 'react'
import UserDashboard from './userDashboard'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import moment from 'moment';
import axios from 'axios';
import config from './../../config';
import { toast } from 'react-toastify'
import { useState, useEffect } from 'react';

const ConfirmBookingDetails = () => {

    const [walletBalance, setWalletBalance] = useState(0);
    const { state } = useLocation();
    const navigate = useNavigate();

    if (!state) {
        if (!sessionStorage['token']) {
            toast.error("You are not logged in! Login to Continue.")
            return <Navigate to="/login" />
        }
        if (!(sessionStorage['role'] == "USER")) {
            return <Navigate to="/error403" />
        }
    }

    const { trainFound, status, route1, route2, distance,
        duration, arrivalDate, arrivalTime, passengersDetails, bookingDetails, count } = state;

    console.log(state);
    // let num = 1;


    //Make Payment
    const makePayment = () => {
        const body = {
            "passengersDetails": passengersDetails,
            "bookingDetails": {
                bookingDate: bookingDetails.bookingDate,
                userId: +sessionStorage['id'],
                trainId: trainFound.trainNo,
                departureDate: status.date,
                departureTime: trainFound.sourceDepartureTime,
                arrivalDate,
                arrivalTime,
                journeyFrom: route1.id.station.stationId,
                journeyTo: route2.id.station.stationId,
                journeyDistance: distance,
                totalAmount: status.fare.totalFare * count,
                totalPassengers: count,
                coach: status.coach.coachId
            }
        }
        console.log(body);
        axios
            .post(config.URL + '/user/pay', body, {
                headers: { Authorization: sessionStorage['token'] }
            })
            .then((response) => {
                const result = response.data
                console.log(result);
                toast.success("Ticket Booked Successfully.")
                navigate("/user/my-booking")
            })
            .catch((error) => {
                console.log(error);
                toast.error(error.response.data.message);
                toast.error("Oops! Something went wrong.");
            })
    }

    //Get Wallet Balance
    const getWalletBalance = () => {
        axios
            .get(config.URL + '/user/wallet-balance-user/' + sessionStorage['id'], {
                headers: { Authorization: sessionStorage['token'] }
            })
            .then((response) => {
                const result = response.data
                console.log(result);
                setWalletBalance(result);
            })
            .catch((error) => {
                console.log(error);
                toast.error(error.response.data.message);
            })
    }

    return (
        <>
            <UserDashboard />
            <div className="main" id="main">
                <div className="pagetitle">
                    <h1>Confirm Booking Details</h1>
                </div>
                <div className="card">
                    <div className="card-body">
                        <div className="card-body">
                            <div className="tab-content pt-2">
                                <div className="tab-pane fade show active profile-overview" id="profile-overview">
                                    <h5 className="card-title">Train Details</h5>
                                    <div className="row">
                                        <div className="col">
                                            <div className="row">
                                                <div className="col-6 label fw-semibold">Train No.</div>
                                                <div className="col-6 ">{trainFound.trainNo}</div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="row">
                                                <div className="col-6 label fw-semibold">Train Name:</div>
                                                <div className="col-6">{trainFound.trainName}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <div className="row">
                                                <div className="col-6 label fw-semibold">Boarding Station:</div>
                                                <div className="col-6 ">{route1.id.station.stationName} ({route1.id.station.stationId})</div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="row">
                                                <div className="col-6 label fw-semibold">Alighting Station:</div>
                                                <div className="col-6 ">{route2.id.station.stationName} ({route2.id.station.stationId})</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <div className="row">
                                                <div className="col-6 label fw-semibold">Departure Date:</div>
                                                <div className="col-6 ">{status.date}</div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="row">
                                                <div className="col-6 label fw-semibold">Arrival Date:</div>
                                                <div className="col-6 ">{arrivalDate}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <div className="row">
                                                <div className="col-6 label fw-semibold">Departure Time:</div>
                                                <div className="col-6 ">{trainFound.sourceDepartureTime}</div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="row">
                                                <div className="col-6 label fw-semibold">Arrival Time:</div>
                                                <div className="col-6 ">{arrivalTime}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <div className="row">
                                                <div className="col-6 label fw-semibold">Coach:</div>
                                                <div className="col-6 ">{status.coach.coachId}</div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="row">
                                                <div className="col-6 label fw-semibold">Total Passengers:</div>
                                                <div className="col-6 ">{count}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <div className="row">
                                                <div className="col-6 label fw-semibold">Booking Date:</div>
                                                <div className="col-6 ">{bookingDetails.bookingDate}</div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="row">
                                                <div className="col-6 label fw-semibold">Total Amount:</div>
                                                <div className="col-6 ">{status.fare.totalFare * count}</div>
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
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        passengersDetails.map((pass, index) => {
                                            return <tr>
                                                <th scope="row">{index + 1}</th>
                                                <td>{pass.passengerName}</td>
                                                <td>{pass.passengerGender}</td>
                                                <td>{pass.passengerAge}</td>
                                                <td>{pass.passengerIdCardType}</td>
                                                <td>{pass.passengerIdCardNumber}</td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                            {/* End Table with hoverable rows */}
                        </div>

                        {/* <div className="col-12 text-center">
                            <button className="btn btn-success" type="submit"><i className="bi bi-credit-card"></i> Make Payment</button>
                        </div> */}
                        <div>
                            <div className="col-12 text-center">
                                <button type="button"
                                    className="btn btn-success"
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                    onClick={getWalletBalance}>
                                    <i className="bi bi-credit-card"></i> Make Payment
                                </button>
                            </div>
                            {/* Button trigger modal */}
                            {/* Modal */}
                            <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">Payment</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                        </div>
                                        <div className="modal-body">
                                            <div className="row">
                                                <div className="col-6 label fw-semibold">Total Booking Amount:</div>
                                                <div className="col-6 ">{status.fare.totalFare * count}</div>
                                            </div>
                                            <div className="row">
                                                <div className="col-6 label fw-semibold">Available Wallet Balance:</div>
                                                <div className="col-6">{walletBalance}</div>
                                            </div>
                                            {
                                                (status.fare.totalFare * count) > walletBalance ?
                                                    <div className='insufficient-balance'><i className="bi bi-exclamation-circle"></i> Insufficient Balance</div>
                                                    :
                                                    <div className='sufficient-balance'><i className="bi bi-check-circle"></i> Sufficient Balance</div>
                                            }
                                            <hr />
                                            <div className="mt-2">
                                                <button type="button" className="btn btn-secondary me-2" data-bs-dismiss="modal">Cancel</button>
                                                {(status.fare.totalFare * count) <= walletBalance && <button type="submit" className="btn btn-success ms-2" onClick={makePayment}>Pay</button>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ConfirmBookingDetails