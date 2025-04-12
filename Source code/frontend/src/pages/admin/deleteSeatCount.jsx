import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { toast } from "react-toastify"
import config from "../../config"
import AdminDashboard from "./adminDashboard"
import { useNavigate } from "react-router-dom"
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';


const DeleteSeatCount = () => {
  const [seatCountList, setSeatCount] = useState([])
  let num = 1
  const navigate = useNavigate()

  useEffect(() => {
    fetchDetails()
  }, [])


  const fetchDetails = () => {
    axios.get(config.URL + '/admin/show-seat-count',
      { headers: { Authorization: sessionStorage['token'] } }
    )
      .then((response) => {
        setSeatCount(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const deleteSeatCount = (trainTypeId, coachId) => {
    axios.delete(config.URL + '/admin/delete-coach?traintypeid=' +
      trainTypeId + '&coachid=' + coachId,
      { headers: { Authorization: sessionStorage['token'] } })
      .then((response) => {
        if (response.status === 200)
          toast.success(response.data)
        else
          toast.error(response.data)
      })
      .catch((error) => {
        console.log(error)
        toast.error(error.response.data)

      })
  }

  const submit = (trainTypeId, coachId) => {

    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            deleteSeatCount(trainTypeId, coachId)
            navigate('/admin/delete-seatcount')
          }

        },
        {
          label: 'No',
          onClick: () => { navigate('/admin/delete-seatcount') }
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
            <div class="col-md-8"></div>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Choose coach class to delete</h5>

                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th scope="col">Sr.No</th>
                      <th scope="col">Train Type Id</th>
                      <th scope="col">Coach Id</th>
                      <th scope="col">Seat Count</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      seatCountList.map((seatcount) => {
                        return (
                          <tr>
                            <td>{num++}</td>
                            <td>{seatcount.id.trainType.trainTypeId}</td>
                            <td>{seatcount.id.coach.coachId}</td>
                            <td>{seatcount.totalSeats}</td>
                            <td>
                              <button className="btn btn-danger"
                                onClick={() => { submit(seatcount.id.trainType.trainTypeId, seatcount.id.coach.coachId) }}>
                                Delete</button>
                            </td>

                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </main>


    </>

  )

}

export default DeleteSeatCount