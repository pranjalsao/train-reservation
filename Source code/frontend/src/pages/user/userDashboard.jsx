import React, { useState, useEffect, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { signout } from '../../slices/authSlice'
import axios from 'axios';
import config from '../../config';
import logo from '../../assets/img/trainlogo.jpg'


const UserDashboard = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch()

    useEffect(() => {
        isLoggedIn();
    }, [])

    const isLoggedIn = () => {
        if (!sessionStorage['token']) {
            navigate("/login")
            toast.info("You are not logged in! Login to Continue.")
        }
        else if (!(sessionStorage['role'] == "USER")) {
            navigate('/error403');
        }
        else {
            loadUserDetails();
        }
    }

    const logout = () => {
        sessionStorage.clear();
        navigate("/login");
        toast.info("Logged Out Successfully")
    }

    const loadUserDetails = () => {
        axios
            .get(config.URL + '/user/get-details/' + sessionStorage["id"], {
                // headers: { token: sessionStorage['token'] },
                headers: { Authorization: sessionStorage['token'] }
            })
            .then((response) => {
                const result = response.data
                console.log(result);
                setFirstName(result.firstName)
                setLastName(result.lastName)

            })
            .catch((error) => {
                console.log(error.response.data);
            })
    }

    // const signinstatus = useSelector((state) => state.authSlice.status)

    // const signOut = () => {
    //     dispatch(signout(signinstatus))
    //     toast.success('Logged out successfully!!')
    // }

    return (

        <>
            <header id="header" className="header fixed-top d-flex align-items-center justify-content-between" style={{ backgroundColor: '#012970' }} >
                <div className="d-flex align-items-center justify-content-between">
                    <div className="logo d-flex align-items-center" >
                        <span className="d-lg-block">Welcome {firstName}</span>
                    </div>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                    <div href="index.html" className="logo d-flex align-items-center w-auto justify-content-center my-4">
                        <img src={logo} style={{ height: 20, width: 30 }} alt="LOGO" />
                        <span className="d-none d-lg-block">Train Reservation System</span>
                    </div>

                    {/* <i className="bi bi-list toggle-sidebar-btn" /> */}
                </div>{/* End Logo */}
                <div className="d-flex me-3">
                    {/* <button className="btn btn-secondary" onClick={logout}>
                        <span className="d-lg-block">Logout</span>
                    </button> */}
                    <ul className="d-flex align-items-center mt-3">
                        <li className="nav-item dropdown pe-3">
                            <Link className="nav-link nav-profile logo" to="/#" data-bs-toggle="dropdown">
                                <span className="dropdown-toggle nav-item" style={{ color: '#fff' }} >Account</span>
                            </Link>
                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                                <li className="dropdown-header">
                                    <h6>{firstName} {lastName}</h6>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li>
                                    <Link className="dropdown-item d-flex align-items-center" to="/user/my-profile">
                                        <i className="bi bi-person" />
                                        <span>My Profile</span>
                                    </Link>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li>
                                    <Link className="dropdown-item d-flex align-items-center" onClick={logout} to='/login'>
                                        <i className="bi bi-box-arrow-right" />
                                        <span>Sign Out</span>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </header>

            <aside id="sidebar" className="sidebar">
                <ul className="sidebar-nav" id="sidebar-nav">
                    <li className="nav-item">
                        <Link className="nav-link collapsed" to="/user/search-train">
                            <i className="bi bi-search" />
                            <span>Search Train</span>
                        </Link>
                    </li>{/* End Dashboard Nav */}
                    <li className="nav-item">
                        <Link className="nav-link collapsed" to="/user/my-booking">
                            <i className="bi bi-menu-button-wide" />
                            <span>My Bookings</span>
                        </Link>
                    </li>{/* End Components Nav */}

                    {/* <li className="nav-heading">Pages</li> */}

                    <li className="nav-item">
                        <Link className="nav-link collapsed" to="/user/my-profile">
                            <i className="bi bi-person" />
                            <span>My Profile</span>
                        </Link>
                    </li>{/* End Profile Page Nav */}
                    <li className="nav-item">
                        <Link className="nav-link collapsed" to="/user/my-wallet">
                            <i className="bi bi-wallet2" />
                            <span>My Wallet</span>
                        </Link>
                    </li>{/* End F.A.Q Page Nav */}
                    <li className="nav-item" >
                        <button className="nav-link collapsed btn col-lg-12" onClick={logout} >
                            <i className="bi bi-box-arrow-left" />
                            <span>Logout</span>
                        </button>
                    </li>{/* End Register Page Nav */}
                    <li className="nav-heading">CONTACT</li>
                    <li className="nav-item">
                        <Link className="nav-link collapsed" to="/user/contact-us">
                            <i className="bi bi-envelope" />
                            <span>Contact Us</span>
                        </Link>
                    </li>{/* End Login Page Nav */}
                </ul>
            </aside>
        </>
    )
}

export default UserDashboard