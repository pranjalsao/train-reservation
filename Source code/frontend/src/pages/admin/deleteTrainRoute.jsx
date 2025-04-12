import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { toast } from "react-toastify"
import config from "../../config"
import AdminDashboard from "./adminDashboard"
import { Navigate, useLocation, useNavigate } from "react-router-dom"
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';


const DeleteTrainRoute = () => {
  const [routeList, setRouteList] = useState([])
  const [trainNo, setTrainNo] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  let num = 1


  if (!location.state) {
    toast.error("You are not logged in! Login to Continue.")
    return <Navigate to="/login" />
  } else {
    const { route, trainno } = location.state
    setTrainNo(trainno)
    setRouteList(route)
  }

  // useEffect(() => {

  // }, [])

  // const setDetails = (route) => {
  //   setRouteList(route)
  // }

  const deleteroute = (id) => {
    axios.delete(config.URL + '/admin/delete-route?trainno=' + trainNo +
      '&stationid=' + id,
      { headers: { Authorization: sessionStorage['token'] } })
      .then((response) => {
        if (response.status == 200)
          toast.success('Deleted successfully!!')
        else
          toast.error('Deletion failed!')
      })
      .catch((error) => {
        console.log(error)
        toast.error(error.response.status)
      })
  }

  const submit = (id) => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            deleteroute(id)
            navigate('/admin/delete-route')
          }

        },
        {
          label: 'No',
          onClick: () => { navigate('/admin/delete-route') }
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
                <h5 className="card-title">Choose Route to delete</h5>
                <p style={{ color: 'darkblue' }}>Train No:{trainNo}</p>
                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th scope="col">Sr.No</th>
                      <th scope="col">Station Id</th>
                      <th scope="col">Distance from source(Km)</th>
                      <th scope="col">Duration(in hours)</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      routeList.map((route) => {
                        return (
                          <tr>
                            <td>{num++}</td>
                            <td>{route.id.station.stationId}-{route.id.station.stationName}</td>
                            <td>{route.distanceFromSource}</td>
                            <td>{route.hours}</td>
                            <td>
                              <button className="btn btn-danger"
                                onClick={() => { submit(route.id.station.stationId) }}>
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


export default DeleteTrainRoute