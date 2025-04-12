import Navbar from "../components/navbar"
import logo from "../assets/img/trainlogo.jpg"
import { useState, useEffect } from "react"
import config from "../config"
import { toast } from 'react-toastify'
import { useNavigate, useLocation } from "react-router-dom"
import axios from "axios"


const ChangePassword = () => {
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const navigate = useNavigate();
    const location = useLocation()

    useEffect(() => {
        if (!location.state)
            navigate('/error403')
        else {

            const { emailId } = location.state
            setUserEmail(emailId)
        }
    })






    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            form.classList.add('was-validated');
        }
        else if (confirmPassword != userPassword)
            toast.error("Password didn't match with confirmation password!")
        else {
            const body = {
                userEmail, userPassword
            }
            console.log(body);
            axios.put(config.URL + "/reset-password", body)
                .then((response) => {
                    const result = response.data;
                    console.log(result["message"]);
                    console.log(result);
                    if (response.status === 200)
                        toast.success('Password changed successfully!!You can now login')
                    navigate('/login')

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
                                            <h5 className="card-title text-center pb-0 fs-4">Reset Password</h5>
                                            <p className="text-center small">Please enter new password</p>
                                        </div>

                                        <form className="row g-3" noValidate onSubmit={handleSubmit}>
                                            <div className="col-12">
                                                <label htmlFor="userEmail" className="form-label">New Password</label>
                                                <div className="input-group has-validation">
                                                    <input type="password" name="userPassword" className="form-control" id="userPassword" required
                                                        onChange={(event) => {
                                                            setUserPassword(event.target.value)
                                                        }}
                                                    />
                                                    <div className="invalid-feedback">Please enter Password!</div>
                                                </div>
                                                <br />
                                                <label htmlFor="userEmail" className="form-label">Confirm new Password</label>
                                                <div className="input-group has-validation">
                                                    <input type="password" name="confirmPassword" className="form-control" id="confirmPassword" required
                                                        onChange={(event) => {
                                                            setConfirmPassword(event.target.value)
                                                        }}
                                                    />
                                                    <div className="invalid-feedback">Please confirm Password!</div>
                                                </div>
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
        </>
    )
}


export default ChangePassword