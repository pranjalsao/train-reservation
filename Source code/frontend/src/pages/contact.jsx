import Navbar from "../components/navbar"
import wave from '../assets/img/wave4.svg'
import { toast } from "react-toastify"
import { useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
const Contact = () => {
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [query, setQuery] = useState("")

    const [value, setValue] = useState();

    const navigate = useNavigate("")

    const success = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            form.classList.add('was-validated');
        }
        else {
            toast.success("Email sent")
            event.target.reset();
            // window.location.reload();
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


                <main id='main' className='main col-lg-10 '>
                    <div>
                        <h2 style={{ color: 'darkblue' }}>Contact Us</h2>
                        <hr className="col-lg-8" />
                    </div>


                    <section className="section profile">



                        <div className="row justify-content">
                            <div className="col-lg-8 col-md-6 d-flex flex-column align-items-center justify-content-center">

                                <div className="card mb-6">
                                    <div className="card-body">
                                        <div className="pt-2 pb-2">
                                            <h5 className="card-title text-center pb-0 fs-4">Post your query!!</h5>
                                            <p className="text-center small">Enter your name, email &amp; query here</p>
                                        </div>

                                        <form className="row g-3" noValidate onSubmit={success}>

                                            <div className="col-12">
                                                <label htmlFor="name" className="form-label">Name</label>
                                                <input type="text" name="userPassword" className="form-control" id="name" required
                                                    onChange={(e) => { setName(e.target.value) }}
                                                />
                                                <div className="invalid-feedback">Please enter your name!</div>
                                            </div>
                                            <div className="col-12">
                                                <label htmlFor="userEmail" className="form-label">Email</label>
                                                <div className="input-group has-validation">
                                                    <span className="input-group-text" id="inputGroupPrepend">@</span>
                                                    <input type="email" name="userPassword" className="form-control" id="email" required
                                                        onChange={(e) => { setEmail(e.target.value) }}
                                                    />
                                                    <div className="invalid-feedback">Please enter your email!</div>

                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <label htmlFor="query" className="form-label">Query</label>
                                                <input type="text" name="userPassword" className="form-control" id="query" required
                                                    onChange={(e) => { setQuery(e.target.value) }}
                                                />
                                                <div className="invalid-feedback">Please enter your query!</div>
                                            </div>

                                            <div className="col-12" style={{ textAlign: 'center' }}>
                                                <button className="btn btn-success w-50" type="submit">
                                                    Post</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br />
                        <br />
                        <h5 style={{ color: 'white' }}>
                            For any further queries,you can contact us on any one of following :</h5>

                        <div className="row">
                            <div className="col-xl-8">
                                <div className="card">
                                    <div className="card-body pt-3">
                                        {/* Bordered Tabs */}
                                        <ul className="nav nav-tabs nav-tabs-bordered">
                                            <li className="nav-item">
                                                <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#profile-overview">Details</button>
                                            </li>
                                            <li className="nav-item">
                                                <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-social-media">Social Media</button>
                                            </li>

                                        </ul>
                                        <br />
                                        <div className="tab-content">
                                            <div className="tab-pane fade show active profile-overview" id="profile-overview">
                                                <div className="row">
                                                    <div className="col-lg-3 col-md-4 label">Address :</div>
                                                    <div className="col-lg-9 col-md-4 label">Mumbai, Maharastra</div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-3 col-md-4 label">Phone :</div>
                                                    <div className="col-lg-9 col-md-4 label">+91-8454903861</div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-3 col-md-4 label">Email :</div>
                                                    <div className="col-lg-9 col-md-8 label">train.reservation.system.2022@gmail.com</div>
                                                </div>
                                            </div>
                                            <div className="tab-pane fade d-flex" id="profile-social-media">
                                                <div className="col-lg-3 col-md-4 label">Follow us :</div>
                                                <div className="col-lg-5 col-md-4 label">
                                                    <div className="icon">
                                                        <a href="https://www.instagram.com/accounts/login/" target="_blank">
                                                            <i className="bi bi-instagram"></i>
                                                        </a>
                                                        &nbsp;&nbsp;
                                                        <a href="https://www.facebook.com/" target="_blank">
                                                            <i className="bi bi-facebook"></i>
                                                        </a>
                                                        &nbsp;&nbsp;
                                                        <a href="https://twitter.com/i/flow/login" target="_blank">
                                                            <i className="bi bi-twitter"></i>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>






                                    </div>
                                </div>
                            </div>
                        </div>




                    </section>
                </main>
            </div>
        </>
    )
}


export default Contact