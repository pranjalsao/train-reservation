import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import config from "../../config";
import AdminDashboard from "./adminDashboard"
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

const UpdateTrainTypeCharges = () => {

  const [trainTypeId, setTrainType] = useState('')
  const [trainTypeName, setTrainName] = useState('')
  const [specialCharges, setSpecialCharges] = useState('')

  const location = useLocation()

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
      const { traintype } = location.state
      setdetails(traintype)
    }

  }, [])


  const setdetails = (traintype) => {
    setTrainType(traintype.trainTypeId)
    setTrainName(traintype.trainTypeName)
    setSpecialCharges(traintype.specialCharges)
  }

  const body = { trainTypeId, trainTypeName, specialCharges }

  const updatecharges = () => {
    axios.put(config.URL + '/admin/update-special-charges', body,
      { headers: { Authorization: sessionStorage['token'] } })
      .then((response) => {
        if (response.status === 200)
          toast.success(response.data.message)
      })
      .catch((error) => {
        console.log(error)
        toast(error.response.data.message)
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
            updatecharges()
            navigate('/admin/update-special-charges')
          }

        },
        {
          label: 'No',
          onClick: () => navigate('/admin/update-special-charges')
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
                  <h5 className="card-title">Update Special Charges here</h5>
                  <hr />
                  <form >

                    <div className="col-md-6">
                      <input type="text" className="form-control" placeholder="Train Type Id(eg. PSN)"
                        defaultValue={trainTypeId}
                        disabled />
                    </div>
                    <br />
                    <div className="col-md-6">
                      <input type="text" className="form-control" placeholder="Train Type Name"
                        defaultValue={trainTypeName} disabled />
                    </div>
                    <br />
                    <div className="col-md-4">
                      <input type="text" className="form-control" placeholder="Special Charges(Rs.)"
                        defaultValue={specialCharges}
                        required onChange={(e) => setSpecialCharges(e.target.value)} />
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


export default UpdateTrainTypeCharges