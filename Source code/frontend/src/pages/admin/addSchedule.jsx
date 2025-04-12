import AdminDashboard from "./adminDashboard"
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import config from "../../config";

const AddSchedule = () => {

  const [trainNo, setTrainNo] = useState('')
  const [day, setDay] = useState('')
  const [trainType, setTrainType] = useState('')
  const [trainList, setTrainList] = useState([])
  const [trainTypeTemp, setTrainTypeTemp] = useState([])

  const body = { trainNo, day, trainType }

  const navigate = useNavigate()
  let type;

  // useEffect(()=>{
  //   if(!sessionStorage['token'])
  //   navigate('/error403')
  // })

  const addschedule = () => {
    axios.post(config.URL + '/admin/scheduletrain', body,
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


  const fetchtrain = () => {
    axios.get(config.expressURL + '/train-no')
      .then((response) => {
        setTrainList(response.data.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const fetchtraintype = () => {
    axios.get(config.expressURL + `/train/${trainNo}`)
      .then((response) => {
        setTrainTypeTemp(response.data.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const submit = (e) => {
    e.preventDefault()
    if (trainNo == 0)
      toast.error("Please provide train no.!")
    else if (day == 0)
      toast.error("Please provide day!")


    if (trainNo.length > 0 && day.length > 0 && trainType.length > 0) {


      confirmAlert({
        title: 'Confirm to submit',
        message: 'Are you sure to do this.',
        buttons: [
          {
            label: 'Yes',
            onClick: () => {
              addschedule()
              navigate('/admin/add-schedule')
            }

          },
          {
            label: 'No',
            onClick: () => navigate('/admin/add-schedule')
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
                  <h5 className="card-title">Fill New Schedule Details for train here</h5>
                  <hr />
                  <form >

                    <div className="col-md-6">
                      <select id="inputState" className="form-select" onChange={(e) => setTrainNo(e.target.value)}
                        onClick={fetchtrain} required>
                        <option value='0'>Train No.</option>
                        {
                          trainList.map((Train) => {
                            return (
                              <option value={Train.train_no}>
                                {Train.train_no}</option>

                            )
                          })
                        }
                      </select>
                    </div>
                    <br />

                    <div className="col-md-6">
                      <select id="inputState" className="form-select" onChange={(e) => setTrainType(e.target.value)}
                        onClick={fetchtraintype} required>
                        <option value='0'>Train Type</option>
                        {
                          trainTypeTemp.map((train) => {
                            return (
                              <option value={train.train_type}>
                                {train.train_type}</option>

                            )
                          })
                        }
                      </select>
                    </div>
                    <br />


                    <div className="col-md-6">
                      <select id="inputState" className="form-select" onChange={(e) => setDay(e.target.value)}
                        required>
                        <option value='0'>Day</option>
                        <option value='MONDAY'>Monday</option>
                        <option value='TUESDAY'>Tuesday</option>
                        <option value='WEDNESDAY'>Wednesday</option>
                        <option value='THURSDAY'>Thursday</option>
                        <option value='FRIDAY'>Friday</option>
                        <option value='SATURDAY'>Saturday</option>
                        <option value='SUNDAY'>Sunday</option>

                      </select>
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

export default AddSchedule