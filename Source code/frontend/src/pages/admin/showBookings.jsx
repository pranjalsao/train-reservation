import axios from "axios"
import { useEffect } from "react"
import config from "../../config"
import { toast } from 'react-toastify'
import { useState } from "react"
import AdminDashboard from "./adminDashboard"
import { useNavigate } from "react-router-dom"
const ShowBookings = () => {

  const [bookingList, setBookingList] = useState([])
  let num = 1;
  const navigate = useNavigate()

  useEffect(() => {
    // if(!sessionStorage['token'])
    // navigate('/error403')
    // else{
    // }
    showbooking()

  }, [])

  const showbooking = () => {
    axios.get(config.URL + '/admin/all-bookings',
      { headers: { Authorization: sessionStorage['token'] } })
      .then((response) => {
        setBookingList(response.data)
      })
      .catch(error => {
        toast.error(error.response.data.message)
        console.log(error)
      })
  }

  return (
    <>
      <AdminDashboard />
      <main id="main" className="main">
        <div className="pagetitle">
          <h1 style={{ color: 'darkblue' }}>BOOKING LIST</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="index.html">Home</a></li>
              <li className="breadcrumb-item">Bookings</li>
            </ol>
          </nav>
        </div>
        <section className="section">
          <div className="row">
            <div className="col-lg-12">


              <table className="table table-bordered border-primary">
                <thead>
                  <tr>
                    <th scope="col">Sr.No</th>
                    <th scope="col">Booking ID</th>
                    <th scope="col">Booking Date</th>
                    <th scope="col">Departure Date</th>
                    <th scope="col">Departure Time</th>
                    <th scope="col">Arrival Date</th>
                    <th scope="col">Arrival Time</th>
                    <th scope="col">Journey Distance</th>
                    <th scope="col">Total Passenger</th>
                    <th scope="col">Coach Class</th>
                    <th scope="col">Total Amount</th>
                    <th scope="col">Booking Status</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    bookingList.map((booking) => {
                      return (
                        <tr>
                          <th>{num++}</th>
                          <td>{booking.bookingId}</td>
                          <td>{booking.bookingDate}</td>
                          <td>{booking.departureDate}</td>
                          <td>{booking.departureTime}</td>
                          <td>{booking.arrivalDate}</td>
                          <td>{booking.arrivalTime}</td>
                          <td>{booking.journeyDistance}</td>
                          <td>{booking.totalPassengers}</td>
                          <td>{booking.coach.coachId}</td>
                          <td>{booking.totalAmount}</td>
                          <td>{booking.bookingStatus}</td>
                        </tr>
                      )
                    })
                  }


                </tbody>
              </table>
            </div>
          </div>

        </section>
      </main>

    </>
  );
}

export default ShowBookings