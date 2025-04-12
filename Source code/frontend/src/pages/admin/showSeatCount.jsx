import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import { toast } from "react-toastify"
import config from "../../config"
import AdminDashboard from "./adminDashboard"
import { useNavigate } from "react-router-dom"

const ShowSeatCount = () => {

  const [seatcountlist, setSeatCountList] = useState([])
  let num = 1;
  const navigate = useNavigate()

  useEffect(() => {
    // if(!sessionStorage['token'])
    // navigate('/error403')
    // else{
    // }
    showseatcount()

  }, [])

  const showseatcount = () => {
    axios.get(config.URL + '/admin/show-seat-count',
      { headers: { Authorization: sessionStorage['token'] } })
      .then((response) => {
        setSeatCountList(response.data)
      })
      .catch((error) => {
        console.log(error)
        toast.error(error.response.data.message)
      })
  }

  const updatecount = (typeid, coachid, count) => {
    navigate('/admin/update-seat-count', {
      state: {
        traintypeid: typeid, coachid: coachid, seatcount: count
      }
    })
  }

  return (
    <>
      <AdminDashboard />
      <main id="main" className="main">
        <div className="pagetitle">
          <h1 style={{ color: 'darkblue' }}>SEAT COUNT TRAIN TYPE WISE</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="index.html">Home</a></li>
              <li className="breadcrumb-item">Seat Count</li>
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
                    <th scope="col">Train Type ID</th>
                    <th scope="col">Coach Class</th>
                    <th scope="col">Seat Count</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    seatcountlist.map((seatcount) => {
                      return (
                        <tr>
                          <td>{num++}</td>
                          <td>{seatcount.id.trainType.trainTypeId}</td>
                          <td>{seatcount.id.coach.coachId}</td>
                          <td>{seatcount.totalSeats}</td>
                          <td>
                            <button className="btn btn-primary"
                              onClick={() => {
                                updatecount(seatcount.id.trainType.trainTypeId,
                                  seatcount.id.coach.coachId, seatcount.totalSeats)
                              }}>
                              Edit</button>
                          </td>
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

export default ShowSeatCount