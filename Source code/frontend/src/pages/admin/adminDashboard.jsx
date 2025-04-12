import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { signout } from '../../slices/authSlice'
import { useEffect } from 'react';
import { useState } from 'react';
import config from '../../config';
import axios from 'axios';
import { toast } from 'react-toastify';
import logo from '../../assets/img/trainlogo.jpg'

const AdminDashboard = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const dispatch = useDispatch()

    const navigate = useNavigate()

    useEffect(() => {
        isLoggedIn();
    }, [])



    const isLoggedIn = () => {
        if (!sessionStorage['token']) {
            toast.error("You are not logged in! Login to Continue.")
            navigate("/login")
        }
        else if (!(sessionStorage['role'] == "ADMIN")) {
            navigate('/error403');
        }
        else {
            loadUserDetails();
        }
    }

    const loadUserDetails = () => {
        axios
            .get(config.URL + '/admin/get-details/' + sessionStorage["id"], {
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


    const signinstatus = useSelector((state) => state.authSlice.status)

    const signOut = () => {
        dispatch(signout(signinstatus))
        toast.success('Logged out successfully!!')
    }

    return (
        <>
            <header id="header" className="header fixed-top d-flex align-items-center justify-content-between" style={{ backgroundColor: '#012970' }}>
                <div className="d-flex align-items-center justify-content-between">
                    <div className="logo d-flex align-items-center">
                        <span className="d-md-block">Welcome: {firstName}</span>
                    </div>

                    {/* <i className="bi bi-list toggle-sidebar-btn" /> */}
                </div>{/* End Logo */}
                {/* <div className="search-bar">
                <form className="search-form d-flex align-items-center" method="POST" action="#">
                    <input type="text" name="query" placeholder="Search" title="Enter search keyword" />
                    <button type="submit" title="Search"><i className="bi bi-search" /></button>
                </form>
            </div>End Search Bar */}
                <div className="d-flex align-items-center justify-content-between">
                    <div className="logo d-flex align-items-center">
                        <span className="d-lg-block">
                            <img src={logo} alt="LOGO"></img>
                            TRAIN RESERVATION SYSTEM
                        </span>
                    </div>

                    {/* <i className="bi bi-list toggle-sidebar-btn" /> */}
                </div>{/* End Logo */}
                <nav className="header-nav me-2">
                    <ul className="d-flex align-items-center">
                        <li className="nav-item dropdown pe-3">
                            <Link className="nav-link nav-profile" to="/#" data-bs-toggle="dropdown">
                                <span className="dropdown-toggle ps-5 logo" style={{ color: '#fff' }}>Account</span>
                            </Link>{/* End Profile Iamge Icon */}
                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                                <li className="dropdown-header">
                                    <h6>{firstName} {lastName}</h6>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li>
                                    <Link className="dropdown-item d-flex align-items-center" to="/admin/my-profile">
                                        <i className="bi bi-person" />
                                        <span>My Profile</span>
                                    </Link>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li>
                                    <Link className="dropdown-item d-flex align-items-center" onClick={signOut} to='/login'>
                                        <i className="bi bi-box-arrow-right" />
                                        <span>Sign Out</span>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </header>

            <aside id="sidebar" className="sidebar">
                <ul className="sidebar-nav" id="sidebar-nav">
                    <li className="nav-item">
                        <Link className="nav-link collapsed" to="/admin/show-all-trains">
                            <i class="bi bi-collection"></i>
                            <span>Show Trains</span>
                        </Link>
                    </li>{/* End Dashboard Nav */}
                    <li className="nav-item">
                        <Link className="nav-link collapsed" to="/admin/showbookings">
                            <i className="bi bi-menu-button-wide" />
                            <span>Show Bookings</span>
                        </Link>
                    </li>{/* End Components Nav */}

                    <li className="nav-item">
                        <Link className="nav-link collapsed" to="/admin/seat-count">
                            <i class="bi bi-collection"></i>
                            <span>Show Seat Count Train Type Wise</span>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link collapsed" to="/admin/all-stations">
                            <i class="bi bi-collection"></i>
                            <span>Show Stations</span>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link collapsed" to="/admin/userdetails">
                            <i class="bi bi-collection"></i>
                            <span>Show Users Details</span>
                        </Link>
                    </li>

                    {/* <li className="nav-heading">Pages</li> */}

                    <li className="nav-item">
                        <Link className="nav-link collapsed" to="/admin/my-profile">
                            <i className="bi bi-person" />
                            <span>My Profile</span>
                        </Link>
                    </li>{/* End Profile Page Nav */}


                    <li class="nav-item">
                        <a class="nav-link collapsed" data-bs-target="#components-nav" data-bs-toggle="collapse" href="#">
                            <i class="bi bi-patch-plus-fill"></i><span>Add</span><i class="bi bi-chevron-down ms-auto"></i>
                        </a>
                        <ul id="components-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li className="nav-item">
                                <Link className="nav-link collapsed" to="/admin/add-train">
                                    <i class="bi bi-patch-plus-fill"></i>
                                    <span>New Train</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link collapsed" to="/admin/add-train-type">
                                    <i class="bi bi-patch-plus-fill"></i>
                                    <span>New Train Type</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link collapsed" to="/admin/add-station">
                                    <i class="bi bi-patch-plus-fill"></i>
                                    <span>New Station</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link collapsed" to="/admin/add-coach">
                                    <i class="bi bi-patch-plus-fill"></i>
                                    <span>New Coach Class</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link collapsed" to="/admin/add-route">
                                    <i class="bi bi-patch-plus-fill"></i>
                                    <span>New Route for train</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link collapsed" to="/admin/add-seatcount">
                                    <i class="bi bi-patch-plus-fill"></i>
                                    <span>Seat Count for train</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link collapsed" to="/admin/add-schedule">
                                    <i class="bi bi-patch-plus-fill"></i>
                                    <span>New Schedule for train</span>
                                </Link>
                            </li>
                        </ul>
                    </li>



                    <li class="nav-item">
                        <a class="nav-link collapsed" data-bs-target="#update-nav" data-bs-toggle="collapse" href="#">
                            <i class="bi bi-arrow-repeat"></i><span>Update Train Info</span><i class="bi bi-chevron-down ms-auto"></i>
                        </a>
                        <ul id="update-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">


                            <li className="nav-item">
                                <Link className="nav-link collapsed" to="/admin/update-fare-per-km">
                                    <i class="bi bi-pencil-square"> </i>
                                    <span>Update fare per km</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link collapsed" to="/admin/update-special-charges">
                                    <i class="bi bi-pencil-square"> </i>
                                    <span>Update Special Charges</span>
                                </Link>
                            </li>
                        </ul>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link collapsed" data-bs-target="#delete-nav" data-bs-toggle="collapse" href="#">
                            <i class="bi bi-trash-fill"></i><span>Delete</span><i class="bi bi-chevron-down ms-auto"></i>
                        </a>
                        <ul id="delete-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li className="nav-item">
                                <Link className="nav-link collapsed" to="/admin/delete-seatcount">
                                    <i class="bi bi-trash-fill"></i>
                                    <span>Delete Coach Class of Train</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link collapsed" to="/admin/delete-route">
                                    <i class="bi bi-trash-fill"></i>
                                    <span>Delete route of Train</span>
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link collapsed" to="/admin/delete-schedule">
                                    <i class="bi bi-trash-fill"></i>
                                    <span>Delete schedule of Train</span>
                                </Link>
                            </li>
                        </ul>
                    </li>


                    <li className="nav-heading">CONTACT</li>
                    <li className="nav-item">
                        <Link className="nav-link collapsed" to="/admin/contact-us">
                            <i className="bi bi-envelope" />
                            <span>Contact Us</span>
                        </Link>
                    </li>{/* End Login Page Nav */}
                </ul>
            </aside>
        </>
    );

}


export default AdminDashboard