
import Navbar from "../components/navbar"
import logo from "../assets/img/trainlogo.jpg"
import { useState, useEffect } from "react"
import config from "../config"
import { toast } from 'react-toastify'
import { Navigate, useNavigate, useLocation } from "react-router-dom"
import axios from "axios"
import { Link } from 'react-router-dom'

const OtpConfirm = () => {
    const [userEmail, setUserEmail] = useState("");
    const [otp, setOtp] = useState('')
    const navigate = useNavigate();
    const location = useLocation()


    useEffect(() => {
        if (!location.state) {
            return navigate('/error403')
        }
        else {
            const { email } = location.state
            setUserEmail(email)
        }
    })







    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            form.classList.add('was-validated');
        } else {
            const body = {
                userEmail, otp
            }
            console.log(body);
            axios
                .post(config.URL + "/otp-confirm", body)
                .then((response) => {
                    const result = response.data;
                    console.log(result["message"]);
                    console.log(result);
                    if (response.status === 200) {
                        toast.success("OTP matches!!Please set new password")
                        navigate('/change-password', { state: { emailId: userEmail } })
                    }

                })
                .catch((error) => {
                    const errorResult = error.response.data;
                    console.log(error);
                    toast.error(errorResult["message"]);
                })
        }

    }


    return (
        <>
            <Navbar />
            <div className="container">
                <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                                <div className="d-flex justify-content-center py-4">
                                    <a href="index.html" className="logo d-flex align-items-center w-auto">
                                        <img src={logo} alt="" />
                                        <span className="d-none d-lg-block" style={{color:'darkblue'}}>Train Reservation System</span>
                                    </a>
                                </div>{/* End Logo */}
                                <div className="card mb-3">
                                    <div className="card-body">
                                        <div className="pt-4 pb-2">
                                            <h5 className="card-title text-center pb-0 fs-4">OTP Confirmation</h5>
                                            <p className="text-center small">Please enter OTP you recieved in mail</p>
                                        </div>

                                        <form className="row g-3" noValidate onSubmit={handleSubmit}>
                                            <div className="col-12">
                                                <label htmlFor="userEmail" className="form-label">OTP</label>
                                                <div className="input-group has-validation">
                                                    <input type="text" name="otp" className="form-control" id="otp" required
                                                        onChange={(event) => {
                                                            setOtp(event.target.value)
                                                        }}
                                                    />
                                                    <div className="invalid-feedback">Please enter OTP!</div>
                                                </div>
                                            </div>

                                            <div className="col-12">
                                                <button className="btn btn-success w-100" type="submit">Submit</button>
                                            </div>
                                            <div className="col-12">
                                                <p className="small mb-0">Didn't get OTP?<Link to='/forgot-password' onSubmit={handleSubmit}>
                                                    Resend</Link>
                                                </p>
                                            </div>

                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}


export default OtpConfirm