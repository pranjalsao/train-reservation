import { useState } from "react"
import { toast } from "react-toastify"
import config from "../../config"
import AdminDashboard from "./adminDashboard"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useEffect } from "react"
import { flushSync } from "react-dom"


const DeleteRoute = () => {
    const [trainList, setTrainList] = useState([])
    const [trainNo, setTrainNo] = useState([])
    const [routeList, setRouteList] = useState([])
    const navigate = useNavigate()
    let num = 1


    useEffect(() => {
        fetchDetails()
    }, [])

    const fetchDetails = () => {
        axios.get(config.URL + '/admin/show-all-trains',
            { headers: { Authorization: sessionStorage['token'] } })
            .then((response) => {
                setTrainList(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const navigation = (trainNumber) => {

        if (routeList.length > 0)
            navigate('/admin/delete-train-route', { state: { route: routeList, trainno: trainNumber } })
        else
            toast.error("No route available for this train!!")
    }



    const fetchRoute = (trainNo) => {
        axios.get(config.URL + '/show-route/' + trainNo,
            { headers: { Authorization: sessionStorage['token'] } })
            .then((response) => {
                setRouteList(response.data)

            })
            .catch((error) => {
                console.log(error)
                toast.error(error.response.data)
            })
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
                                <h5 className="card-title">Choose train no. to delete route</h5>

                                <table className="table table-sm">
                                    <thead>
                                        <tr>
                                            <th scope="col">Sr.No</th>
                                            <th scope="col">Train No</th>
                                            <th scope="col">Train Name</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            trainList.map((train) => {
                                                return (
                                                    <tr>
                                                        <td>{num++}</td>
                                                        <td>{train.trainNo}</td>
                                                        <td>{train.trainName}</td>
                                                        <td>
                                                            <button className="btn btn-primary" onMouseEnter={() => { fetchRoute(train.trainNo) }}
                                                                onClick={() => { navigation(train.trainNo) }}>
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

export default DeleteRoute