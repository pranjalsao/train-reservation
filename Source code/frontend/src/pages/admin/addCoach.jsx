import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import config from "../../config";
import AdminDashboard from "./adminDashboard"
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useNavigate } from "react-router-dom";

const AddCoach = () => {

  const [coachId, setCoachId] = useState('')
  const [farePerKm, setFare] = useState('')

  const body = { coachId, farePerKm }
  const navigate = useNavigate()

  // useEffect(()=>{
  //   if(!sessionStorage['token'])
  //   navigate('/error403')
  // })

  const addcoach = () => {
    axios.post(config.URL + '/admin/add-coach-type', body,
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
    if (coachId.length > 0 && farePerKm.length > 0) {
      e.preventDefault()
      confirmAlert({
        title: 'Confirm to submit',
        message: 'Are you sure to do this.',
        buttons: [
          {
            label: 'Yes',
            onClick: () => {
              addcoach()
              navigate('/admin/add-coach')
            }

          },
          {
            label: 'No',
            onClick: () => navigate('/admin/add-coach')
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
                  <h5 className="card-title">Fill New Coach Class Details here</h5>
                  <hr />
                  <form >

                    <div className="col-md-6">
                      <input type="text" className="form-control" placeholder="Coach Id(eg. GEN)"
                        required onChange={(e) => setCoachId(e.target.value)} />
                    </div>
                    <br />
                    <div className="col-md-6">
                      <input type="text" className="form-control" placeholder="Fare per Km(Rs.)"
                        required onChange={(e) => setFare(e.target.value)} />
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

export default AddCoach