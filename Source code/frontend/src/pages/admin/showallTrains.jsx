import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import { toast } from "react-toastify"
import config from '../../config'
import AdminDashboard from "./adminDashboard"
import { useNavigate } from "react-router-dom"

const ShowAllTrains = () => {

  const [trainList, setTrainList] = useState([])
  let num = 1;
  const navigate = useNavigate()

  useEffect(() => {
    // if(!sessionStorage['token'])
    // navigate('/error403')
    // else{
    // }

    showtrains()
  }, [])

  const showtrains = () => {
    axios.get(config.URL + '/admin/show-all-trains', {
      headers: { Authorization: sessionStorage['token'] }
    })
      .then((response) => {
        setTrainList(response.data)
      })
      .catch((error) => {
        toast.error(error.response.data.message)
        console.log(error)
      })
  }

  const updatetrain = (train, sourceId, destinationId, trainTypeId) => {
    navigate('/admin/update-train', {
      state: {
        trainDetails: train,
        source: sourceId, destination: destinationId, traintype: trainTypeId
      }
    })
  }

  return (
    <>
      <AdminDashboard />
      <main id="main" className="main">
        <div className="pagetitle">
          <h1 style={{ color: 'darkblue' }}>AVAILBALE TRAINS</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="index.html">Home</a></li>
              <li className="breadcrumb-item">Trains</li>
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
                    <th scope="col">Train No.</th>
                    <th scope="col">Train Name</th>
                    <th scope="col">Arrival Time</th>
                    <th scope="col">Destination Time</th>
                    <th scope="col">Source Station ID</th>
                    <th scope="col">Destination Station ID</th>
                    <th scope="col">Train Type ID</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    trainList.map((train) => {
                      return (
                        <tr>
                          <td>{num++}</td>
                          <td>{train.trainNo}</td>
                          <td>{train.trainName}</td>
                          <td>{train.sourceDepartureTime}</td>
                          <td>{train.destinationArrivalTime}</td>
                          <td>{train.source.stationId}</td>
                          <td>{train.destination.stationId}</td>
                          <td>{train.trainType.trainTypeId}</td>
                          <td>
                            <button class="btn btn-primary"
                              onClick={() => updatetrain(train, train.source.stationId,
                                train.destination.stationId, train.trainType.trainTypeId)}>
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


  )
}


export default ShowAllTrains