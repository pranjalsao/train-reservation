import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { toast } from "react-toastify"
import config from "../../config"
import AdminDashboard from "./adminDashboard"
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useNavigate } from "react-router-dom"
import { sub } from "date-fns"


const DeleteSchedule=()=>{
    const[scheduleList,setScheduleList]=useState([])
    const navigate=useNavigate()
    let num=1

    useEffect(()=>{
        fetchDetails()
    },[])


    const deleteSchedule=(trainNo,day,trainType)=>{
        axios.post(config.URL+'/admin/delete-schedule',{trainNo,day,trainType},
        { headers: { Authorization: sessionStorage['token']} })
        .then((response)=>{
            if(response.status===200)
            toast.success(response.data.message)
        })
        .catch((error)=>{
            console.log(error)
            toast.error(error.response.data.message)
        })
    }


    const fetchDetails=()=>{
        axios.get(config.URL+'/admin/get-schedule',
        { headers: { Authorization: sessionStorage['token'] } })
        .then((response)=>{
            setScheduleList(response.data)
        })
        .catch((error)=>{
            console.log(error)
        })
    }


    const submit = (trainNo,day,trainType) => {

        confirmAlert({
          title: 'Confirm to submit',
          message: 'Are you sure to do this.',
          buttons: [
            {
              label: 'Yes',
              onClick: () => {
               deleteSchedule(trainNo,day,trainType)
                navigate('/admin/delete-schedule')
              }
    
            },
            {
              label: 'No',
              onClick: () => { navigate('/admin/delete-schedule') }
            }
          ]
        });
    
      };
    

        return(
            <>
      <AdminDashboard />
      <main id="main" className="main">
        <section class="section">
          <div class="row">
            <div class="col-md-8"></div>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Choose schedule to delete</h5>

                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th scope="col">Sr.No</th>
                      <th scope="col">Train No</th>
                      <th scope="col">Train Type Id</th>
                      <th scope="col">Day</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      scheduleList.map((schedule) => {
                        return (
                          <tr>
                            <td>{num++}</td>
                            <td>{schedule.id.train.trainNo}</td>
                            <td>{schedule.id.trainType.trainTypeId}</td>
                            <td>{schedule.id.weekDay}</td>
                            <td>
                              <button className="btn btn-danger"
                                onClick={() =>{ submit(schedule.id.train.trainNo,schedule.id.weekDay,
                                    schedule.id.trainType.trainTypeId) }}>
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


export default DeleteSchedule