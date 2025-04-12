import axios from "axios"
import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import config from "../../config"
import AdminDashboard from "./adminDashboard"
import { useNavigate } from "react-router-dom"
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';

const AddStation = () => {
  const [stationId, setStation] = useState('')
  const [stationName, setStationName] = useState('')
  const [distance, setDistance] = useState('')

  const body = { stationId, stationName, distance }

  const navigate = useNavigate()

  // useEffect(()=>{
  //   if(!sessionStorage['token'])
  //   navigate('/error403')
  // })

  const addstation = () => {
    axios.post(config.URL + '/admin/add-station', body,
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

  const submit = (e) => {
    if (stationId.length > 0 && stationName.length > 0 && distance.length > 0) {
      e.preventDefault()
      confirmAlert({
        title: 'Confirm to submit',
        message: 'Are you sure to do this.',
        buttons: [
          {
            label: 'Yes',
            onClick: () => {
              addstation()
              navigate('/admin/add-station')
            }

          },
          {
            label: 'No',
            onClick: () => navigate('/admin/add-station')
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
                  <h5 className="card-title">Fill New Station Details here</h5>
                  <hr />
                  <form >

                    <div className="col-md-6">
                      <input type="text" className="form-control" placeholder="Station Id(eg. MUM for Mumbai)"
                        required onChange={(e) => setStation(e.target.value)} />
                    </div>
                    <br />
                    <div className="col-md-6">
                      <input type="text" className="form-control" placeholder="Station Name"
                        required onChange={(e) => setStationName(e.target.value)} />
                    </div>
                    <br />
                    <div className="col-md-4">
                      <input type="text" className="form-control" placeholder="Distance(Km)"
                        required onChange={(e) => setDistance(e.target.value)} />
                    </div>
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

export default AddStation