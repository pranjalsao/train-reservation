import React from 'react'
import UserDashboard from './userDashboard';
import { useEffect, useState } from 'react';
import axios from 'axios';
import config from './../../config';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';

const MyProfile = () => {

    const [userDetails, setUserDetails] = useState({});
    const [fullName, setFullName] = useState("");

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userDob, setUserDob] = useState('');
    const [userMobile, setUserMobile] = useState('');
    const [userAddress, setUserAddress] = useState('');
    const [userEmail, setUserEmail] = useState("");
    const [newPassword, setNewPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const navigate = useNavigate();



    useEffect(() => {
        // if(!sessionStorage['token'])
        // navigate('/error403')
        // else{
        // }
        loadUserDetails();

    }, [])

    const loadUserDetails = () => {
        axios
            .get(config.URL + '/user/get-details/' + sessionStorage["id"], {
                // headers: { token: sessionStorage['token'] },
                headers: { Authorization: sessionStorage['token'] }
            })
            .then((response) => {
                const result = response.data
                console.log(result);
                setUserDetails(result);
                setFullName(result.firstName + " " + result.lastName);
            })
            .catch((error) => {
                // console.log(error.response.data);
                toast.error(error.response.data);
            })
    }

    //Update User Profile
    const handleSubmit1 = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            form.classList.add('was-validated');
        } else {
            const body = {
                userId: sessionStorage["id"],
                firstName,
                lastName,
                userDob,
                userMobile,
                userAddress,
                userEmail: userDetails.userEmail

            }
            axios.put(config.URL + '/user/update', body, {
                headers: { Authorization: sessionStorage['token'] }
            })
                .then((response) => {
                    const result = response.data
                    console.log(result);
                    toast.success("Profile Updated Succesfully ✔")
                    window.location.reload();
                })
                .catch((error) => {
                    toast.error("Something went wrong ❌");
                    console.log(error);
                })
        }
    }

    //Change User Password
    const handleSubmit2 = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            form.classList.add('was-validated');
        } else {
            const body = { oldPassword, newPassword, confirmNewPassword };
            axios.put(config.URL + '/user/change-password/' + sessionStorage['id'], body, {
                headers: { Authorization: sessionStorage['token'] }
            })
                .then((response) => {
                    const result = response.data
                    console.log(result);
                    toast.success("Password Changed Succesfully ✔")
                    sessionStorage.clear();
                    navigate("/login");
                })
                .catch((error) => {
                    toast.error(error.response.data.message);
                    console.log(error);
                })
        }
    }

    return (
        <>
            <UserDashboard />
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>My Profile</h1>
                </div>{/* End Page Title */}
                <section className="section profile">
                    <div className="row">
                        <div className="col-lg-7">
                            <div className="card">
                                <div className="card-body pt-3">
                                    {/* Bordered Tabs */}
                                    <ul className="nav nav-tabs nav-tabs-bordered">
                                        <li className="nav-item">
                                            <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#profile-overview">Overview</button>
                                        </li>
                                        <li className="nav-item">
                                            <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-edit">Edit Profile</button>
                                        </li>
                                        <li className="nav-item">
                                            <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-change-password">Change
                                                Password</button>
                                        </li>
                                    </ul>
                                    <div className="tab-content pt-2">
                                        <div className="tab-pane fade show active profile-overview" id="profile-overview">
                                            <h5 className="card-title">Profile Details &nbsp;&nbsp;&nbsp;&nbsp; #{userDetails.userId}</h5>
                                            <div className="row">
                                                <div className="col-lg-3 col-md-4 label ">User ID</div>
                                                <div className="col-lg-9 col-md-8">{userDetails.userId}</div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-3 col-md-4 label ">Full Name</div>
                                                <div className="col-lg-9 col-md-8">{fullName}</div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-3 col-md-4 label">Date Of Birth</div>
                                                <div className="col-lg-9 col-md-8">{userDetails.userDob}</div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-3 col-md-4 label">Address</div>
                                                <div className="col-lg-9 col-md-8">{userDetails.userAddress}</div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-3 col-md-4 label">Email</div>
                                                <div className="col-lg-9 col-md-8">{userDetails.userEmail}</div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-3 col-md-4 label">Mobile</div>
                                                <div className="col-lg-9 col-md-8">{userDetails.userMobile}</div>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade profile-edit pt-3" id="profile-edit">
                                            {/* Profile Edit Form */}
                                            <form className="needs-validation" noValidate onSubmit={handleSubmit1}>
                                                <div className="row mb-3">
                                                    <label htmlFor="userId" className="col-md-4 col-lg-3 col-form-label">User ID</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input name="userId" type="text" className="form-control" id="userId"
                                                            defaultValue={userDetails.userId} required disabled
                                                            onChange={(e) => {
                                                                setFirstName(e.target.value);
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label htmlFor="fullName" className="col-md-4 col-lg-3 col-form-label">First Name</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input name="firstName" type="text" className="form-control" id="firstName"
                                                            required
                                                            onChange={(e) => {
                                                                setFirstName(e.target.value);
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label htmlFor="fullName" className="col-md-4 col-lg-3 col-form-label">Last Name</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input name="fullName" type="text" className="form-control" id="lastName"
                                                            required
                                                            onChange={(e) => {
                                                                setLastName(e.target.value);
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label htmlFor="company" className="col-md-4 col-lg-3 col-form-label">Date Of Birth</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input name="company" type="date" className="form-control" id="company"
                                                            required
                                                            onChange={(e) => {
                                                                setUserDob(e.target.value);
                                                            }} />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label htmlFor="Job" className="col-md-4 col-lg-3 col-form-label">Address</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input name="job" type="text" className="form-control" id="Job"
                                                            required
                                                            onChange={(e) => {
                                                                setUserAddress(e.target.value);
                                                            }} />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label htmlFor="email" className="col-md-4 col-lg-3 col-form-label">Email</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input name="userEmail" type="text" className="form-control" id="email"
                                                            defaultValue={userDetails.userEmail} required disabled />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label htmlFor="Address" className="col-md-4 col-lg-3 col-form-label">Mobile (+91)</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input name="address" type="text" className="form-control" id="Address"
                                                            required
                                                            onChange={(e) => {
                                                                setUserMobile(e.target.value);
                                                            }} />
                                                    </div>
                                                </div>
                                                <div className="text-center">
                                                    <button type="submit" className="btn btn-primary">Save Changes</button>
                                                </div>
                                            </form>{/* End Profile Edit Form */}
                                        </div>
                                        <div className="tab-pane fade pt-3" id="profile-change-password">
                                            {/* Change Password Form */}
                                            <form className='needs-validation' noValidate onSubmit={handleSubmit2}>
                                                <div className="row mb-3 d-flex align-items-center">
                                                    <label htmlFor="oldPassword" className="col-md-4 col-lg-3 col-form-label">Current
                                                        Password</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input name="oldPassword" type="password" className="form-control"
                                                            id="oldPassword" required
                                                            onChange={(e) => {
                                                                setOldPassword(e.target.value);
                                                            }} />
                                                    </div>
                                                </div>
                                                <div className="row mb-3 d-flex align-items-center">
                                                    <label htmlFor="newPassword" className="col-md-4 col-lg-3 col-form-label">New
                                                        Password</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input name="newpassword" type="password" className="form-control"
                                                            id="newPassword" required
                                                            onChange={(e) => {
                                                                setNewPassword(e.target.value);
                                                            }} />
                                                    </div>
                                                </div>
                                                <div className="row mb-3 d-flex align-items-center">
                                                    <label htmlFor="renewPassword" className="col-md-4 col-lg-3 col-form-label">Re-enter New
                                                        Password</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input name="renewpassword" type="password" className="form-control"
                                                            id="renewPassword" required
                                                            onChange={(e) => {
                                                                setConfirmNewPassword(e.target.value);
                                                            }} />
                                                    </div>
                                                </div>
                                                <div className="text-center">
                                                    <button type="submit" className="btn btn-primary">Change Password</button>
                                                </div>
                                            </form>{/* End Change Password Form */}
                                        </div>
                                    </div>{/* End Bordered Tabs */}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>{/* End #main */}

        </>
    )
}

export default MyProfile