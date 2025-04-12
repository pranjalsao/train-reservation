import React from 'react'
import { Link } from 'react-router-dom';
import errorImage from "../assets/img/error-404-image.png"

const Error404 = () => {
    return (
        <>
            <main>
                <div className="container">
                    <section className="section error-404 min-vh-100 d-flex flex-column align-items-center justify-content-center">
                        <h1>404</h1>
                        <h2>Oops! The page you are looking for doesn't exist.</h2>
                        <Link className="btn btn-primary" to="/">Back to home</Link>
                        <img src={errorImage} className="img-fluid py-5" alt="Page Not Found" />
                    </section>
                </div>
            </main>
        </>
    )
}

export default Error404