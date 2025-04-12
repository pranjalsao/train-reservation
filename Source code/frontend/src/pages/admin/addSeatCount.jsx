import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import config from "../../config";
import AdminDashboard from "./adminDashboard"
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useNavigate } from "react-router-dom";


const AddSeatCount = () => {

  const [trainTypeId, setTrainType] = useState('')
  const [coachId, setCoach] = useState('')
  const [seatCount, setSeatCount] = useState('')
  const [trainTypeList, setTrainList] = useState([])
  const [coachList, setCoachList] = useState([])

  const navigate = useNavigate()

  const body = { trainTypeId, coachId, seatCount }

  // useEffect(()=>{
  //   if(!sessionStorage['token'])
  //   navigate('/error403')
  // })

  const addseatcount = () => {
    axios.post(config.URL + '/admin/add-seat-count', body,
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
        setTrainList(response.data.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const fetchcoach = () => {
    axios.get(config.expressURL + '/coach')
      .then((response) => {
        setCoachList(response.data.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }



  const submit = (e) => {
    if (trainTypeId.length > 0 && coachId.length > 0 && seatCount.length > 0) {
      e.preventDefault()
      confirmAlert({
        title: 'Confirm to submit',
        message: 'Are you sure to do this.',
        buttons: [
          {
            label: 'Yes',
            onClick: () => {
              addseatcount()
              navigate('/admin/add-seatcount')
            }

          },
          {
            label: 'No',
            onClick: () => navigate('/admin/add-seatcount')
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
                      <select id="inputState" className="form-select" onChange={(e) => setTrainType(e.target.value)}
                        onClick={fetchtraintype} required>
                        <option selected>Train Type</option>
                        {
                          trainTypeList.map((train) => {
                            return (
                              <option value={train.train_type_id}>{train.train_type_id}</option>
                            )
                          })
                        }
                      </select>
                    </div>
                    <br />

                    <div className="col-md-6">
                      <select id="inputState" className="form-select" onChange={(e) => setCoach(e.target.value)}
                        onClick={fetchcoach} required>
                        <option selected>Coach Class</option>
                        {
                          coachList.map((coach) => {
                            return (
                              <option value={coach.coach_id}>{coach.coach_id}</option>
                            )
                          })
                        }
                      </select>
                    </div>
                    <br />
                    <div className="col-md-4">
                      <input type="text" className="form-control" placeholder="Seat Count"
                        required onChange={(e) => setSeatCount(e.target.value)} />
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

export default AddSeatCount