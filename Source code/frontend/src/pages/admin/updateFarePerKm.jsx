import { useEffect, useState } from "react"
import AdminDashboard from "./adminDashboard"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../../config";


const UpdateFarePerKm = () => {
  const [coachList, setCoachList] = useState([])
  const navigate = useNavigate()
  let num = 1



  useEffect(() => {
    // if(!sessionStorage['token'])
    // navigate('/error403')
    // else{
    // }
    fetchFare()

  }, [])

  const fetchFare = () => {
    axios.get(config.URL + '/admin/show-coaches',
      { headers: { Authorization: sessionStorage['token'] } })
      .then((response) => {
        setCoachList(response.data)
      })
      .catch((error) => [
        console.log(error)
      ])

  }

  const updatefare = (coachid, fare) => {
    navigate('/admin/update-coach-fare', { state: { coach: coachid, fare: fare } })
  }

  return (
    <>
      <AdminDashboard />
      <main id="main" className="main">
        <section class="section">
          <div class="row">
            <div class="col-md-8"></div>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Choose coach class to update</h5>

                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th scope="col">Sr.No</th>
                      <th scope="col">Coach Id</th>
                      <th scope="col">Fare per Km(Rs.)</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      coachList.map((coach) => {
                        return (
                          <tr>
                            <td>{num++}</td>
                            <td>{coach.coachId}</td>
                            <td>{coach.farePerKm}</td>
                            <td>
                              <button className="btn btn-primary"
                                onClick={() => { updatefare(coach.coachId, coach.farePerKm) }}>
                                Edit</button>
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


export default UpdateFarePerKm