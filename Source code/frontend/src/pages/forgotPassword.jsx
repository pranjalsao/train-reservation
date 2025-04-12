import Navbar from "../components/navbar"
import logo from "../assets/img/trainlogo.jpg"
import { useState } from "react"
import config from "../config"
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom"
import axios from "axios"
import wave from '../assets/img/wave3.svg'
// import logo from '../assets/img/trainlogo.jpg'

const ForgotPassword = () => {
    const [userEmail, setUserEmail] = useState('')
    const [securityQues, setSecurityQues] = useState('')
    const [securityAns, setSecurityAns] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            form.classList.add('was-validated');
        } else {
            const body = {
                userEmail, securityQues, securityAns
            }
            console.log(body);
            axios.post(config.URL + "/forgot-password", body)
                .then((response) => {
                    const result = response.data;
                    console.log(result["message"]);
                    toast.success(result.message)
                    navigate('/otp-confirm', { state: { email: userEmail } })
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
            <div className="container-fluid " style={{
                backgroundImage: `url(${wave})`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover',
                backgroundPosition: "right",
            }}>


                <div className="container">
                    <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                        <div className="container">
                            <div href="index.html" className="logo d-flex align-items-center w-auto justify-content-center my-3">
                                <img src={logo} style={{ height: 80, width: 30 }} alt="LOGO" />
                                <span className="d-none d-lg-block" style={{color:'darkblue'}}>Train Reservation System</span>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <div className="pt-2 pb-2">
                                                <h5 className="card-title text-center pb-0 fs-4">Forgot Password?</h5>
                                                <p className="text-center small">Enter your email &amp; security info to get OTP</p>
                                            </div>

                                            <form className="row g-3" noValidate onSubmit={handleSubmit}>
                                                <div className="col-12">
                                                    <label htmlFor="userEmail" className="form-label">Email</label>
                                                    <div className="input-group has-validation">
                                                        <span className="input-group-text" id="inputGroupPrepend">@</span>
                                                        <input type="email" name="userEmail" className="form-control" id="userEmail" required
                                                            onChange={(event) => {
                                                                setUserEmail(event.target.value)
                                                            }}
                                                        />
                                                        <div className="invalid-feedback">Please enter your email!</div>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <label for="securityQues" class="form-label">Security Question</label>
                                                    <select id="securityQues" className="form-select" name="securityquestion" size="1" onChange={(event) => {
                                                        setSecurityQues(event.target.value)
                                                    }}>
                                                        <option value="0">Please select Security Question</option>
                                                        <option value="What is your hobby?" >What is your hobby?</option>
                                                        <option value="What is your favourite sports?">What is your favourite sports?</option>
                                                        <option value="What is your favourite color?">What is your favourite color?</option>
                                                        <option value="What is your favourite movie?">What is your favourite movie?</option>
                                                    </select>
                                                    <div className="invalid-feedback">Please select Security Question!</div>
                                                </div>

                                                <div className="col-12">
                                                    <label for="securityAns" class="form-label">Security Answer</label>
                                                    <input type="text" name="answer" className="form-control" id="yourAnswer" required
                                                        onChange={(event) => {
                                                            setSecurityAns(event.target.value)
                                                        }} />
                                                    <div className="invalid-feedback">Please enter Security Answer!</div>
                                                </div>

                                                <div className="col-12">
                                                    <button className="btn btn-success w-100" type="submit">Submit</button>
                                                </div>

                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

        </>

    )
}


export default ForgotPassword