import AdminDashboard from "./adminDashboard"
import { useSelector, useDispatch } from 'react-redux'
import { useState } from "react"
import { useEffect } from "react"
import axios from "axios"
import { toast } from 'react-toastify'
import config from "../../config"
import { useNavigate } from "react-router-dom"

const AdminProfile = () => {

    const [userDetails, setUserDetails] = useState({});
    const [userId, setUserId] = useState('')
    const [userDob, setUserDob] = useState('');
    const [userMobile, setUserMobile] = useState('');
    const [userAddress, setUserAddress] = useState('');
    const [userEmail, setUserEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmPassword] = useState('')
    const [oldPassword, setOldPassword] = useState('')

    // const navigate = useNavigate()

    useEffect(() => {
        loadUserDetails();
    }, [])



    const loadUserDetails = () => {
        axios
            .get(config.URL + '/admin/get-details/' + sessionStorage["id"], {
                // headers: { token: sessionStorage['token'] },
                headers: { Authorization: sessionStorage['token'] }
            })
            .then((response) => {
                const result = response.data
                console.log(result);
                setUserDetails(result);
                setUserId(result.userId);
                setFirstName(result.firstName)
                setLastName(result.lastName)
                setUserAddress(result.userAddress)
                setUserEmail(result.userEmail)
                setUserMobile(result.userMobile)
                setUserDob(result.userDob)
            })
            .catch((error) => {
                // console.log(error.response.data);
                toast.error(error.response.data);
            })
    }

    const body = { userId, firstName, lastName, userDob, userAddress, userEmail, userMobile }

    const updateProfile = () => {
        axios.put(config.URL + '/admin/update', body,
            { headers: { Authorization: sessionStorage['token'] } })
            .then((response) => {
                toast.success(response.data.message)
            })
            .catch((error) => {
                console.log(error)
                toast.error(error.response.data.message)
            })
    }
    const pbody = { oldPassword, newPassword, confirmNewPassword }

    const changePassword = () => {
        axios.put(config.URL + '/admin/change-password/' + userId, pbody,
            { headers: { Authorization: sessionStorage['token'] } })
            .then((response) => {
                if (response.status === 200)
                    toast.success(response.data.message)
            })
            .catch((error) => {
                console.log(error)
                toast.error(error.response.data.message)
            })
    }


    return (
        <>
            <AdminDashboard />
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>My Profile</h1>
                </div>{/* End Page Title */}
                <section className="section profile">
                    <div className="row">
                        <div className="col-xl-8">
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
                                            <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-change-password">Reset Password</button>
                                        </li>

                                    </ul>
                                    <br />
                                    <div className="tab-content pt-2">
                                        <div className="tab-pane fade show active profile-overview" id="profile-overview">

                                            <div className="row">
                                                <div className="col-lg-3 col-md-4 label ">Admin ID</div>
                                                <div className="col-lg-9 col-md-8">{userId}</div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-3 col-md-4 label ">Full Name</div>
                                                <div className="col-lg-9 col-md-8">{firstName} {lastName}</div>
                                            </div>


                                            <div className="row">
                                                <div className="col-lg-3 col-md-4 label">Address</div>
                                                <div className="col-lg-9 col-md-8">{userAddress}</div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-3 col-md-4 label">Phone</div>
                                                <div className="col-lg-9 col-md-8">{userMobile}</div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-3 col-md-4 label">Email</div>
                                                <div className="col-lg-9 col-md-8">{userEmail}</div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-3 col-md-4 label">Date of Birth</div>
                                                <div className="col-lg-9 col-md-8">{userDob}</div>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade profile-edit pt-3" id="profile-edit">
                                            {/* Profile Edit Form */}
                                            <form>

                                                <div className="row mb-3">
                                                    <label htmlFor="fullName" className="col-md-4 col-lg-3 col-form-label">First
                                                        Name</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input name="firstName" type="text" className="form-control" id="firstName" defaultValue={userDetails.firstName}
                                                            onChange={(e) => { setFirstName(e.target.value) }} required />
                                                    </div>
                                                </div>

                                                <div className="row mb-3">
                                                    <label htmlFor="fullName" className="col-md-4 col-lg-3 col-form-label">Last
                                                        Name</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input name="lastName" type="text" className="form-control" id="lastName" defaultValue={userDetails.lastName}
                                                            onChange={(e) => { setLastName(e.target.value) }} required />
                                                    </div>
                                                </div>


                                                <div className="row mb-3">
                                                    <label htmlFor="Address" className="col-md-4 col-lg-3 col-form-label">Address</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input name="address" type="text" className="form-control" id="Address" defaultValue={userAddress}
                                                            onChange={(e) => { setUserAddress(e.target.value) }} required />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label htmlFor="Phone" className="col-md-4 col-lg-3 col-form-label">Phone</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input name="phone" type="text" className="form-control" id="Phone" defaultValue={userMobile}
                                                            onChange={(e) => { setUserMobile(e.target.value) }} required />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label htmlFor="Email" className="col-md-4 col-lg-3 col-form-label">Email</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input name="email" type="email" className="form-control" id="Email" defaultValue={userEmail}
                                                            onChange={(e) => { setUserEmail(e.target.value) }} required />
                                                    </div>
                                                </div>

                                                <div className="row mb-3">
                                                    <label htmlFor="Email" className="col-md-4 col-lg-3 col-form-label">Date of birth</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input name="dob" type="date" className="form-control" id="Dob" defaultValue={userDob}
                                                            onChange={(e) => { setUserDob(e.target.value) }} required />
                                                    </div>
                                                </div>

                                                <div className="text-center">
                                                    <a type="submit" className="btn btn-primary" onClick={updateProfile}>Save Changes</a>
                                                </div>
                                            </form>{/* End Profile Edit Form */}
                                        </div>
                                        <div className="tab-pane fade pt-3" id="profile-change-password">
                                            {/* Change Password Form */}
                                            <form>
                                                <div className="row mb-3">
                                                    <label htmlFor="currentPassword" className="col-md-4 col-lg-3 col-form-label">Current Password</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input name="password" type="password" className="form-control" id="currentPassword"
                                                            onChange={(e) => { setOldPassword(e.target.value) }} />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label htmlFor="newPassword" className="col-md-4 col-lg-3 col-form-label">New
                                                        Password</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input name="newpassword" type="password" className="form-control" id="newPassword"
                                                            onChange={(e) => { setNewPassword(e.target.value) }} />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label htmlFor="renewPassword" className="col-md-4 col-lg-3 col-form-label">Re-enter New
                                                        Password</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input name="renewpassword" type="password" className="form-control" id="renewPassword"
                                                            onChange={(e) => { setConfirmPassword(e.target.value) }} />
                                                    </div>
                                                </div>
                                                <div className="text-center">
                                                    <a type="submit" className="btn btn-primary" onClick={changePassword}>Change Password</a>
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


export default AdminProfile