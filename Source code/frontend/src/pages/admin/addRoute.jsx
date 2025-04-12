import AdminDashboard from "./adminDashboard"
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import config from "../../config";

const AddRoute = () => {
  const [trainNo, setTrainNo] = useState('')
  const [stationId, setStation] = useState('')
  const [timeDuration, setTime] = useState('')
  const [stationList, setStationList] = useState([])
  const [trainList, setTrainList] = useState([])

  const body = { trainNo, stationId, timeDuration }

  const navigate = useNavigate()

  // useEffect(()=>{
  //   if(!sessionStorage['token'])
  //   navigate('/error403')
  // })

  const addroute = () => {
    axios.post(config.URL + '/admin/add-route', body,
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

  const fetchstation = () => {
    axios.get(config.expressURL + '/show-stations')
      .then((response) => {
        setStationList(response.data.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const fetchtrain = () => {
    axios.get(config.expressURL + '/train-no')
      .then((response) => {
        setTrainList(response.data.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const submit = (e) => {
    if (stationId.length > 0 && trainNo.length > 0 && timeDuration.length > 0) {
      e.preventDefault()
      confirmAlert({
        title: 'Confirm to submit',
        message: 'Are you sure to do this.',
        buttons: [
          {
            label: 'Yes',
            onClick: () => {
              addroute()
              navigate('/admin/add-route')
            }

          },
          {
            label: 'No',
            onClick: () => navigate('/admin/add-route')
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
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Fill New Route Details for train here</h5>
                  <hr />
                  <form >

                    <div className="col-md-6">
                      <select id="inputState" className="form-select" onChange={(e) => setTrainNo(e.target.value)}
                        onClick={fetchtrain} required>
                        <option selected>Train No.</option>
                        {
                          trainList.map((train) => {
                            return (
                              <option value={train.train_no}>{train.train_no}</option>
                            )
                          })
                        }
                      </select>
                    </div>
                    <br />

                    <div className="col-md-6">
                      <select id="inputState" className="form-select" onChange={(e) => setStation(e.target.value)}
                        onClick={fetchstation} required>
                        <option selected>Station</option>
                        {
                          stationList.map((station) => {
                            return (
                              <option value={station.station_id}>{station.station_id}-{station.station_name}</option>
                            )
                          })
                        }
                      </select>
                    </div>
                    <br />
                    <div className="col-md-5">
                      <input type="text" className="form-control" placeholder="Time Duration(hours eg.5)"
                        required onChange={(e) => setTime(e.target.value)} />
                    </div>
                    <br />
                    <div className="text-center">
                      <button type="" className="btn btn-primary" onClick={submit}>Submit</button>
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

export default AddRoute