import logo from '../assets/img/trainlogo.jpg'
import { Link } from 'react-router-dom';


const Navbar = () => {


    return (

        <nav className="navbar navbar-expand-lg navbar-dark " style={{ backgroundColor: "#012970" }}>
            <div className="container">
                <img src={logo} style={{ height: 30, width: 30 }} alt="LOGO" className="me-3" />
                <Link className="navbar-brand" to="/">Train Reservation System</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse d-flex justify-content-xl-end" id="navbarSupportedContent">
                    <div>

                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/about-us">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to="/login">Login</Link>
                            </li>


                            <li className="nav-item dropdown" >

                                <Link className="nav-link active dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    More
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/search-train-details">Search train details</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><Link className="dropdown-item" to="/register">Register</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><Link className="dropdown-item" to="/faq">FAQ</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><Link className="dropdown-item" to="/contact">Contact Us</Link></li>
                                </ul>
                            </li>


                        </ul>
                    </div>

                </div>
            </div>

        </nav>


    )
}

export default Navbar