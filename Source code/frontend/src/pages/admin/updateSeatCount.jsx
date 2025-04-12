import { useEffect, useState } from "react"
import { useNavigate, useLocation, Navigate } from "react-router-dom"
import AdminDashboard from "./adminDashboard"
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import axios from "axios";
import { toast } from "react-toastify"
import config from "../../config";


const UpdateSeatCount = () => {

  const [trainTypeId, setTrainType] = useState('')
  const [coachId, setCoach] = useState('')
  const [seatCount, setSeatCount] = useState('')
  const [trainTypeList, setTrainList] = useState([])
  const [coachList, setCoachList] = useState([])

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (!location.state) {
      if (!sessionStorage['token']) {
        toast.error("You are not logged in! Login to Continue.")
        // return <Navigate to="/login" />
        navigate("/login")
      }
      else if (!(sessionStorage['role'] == "ADMIN")) {
        // return <Navigate to="/error403" />
        navigate("/error403")
      }
    } else {
      const { traintypeid, coachid, seatcount } = location.state
      getDetails(traintypeid, coachid, seatcount);
    }

  }, [])

  const body = { trainTypeId, coachId, seatCount }

  const updateseatcount = () => {
    axios.put(config.URL + '/admin/update-seat-count', body,
      { headers: { Authorization: sessionStorage['token'] } })
      .then((response) => {
        if (response.status === 200)
          toast.success(response.data.message)
        else
          toast.error(response.data.message)
      })
      .catch((error) => {
        console.log(error)
        toast.error(error.response.data.message)
      })
  }


  const getDetails = (traintypeid, coachid, seatcount) => {
    setTrainType(traintypeid)
    setCoach(coachid)
    setSeatCount(seatcount)
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
            updateseatcount()
            navigate('/admin/seat-count')
          }

        },
        {
          label: 'No',
          onClick: () => navigate('/admin/seat-count')
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
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Update Seat count for train here</h5>
                  <hr />
                  <form >

                    <div className="col-md-6">
                      <select id="inputState" className="form-select" onChange={(e) => setTrainType(e.target.value)}
                        disabled>
                        <option selected>{trainTypeId}</option>
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
                        disabled>
                        <option selected>{coachId}</option>
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
                        defaultValue={seatCount}
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


export default UpdateSeatCount