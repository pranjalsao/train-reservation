import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import config from "../../config";
import AdminDashboard from "./adminDashboard"
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";

const UpdateCoachFare = () => {
  const [coachId, setCoachId] = useState('')
  const [farePerKm, setFare] = useState('')
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
    }
    else {
      const { coach, fare } = location.state
      setCoachId(coach)
      setFare(fare)
    }

  }, [])
  const body = { coachId, farePerKm }

  const updateFare = () => {
    axios.put(config.URL + '/admin/update-fare-per-km', body,
      { headers: { Authorization: sessionStorage['token'] } })
      .then((response) => {
        if (response.status === 200)
          toast.success(response.data.message)

      })
      .catch((error) => {
        console.log(error)
        toast.error(error.response.data.message)
      })
  }

  // const setDetails = (coach, fare) => {

  // }

  const submit = () => {

    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            updateFare()
            navigate('/admin/update-fare-per-km')
          }

        },
        {
          label: 'No',
          onClick: () => navigate('/admin/update-coach-fare')
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
                  <h5 className="card-title">Update fare Details here</h5>
                  <hr />
                  <form >

                    <div className="col-md-6">
                      <input type="text" className="form-control" placeholder="Coach Id(eg. GEN)"
                        defaultValue={coachId}
                        disabled onChange={(e) => setCoachId(e.target.value)} />
                    </div>
                    <br />
                    <div className="col-md-6">
                      <input type="text" className="form-control" placeholder="Fare per Km(Rs.)"
                        defaultValue={farePerKm}
                        required onChange={(e) => setFare(e.target.value)} />
                    </div>
                    <br />
                    <div className="text-center">
                      <a type="submit" className="btn btn-primary" onClick={submit}>Submit</a>
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


export default UpdateCoachFare