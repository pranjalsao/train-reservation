
import axios from "axios"
import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import config from "../../config"
import AdminDashboard from "./adminDashboard"
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useNavigate } from "react-router-dom";

const AddTrain = () => {

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

  // useEffect(()=>{
  //   if(!sessionStorage['token'])
  //   navigate('/error403')
  // })

  const addtrain = () => {

    axios.post(config.URL + '/admin/add-train', body,
      { headers: { Authorization: sessionStorage['token'] } })
      .then((response) => {
        if (response.status === 201)
          toast.success(response.data.message)
        else
          toast.error(response.data.message)
      })
      .catch((error) => {
        console.log(error)
        toast.error(error.response.data.message)
      })
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
    if (trainNo.length > 0 && trainName.length > 0 && sourceId.length > 0 &&
      destinationArrivalTime.length > 0 && trainTypeId.length > 0 &&
      destinationId.length > 0 && sourceDepartureTime.length > 0) {
      e.preventDefault()
      confirmAlert({
        title: 'Confirm to submit',
        message: 'Are you sure to do this.',
        buttons: [
          {
            label: 'Yes',
            onClick: () => {
              addtrain()
              navigate('/admin/add-train')
            }

          },
          {
            label: 'No',
            onClick: () => navigate('/admin/add-train')
          }
        ]
      });

    }

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
                  <h5 class="card-title" style={{ color: 'darkblue' }}>Fill New Train Details here</h5>
                  <hr />
                  <form class="row g-3 ">
                    <div className="col-md-6">
                      <input type="text" className="form-control" placeholder="Train No."
                        onChange={(e) => setTrainNo(e.target.value)} required />
                    </div>
                    <div className="col-md-6">
                      <input type="text" className="form-control" placeholder="Train Name"
                        onChange={(e) => setTrainName(e.target.value)} required />
                    </div>

                    <div className="col-md-6">
                      <input type="text" className="form-control" placeholder="Departure Time(hh:mm)"
                        onChange={(e) => setSourceTime(e.target.value)} required />
                    </div>
                    <div className="col-md-6">
                      <input type="text" className="form-control" placeholder="Arrival Time(hh:mm)"
                        onChange={(e) => setDestinationTime(e.target.value)} required />

                    </div>

                    <div className="col-md-6">
                      <select id="inputState" className="form-select" onChange={(e) => setSourceId(e.target.value)}
                        onClick={fetchstations} required>
                        <option selected>Source Station</option>
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
                        onClick={fetchstations} required>
                        <option selected>Destination Station</option>
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
                        onClick={fetchtraintype} required>
                        <option selected>Train Type</option>
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


export default AddTrain