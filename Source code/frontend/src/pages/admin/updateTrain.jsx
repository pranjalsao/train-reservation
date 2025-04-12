import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import config from "../../config";
import AdminDashboard from "./adminDashboard"
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useNavigate, useLocation } from "react-router-dom";

const UpdateTrain = () => {
  const location = useLocation()
  const [train, setTrain] = useState('')
  const [trainNo, setTrainNo] = useState('')
  const [trainName, setTrainName] = useState('')
  const [trainTypeId, setTrainTypeId] = useState('')
  const [sourceId, setSourceId] = useState('')
  const [destinationId, setDestinationId] = useState('')
  const [sourceDepartureTime, setSourceTime] = useState('')
  const [destinationArrivalTime, setDestinationTime] = useState('')
  const [trainTypeList, setTrainTypeList] = useState([])
  const [stationList, setStationList] = useState([])


  const body = {
    trainNo, trainName, trainTypeId, sourceId, destinationId, sourceDepartureTime
    , destinationArrivalTime
  }

  const navigate = useNavigate()

  useEffect(() => {
    if (!location.state) {
      if (!sessionStorage['token']) {
        toast.error("You are not logged in! Login to Continue.")
        // return <Navigate to="/login" />
        navigate("/login")
        return;
      }
      else if (!(sessionStorage['role'] == "ADMIN")) {
        // return <Navigate to="/error403" />
        navigate("/error403")
        return;
      }
    }
    else {
      const { trainDetails, source, destination, traintype } = location.state

      getDetails(trainDetails, source, destination, traintype)
      fetchstations()
      fetchtraintype()
    }

  }, [])

  const updatetrain = () => {

    axios.put(config.URL + '/admin/update-train-details', body,
      { headers: { Authorization: sessionStorage['token'] } })
      .then((response) => {
        if (response.status === 202)
          toast.success(response.data.message)
        else
          toast.error(response.data.message)
      })
      .catch((error) => {
        console.log(error)
        toast.error(error.response.data.message)
      })
  }


  const getDetails = (train, source, destination, traintype) => {

    setTrain(train)
    setSourceId(source)
    setDestinationId(destination)
    setTrainTypeId(traintype)
    setTrainNo(train.trainNo)
    setTrainName(train.trainName)
    setDestinationTime(train.destinationArrivalTime)
    setSourceTime(train.sourceDepartureTime)
  }

  const fetchtraintype = () => {
    axios.get(config.expressURL + '/train-type')
      .then((response) => {
        setTrainTypeList(response.data.data)
      })
      .catch((error) => {
        console.log(error)
        toast.error(error.response.data.message)
      })
  }

  const fetchstations = () => {
    axios.get(config.expressURL + '/show-stations')
      .then((response) => {
        setStationList(response.data.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const submit = (e) => {


    e.preventDefault()
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            updatetrain()
            navigate('/admin/show-all-trains')
          }

        },
        {
          label: 'No',
          onClick: () => navigate('/admin/show-all-trains')
        }
      ]
    });


  };


  return (
    <>
      <AdminDashboard />
      <main id="main" className="main">
        <section class="section">
          <div class="row">
            <div class="col-lg-8">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title" style={{ color: 'darkblue' }}>Update Train Details here</h5>
                  <hr />
                  <form class="row g-3 ">
                    <div className="col-md-6">
                      <input type="text" className="form-control" placeholder="Train No." value={train.trainNo}
                        onChange={(e) => setTrainNo(e.target.value)} disabled />
                    </div>
                    <div className="col-md-6">
                      <input type="text" className="form-control" placeholder="Train Name" defaultValue={train.trainName}
                        onChange={(e) => setTrainName(e.target.value)} required />
                    </div>

                    <div className="col-md-6">
                      <input type="text" className="form-control" placeholder="Departure Time(hh:mm)"
                        defaultValue={train.sourceDepartureTime}
                        onChange={(e) => setSourceTime(e.target.value)} required />
                    </div>
                    <div className="col-md-6">
                      <input type="text" className="form-control" placeholder="Arrival Time(hh:mm)"
                        defaultValue={train.destinationArrivalTime}
                        onChange={(e) => setDestinationTime(e.target.value)} required />

                    </div>

                    <div className="col-md-6">
                      <select id="inputState" className="form-select" onChange={(e) => setSourceId(e.target.value)}
                        required>
                        <option selected>{sourceId}</option>
                        {
                          stationList.map((station) => {
                            return (
                              <option value={station.station_id}>{station.station_id}-{station.station_name}</option>
                            )
                          })
                        }
                      </select>
                    </div>

                    <div className="col-md-6">
                      <select id="inputState" className="form-select" onChange={(e) => setDestinationId(e.target.value)}
                        required>
                        <option selected>{destinationId}</option>

                        {
                          stationList.map((station) => {
                            return (
                              <option value={station.station_id}>{station.station_id}-{station.station_name}</option>
                            )
                          })
                        }
                      </select>
                    </div>



                    <div className="col-md-4">
                      <select id="inputState" className="form-select" onChange={(e) => setTrainTypeId(e.target.value)}
                        defaultValue={train.trainType} required>
                        <option selected>{trainTypeId}</option>
                        {
                          trainTypeList.map((trainType) => {
                            return (
                              <option value={trainType.train_type_id}>{trainType.train_type_id}</option>
                            )
                          })
                        }
                      </select>

                    </div>

                    <div className="text-center">
                      <button type="submit" className="btn btn-primary" onClick={submit}>Submit</button>
                      &nbsp;&nbsp;
                      <button type="reset" className="btn btn-secondary">Reset</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
    </>

  )
}


export default UpdateTrain