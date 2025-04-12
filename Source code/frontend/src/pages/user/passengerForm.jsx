import React from 'react'
import UserDashboard from './userDashboard';
import { useState, useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { format } from 'date-fns'
import moment from 'moment';
import { toast } from 'react-toastify';

const PassengerForm = () => {
    // let [addPasenger, setAdd] = useState({})
    // let [passArr, setPassArr] = useState([])

    const [count, setCount] = useState(0);

    const [passNama1, setPassName1] = useState('');
    const [passGender1, setPassGender1] = useState('');
    const [passAge1, setPassAge1] = useState(0);
    const [passIdCardType1, setPassIdCardType1] = useState('');
    const [passIdCardNumber1, setPassIdCardNumber1] = useState('');

    const [passNama2, setPassName2] = useState('');
    const [passGender2, setPassGender2] = useState('');
    const [passAge2, setPassAge2] = useState(0);
    const [passIdCardType2, setPassIdCardType2] = useState('');
    const [passIdCardNumber2, setPassIdCardNumber2] = useState('');

    const [passNama3, setPassName3] = useState('');
    const [passGender3, setPassGender3] = useState('');
    const [passAge3, setPassAge3] = useState(0);
    const [passIdCardType3, setPassIdCardType3] = useState('');
    const [passIdCardNumber3, setPassIdCardNumber3] = useState('');


    const navigate = useNavigate();
    const { state } = useLocation();

    if (!state) {
        toast.error("You are not logged in! Login to Continue.")
        return <Navigate to="/login" />
    }

    const { trainFound, status, route1, route2, distance,
        duration, arrivalDate, arrivalTime } = state;


    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            form.classList.add('was-validated');
        } else {
            const passengersDetails = [
                {
                    "passengerName": passNama1,
                    "passengerGender": passGender1,
                    "passengerAge": passAge1,
                    "passengerIdCardType": passIdCardType1,
                    "passengerIdCardNumber": passIdCardNumber1,
                    "passengerFare": status.fare.totalFare
                },
                {
                    "passengerName": passNama2,
                    "passengerGender": passGender2,
                    "passengerAge": passAge2,
                    "passengerIdCardType": passIdCardType2,
                    "passengerIdCardNumber": passIdCardNumber2,
                    "passengerFare": status.fare.totalFare
                },
                {
                    "passengerName": passNama3,
                    "passengerGender": passGender3,
                    "passengerAge": passAge3,
                    "passengerIdCardType": passIdCardType3,
                    "passengerIdCardNumber": passIdCardNumber3,
                    "passengerFare": status.fare.totalFare
                }
            ]
            const bookingDetails = {
                "bookingDate": moment(new Date()).format('YYYY-MM-DD')
            }
            console.log(passengersDetails);
            console.log(bookingDetails);
            console.log(count + 1);
            passengersDetails.splice(count + 1);
            navigate("/user/confirm-booking-details", {
                state: {
                    trainFound, status, route1, route2,
                    distance, duration, arrivalDate, arrivalTime,
                    passengersDetails, bookingDetails, count: count + 1
                }
            })
        }
    }

    return (
        <>
            <UserDashboard />
            <div className="main" id="main">
                <div className="pagetitle">
                    <h1>Passenger Form</h1>
                </div>
                <section className="section">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Enter Passenger Details</h5>

                                    <form className="row g-3 needs-validation" noValidate onSubmit={handleSubmit}>
                                        <div className="col-md-2">
                                            <label htmlFor="validationCustom01" className="form-label">Passenger Name</label>
                                            <input name="passName" type="text" className="form-control" id="validationCustom01"
                                                required onChange={(e) => {
                                                    setPassName1(e.target.value);
                                                }} />
                                        </div>
                                        <div className="col-md-2">
                                            <label htmlFor="validationCustom02" className="form-label">Gender</label>
                                            <select className="form-select" name="gender" id="validationCustom04" required
                                                onInput={(e) => {
                                                    setPassGender1(e.target.value);
                                                }}>
                                                <option selected disabled value="">Choose...</option>
                                                <option value="MALE">MALE</option>
                                                <option value="FEMALE">FEMALE</option>
                                            </select>
                                        </div>
                                        <div className="col-md-2">
                                            <label htmlFor="validationCustomUsername" className="form-label">Age</label>
                                            <div className="input-group has-validation">
                                                <input type="number" name="passAge" className="form-control" id="validationCustomUsername"
                                                    aria-describedby="inputGroupPrepend" required
                                                    onChange={(e) => {
                                                        setPassAge1(e.target.value);
                                                    }} />
                                            </div>
                                        </div>
                                        <div className="col-md-2">
                                            <label htmlFor="validationCustom02" className="form-label">ID Card Type</label>
                                            <select className="form-select" name='passId' id="validationCustom04" required
                                                onInput={(e) => {
                                                    setPassIdCardType1(e.target.value);
                                                }}>
                                                <option selected disabled value="">Choose...</option>
                                                <option value="PAN">PAN</option>
                                                <option value="AADHAR">AADHAR</option>
                                            </select>
                                        </div>
                                        <div className="col-md-2">
                                            <label htmlFor="validationCustom04" className="form-label">ID Card Number</label>
                                            <div className="input-group has-validation">
                                                <input type="text" name="passIdNumber" className="form-control" id="validationCustomUsername"
                                                    aria-describedby="inputGroupPrepend" required
                                                    onChange={(e) => {
                                                        setPassIdCardNumber1(e.target.value);
                                                    }} />
                                            </div>
                                        </div>
                                        <div className="col-md-2">
                                            <label htmlFor="validationCustom05" className="form-label">Fare</label>
                                            <input type="text" name='fare' className="form-control" id="validationCustom05"
                                                defaultValue={status.fare.totalFare} disabled required />
                                        </div>

                                        {/* {new Array(count).fill(0).map((ele) => {
                                            return null;
                                        })} */}

                                        {(count == 1 || count == 2) && <>
                                            <div className="col-md-2">
                                                <input type="text" className="form-control" id="validationCustom01"
                                                    required onChange={(e) => {
                                                        setPassName2(e.target.value);
                                                    }} name="passName" />
                                            </div>
                                            <div className="col-md-2">
                                                <select className="form-select" id="validationCustom04" name="gender" required
                                                    onInput={(e) => {
                                                        setPassGender2(e.target.value);
                                                    }}>
                                                    <option selected disabled value="">Choose...</option>
                                                    <option value="MALE">MALE</option>
                                                    <option value="FEMALE">FEMALE</option>
                                                </select>
                                            </div>
                                            <div className="col-md-2">
                                                <div className="input-group has-validation">
                                                    <input type="number" name="passAge" className="form-control" id="validationCustomUsername"
                                                        aria-describedby="inputGroupPrepend" required
                                                        onChange={(e) => {
                                                            setPassAge2(e.target.value);
                                                        }} />
                                                </div>
                                            </div>
                                            <div className="col-md-2">
                                                <select name="passId" className="form-select" id="validationCustom04" required
                                                    onInput={(e) => {
                                                        setPassIdCardType2(e.target.value);
                                                    }}>
                                                    <option selected disabled value="">Choose...</option>
                                                    <option value="PAN">PAN</option>
                                                    <option value="AADHAR">AADHAR</option>
                                                </select>
                                            </div>
                                            <div className="col-md-2">
                                                <div className="input-group has-validation">
                                                    <input type="text" name="passIdNumber" className="form-control" id="validationCustomUsername"
                                                        aria-describedby="inputGroupPrepend" required
                                                        onChange={(e) => {
                                                            setPassIdCardNumber2(e.target.value);
                                                        }} />
                                                </div>
                                            </div>
                                            <div className="col-md-2">
                                                <input type="text" name='fare' className="form-control" id="validationCustom05"
                                                    defaultValue={status.fare.totalFare} disabled required />
                                            </div>
                                        </>}

                                        {(count == 2) && <>
                                            <div className="col-md-2">
                                                <input type="text" className="form-control" id="validationCustom01"
                                                    required onChange={(e) => {
                                                        setPassName3(e.target.value);
                                                    }} name="passName" />
                                            </div>
                                            <div className="col-md-2">
                                                <select className="form-select" id="validationCustom04" name="gender" required
                                                    onInput={(e) => {
                                                        setPassGender3(e.target.value);
                                                    }}>
                                                    <option selected disabled value="">Choose...</option>
                                                    <option value="MALE">MALE</option>
                                                    <option value="FEMALE">FEMALE</option>
                                                </select>
                                            </div>
                                            <div className="col-md-2">
                                                <div className="input-group has-validation">
                                                    <input type="number" name="passAge" className="form-control" id="validationCustomUsername"
                                                        aria-describedby="inputGroupPrepend" required
                                                        onChange={(e) => {
                                                            setPassAge3(e.target.value);
                                                        }} />
                                                </div>
                                            </div>
                                            <div className="col-md-2">
                                                <select name="passId" className="form-select" id="validationCustom04" required
                                                    onInput={(e) => {
                                                        setPassIdCardType3(e.target.value);
                                                    }}>
                                                    <option selected disabled value="">Choose...</option>
                                                    <option value="PAN">PAN</option>
                                                    <option value="AADHAR">AADHAR</option>
                                                </select>
                                            </div>
                                            <div className="col-md-2">
                                                <div className="input-group has-validation">
                                                    <input type="text" name="passIdNumber" className="form-control" id="validationCustomUsername"
                                                        aria-describedby="inputGroupPrepend" required
                                                        onChange={(e) => {
                                                            setPassIdCardNumber3(e.target.value);
                                                        }} />
                                                </div>
                                            </div>
                                            <div className="col-md-2">
                                                <input type="text" name='fare' className="form-control" id="validationCustom05"
                                                    defaultValue={status.fare.totalFare} disabled required />
                                            </div>
                                        </>}
                                        {count < 2 && <button className='btn btn-success col-md-3 m-auto mt-4' onClick={(e) => {
                                            e.preventDefault()
                                            setCount(count + 1)
                                        }}><i className="bi bi-person-plus"></i> Add Passenger</button>}
                                        {count > 0 && <button className='btn btn-danger col-md-3 m-auto mt-4' onClick={(e) => {
                                            e.preventDefault()
                                            setCount(count - 1)
                                        }}><i className="bi bi-person-dash"></i> Remove Passenger</button>}
                                        <div className="col-12 text-center">
                                            <button className="btn btn-primary" type="submit"><i className="bi bi-check-circle"></i> Confirm Booking Details</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default PassengerForm