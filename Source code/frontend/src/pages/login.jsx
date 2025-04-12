import React, { useState } from 'react'
import logo from '../assets/img/trainlogo.jpg'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import config from './../config';
import Navbar from '../components/navbar'
import { signin } from '../slices/authSlice'
import { useEffect } from 'react';
import wave from '../assets/img/wave3.svg'

const Login = () => {

    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const dispatch = useDispatch()
    const navigate = useNavigate();


    useEffect(() => {
        if (sessionStorage['token'] && sessionStorage['role'] == 'ADMIN')
            navigate('/admin/my-profile')
        else if (sessionStorage['token'] && sessionStorage['role'] == 'USER')
            navigate('/user/search-train');
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            form.classList.add('was-validated');
        } else {
            const body = {
                userEmail, userPassword
            }
            console.log(body);
            axios
                .post(config.URL + "/login", body)
                .then((response) => {
                    const result = response.data;
                    console.log(result["message"]);
                    console.log(result);

                    dispatch(signin(result))
                    toast.success('Login Successful for ID:' + result.userId + ' WELCOME!! ');
                    if (result["role"] === "ADMIN")
                        navigate('/admin/my-profile')
                    else
                        navigate('/user/search-train');
                })
                .catch((error) => {
                    const errorResult = error.response.data;
                    console.log(errorResult);
                    // toast.error(errorResult["message"]);
                    toast.error("Invalid Credentials!")
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
                            <div href="index.html" className="logo d-flex align-items-center w-auto justify-content-center my-4">
                                <img src={logo} style={{ height: 80, width: 30 }} alt="LOGO" />
                                <span className="d-none d-lg-block" style={{ color: 'darkblue' }}>Train Reservation System</span>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <div className="pt-2 pb-2">
                                                <h5 className="card-title text-center pb-0 fs-4">Login to Your Account</h5>
                                                <p className="text-center small">Enter your email &amp; password to login</p>
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
                                                    <label htmlFor="userPassword" className="form-label">Password</label>
                                                    <input type="password" name="userPassword" className="form-control" id="userPassword" required
                                                        onChange={(event) => {
                                                            setUserPassword(event.target.value)
                                                        }}
                                                    />
                                                    <div className="invalid-feedback">Please enter your password!</div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" name="remember" defaultChecked="true" id="rememberMe" required />
                                                        <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                                                        <div className="invalid-feedback">Must be checked!</div>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <button className="btn btn-primary w-100" type="submit">Login</button>
                                                </div>
                                                <div className="col-12">
                                                    <p className="small mb-0">Forgot Password?<Link to='/forgot-password'> Click here</Link>
                                                    </p>
                                                </div>
                                                <div className="col-12">
                                                    <p className="small mb-0">Don't have an account? <Link to='/register'>Create an account</Link>
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
            </div>
        </>
    )
}

export default Login



