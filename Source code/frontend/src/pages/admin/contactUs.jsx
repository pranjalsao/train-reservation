import React from 'react'
import AdminDashboard from './adminDashboard';
const Contactus = () => {

    // const navigate = useNavigate()

    // useEffect(()=>{
    //     if(!sessionStorage['token'])
    //     navigate('/error403')

    //  },[])

    return (
        <>
            <AdminDashboard />
            <main id='main' className='main'>
                <div>
                    <h2>Contact Us!</h2>
                </div>
                <h5 style={{ color: 'darkblue' }}>
                    For any queries,you can contact us on any one of following :</h5>
                <section className="section profile">
                    <div className="row">
                        <div className="col-xl-8">
                            <div className="card">
                                <div className="card-body pt-3">
                                    {/* Bordered Tabs */}
                                    <ul className="nav nav-tabs nav-tabs-bordered">
                                        <li className="nav-item">
                                            <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#profile-overview">Details</button>
                                        </li>

                                    </ul>
                                    <br />
                                    <div className="tab-content pt-2">
                                        <div className="tab-pane fade show active profile-overview" id="profile-overview">

                                            <div className="row">
                                                <div className="col-lg-3 col-md-4 label">Address :</div>
                                                <div className="col-lg-5 col-md-4 label">Mumbai, Maharastra</div>
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Contactus