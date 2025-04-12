import axios from "axios"
import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import config from "../../config"
import AdminDashboard from "./adminDashboard"
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useNavigate } from "react-router-dom"


const AddTrainType = () => {

  const [trainTypeId, setTrainType] = useState('')
  const [trainTypeName, setTrainName] = useState('')
  const [specialCharges, setSpecialCharges] = useState('')

  const body = { trainTypeId, trainTypeName, specialCharges }

  const navigate = useNavigate()

  // useEffect(()=>{
  //   if(!sessionStorage['token'])
  //   navigate('/error403')
  // })

  const addtraintype = () => {
    axios.post(config.URL + '/admin/add-train-type', body,
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
    if (trainTypeId.length > 0 && trainTypeName.length > 0 && specialCharges.length > 0) {
      e.preventDefault()
      confirmAlert({
        title: 'Confirm to submit',
        message: 'Are you sure to do this.',
        buttons: [
          {
            label: 'Yes',
            onClick: () => {
              addtraintype()
              navigate('/admin/add-train-type')
            }

          },
          {
            label: 'No',
            onClick: () => navigate('/admin/add-train-type')
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
                  <h5 className="card-title">Fill New Train Type Details here</h5>
                  <hr />
                  <form >

                    <div className="col-md-6">
                      <input type="text" className="form-control" placeholder="Train Type Id(eg. PSN)"
                        required onChange={(e) => setTrainType(e.target.value)} />
                    </div>
                    <br />
                    <div className="col-md-6">
                      <input type="text" className="form-control" placeholder="Train Type Name"
                        required onChange={(e) => setTrainName(e.target.value)} />
                    </div>
                    <br />
                    <div className="col-md-4">
                      <input type="text" className="form-control" placeholder="Special Charges(Rs.)"
                        required onChange={(e) => setSpecialCharges(e.target.value)} />
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

export default AddTrainType