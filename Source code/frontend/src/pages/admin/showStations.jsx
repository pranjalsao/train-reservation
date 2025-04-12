import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import { toast } from "react-toastify"
import config from "../../config"
import AdminDashboard from "./adminDashboard"
import { useNavigate } from "react-router-dom"

const ShowStations = () => {

  const [stationList, setStationList] = useState([])
  let num = 1;
  const navigate = useNavigate()



  useEffect(() => {
    showstations()
  }, [])

  const showstations = () => {
    axios.get(config.URL + '/admin/all-stations',
      { headers: { Authorization: sessionStorage['token'] } })
      .then((response) => {
        setStationList(response.data)
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
          <h1 style={{ color: 'darkblue' }}>STATION LIST</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="index.html">Home</a></li>
              <li className="breadcrumb-item">Stations</li>
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
                    <th scope="col">Station ID</th>
                    <th scope="col">Station Name</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    stationList.map((station) => {
                      return (
                        <tr>
                          <td>{num++}</td>
                          <td>{station.stationId}</td>
                          <td>{station.stationName}</td>
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

export default ShowStations