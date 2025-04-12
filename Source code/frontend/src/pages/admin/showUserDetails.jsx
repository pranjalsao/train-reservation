import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import { toast } from "react-toastify"
import config from "../../config"
import AdminDashboard from "./adminDashboard"
import { useNavigate } from "react-router-dom"

const ShowUserDetails = () => {

  const [userList, setUserList] = useState([])
  let num = 1;
  const navigate = useNavigate()


  useEffect(() => {
    // if(!sessionStorage['token'])
    // navigate('/error403')
    // else{
    // }
    showuserdetails()

  }, [])

  const showuserdetails = () => {
    axios.get(config.URL + '/admin/usersdetails',
      { headers: { Authorization: sessionStorage['token'] } })
      .then((response) => {
        setUserList(response.data)
      })
      .catch(error => {
        console.log(error)
        toast.error(error.response.data.message)
      })
  }

  return (
    <>
      <AdminDashboard />
      <main id="main" className="main">
        <div className="pagetitle">
          <h1 style={{ color: 'darkblue' }}>USERS</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="index.html">Home</a></li>
              <li className="breadcrumb-item">Users</li>
            </ol>
          </nav>
        </div>
        <section className="section">
          <div className="row">
            <div className="col-lg-12">


              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Sr.No</th>
                    <th scope="col">User ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Mobile No.</th>
                    <th scope="col">Email ID</th>
                    <th scope="col">Date of Birth</th>
                    <th scope="col">Address</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    userList.map((user) => {
                      return (
                        <tr>
                          <td>{num++}</td>
                          <td>{user.userId}</td>
                          <td>{user.firstName} {user.lastName}</td>
                          <td>{user.userMobile}</td>
                          <td>{user.userEmail}</td>
                          <td>{user.userDob}</td>
                          <td>{user.userAddress}</td>
                        </tr>
                      )
                    })
                  }


                </tbody>
              </table>
            </div>
          </div>

        </section>
      </main>

    </>
  )
}

export default ShowUserDetails