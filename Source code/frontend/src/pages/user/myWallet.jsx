import React from 'react'
import UserDashboard from './userDashboard';
import { useEffect, useState } from 'react';
import axios from 'axios';
import config from './../../config';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';

const MyWallet = () => {

    const [walletDetails, setWalletDetails] = useState({});
    const [walletAmount, setWalletAmount] = useState(0);
    const [debitCardNo, setDebitCardNo] = useState("");
    const [validThru, setValidThru] = useState("");
    const [cvv, setCvv] = useState(0);

    const [addAmount, setAddAmount] = useState(0);
    const [addAmountCvv, setAddAmountCvv] = useState(0);

    const [walletAmount2, setWalletAmount2] = useState(0);
    const [debitCardNo2, setDebitCardNo2] = useState("");
    const [validThru2, setValidThru2] = useState("");
    const [cvv2, setCvv2] = useState(0);

    const navigate = useNavigate();


    useEffect(() => {
        loadWalletDetails();
    }, [])


    const loadWalletDetails = () => {
        axios
            .get(config.URL + '/user/get-wallet-details/' + sessionStorage["id"], {
                // headers: { token: sessionStorage['token'] },
                headers: { Authorization: sessionStorage['token'] }
            })
            .then((response) => {
                const result = response.data
                console.log(result);
                setWalletDetails(result);
            })
            .catch((error) => {
                toast.error(error.response.data);
            })
    }

    //Update Wallet Details
    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            form.classList.add('was-validated');
        } else {
            const body = {
                userId: sessionStorage["id"],
                walletId: walletDetails.walletId,
                walletAmount,
                debitCardNo,
                validThru,
                cvv
            }
            axios
                .put(config.URL + '/user/update-wallet-details', body, {
                    headers: { Authorization: sessionStorage['token'] }
                })
                .then((response) => {
                    const result = response.data
                    console.log(result);
                    toast.success("Wallet Updated Succesfully ✔")
                    window.location.reload();
                })
                .catch((error) => {
                    console.log(error);
                    toast.error("Something went wrong ❌");
                })
        }
    }

    //Update Balance
    const handleSubmit2 = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            form.classList.add('was-validated');
        } else {
            const body = {
                amount: addAmount,
                cvv: addAmountCvv
            }
            axios
                .put(config.URL + '/user/update-balance/' + walletDetails.walletId, body, {
                    headers: { Authorization: sessionStorage['token'] },
                })
                .then((response) => {
                    const result = response.data
                    console.log(result);
                    toast.success("Amount Added Succesfully ✔");
                    window.location.reload();
                })
                .catch((error) => {
                    toast.error(error.response.data.message);
                    console.log(error);
                })
        }
    }

    //Add New Wallet
    const handleSubmit3 = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            form.classList.add('was-validated');
        } else {
            const body = {
                userId: sessionStorage["id"],
                walletAmount: walletAmount2,
                debitCardNo: debitCardNo2,
                validThru: validThru2,
                cvv: cvv2
            }
            axios
                .post(config.URL + '/user/add-wallet', body, {
                    headers: { Authorization: sessionStorage['token'] }
                })
                .then((response) => {
                    //  const result = response.data
                    toast.success("Wallet Added Succesfully ✔")
                    window.location.reload()
                })
                .catch((error) => {
                    toast.error("Something went wrong ❌");
                    console.log(error);
                })
        }
    }

    return (
        <>
            <UserDashboard />
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>My Wallet</h1>
                </div>

                {
                    Object.keys(walletDetails).length == 0 ?
                        <section className="section profile">
                            <div className="row">
                                <div className="col-lg-8">
                                    <div className="card">
                                        <div className="card-body pt-3">
                                            {/* Bordered Tabs */}
                                            <ul className="nav nav-tabs nav-tabs-bordered">
                                                <li className="nav-item">
                                                    <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#profile-overview">Wallet</button>
                                                </li>
                                            </ul>
                                            <div className="tab-content pt-2">
                                                <div className="tab-pane fade show active profile-overview" id="profile-overview">
                                                    <h5 className="card-title">You have not added any wallet. Please add wallet to continue.</h5>
                                                    <button className='btn btn-success' data-bs-toggle="modal"
                                                        data-bs-target="#exampleModal"><i className='bi bi-wallet2'></i> Add Wallet</button>
                                                    <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                        <div className="modal-dialog">
                                                            <div className="modal-content">
                                                                <div className="modal-header">
                                                                    <h5 className="modal-title" id="exampleModalLabel">Enter Wallet Details</h5>
                                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                                                </div>
                                                                <div className="modal-body">
                                                                    <form className="needs-validation" noValidate onSubmit={handleSubmit3}>

                                                                        <div className="row mb-3 d-flex align-items-center">
                                                                            <label htmlFor="Job" className=" col-lg-4 col-form-label">Debit Card Number (xxxx-xxxx-xxxx)</label>
                                                                            <div className="col-lg-8">
                                                                                <input name="job" type="text" className="form-control" id="Job"
                                                                                    required onChange={(e) => {
                                                                                        setDebitCardNo2(e.target.value);
                                                                                    }} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="row mb-3">
                                                                            <label htmlFor="Country" className="col-lg-4 col-form-label">Valid Thru</label>
                                                                            <div className="col-lg-8">
                                                                                <input name="country" type="date" className="form-control" id="Country"
                                                                                    required onChange={(e) => {
                                                                                        setValidThru2(e.target.value);
                                                                                    }} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="row mb-3">
                                                                            <label htmlFor="Address" className="col-lg-4 col-form-label">CVV (3 digits)</label>
                                                                            <div className="col-lg-8">
                                                                                <input name="address" type="number" className="form-control" id="Address"
                                                                                    required onChange={(e) => {
                                                                                        setCvv2(e.target.value);
                                                                                    }} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="row mb-3">
                                                                            <label htmlFor="company" className=" col-lg-4 col-form-label">Wallet Amount</label>
                                                                            <div className="col-lg-8">
                                                                                <input name="company" type="number" className="form-control"
                                                                                    id="company" required onChange={(e) => {
                                                                                        setWalletAmount2(e.target.value);
                                                                                    }} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="text-center">
                                                                            <button type="submit" className="btn btn-primary">Add Wallet</button>
                                                                        </div>
                                                                    </form>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="tab-pane fade pt-3" id="profile-change-password">
                                                    {/* Change Password Form */}
                                                    <form className='needs-validation' noValidate onSubmit={handleSubmit2}>
                                                        <div className="row mb-3 d-flex align-items-center">
                                                            <label htmlFor="currentPassword" className="col-md-4 col-lg-3 col-form-label">Enter Amount</label>
                                                            <div className="col-md-8 col-lg-9">
                                                                <input name="password" type="number" min="1" max="100000" className="form-control"
                                                                    id="currentPassword" required
                                                                    onChange={(e) => {
                                                                        setAddAmount(e.target.value);
                                                                    }}
                                                                />
                                                                <div className="invalid-feedback">Please enter amount (Max: 100000)</div>
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <label htmlFor="Address" className="col-lg-3 col-form-label">CVV (3 digits)</label>
                                                            <div className="col-lg-9">
                                                                <input name="address" type="number" min="100" max="999" className="form-control" id="Address"
                                                                    required onChange={(e) => {
                                                                        setAddAmountCvv(e.target.value);
                                                                    }} />
                                                                <div className="invalid-feedback">Please enter your 3 digit CVV</div>
                                                            </div>
                                                        </div>
                                                        <div className="text-center">
                                                            <button type="submit" className="btn btn-success">Add</button>
                                                        </div>
                                                    </form>{/* End Change Password Form */}
                                                </div>
                                                <div className="tab-pane fade profile-edit pt-3" id="profile-edit">
                                                    {/* Profile Edit Form */}
                                                    <form className="needs-validation" noValidate onSubmit={handleSubmit}>
                                                        <div className="row mb-3">
                                                            <label htmlFor="fullName" className="col-lg-4 col-form-label">Wallet ID</label>
                                                            <div className="col-lg-8">
                                                                <input name="fullName" type="text"
                                                                    className="form-control" id="fullName"
                                                                    value={walletDetails.walletId} disabled
                                                                    required />
                                                            </div>

                                                        </div>
                                                        <div className="row mb-3">
                                                            <label htmlFor="company" className=" col-lg-4 col-form-label">New Wallet Amount</label>
                                                            <div className="col-lg-8">
                                                                <input name="company" type="number" min="1" max="100000" className="form-control"
                                                                    id="company" required onChange={(e) => {
                                                                        setWalletAmount(e.target.value);
                                                                    }} />
                                                                <div className="invalid-feedback">Please enter amount (Max: 100000)</div>
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3 d-flex align-items-center">
                                                            <label htmlFor="Job" className=" col-lg-4 col-form-label">Debit Card Number (xxxx-xxxx-xxxx)</label>
                                                            <div className="col-lg-8">
                                                                <input name="job" type="text" className="form-control" id="Job"
                                                                    required onChange={(e) => {
                                                                        setDebitCardNo(e.target.value);
                                                                    }} />
                                                                <div className="invalid-feedback">Please enter your debit card number (xxxx-xxxx-xxxx)</div>
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <label htmlFor="Country" className="col-lg-4 col-form-label">Valid Thru</label>
                                                            <div className="col-lg-8">
                                                                <input name="country" type="date" className="form-control" id="Country"
                                                                    required onChange={(e) => {
                                                                        setValidThru(e.target.value);
                                                                    }} />
                                                                <div className="invalid-feedback">Please enter valid date</div>
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <label htmlFor="Address" className="col-lg-4 col-form-label">CVV (3 digits)</label>
                                                            <div className="col-lg-8">
                                                                <input name="address" type="number" min="100" max="999" className="form-control" id="Address"
                                                                    required onChange={(e) => {
                                                                        setCvv(e.target.value);
                                                                    }} />
                                                                <div className="invalid-feedback">Please enter your 3 digit CVV</div>
                                                            </div>
                                                        </div>
                                                        <div className="text-center">
                                                            <button type="submit" className="btn btn-primary">Update Wallet</button>
                                                        </div>
                                                    </form>{/* End Profile Edit Form */}
                                                </div>
                                            </div>{/* End Bordered Tabs */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        :
                        <section className="section profile">
                            <div className="row">
                                <div className="col-lg-8">
                                    <div className="card">
                                        <div className="card-body pt-3">
                                            {/* Bordered Tabs */}
                                            <ul className="nav nav-tabs nav-tabs-bordered">
                                                <li className="nav-item">
                                                    <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#profile-overview">Wallet</button>
                                                </li>
                                                <li className="nav-item">
                                                    <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-change-password">Add Amount</button>
                                                </li>
                                                <li className="nav-item">
                                                    <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-edit">Edit Wallet</button>
                                                </li>
                                            </ul>
                                            <div className="tab-content pt-2">
                                                {
                                                    Object.keys(walletDetails).length !== 0 ?
                                                        <div className="tab-pane fade show active profile-overview" id="profile-overview">
                                                            <h5 className="card-title">Wallet Details &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; #{walletDetails.walletId}</h5>
                                                            <div className="row">
                                                                <div className="col-lg-4 label ">Wallet ID</div>
                                                                <div className="col-lg-8 ">{walletDetails.walletId}</div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-lg-4 label ">Wallet Amount</div>
                                                                <div className="col-lg-8 ">{walletDetails.walletAmount}.00</div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-lg-4 label">Debit Card Number</div>
                                                                <div className="col-lg-8 ">{walletDetails.debitCardNo}</div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-lg-4 label">Valid Thru</div>
                                                                <div className="col-lg-8 ">{walletDetails.validThru}</div>
                                                            </div>
                                                        </div>
                                                        :
                                                        <div className="tab-pane fade show active profile-overview" id="profile-overview">
                                                            <h5 className="card-title">You have not added any wallet. Please add wallet to continue.</h5>
                                                            <button className='btn btn-success' data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"><i className='bi bi-wallet2'></i> Add Wallet</button>
                                                            <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                                <div className="modal-dialog">
                                                                    <div className="modal-content">
                                                                        <div className="modal-header">
                                                                            <h5 className="modal-title" id="exampleModalLabel">Enter Wallet Details</h5>
                                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                                                        </div>
                                                                        <div className="modal-body">
                                                                            <form className="needs-validation" noValidate onSubmit={handleSubmit3}>

                                                                                <div className="row mb-3 d-flex align-items-center">
                                                                                    <label htmlFor="Job" className=" col-lg-4 col-form-label">Debit Card Number (xxxx-xxxx-xxxx)</label>
                                                                                    <div className="col-lg-8">
                                                                                        <input name="job" type="text" className="form-control" id="Job"
                                                                                            required onChange={(e) => {
                                                                                                setDebitCardNo2(e.target.value);
                                                                                            }} />
                                                                                    </div>
                                                                                </div>
                                                                                <div className="row mb-3">
                                                                                    <label htmlFor="Country" className="col-lg-4 col-form-label">Valid Thru</label>
                                                                                    <div className="col-lg-8">
                                                                                        <input name="country" type="date" className="form-control" id="Country"
                                                                                            required onChange={(e) => {
                                                                                                setValidThru2(e.target.value);
                                                                                            }} />
                                                                                    </div>
                                                                                </div>
                                                                                <div className="row mb-3">
                                                                                    <label htmlFor="Address" className="col-lg-4 col-form-label">CVV (3 digits)</label>
                                                                                    <div className="col-lg-8">
                                                                                        <input name="address" type="number" className="form-control" id="Address"
                                                                                            required onChange={(e) => {
                                                                                                setCvv2(e.target.value);
                                                                                            }} />
                                                                                    </div>
                                                                                </div>
                                                                                <div className="row mb-3">
                                                                                    <label htmlFor="company" className=" col-lg-4 col-form-label">Wallet Amount</label>
                                                                                    <div className="col-lg-8">
                                                                                        <input name="company" type="number" className="form-control"
                                                                                            id="company" required onChange={(e) => {
                                                                                                setWalletAmount2(e.target.value);
                                                                                            }} />
                                                                                    </div>
                                                                                </div>
                                                                                <div className="text-center">
                                                                                    <button type="submit" className="btn btn-primary">Add Wallet</button>
                                                                                </div>
                                                                            </form>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                }

                                                <div className="tab-pane fade pt-3" id="profile-change-password">
                                                    {/* Change Password Form */}
                                                    <form className='needs-validation' noValidate onSubmit={handleSubmit2}>
                                                        <div className="row mb-3 d-flex align-items-center">
                                                            <label htmlFor="currentPassword" className="col-md-4 col-lg-3 col-form-label">Enter Amount</label>
                                                            <div className="col-md-8 col-lg-9">
                                                                <input name="password" type="number" min="1" max="100000" className="form-control"
                                                                    id="currentPassword" required
                                                                    onChange={(e) => {
                                                                        setAddAmount(e.target.value);
                                                                    }}
                                                                />
                                                                <div className="invalid-feedback">Please enter amount (Max: 100000)</div>
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <label htmlFor="Address" className="col-lg-3 col-form-label">CVV (3 digits)</label>
                                                            <div className="col-lg-9">
                                                                <input name="address" type="number" min="100" max="999" className="form-control" id="Address"
                                                                    required onChange={(e) => {
                                                                        setAddAmountCvv(e.target.value);
                                                                    }} />
                                                                <div className="invalid-feedback">Please enter your 3 digit CVV</div>
                                                            </div>
                                                        </div>
                                                        <div className="text-center">
                                                            <button type="submit" className="btn btn-success">Add</button>
                                                        </div>
                                                    </form>{/* End Change Password Form */}
                                                </div>
                                                <div className="tab-pane fade profile-edit pt-3" id="profile-edit">
                                                    {/* Profile Edit Form */}
                                                    <form className="needs-validation" noValidate onSubmit={handleSubmit}>
                                                        <div className="row mb-3">
                                                            <label htmlFor="fullName" className="col-lg-4 col-form-label">Wallet ID</label>
                                                            <div className="col-lg-8">
                                                                <input name="fullName" type="text"
                                                                    className="form-control" id="fullName"
                                                                    value={walletDetails.walletId} disabled
                                                                    required />
                                                            </div>

                                                        </div>
                                                        <div className="row mb-3">
                                                            <label htmlFor="company" className=" col-lg-4 col-form-label">New Wallet Amount</label>
                                                            <div className="col-lg-8">
                                                                <input name="company" type="number" min="1" max="100000" className="form-control"
                                                                    id="company" required onChange={(e) => {
                                                                        setWalletAmount(e.target.value);
                                                                    }} />
                                                                <div className="invalid-feedback">Please enter amount (Max: 100000)</div>
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3 d-flex align-items-center">
                                                            <label htmlFor="Job" className=" col-lg-4 col-form-label">Debit Card Number (xxxx-xxxx-xxxx)</label>
                                                            <div className="col-lg-8">
                                                                <input name="job" type="text" className="form-control" id="Job"
                                                                    required onChange={(e) => {
                                                                        setDebitCardNo(e.target.value);
                                                                    }} />
                                                                <div className="invalid-feedback">Please enter your debit card number (xxxx-xxxx-xxxx)</div>
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <label htmlFor="Country" className="col-lg-4 col-form-label">Valid Thru</label>
                                                            <div className="col-lg-8">
                                                                <input name="country" type="date" className="form-control" id="Country"
                                                                    required onChange={(e) => {
                                                                        setValidThru(e.target.value);
                                                                    }} />
                                                                <div className="invalid-feedback">Please enter valid date</div>
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <label htmlFor="Address" className="col-lg-4 col-form-label">CVV (3 digits)</label>
                                                            <div className="col-lg-8">
                                                                <input name="address" type="number" min="100" max="999" className="form-control" id="Address"
                                                                    required onChange={(e) => {
                                                                        setCvv(e.target.value);
                                                                    }} />
                                                                <div className="invalid-feedback">Please enter your 3 digit CVV</div>
                                                            </div>
                                                        </div>
                                                        <div className="text-center">
                                                            <button type="submit" className="btn btn-primary">Update Wallet</button>
                                                        </div>
                                                    </form>{/* End Profile Edit Form */}
                                                </div>
                                            </div>{/* End Bordered Tabs */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                }

            </main>{/* End #main */}

        </>
    )
}

export default MyWallet